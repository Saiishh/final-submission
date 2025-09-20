import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Shield, Video, AlertTriangle, Activity, Settings, Bell, 
  Users, FileText, Network, Info, LogOut, Monitor, Eye, 
  BarChart3, Home, Calendar, Clock, CheckCircle, XCircle,
  Wifi, Play, Pause, Volume2, VolumeX, RotateCcw, Maximize,
  Filter, Search, Plus, Download, Upload, Moon, Sun
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Login Page Component
const LoginPage = ({ onLogin, theme, toggleTheme }: { 
  onLogin: (credentials: any) => void;
  theme: string;
  toggleTheme: () => void;
}) => {
  const [email, setEmail] = useState('admin@uchittechnology.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@uchittechnology.com' && password === 'admin123') {
        onLogin({ email, rememberMe });
      } else {
        setErrors({ email: 'Invalid credentials' });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen login-background tech-grid flex items-center justify-center p-4">
      {/* Animated tech elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/30 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-primary/20 rounded-lg animate-pulse-soft delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 border border-primary/40 rotate-45 animate-pulse-soft delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-primary/10 rounded-full animate-pulse-soft delay-500"></div>
      </div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl animate-scale-in">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            UchitTech AI
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Advanced Surveillance Management System
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'border-error' : ''}
                placeholder="admin@uchittechnology.com"
              />
              {errors.email && <p className="text-sm text-error">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-error' : ''}
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-error">{errors.password}</p>}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Email: admin@uchittechnology.com</p>
            <p>Password: admin123</p>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center text-xs text-muted-foreground">
            <p>© 2024 UchitTech AI. All rights reserved.</p>
            <p>Professional Surveillance Solutions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ showAlert }: { showAlert: (alert: any) => void }) => {
  const statsData = [
    { title: "Online Cameras", value: "24", color: "text-success", icon: Monitor },
    { title: "Today's Alerts", value: "47", color: "text-error", icon: AlertTriangle },
    { title: "Active Recordings", value: "18", color: "text-info", icon: Video },
    { title: "System Uptime", value: "99.9%", color: "text-success", icon: Activity },
    { title: "Storage Used", value: "1.8TB", color: "text-warning", icon: FileText },
    { title: "Network Load", value: "85.3%", color: "text-info", icon: Network },
    { title: "Active Users", value: "12", color: "text-info", icon: Users },
    { title: "Total Storage", value: "2.4TB", color: "text-warning", icon: FileText },
  ];

  const alertTrendsData = [
    { time: '00:00', alerts: 5 },
    { time: '02:00', alerts: 8 },
    { time: '04:00', alerts: 12 },
    { time: '06:00', alerts: 15 },
    { time: '08:00', alerts: 22 },
    { time: '10:00', alerts: 18 },
    { time: '12:00', alerts: 25 },
    { time: '14:00', alerts: 28 },
    { time: '16:00', alerts: 24 },
    { time: '18:00', alerts: 19 },
    { time: '20:00', alerts: 16 },
    { time: '22:00', alerts: 11 },
  ];

  const alertDistributionData = [
    { name: 'Motion Detection', value: 39, color: '#3b82f6' },
    { name: 'Face Recognition', value: 24, color: '#10b981' },
    { name: 'Object Detection', value: 9, color: '#06b6d4' },
    { name: 'Unauthorized Access', value: 18, color: '#ef4444' },
    { name: 'Loitering', value: 6, color: '#8b5cf6' },
    { name: 'Abandoned Object', value: 3, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Surveillance Dashboard</h1>
        <Button className="bg-success hover:bg-success/90">
          <Download className="w-4 h-4 mr-2" />
          Export Dashboard Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="stat-card hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br from-${stat.color.replace('text-', '')}/20 to-${stat.color.replace('text-', '')}/10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-${stat.color.replace('text-', '')} to-${stat.color.replace('text-', '')}/80 transition-all duration-1000`}
                  style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>24-Hour Alert Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={alertTrendsData}>
                <defs>
                  <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="alerts"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#alertGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Alert Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alertDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {alertDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Live View Component with backend integration
const LiveView = ({ showAlert }: { showAlert: (alert: any) => void }) => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState({ person: false, helmet: false, vest: false });
  const [lastAlertTime, setLastAlertTime] = useState({ person: 0, helmet: 0, vest: 0 });

  // Camera data with backend video streams
  const cameras = [
    {
      id: 1,
      name: "Person Detection Camera",
      location: "Main Entrance",
      status: "online",
      stream: "http://localhost:8000/api/video/person",
      alertType: "person"
    },
    {
      id: 2,
      name: "Helmet Detection Camera", 
      location: "Construction Zone",
      status: "online",
      stream: "http://localhost:8000/api/video/helmet",
      alertType: "helmet"
    },
    {
      id: 3,
      name: "Safety Vest Camera",
      location: "Warehouse",
      status: "online", 
      stream: "http://localhost:8000/api/video/vest",
      alertType: "vest"
    },
    {
      id: 4,
      name: "Security Camera 4",
      location: "Storage Room",
      status: "offline",
      stream: null,
      alertType: null
    }
  ];

  // Poll alerts from backend
  useEffect(() => {
    const pollAlerts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/alerts');
        if (response.ok) {
          const data = await response.json();
          const newAlerts = data.alerts;
          
          // Check for new alerts and play sound
          Object.keys(newAlerts).forEach((alertType: string) => {
            if (newAlerts[alertType] && !alerts[alertType as keyof typeof alerts]) {
              const now = Date.now();
              const lastAlert = lastAlertTime[alertType as keyof typeof lastAlertTime];
              
              // Cooldown period of 5 seconds
              if (now - lastAlert > 5000) {
                // Play alert sound
                const audio = new Audio('/new-notification-09-352705.mp3');
                audio.play().catch(e => console.log('Audio play failed:', e));
                
                // Show toast notification
                toast({
                  title: `${alertType.charAt(0).toUpperCase() + alertType.slice(1)} Alert!`,
                  description: `Detection triggered in ${alertType} monitoring area`,
                  variant: "destructive",
                });
                
                // Show alert popup
                showAlert({
                  type: alertType,
                  message: `${alertType.charAt(0).toUpperCase() + alertType.slice(1)} detection alert triggered!`,
                  timestamp: new Date().toISOString()
                });
                
                setLastAlertTime(prev => ({
                  ...prev,
                  [alertType]: now
                }));
              }
            }
          });
          
          setAlerts(newAlerts);
        }
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      }
    };

    const interval = setInterval(pollAlerts, 1000);
    return () => clearInterval(interval);
  }, [alerts, lastAlertTime, showAlert, toast]);

  const performanceData = [
    { name: 'Cam 1', fps: 45 },
    { name: 'Cam 2', fps: 30 },
    { name: 'Cam 3', fps: 67 },
    { name: 'Cam 4', fps: 23 },
    { name: 'Cam 5', fps: 55 },
    { name: 'Cam 6', fps: 41 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Live Camera View</h1>
        <div className="flex items-center space-x-4">
          <Select defaultValue="2x2">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1x1">1x1 Grid</SelectItem>
              <SelectItem value="2x2">2x2 Grid</SelectItem>
              <SelectItem value="3x3">3x3 Grid</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cameras</SelectItem>
              <SelectItem value="online">Online Only</SelectItem>
              <SelectItem value="offline">Offline Only</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-success hover:bg-success/90">
            <Download className="w-4 h-4 mr-2" />
            Export Camera Data
          </Button>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>Camera Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fps" fill="hsl(var(--error))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>Network Health</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
              </div>
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="hsl(var(--success))"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.87)}`}
                  className="transition-all duration-1000"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">23.5%</span>
              </div>
              <Progress value={23.5} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Memory</span>
                <span className="text-sm font-medium">67.8%</span>
              </div>
              <Progress value={67.8} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="camera-feed">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{camera.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  {camera.alertType && alerts[camera.alertType as keyof typeof alerts] && (
                    <Badge className="alert-badge error animate-pulse">
                      Alert Active
                    </Badge>
                  )}
                  <Badge className={`alert-badge ${camera.status === 'online' ? 'success' : 'error'}`}>
                    {camera.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{camera.location}</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-black relative overflow-hidden">
                {camera.status === 'online' && camera.stream ? (
                  <img 
                    src={camera.stream}
                    alt={`${camera.name} feed`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for when backend is not running
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex items-center justify-center h-full text-muted-foreground">
                            <div class="text-center">
                              <Video class="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <p>Backend not running</p>
                              <p class="text-xs">Start backend to view live feed</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <XCircle className="w-12 h-12 mx-auto mb-2" />
                      <p>Camera Offline</p>
                    </div>
                  </div>
                )}
                
                {/* Camera controls overlay */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-success animate-pulse' : 'bg-error'}`}></div>
                      <span className="text-white text-xs">Recording: Active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-white/80 hover:text-white">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-white/80 hover:text-white">
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-white/80 hover:text-white">
                        <Maximize className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Alerts Component
const Alerts = ({ showAlert }: { showAlert: (alert: any) => void }) => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const recentAlerts = [
    {
      time: '14:30:25',
      camera: 'Camera 3',
      type: 'Motion Detected',
      location: 'Front Gate',
      severity: 'WARNING',
      message: 'Unauthorized movement detected in restricted area'
    },
    {
      time: '14:28:15',
      camera: 'Camera 7',
      type: 'Unauthorized Access',
      location: 'Storage Room',
      severity: 'ERROR',
      message: 'Person detected in restricted storage area'
    },
    {
      time: '14:25:40',
      camera: 'Camera 1',
      type: 'Face Recognition',
      location: 'Main Hall',
      severity: 'INFO',
      message: 'Known person identified - John Doe'
    },
    {
      time: '14:20:10',
      camera: 'Camera 5',
      type: 'Loitering Detected',
      location: 'Parking Lot',
      severity: 'WARNING',
      message: 'Person loitering in parking area for extended period'
    },
    {
      time: '14:15:33',
      camera: 'Camera 2',
      type: 'Object Left Behind',
      location: 'Front Gate',
      severity: 'ERROR',
      message: 'Suspicious object detected and left unattended'
    },
    {
      time: '10:00:00',
      camera: 'Camera 1',
      type: 'Fire Detected',
      location: 'Main Hall - Near Camera 1',
      severity: 'CRITICAL',
      message: 'Fire detection system triggered - immediate response required'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'alert-badge error';
      case 'ERROR': return 'alert-badge error';
      case 'WARNING': return 'alert-badge warning';
      case 'INFO': return 'alert-badge info';
      default: return 'alert-badge info';
    }
  };

  const handleTriggerAlert = () => {
    showAlert({
      type: 'manual',
      message: 'Manual security alert triggered by operator',
      timestamp: new Date().toISOString()
    });
  };

  const filteredAlerts = selectedSeverity === 'all' 
    ? recentAlerts 
    : recentAlerts.filter(alert => alert.severity === selectedSeverity);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Security Alerts</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
              <SelectItem value="ERROR">Error</SelectItem>
              <SelectItem value="WARNING">Warning</SelectItem>
              <SelectItem value="INFO">Info</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleTriggerAlert}
            className="bg-error hover:bg-error/90"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Trigger Manual Alert
          </Button>
        </div>
      </div>

      <Card className="surveillance-card">
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>
            Real-time security alerts and system notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Camera</TableHead>
                <TableHead>Alert Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{alert.time}</TableCell>
                  <TableCell>{alert.camera}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.location}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Analytics Page
const Analytics = () => {
  const alertFrequencyData = [
    { name: 'Cam 1', alerts: 45 },
    { name: 'Cam 2', alerts: 32 },
    { name: 'Cam 3', alerts: 67 },
    { name: 'Cam 4', alerts: 23 },
    { name: 'Cam 5', alerts: 54 },
    { name: 'Cam 6', alerts: 41 },
  ];

  const weeklyTrendsData = [
    { day: 'Monday', alerts: 156 },
    { day: 'Tuesday', alerts: 132 },
    { day: 'Wednesday', alerts: 178 },
    { day: 'Thursday', alerts: 143 },
    { day: 'Friday', alerts: 189 },
    { day: 'Saturday', alerts: 98 },
    { day: 'Sunday', alerts: 87 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics & Intelligence</h1>
        <Button className="bg-success hover:bg-success/90">
          <Download className="w-4 h-4 mr-2" />
          Export Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>Alert Frequency by Camera</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="hsl(var(--error))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>Weekly Alert Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alerts" stroke="hsl(var(--error))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Reports Page
const Reports = () => {
  const recentReports = [
    {
      name: 'Daily Security Summary - January 15, 2024',
      type: 'Daily Summary',
      date: '2024-01-15',
      size: '2.4 MB',
      alerts: 47,
      incidents: 3,
      cameras: 24
    },
    {
      name: 'Weekly Analysis Report - Week 2',
      type: 'Weekly Analysis',
      date: '2024-01-14',
      size: '5.8 MB',
      alerts: 298,
      incidents: 12,
      cameras: 24
    },
    {
      name: 'Incident Report - Unauthorized Access',
      type: 'Incident Report',
      date: '2024-01-13',
      size: '1.2 MB',
      alerts: 5,
      incidents: 1,
      cameras: 3
    },
    {
      name: 'Monthly Overview - December 2023',
      type: 'Monthly Overview',
      date: '2024-01-01',
      size: '12.4 MB',
      alerts: 1245,
      incidents: 28,
      cameras: 24
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Logs</h1>
        <div className="flex space-x-2">
          <Button className="bg-success hover:bg-success/90">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-error hover:bg-error/90">
            <Upload className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="surveillance-card">
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <Select defaultValue="incident">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incident">Incident Report</SelectItem>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Analysis</SelectItem>
                  <SelectItem value="monthly">Monthly Overview</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Date Range</Label>
              <Input type="date" placeholder="dd-mm-yyyy" />
            </div>
            
            <div>
              <Label>Camera Selection</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cameras</SelectItem>
                  <SelectItem value="cam1">Camera 1</SelectItem>
                  <SelectItem value="cam2">Camera 2</SelectItem>
                  <SelectItem value="cam3">Camera 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 surveillance-card">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • Generated by System
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Size: {report.size} | Alerts: {report.alerts} | Incidents: {report.incidents} | Cameras: {report.cameras}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activePage, setActivePage, onLogout }: { 
  activePage: string; 
  setActivePage: (page: string) => void;
  onLogout: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'live-view', label: 'Live View', icon: Video, path: '/live-view' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, path: '/alerts' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'reports', label: 'Reports', icon: FileText, path: '/reports' },
    { id: 'network', label: 'Network Management', icon: Network, path: '/network' },
    { id: 'system-info', label: 'Client System Info', icon: Monitor, path: '/system-info' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
    { id: 'manual', label: 'User Manual', icon: Info, path: '/manual' },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    setActivePage(item.id);
    navigate(item.path);
  };

  return (
    <div className="surveillance-sidebar w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-muted">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sidebar-accent to-primary rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-accent">UchitTech AI</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`surveillance-nav-item w-full ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-muted">
        <button
          onClick={onLogout}
          className="surveillance-nav-item w-full text-error hover:bg-error/10"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Alert Popup Component
const AlertPopup = ({ alert, onClose }: { alert: any; onClose: () => void }) => {
  const [countdown, setCountdown] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!alert || isPaused) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [alert, onClose, isPaused]);

  useEffect(() => {
    if (alert) {
      setCountdown(5);
    }
  }, [alert]);

  if (!alert) return null;

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'person': return 'border-error bg-error/10';
      case 'helmet': return 'border-warning bg-warning/10';
      case 'vest': return 'border-warning bg-warning/10';
      default: return 'border-error bg-error/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'person': return <Users className="h-6 w-6 text-error" />;
      case 'helmet': return <Shield className="h-6 w-6 text-warning" />;
      case 'vest': return <Shield className="h-6 w-6 text-warning" />;
      default: return <AlertTriangle className="h-6 w-6 text-error" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <Card className={`w-96 border-2 ${getAlertColor(alert.type)} shadow-lg`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getAlertIcon(alert.type)}
              <div>
                <CardTitle className="text-lg">Security Alert</CardTitle>
                <CardDescription className="text-sm capitalize">
                  {alert.type} Detection System
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">{alert.message}</p>
          <div className="flex items-center justify-between">
            <div 
              className="text-xs text-muted-foreground cursor-pointer"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              Auto-dismiss in {countdown}s {isPaused && '(paused)'}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(alert.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const SurveillanceApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [alert, setAlert] = useState<any>(null);
  const [theme, setTheme] = useState('light');

  const handleLogin = (credentials: any) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('dashboard');
  };

  const showAlert = (alertData: any) => {
    setAlert(alertData);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Layout component for main app
  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard showAlert={showAlert} />
          </Layout>
        } />
        <Route path="/live-view" element={
          <Layout>
            <LiveView showAlert={showAlert} />
          </Layout>
        } />
        <Route path="/alerts" element={
          <Layout>
            <Alerts showAlert={showAlert} />
          </Layout>
        } />
        <Route path="/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />
        <Route path="/reports" element={
          <Layout>
            <Reports />
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Page Under Construction</h2>
                <p className="text-muted-foreground">This feature is coming soon.</p>
              </div>
            </div>
          </Layout>
        } />
      </Routes>
      <AlertPopup alert={alert} onClose={closeAlert} />
    </>
  );
};

export default SurveillanceApp;