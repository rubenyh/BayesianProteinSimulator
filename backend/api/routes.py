from fastapi import APIRouter
from schemas import SequenceInput, PredictionOutput
from protein_model.pipeline import run_pipeline

router = APIRouter()

@router.post("/predict", response_model=PredictionOutput)
def predict_structure(payload: SequenceInput):
    result = run_pipeline(payload.sequence)
    return result
