# Use a lightweight Python image
FROM python:3.10-slim

# System dependencies for image processing and model support
RUN apt-get update && apt-get install -y \
    git \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy app code
COPY . /app

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install fastapi uvicorn[standard] transformers torch pillow

# Expose the port expected by Hugging Face Spaces
EXPOSE 7860

# Run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
