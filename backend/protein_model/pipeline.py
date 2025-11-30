import json
from typing import List, Tuple

import numpy as np

CA_BOND_LENGTH = 3.8  



with open("protein_model/torsion_priors.json", "r") as f:
    TORSION_PRIORS = json.load(f)

ONE_TO_THREE = {
    "A": "ALA", "R": "ARG", "N": "ASN", "D": "ASP", "C": "CYS",
    "Q": "GLN", "E": "GLU", "G": "GLY", "H": "HIS", "I": "ILE",
    "L": "LEU", "K": "LYS", "M": "MET", "F": "PHE", "P": "PRO",
    "S": "SER", "T": "THR", "W": "TRP", "Y": "TYR", "V": "VAL"
}



def bonded_energy(coords: np.ndarray) -> float:
    """Keep consecutive Cα atoms ~3.8 Å apart."""
    diffs = coords[1:] - coords[:-1]
    dists = np.linalg.norm(diffs, axis=1)
    return np.sum((dists - CA_BOND_LENGTH) ** 2)


def steric_energy(coords: np.ndarray, cutoff: float = 2.0) -> float:
    """Penalize clashes between non-neighbouring residues."""
    L = coords.shape[0]
    e = 0.0
    for i in range(L):
        for j in range(i + 2, L):  
            d = np.linalg.norm(coords[i] - coords[j])
            if d < cutoff:
                e += (cutoff - d) ** 2
    return e


def torsion_penalty(sequence: str, coords: np.ndarray) -> float:
    """Soft prior over local bending using fake torsion 'angles'."""
    L = len(sequence)
    if L < 3:
        return 0.0

    penalty = 0.0

    for i in range(1, L - 1):
        aa = sequence[i]
        resname = ONE_TO_THREE.get(aa, "ALA")
        pri = TORSION_PRIORS.get(resname, TORSION_PRIORS["ALA"])

        v1 = coords[i - 1] - coords[i]
        v2 = coords[i + 1] - coords[i]

        cos_theta = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2) + 1e-8)
        cos_theta = np.clip(cos_theta, -1.0, 1.0)
        theta = np.degrees(np.arccos(cos_theta))  # 0–180

        penalty += ((theta - pri["phi_mean"]) / pri["phi_std"]) ** 2

    return penalty


def radius_of_gyration(coords: np.ndarray) -> float:
    """Encourage compact, folded conformations."""
    center = np.mean(coords, axis=0)
    diffs = coords - center
    return np.sqrt(np.mean(np.sum(diffs ** 2, axis=1)))


def total_energy(sequence: str, coords: np.ndarray) -> float:
    """Overall energy: bonds + sterics + torsion + compactness."""
    return (
        bonded_energy(coords)
        + 2.0 * steric_energy(coords)
        + 0.1 * torsion_penalty(sequence, coords)
        + 0.2 * radius_of_gyration(coords)   
    )



def initialize_coords(sequence: str) -> np.ndarray:
    """Start as a straight line along x-axis."""
    L = len(sequence)
    coords = np.zeros((L, 3))
    coords[:, 0] = np.arange(L) * CA_BOND_LENGTH
    return coords


def propose(coords: np.ndarray, step: float = 0.5) -> np.ndarray:
    """Randomly perturb one residue."""
    new = coords.copy()
    idx = np.random.randint(0, coords.shape[0])
    new[idx] += np.random.normal(scale=step, size=3)
    return new


def log_post(sequence: str, coords: np.ndarray, beta: float) -> float:
    """Unnormalized log posterior ~ -beta * E."""
    return -beta * total_energy(sequence, coords)


def metropolis(
    sequence: str,
    steps: int,
    burn_in: int,
    thinning: int,
    step_size: float,
    beta: float,
) -> List[np.ndarray]:
    coords = initialize_coords(sequence)
    current_lp = log_post(sequence, coords, beta)
    samples: List[np.ndarray] = []

    for t in range(steps):
        prop = propose(coords, step=step_size)
        lp = log_post(sequence, prop, beta)

        if lp >= current_lp or np.log(np.random.rand()) < lp - current_lp:
            coords = prop
            current_lp = lp

        if t >= burn_in and (t - burn_in) % thinning == 0:
            samples.append(coords.copy())

    return samples



def rmsf(samples: List[np.ndarray]) -> np.ndarray:
    """Root-mean-square fluctuation per residue across samples."""
    arr = np.stack(samples, axis=0)   
    mean = np.mean(arr, axis=0)       
    diffs = arr - mean                
    sq = np.sum(diffs ** 2, axis=2)   
    return np.sqrt(np.mean(sq, axis=0))  


def center_coords(coords: np.ndarray) -> np.ndarray:
    """Translate coordinates to have center of mass at origin."""
    center = np.mean(coords, axis=0)
    return coords - center


def to_pdb(sequence: str, coords: np.ndarray, model_id: int = 1) -> str:
    """Convert Cα trace to a simple multi-MODEL PDB string."""
    lines = [f"MODEL {model_id}"]
    for i, (aa, (x, y, z)) in enumerate(zip(sequence, coords), start=1):
        res = ONE_TO_THREE.get(aa, "ALA")
        lines.append(
            f"ATOM  {i:5d}  CA  {res} A{i:4d}    "
            f"{x:8.3f}{y:8.3f}{z:8.3f}  1.00  0.00           C"
        )
    lines.append("ENDMDL")
    return "\n".join(lines)



def simulate(
    sequence: str,
    steps: int,
    burn_in: int,
    thinning: int,
    step_size: float,
    beta: float,
    max_models: int,
) -> Tuple[list, list]:
    """
    High-level API used by FastAPI endpoint.

    Returns:
        pdb_models: list[str]  – each a MODEL/ENDMDL PDB chunk
        rmsf_list: list[float] – per-residue RMSF
    """
    samples = metropolis(sequence, steps, burn_in, thinning, step_size, beta)

    if len(samples) > max_models:
        idx = np.linspace(0, len(samples) - 1, max_models, dtype=int)
        chosen = [samples[i] for i in idx]
    else:
        chosen = samples

    pdb_models = [
        to_pdb(sequence, center_coords(c), i + 1)
        for i, c in enumerate(chosen)
    ]

    r = rmsf(samples)

    return pdb_models, r.tolist()
