// Mock data for surveillance dashboard

export const mockStats = {
  dashboard: {
    onlineCameras: 12,
    todayAlerts: 8,
    activeRecordings: 5,
    systemUptime: "99.2%"
  }
};

export const mockChartData = {
  alerts: [
    { name: 'Mon', alerts: 4 },
    { name: 'Tue', alerts: 7 },
    { name: 'Wed', alerts: 3 },
    { name: 'Thu', alerts: 8 },
    { name: 'Fri', alerts: 5 },
    { name: 'Sat', alerts: 2 },
    { name: 'Sun', alerts: 6 }
  ],
  detections: [
    { name: 'Person', value: 45, color: '#3182ce' },
    { name: 'Vehicle', value: 32, color: '#38a169' },
    { name: 'Object', value: 23, color: '#d69e2e' }
  ]
};

export const mockAlerts = [
  {
    id: 1,
    type: 'person',
    title: 'Person Intrusion Detected',
    message: 'Unauthorized person detected in restricted area',
    timestamp: new Date(Date.now() - 300000),
    camera: 'Camera 1',
    severity: 'high'
  },
  {
    id: 2,
    type: 'helmet',
    title: 'Safety Violation',
    message: 'Worker without helmet detected',
    timestamp: new Date(Date.now() - 900000),
    camera: 'Camera 2',
    severity: 'medium'
  },
  {
    id: 3,
    type: 'vest',
    title: 'Safety Violation',
    message: 'Worker without safety vest detected',
    timestamp: new Date(Date.now() - 1800000),
    camera: 'Camera 3',
    severity: 'medium'
  }
];

export const mockCameras = [
  {
    id: 1,
    name: 'Person Detection',
    location: 'Restricted Area',
    status: 'online',
    type: 'person',
    stream: 'http://localhost:8000/api/video/person'
  },
  {
    id: 2,
    name: 'Helmet Detection',
    location: 'Construction Zone',
    status: 'online',
    type: 'helmet',
    stream: 'http://localhost:8000/api/video/helmet'
  },
  {
    id: 3,
    name: 'Vest Detection',
    location: 'Safety Zone',
    status: 'online',
    type: 'vest',
    stream: 'http://localhost:8000/api/video/vest'
  }
];

export const generateCSVData = () => {
  return "timestamp,camera,detection_type,confidence\n" +
         mockAlerts.map(alert => 
           `${alert.timestamp.toISOString()},${alert.camera},${alert.type},0.95`
         ).join("\n");
};