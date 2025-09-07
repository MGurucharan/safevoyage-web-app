import { useNavigate } from 'react-router-dom';

const AdminDigitalID = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Admin Digital ID Options</h1>
      <div className="space-x-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate('/digital-id')}
        >
          Issue ID
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
          onClick={() => alert('Verification functionality here')}
        >
          Verification
        </button>
      </div>
    </div>
  );
};

export default AdminDigitalID;