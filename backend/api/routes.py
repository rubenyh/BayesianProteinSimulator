from fastapi import APIRouter
from api.schemas import SimulationRequest
from api.schemas import SimulationResult
from protein_model.pipeline import simulate

router = APIRouter()

@router.get("/hello")
def hello():
    return {"msg":"hello from here"}


@router.post("/simulate", response_model=SimulationResult)
def run_simulation(req: SimulationRequest):
    pdbs, rmsf = simulate(
        req.sequence,
        req.steps,
        req.burn_in,
        req.thinning,
        req.step_size,
        req.beta,
        req.max_models
    )

    return SimulationResult(
        sequence=req.sequence,
        pdb_models=pdbs,
        rmsf=rmsf
    )
