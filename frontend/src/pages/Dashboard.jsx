import React from 'react';
import { Users, AlertTriangle, Shield, MapPin, TrendingUp, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const sosData = [
    { time: '00:00', count: 2 },
    { time: '04:00', count: 1 },
    { time: '08:00', count: 5 },
    { time: '12:00', count: 8 },
    { time: '16:00', count: 12 },
    { time: '20:00', count: 7 },
    { time: '23:59', count: 3 }
  ];

  const riskZoneData = [
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Medium Risk', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#EF4444' }
  ];

  const liveAlerts = [
    { id: 1, type: 'SOS', location: 'Times Square, NYC', time: '2 min ago', severity: 'high' },
    { id: 2, type: 'Geo-fence', location: 'Central Park', time: '5 min ago', severity: 'medium' },
    { id: 3, type: 'Weather', location: 'Brooklyn Bridge', time: '8 min ago', severity: 'low' },
    { id: 4, type: 'Crime Alert', location: 'Wall Street', time: '12 min ago', severity: 'high' }
  ];

  const StatCard = ({ icon, title, value, change, color }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:bg-gray-900/70 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '+' : ''}{change}% from yesterday
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {React.createElement(icon, { className: "h-8 w-8 text-white" })}
        </div>
      </div>
    </div>
  );

  const backgroundImageUrl = 'https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=';

  return (
    <div
      className="relative font-sans min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Safety Dashboard</h1>
            <p className="text-gray-200">Real-time monitoring and analytics for tourist safety</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Active Tourists"
              value="12,847"
              change={5.2}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
            />
            <StatCard
              icon={AlertTriangle}
              title="Open Alerts"
              value="23"
              change={-12.3}
              color="bg-gradient-to-r from-red-500 to-red-600"
            />
            <StatCard
              icon={Shield}
              title="Safe Zones"
              value="156"
              change={2.1}
              color="bg-gradient-to-r from-green-500 to-green-600"
            />
            <StatCard
              icon={MapPin}
              title="High-Risk Zones"
              value="8"
              change={-5.8}
              color="bg-gradient-to-r from-orange-500 to-orange-600"
            />
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* SOS Triggers Chart */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">SOS Triggers Overtime</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sosData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#60A5FA" 
                  strokeWidth={3}
                  dot={{ fill: '#60A5FA' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Zone Distribution */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Risk Zone Distribution</h2>
            <div className="flex items-center justify-between">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={riskZoneData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {riskZoneData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F3F4F6'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 pl-6">
                {riskZoneData.map((item, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-gray-300">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Heat Map and Tourist Clusters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Heat Map - High Risk Zones</h2>
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-8 text-center">
              <MapPin className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <p className="text-white font-medium">Interactive Heat Map</p>
              <p className="text-sm text-gray-300 mt-2">
                Real-time visualization of risk levels across different areas
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-green-400/20 backdrop-blur-sm border border-green-400/30 rounded p-2 text-xs text-green-300">Low Risk</div>
                <div className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded p-2 text-xs text-yellow-300">Medium Risk</div>
                <div className="bg-red-400/20 backdrop-blur-sm border border-red-400/30 rounded p-2 text-xs text-red-300">High Risk</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Tourist Clusters</h2>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-8 text-center">
              <Users className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <p className="text-white font-medium">Real-time Visualization</p>
              <p className="text-sm text-gray-300 mt-2">
                Live tracking of tourist concentrations and movement patterns
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-3">
                  <div className="font-semibold text-blue-400">Times Square</div>
                  <div className="text-gray-300">2,847 tourists</div>
                </div>
                <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-3">
                  <div className="font-semibold text-purple-400">Central Park</div>
                  <div className="text-gray-300">1,256 tourists</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Alerts */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Live Alerts</h2>
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Generate E-FIR
            </button>
          </div>
          <div className="space-y-4">
            {liveAlerts.map((alert) => (
              <div key={alert.id} className="border border-white/20 rounded-xl p-4 hover:bg-black/20 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-400' : 
                      alert.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-white">{alert.type}</div>
                      <div className="text-sm text-gray-300">{alert.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{alert.time}</div>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;