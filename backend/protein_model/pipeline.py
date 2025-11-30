"""simulador de modelo para hacer pruebas"""
import random

def run_pipeline(sequence: str):
   
    dummy_coords = []
    for _ in range(len(sequence)):
        point = [
            random.uniform(0, 10), # X
            random.uniform(0, 10), # Y
            random.uniform(0, 10)  # Z
        ]
        dummy_coords.append(point)

    """Simula la ejecución de un pipeline de modelado de proteínas."""
    result = {
        "sequence": sequence,
        "conformations": [
            {
                "coords": dummy_coords,
                "posterior": 0.95  
            },
            {
                "coords": [[1.0, 1.0, 1.0]] * len(sequence),
                "posterior": 0.05
            }
        ]
    }
    
    return result