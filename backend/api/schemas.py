from pydantic import BaseModel
from typing import List

class SequenceInput(BaseModel):
    sequence: str

class Conformation(BaseModel):
    coords: List[List[float]]
    posterior: float

class PredictionOutput(BaseModel):
    sequence: str
    conformations: List[Conformation]

class SimulationResult(BaseModel):
    sequence: str
    pdb_models: List[str]
    rmsf: List[float]

class SimulationRequest(BaseModel):
    sequence: str
    steps: int = 3000
    burn_in: int = 500
    thinning: int = 10
    step_size: float = 0.7
    beta: float = 0.5
    max_models: int = 20
