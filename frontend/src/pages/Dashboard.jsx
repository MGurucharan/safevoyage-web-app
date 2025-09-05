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
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring and analytics for tourist safety</p>
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
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">SOS Triggers Overtime</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Zone Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Risk Zone Distribution</h2>
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
                    <Tooltip />
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
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Heat Map and Tourist Clusters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Heat Map - High Risk Zones</h2>
            <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl p-8 text-center">
              <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">Interactive Heat Map</p>
              <p className="text-sm text-gray-600 mt-2">
                Real-time visualization of risk levels across different areas
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-green-200 rounded p-2 text-xs">Low Risk</div>
                <div className="bg-yellow-200 rounded p-2 text-xs">Medium Risk</div>
                <div className="bg-red-200 rounded p-2 text-xs">High Risk</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tourist Clusters</h2>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 text-center">
              <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">Real-time Visualization</p>
              <p className="text-sm text-gray-600 mt-2">
                Live tracking of tourist concentrations and movement patterns
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="font-semibold text-blue-600">Times Square</div>
                  <div className="text-gray-600">2,847 tourists</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="font-semibold text-purple-600">Central Park</div>
                  <div className="text-gray-600">1,256 tourists</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Live Alerts</h2>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Generate E-FIR
            </button>
          </div>
          <div className="space-y-4">
            {liveAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-500' : 
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-gray-900">{alert.type}</div>
                      <div className="text-sm text-gray-600">{alert.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{alert.time}</div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
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
  );
};

export default Dashboard;