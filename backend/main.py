from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import io
import torch

app = FastAPI(title="Image Caption Generator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://aura-ai-navy.vercel.app", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device configuration
device = 0 if torch.cuda.is_available() else -1
print(f"Device set to use {'GPU' if device == 0 else 'CPU'}")

# Initialize the captioning pipeline
try:
    captioner = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base", device=device)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    captioner = None


@app.get("/")
async def root():
    return {"message": "Image Caption Generator API is running", "status": "healthy"}


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": captioner is not None,
        "device": "GPU" if device == 0 else "CPU"
    }


@app.post("/generate-caption/")
async def generate_caption(file: UploadFile = File(...)):
    if captioner is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        result = captioner(image)
        caption = result[0]['generated_text']
        return {"caption": caption, "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
