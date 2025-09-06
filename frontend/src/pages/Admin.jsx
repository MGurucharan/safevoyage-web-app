import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import Dashboard from './Dashboard';
import Alert from './Alert';

const Admin = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login', { state: { from: '/admin' } });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Dashboard</h2>
          <Dashboard />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Alerts</h2>
          <Alert />
        </div>
      </div>
    </div>
  );
};

export default Admin;
