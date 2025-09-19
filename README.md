# AI-Powered Video Surveillance System

A comprehensive full-stack application for real-time video surveillance using AI-powered object detection.

## Features

- **Real-time Object Detection**: YOLO-based detection for persons, helmets, and safety vests
- **Live Video Streaming**: Real-time processed video feeds with bounding boxes
- **Alert System**: Instant alerts with sound notifications for security violations
- **Professional Dashboard**: Modern dark-themed interface with analytics
- **Safety Monitoring**: Specialized detection for workplace safety compliance

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for development
- Tailwind CSS for styling
- shadcn/ui components
- Recharts for data visualization

### Backend
- FastAPI (Python)
- YOLO via Ultralytics
- OpenCV for video processing
- Real-time streaming with Server-Sent Events

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- YOLO model files (.pt)
- Demo video files (.mp4)

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Place your model files:
# - helmet_model.pt
# - person_intrusion.pt (included)
# - vest_model.pt (included)

# Place your video files:
# - helmet.mp4
# - thief.mp4
# - 41501-429661287_small.mp4

# Start the backend server
python main.py
```

## Usage

1. **Access the Application**: Navigate to `http://localhost:5173`

2. **Login**: Use demo credentials:
   - Email: `admin@uchittechnology.com`
   - Password: `admin123`

3. **Monitor Live Feeds**: 
   - View real-time AI-processed video streams
   - Receive instant alerts for detections
   - Monitor safety compliance

## API Endpoints

- `GET /api/video/{model_name}` - Stream processed video feed
- `GET /api/alerts` - Get current alert status
- `GET /api/status` - Get system status

## File Structure

```
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── SurveillanceApp.jsx
│   ├── pages/
│   └── mockData.js
├── backend/
│   ├── main.py           # FastAPI server
│   ├── requirements.txt
│   ├── *.pt             # YOLO model files
│   └── *.mp4            # Demo video files
└── public/
    └── new-notification-09-352705.mp3
```

## Detection Types

1. **Person Intrusion**: Detects unauthorized persons in restricted areas
2. **Helmet Detection**: Monitors workplace safety - alerts when workers lack helmets
3. **Safety Vest Detection**: Ensures workers wear required safety equipment

## Development

The application uses a modern design system with:
- Professional surveillance-themed dark UI
- Semantic color tokens
- Responsive grid layouts
- Real-time status indicators
- Alert animations and sound notifications

## Demo Credentials

- **Email**: admin@uchittechnology.com
- **Password**: admin123

## License

This project is for demonstration purposes.