# Demo Video Files

Place your demo video files here:

- `helmet.mp4` - Video for helmet detection demo
- `thief.mp4` - Video for person intrusion detection demo  
- `41501-429661287_small.mp4` - Video for safety vest detection demo

The backend will look for these files to stream the processed video feeds.

## Missing Model Files

You'll also need to place the YOLO model files in the backend directory:
- `helmet_model.pt` - Trained model for helmet detection
- `person_intrusion.pt` - Already present
- `vest_model.pt` - Already present

## Setup Instructions

1. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Place the video files in this directory or in the backend root directory

3. Run the backend:
   ```bash
   cd backend
   python main.py
   ```

4. The backend will be available at http://localhost:8000