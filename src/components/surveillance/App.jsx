import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoginPage from './LoginPage.jsx';
import { mockStats, mockChartData, mockAlerts, mockCameras, generateCSVData } from './mockData.js';
import './App.css';

// Alert Popup Component
const AlertPopup = ({ alert, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!alert) return;

    try {
      const audio = new Audio('/new-notification-09-352705.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (e) {
      console.log('Audio not available:', e);
    }

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
      className={`alert-popup ${alert.type} ${alert.closing ? 'closing' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClose}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {alert.title}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            {alert.message}
          </div>
        </div>
        <div style={{ marginLeft: '15px', fontSize: '12px', opacity: 0.8 }}>
          {!isHovered && `${timeLeft}s`}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ showAlert }) => {
  const stats = [
    { label: 'Online Cameras', value: mockStats.dashboard.onlineCameras, color: '#28a745', suffix: '' },
    { label: "Today's Alerts", value: mockStats.dashboard.todayAlerts, color: '#dc3545', suffix: '' },
    { label: 'Active Recordings', value: mockStats.dashboard.activeRecordings, color: '#007bff', suffix: '' },
    { label: 'System Uptime', value: mockStats.dashboard.systemUptime, color: '#28a745', suffix: '%' },
    { label: 'Storage Used', value: mockStats.dashboard.usedStorage, color: '#ffc107', suffix: 'TB' },
    { label: 'Network Load', value: mockStats.dashboard.networkBandwidth, color: '#17a2b8', suffix: '%' },
    { label: 'Active Users', value: mockStats.dashboard.activeUsers, color: '#6f42c1', suffix: '' },
    { label: 'Total Storage', value: mockStats.dashboard.totalStorage, color: '#fd7e14', suffix: 'TB' }
  ];

  return (
    <div className="content-area">
      <div className="flex-between mb-30">
        <h1 style={{ fontSize: '32px', fontWeight: '700' }}>
          Surveillance Dashboard
        </h1>
        <div className="flex gap-15">
          <button 
            className="btn btn-success" 
            onClick={() => generateCSVData(mockChartData.alertTrends, 'dashboard_stats')}
          >
            Export Dashboard Data
          </button>
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-number" style={{ color: stat.color }}>
              {stat.value}{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 className="card-title">24-Hour Alert Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mockChartData.alertTrends}>
              <defs>
                <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc3545" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#dc3545" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="time" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--secondary-bg)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px' 
                }} 
              />
              <Area type="monotone" dataKey="alerts" stroke="#dc3545" fillOpacity={1} fill="url(#colorAlerts)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="card">
          <h3 className="card-title">Alert Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={mockChartData.alertDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockChartData.alertDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Weekly Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockChartData.weeklyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="day" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--secondary-bg)', 
                border: '1px solid var(--border-color)',
                borderRadius: '8px' 
              }} 
            />
            <Legend />
            <Bar dataKey="alerts" fill="#dc3545" name="Alerts" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cameras" fill="#28a745" name="Active Cameras" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="card-title">Real-time Activity Heatmap</h3>
        <div style={{ height: '300px', overflowY: 'auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(24, 1fr)', 
            gap: '2px',
            padding: '20px',
            minWidth: '800px'
          }}>
            {Array.from({ length: 168 }, (_, i) => {
              const hour = i % 24;
              const day = Math.floor(i / 24);
              const intensity = mockChartData.activityHeatmap[i % mockChartData.activityHeatmap.length] / 100;
              return (
                <div
                  key={i}
                  style={{
                    width: '25px',
                    height: '25px',
                    backgroundColor: `rgba(220, 53, 69, ${intensity})`,
                    borderRadius: '3px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  title={`${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]} ${hour}:00 - ${Math.floor(intensity * 100)}%`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Live View Component
const LiveView = ({ showAlert }) => {
  const [gridSize, setGridSize] = useState('2x2');
  const [cameraFilter, setCameraFilter] = useState('all');
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/alerts');
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 1000);
    return () => clearInterval(interval);
  }, []);

  const cameras = [
    { id: "thief", name: "Thief Intrusion", location: "Entrance", status: "online" },
    { id: "vest", name: "Vest Detection", location: "Warehouse", status: "online" },
    { id: "helmet", name: "Helmet Detection", location: "Construction Site", status: "online" },
  ];

  const gridOptions = {
    '2x2': { cols: 2, count: 4 },
    '3x3': { cols: 3, count: 9 },
    '4x4': { cols: 4, count: 16 },
    '5x5': { cols: 5, count: 25 }
  };

  const filteredCameras = cameras.filter(camera => {
    if (cameraFilter === 'online') return camera.status === 'online';
    if (cameraFilter === 'offline') return camera.status === 'offline';
    return true;
  }).slice(0, gridOptions[gridSize].count);

  return (
    <div className="content-area">
      <div className="flex-between mb-30">
        <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Live Camera View</h1>
        <div className="flex gap-15">
          <select 
            value={gridSize} 
            onChange={(e) => setGridSize(e.target.value)}
            className="form-input"
            style={{ width: 'auto' }}
          >
            <option value="2x2">2x2 Grid</option>
            <option value="3x3">3x3 Grid</option>
            <option value="4x4">4x4 Grid</option>
            <option value="5x5">5x5 Grid</option>
          </select>
          
          <select 
            value={cameraFilter} 
            onChange={(e) => setCameraFilter(e.target.value)}
            className="form-input"
            style={{ width: 'auto' }}
          >
            <option value="all">All Cameras</option>
            <option value="online">Online Only</option>
            <option value="offline">Offline Only</option>
          </select>
        </div>
      </div>

      <div 
        className="camera-grid"
        style={{ 
          gridTemplateColumns: `repeat(${gridOptions[gridSize].cols}, 1fr)`,
          gap: '15px'
        }}
      >
        {filteredCameras.map(camera => (
          <div key={camera.id} className="camera-card">
            <div className="camera-preview">
              <img 
                src={`http://localhost:8000/api/video/${camera.id}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://i.imgur.com/eB6B6b7.png"; }}
              />
              <div className={`camera-status ${camera.status}`}></div>
              {alerts[camera.id] && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  background: '#dc3545',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  ALERT
                </div>
              )}
            </div>
            <div className="camera-info">
              <div>{camera.name}</div>
              <div>Status: <strong style={{ color: camera.status === 'online' ? '#28a745' : '#dc3545' }}>
                {camera.status.toUpperCase()}
              </strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Alerts Component
const Alerts = ({ showAlert }) => {
  const [alertFilter, setAlertFilter] = useState('all');
  
  const filteredAlerts = mockAlerts.filter(alert => {
    if (alertFilter === 'critical') return alert.severity === 'critical';
    if (alertFilter === 'warning') return alert.severity === 'warning';
    if (alertFilter === 'info') return alert.severity === 'info';
    return true;
  });

  const handleTriggerAlert = () => {
    showAlert({
      type: 'warning',
      title: 'Manual Alert Triggered',
      message: 'Security personnel has been notified of the situation.'
    });
  };

  return (
    <div className="content-area">
      <div className="flex-between mb-30">
        <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Security Alerts</h1>
        <div className="flex gap-15">
          <select 
            value={alertFilter} 
            onChange={(e) => setAlertFilter(e.target.value)}
            className="form-input"
            style={{ width: 'auto' }}
          >
            <option value="all">All Alerts</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <button className="btn btn-danger" onClick={handleTriggerAlert}>
            Trigger Manual Alert
          </button>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Camera</th>
              <th>Alert Type</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map(alert => (
              <tr key={alert.id}>
                <td>{alert.timestamp.split(' ')[1]}</td>
                <td>{alert.camera}</td>
                <td>{alert.type}</td>
                <td>{alert.location}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: alert.severity === 'critical' ? '#dc3545' : 
                               alert.severity === 'warning' ? '#ffc107' : '#17a2b8',
                    color: alert.severity === 'warning' ? '#000' : '#fff'
                  }}>
                    {alert.severity.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const showAlert = (newAlert) => {
    setAlert({ ...newAlert, closing: false });
    setTimeout(() => {
      setAlert(currentAlert => currentAlert ? { ...currentAlert, closing: true } : null);
    }, 4500);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const closeAlert = () => {
    setAlert(currentAlert => currentAlert ? { ...currentAlert, closing: true } : null);
    setTimeout(() => {
      setAlert(null);
    }, 500);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  const Layout = ({ children }) => (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">UchitTech</div>
        <div className="nav-menu">
          {['Dashboard', 'Live View', 'Alerts'].map(tab => (
            <div 
              key={tab}
              className={`nav-item ${activeTab.toLowerCase() === tab.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-role">System Administrator</div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className="toggle-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              {theme === 'light' ? (
                <>
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.44 5.34a.75.75 0 011.06 0l1.59 1.59a.75.75 0 01-1.06 1.06L7.44 6.4a.75.75 0 010-1.06zm9.81 0a.75.75 0 010 1.06l-1.59 1.59a.75.75 0 01-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zM12 7a5 5 0 100 10 5 5 0 000-10zM12 8.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM17.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zM4.5 12a.75.75 0 01.75-.75H3a.75.75 0 010 1.5h2.25a.75.75 0 01-.75-.75zM17.44 18.66a.75.75 0 01-1.06 0l-1.59-1.59a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 010 1.06zm-9.81 0a.75.75 0 010-1.06l1.59-1.59a.75.75 0 011.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM12 20.25a.75.75 0 01-.75.75v2.25a.75.75 0 011.5 0v-2.25a.75.75 0 01-.75-.75z" />
                </>
              ) : (
                <>
                  <path fillRule="evenodd" d="M9.548 2.25C9.761 2.25 10 2.247 10.231 2.246a.75.75 0 01.769.75v1.282a.75.75 0 01-.769.746c-.235-.001-.482-.004-.74-.004-.646 0-1.298.026-1.928.077a.75.75 0 01-.84-.84c.15-.466.299-.93.447-1.393a.75.75 0 01.91-.416zm-5.772 4.148a.75.75 0 01.996-.543l1.583.527a.75.75 0 01-.499 1.442L4.273 8.35a.75.75 0 01-.543-.996zM15.485 5.39a.75.75 0 01.71-.531l1.603.266a.75.75 0 01.44 1.391l-1.603-.266a.75.75 0 01-.44-1.39zm3.504 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V9.89a.75.75 0 01.75-.75zm-1.897 4.545a.75.75 0 01.499-1.442l1.583-.527a.75.75 0 01.543.996l-1.583.527a.75.75 0 01-.542-.996zM12 17.25a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM17.485 18.66a.75.75 0 01-1.06-1.06l1.59-1.59a.75.75 0 011.06 1.06l-1.59 1.59zM8.35 17.727a.75.75 0 01-.996.543l-1.583-.527a.75.75 0 01.499-1.442l1.583.527a.75.75 0 01.543.996zM4.5 13.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5-7.5-3.358-7.5-7.5 3.358-7.5 7.5-7.5zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </>
              )}
            </svg>
          </div>
          <div className="toggle-text">
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </div>
        </div>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="*" element={
          isLoggedIn ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard showAlert={showAlert} />} />
                <Route path="/live-view" element={<LiveView showAlert={showAlert} />} />
                <Route path="/alerts" element={<Alerts showAlert={showAlert} />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
      <AlertPopup alert={alert} onClose={closeAlert} />
    </Router>
  );
};

export default App;