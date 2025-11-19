# Bayesian Protein Structure Simulator

A minimal interactive simulator that demonstrates the basic ideas behind Bayesian protein structure prediction.  
This project does not attempt to predict real protein structures; instead, it provides a simplified educational model showing how priors, likelihoods, and posterior probabilities can be applied to protein conformational sampling.

## Purpose

The goal of this project is to:
- Generate simplified protein conformations based on amino acid sequences.
- Apply basic Bayesian concepts (prior, likelihood, posterior) to score each conformation.
- Visualize sampled conformations and their associated uncertainty.
- Provide a clear, lightweight example of Bayesian reasoning applied to structural biology.

---
## Running the Project

### 1. Backend (FastAPI)

Install dependencies and start the API:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend (Next.js)

Install dependencies and run the development server:

```bash
cd frontend
npm install
npm run dev
```
---

## Notes

- This is an educational tool, not a biological prediction engine.
- No database is used; all computations are performed on demand.
- The code is intentionally simplified to support learning and demonstration.

