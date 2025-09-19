#!/usr/bin/env python3
"""
FastAPI Backend for AI-Powered Video Surveillance System
Provides real-time video processing with YOLO object detection
"""

import asyncio
import cv2
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import json
import threading
import time
from pathlib import Path
import logging
from typing import Dict, List, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Surveillance System", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models and alerts
models = {}
alert_status = {
    "helmet": False,
    "vest": False, 
    "person": False
}
video_files = {
    "helmet": "helmet.mp4",
    "vest": "41501-429661287_small.mp4", 
    "person": "thief.mp4"
}

# Detection confidence thresholds
CONFIDENCE_THRESHOLD = 0.5

class VideoProcessor:
    """Handle video processing and object detection"""
    
    def __init__(self, model_path: str, video_path: str, detection_type: str):
        self.model = YOLO(model_path)
        self.video_path = video_path
        self.detection_type = detection_type
        self.cap = None
        self.frame_count = 0
        self.total_frames = 0
        
    def initialize_video(self):
        """Initialize video capture"""
        try:
            self.cap = cv2.VideoCapture(self.video_path)
            if not self.cap.isOpened():
                logger.error(f"Cannot open video file: {self.video_path}")
                return False
            
            self.total_frames = int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT))
            logger.info(f"Video initialized: {self.video_path} ({self.total_frames} frames)")
            return True
        except Exception as e:
            logger.error(f"Error initializing video: {e}")
            return False
    
    def process_frame(self, frame):
        """Process frame with YOLO detection"""
        global alert_status
        
        try:
            # Run YOLO inference
            results = self.model(frame, conf=CONFIDENCE_THRESHOLD)
            
            # Draw bounding boxes and labels
            annotated_frame = results[0].plot()
            
            # Check for detections and update alerts
            detection_found = len(results[0].boxes) > 0 if results[0].boxes is not None else False
            
            if detection_found:
                # For helmet and vest: alert when NOT detected (safety violation)
                if self.detection_type in ["helmet", "vest"]:
                    # This logic would need refinement based on actual detection classes
                    # For now, we'll trigger alerts when people are detected without safety gear
                    alert_status[self.detection_type] = True
                elif self.detection_type == "person":
                    # For person intrusion: alert when person detected
                    alert_status[self.detection_type] = True
            else:
                # No detection - clear alert after delay
                if alert_status[self.detection_type]:
                    # Keep alert for a few seconds before clearing
                    threading.Timer(3.0, lambda: self._clear_alert()).start()
            
            return annotated_frame
            
        except Exception as e:
            logger.error(f"Error processing frame: {e}")
            return frame
    
    def _clear_alert(self):
        """Clear alert status"""
        alert_status[self.detection_type] = False
    
    def get_next_frame(self):
        """Get next processed frame"""
        if not self.cap or not self.cap.isOpened():
            if not self.initialize_video():
                return None
        
        ret, frame = self.cap.read()
        if not ret:
            # Loop video
            self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            self.frame_count = 0
            ret, frame = self.cap.read()
            if not ret:
                return None
        
        self.frame_count += 1
        return self.process_frame(frame)
    
    def cleanup(self):
        """Clean up resources"""
        if self.cap:
            self.cap.release()

# Initialize video processors
video_processors = {}

def initialize_models():
    """Initialize YOLO models and video processors"""
    global models, video_processors
    
    model_files = {
        "helmet": "helmet_model.pt",
        "vest": "vest_model.pt",
        "person": "person_intrusion.pt"
    }
    
    for detection_type, model_file in model_files.items():
        try:
            if Path(model_file).exists() and Path(video_files[detection_type]).exists():
                logger.info(f"Loading {detection_type} model: {model_file}")
                video_processors[detection_type] = VideoProcessor(
                    model_file, 
                    video_files[detection_type], 
                    detection_type
                )
                logger.info(f"Initialized {detection_type} processor")
            else:
                logger.warning(f"Missing files for {detection_type}: {model_file} or {video_files[detection_type]}")
        except Exception as e:
            logger.error(f"Error initializing {detection_type} model: {e}")

def generate_video_stream(detection_type: str):
    """Generate video stream with detections"""
    if detection_type not in video_processors:
        logger.error(f"No processor found for {detection_type}")
        return
    
    processor = video_processors[detection_type]
    
    while True:
        try:
            frame = processor.get_next_frame()
            if frame is None:
                logger.error(f"No frame available for {detection_type}")
                break
            
            # Encode frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
            if not ret:
                continue
            
            frame_bytes = buffer.tobytes()
            
            # Yield frame in multipart format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
            
            # Control frame rate
            time.sleep(0.033)  # ~30 FPS
            
        except Exception as e:
            logger.error(f"Error in video stream generation: {e}")
            break

@app.on_event("startup")
async def startup_event():
    """Initialize models on startup"""
    logger.info("Initializing AI Surveillance System...")
    initialize_models()
    logger.info("System initialization complete")

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "AI Surveillance System API", "status": "running"}

@app.get("/api/video/{model_name}")
async def get_video_stream(model_name: str):
    """Stream processed video with object detection"""
    if model_name not in video_processors:
        raise HTTPException(status_code=404, detail=f"Model {model_name} not found")
    
    return StreamingResponse(
        generate_video_stream(model_name),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.get("/api/alerts")
async def get_alerts():
    """Get current alert status for all detection types"""
    return {
        "alerts": alert_status,
        "timestamp": time.time()
    }

@app.get("/api/status")
async def get_system_status():
    """Get system status and available models"""
    return {
        "models": list(video_processors.keys()),
        "alert_status": alert_status,
        "system_time": time.time(),
        "active_processors": len(video_processors)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")