# Complete Setup Guide for AI Video Surveillance System

## Overview
You now have a full-stack AI-powered video surveillance application with:
- **Frontend**: Modern React app with professional surveillance UI
- **Backend**: FastAPI server with YOLO object detection
- **Features**: Real-time video streaming, alert system, professional dashboard

## Prerequisites

### Frontend
- Node.js 18+ and npm
- Already installed dependencies: React, Vite, TypeScript, Tailwind CSS, shadcn/ui

### Backend 
- Python 3.8 or higher
- Required files you need to provide:

#### Video Files (place in `backend/` directory):
- `helmet.mp4` - Video for helmet detection demo
- `thief.mp4` - Video for person intrusion detection
- `41501-429661287_small.mp3` - Video for safety vest detection

#### YOLO Model Files (place in `backend/` directory):
- `helmet_model.pt` - You need to provide this
- `person_intrusion.pt` - ✅ Already copied from your upload
- `vest_model.pt` - ✅ Already copied from your upload

## Step-by-Step Setup

### 1. Frontend Setup (React App)
```bash
# Install frontend dependencies (if not already done)
npm install

# Start the React development server
npm run dev
```
The frontend will be available at: `http://localhost:5173`

### 2. Backend Setup (Python FastAPI)
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Place your video files:
# - Copy helmet.mp4 to backend/helmet.mp4
# - Copy thief.mp4 to backend/thief.mp4  
# - Copy 41501-429661287_small.mp4 to backend/41501-429661287_small.mp4

# Place missing model file:
# - Copy helmet_model.pt to backend/helmet_model.pt

# Start the FastAPI server
python main.py
```
The backend will be available at: `http://localhost:8000`

### 3. Testing the Complete System

1. **Access the app**: Go to `http://localhost:5173`
2. **Login**: Use the demo credentials:
   - Email: `admin@uchittechnology.com`
   - Password: `admin123`
3. **Navigate**: Use the sidebar to access different sections:
   - **Dashboard**: Analytics and charts (uses mock data)
   - **Live View**: Real-time AI-processed video feeds from backend
   - **Alerts**: Alert history and management

## API Endpoints

Once the backend is running, test these endpoints:

- `http://localhost:8000/` - Health check
- `http://localhost:8000/api/video/helmet` - Helmet detection video stream
- `http://localhost:8000/api/video/vest` - Vest detection video stream  
- `http://localhost:8000/api/video/person` - Person intrusion video stream
- `http://localhost:8000/api/alerts` - Current alert status (JSON)
- `http://localhost:8000/api/status` - System status

## Features Overview

### Frontend Features
- ✅ Modern surveillance dashboard with dark theme
- ✅ Real-time video feeds with alert badges
- ✅ Professional login system
- ✅ Alert popup notifications with sound
- ✅ Responsive design for all screen sizes
- ✅ Analytics charts and system status

### Backend Features  
- ✅ YOLO-based object detection
- ✅ Real-time video streaming with bounding boxes
- ✅ Alert generation for safety violations
- ✅ REST API for frontend integration
- ✅ Support for multiple detection models

### Alert System
- 🔊 Audio notifications play when alerts trigger
- 🚨 Visual alert badges on camera feeds
- ⏱️ Auto-dismissing popup notifications
- 📊 Real-time alert status polling

## File Structure
```
project/
├── src/                          # React frontend
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   └── SurveillanceApp.jsx   # Main surveillance app
│   ├── pages/                    # App pages
│   └── mockData.js              # Mock data for dashboard
├── backend/                      # Python FastAPI server
│   ├── main.py                   # Main FastAPI application
│   ├── requirements.txt          # Python dependencies
│   ├── person_intrusion.pt       # ✅ Person detection model
│   ├── vest_model.pt            # ✅ Vest detection model
│   ├── helmet_model.pt          # ❌ You need to provide this
│   ├── helmet.mp4               # ❌ You need to provide this
│   ├── thief.mp4               # ❌ You need to provide this
│   └── 41501-429661287_small.mp4 # ❌ You need to provide this
└── public/
    └── new-notification-09-352705.mp3 # Alert sound file
```

## Troubleshooting

### Common Issues

1. **Backend not connecting**: 
   - Ensure Python dependencies are installed
   - Check that video and model files are in the correct location
   - Verify FastAPI server is running on port 8000

2. **Video streams not loading**:
   - Check that video files exist in backend directory
   - Verify YOLO models are properly loaded
   - Check browser console for CORS errors

3. **Alerts not working**:
   - Ensure audio file is in public directory
   - Check browser allows audio playback
   - Verify backend `/api/alerts` endpoint is responding

### Performance Tips
- Use GPU acceleration if available for YOLO inference
- Adjust video quality in backend for better performance
- Monitor system resources during operation

## Next Steps

Once everything is working:
1. **Customize Detection**: Modify confidence thresholds in `backend/main.py`
2. **Add More Models**: Extend the system with additional YOLO models
3. **Enhance Alerts**: Add email notifications, database logging
4. **Scale Up**: Deploy to production servers with proper security

## Support

The application includes:
- Comprehensive error handling
- Detailed logging for debugging
- Professional UI/UX design
- Real-time status monitoring

Your AI-powered surveillance system is now ready for operation! 🚀