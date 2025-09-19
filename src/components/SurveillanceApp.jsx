import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { mockStats, mockChartData, mockAlerts, mockCameras, generateCSVData } from '../mockData.js';

// Alert Popup Component with Sound
const AlertPopup = ({ alert, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!alert) return;

    // Play alert sound
    try {
      const audio = new Audio('/new-notification-09-352705.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (e) {
      console.log('Audio not available:', e);
    }

    // Auto-close timer
    let timer;
    if (!isHovered) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [alert, isHovered, onClose]);

  useEffect(() => {
    if (isHovered) {
      setTimeLeft(5);
    }
  }, [isHovered]);

  if (!alert) return null;

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-sm surveillance-card p-4 cursor-pointer transition-all duration-300 ${
        alert.type === 'person' ? 'border-l-4 border-l-destructive' : 
        alert.type === 'helmet' ? 'border-l-4 border-l-warning' :
        'border-l-4 border-l-alert-warning'
      } ${alert.closing ? 'opacity-0 translate-x-full' : 'opacity-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClose}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="font-bold mb-1 text-foreground">
            {alert.title}
          </div>
          <div className="text-sm text-muted-foreground">
            {alert.message}
          </div>
        </div>
        <div className="ml-4 text-xs text-muted-foreground">
          {!isHovered && `${timeLeft}s`}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ showAlert }) => {
  const stats = [
    { label: 'Online Cameras', value: mockStats.dashboard.onlineCameras, color: 'hsl(var(--success))', suffix: '' },
    { label: "Today's Alerts", value: mockStats.dashboard.todayAlerts, color: 'hsl(var(--destructive))', suffix: '' },
    { label: 'Active Recordings', value: mockStats.dashboard.activeRecordings, color: 'hsl(var(--primary))', suffix: '' },
    { label: 'System Uptime', value: mockStats.dashboard.systemUptime, color: 'hsl(var(--success))', suffix: '' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">AI-powered surveillance system overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="surveillance-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}{stat.suffix}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>Weekly Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockChartData.alerts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="alerts" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.3)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>Detection Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockChartData.detections}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {mockChartData.detections.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="surveillance-card">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.slice(0, 5).map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                    {alert.type}
                  </Badge>
                  <div>
                    <p className="font-medium text-foreground">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {alert.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Live View Component with Real Video Streams
const LiveView = ({ showAlert }) => {
  const [alertStates, setAlertStates] = useState({});
  const { toast } = useToast();

  // Poll alert status from backend
  useEffect(() => {
    const pollAlerts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/alerts');
        if (response.ok) {
          const data = await response.json();
          
          // Check for new alerts and trigger notifications
          Object.entries(data.alerts).forEach(([type, isActive]) => {
            if (isActive && !alertStates[type]) {
              const alertMessages = {
                person: 'Person intrusion detected in restricted area!',
                helmet: 'Safety violation: Worker without helmet detected!',
                vest: 'Safety violation: Worker without safety vest detected!'
              };
              
              showAlert({
                type,
                title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
                message: alertMessages[type],
                timestamp: new Date()
              });

              toast({
                title: "Security Alert",
                description: alertMessages[type],
                variant: "destructive"
              });
            }
          });
          
          setAlertStates(data.alerts);
        }
      } catch (error) {
        console.error('Error polling alerts:', error);
      }
    };

    const interval = setInterval(pollAlerts, 1000); // Poll every second
    return () => clearInterval(interval);
  }, [alertStates, showAlert, toast]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Live Camera Feeds</h1>
        <p className="text-muted-foreground">Real-time AI-powered surveillance monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCameras.map(camera => (
          <Card key={camera.id} className="surveillance-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{camera.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className={`status-indicator ${camera.status === 'online' ? 'status-online' : 'status-offline'}`} />
                  <span className="text-sm text-muted-foreground">{camera.status}</span>
                </div>
              </div>
              <CardDescription>{camera.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="camera-feed aspect-video rounded-lg overflow-hidden bg-muted">
                <img 
                  src={camera.stream}
                  alt={`${camera.name} feed`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhbWVyYSBGZWVkPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </div>
              
              {alertStates[camera.type] && (
                <Badge className="alert-danger">
                  🚨 ALERT ACTIVE
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Alerts Page Component
const AlertsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alert History</h1>
        <p className="text-muted-foreground">Review and manage security alerts</p>
      </div>

      <Card className="surveillance-card">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                    {alert.type}
                  </Badge>
                  <div>
                    <p className="font-semibold text-foreground">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.camera} • {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Login Page Component
const LoginPage = ({ onLogin, theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@uchittechnology.com' && password === 'admin123') {
        onLogin();
      } else {
        setErrors({ general: 'Invalid credentials. Use admin@uchittechnology.com / admin123' });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md surveillance-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">UchitTech AI</CardTitle>
          <CardDescription>Advanced Surveillance Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 bg-destructive text-destructive-foreground rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                placeholder="admin@uchittechnology.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                placeholder="admin123"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activePage, setActivePage, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'live', name: 'Live View', icon: '📹' },
    { id: 'alerts', name: 'Alerts', icon: '🚨' },
  ];

  return (
    <div className="w-64 surveillance-card h-screen p-4 space-y-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground">AI Surveillance</h2>
        <p className="text-sm text-muted-foreground">Security System</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activePage === item.id 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="outline" onClick={onLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
};

// Main App Component
const SurveillanceApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [currentAlert, setCurrentAlert] = useState(null);
  const [theme, setTheme] = useState('dark');

  const showAlert = (alert) => {
    setCurrentAlert({ ...alert, closing: false });
  };

  const closeAlert = () => {
    setCurrentAlert(prev => prev ? { ...prev, closing: true } : null);
    setTimeout(() => setCurrentAlert(null), 300);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} theme={theme} toggleTheme={toggleTheme} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard showAlert={showAlert} />;
      case 'live':
        return <LiveView showAlert={showAlert} />;
      case 'alerts':
        return <AlertsPage />;
      default:
        return <Dashboard showAlert={showAlert} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        onLogout={() => setIsLoggedIn(false)}
      />
      <main className="flex-1 p-6">
        {renderPage()}
      </main>
      <AlertPopup alert={currentAlert} onClose={closeAlert} />
    </div>
  );
};

export default SurveillanceApp;