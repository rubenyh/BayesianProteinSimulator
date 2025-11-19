from pydantic import BaseModel
from typing import List, Any

class SequenceInput(BaseModel):
    sequence: str

class Conformation(BaseModel):
    coords: List[List[float]]
    posterior: float

class PredictionOutput(BaseModel):
    sequence: str
    conformations: List[Conformation]
