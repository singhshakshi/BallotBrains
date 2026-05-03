import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    setError('');
    const success = await login(credentialResponse.credential);
    if (success) {
      navigate('/');
    } else {
      setError('AUTHENTICATION FAILED — RETRY TRANSMISSION — STOP');
    }
  };

  const handleError = () => {
    setError('AUTHENTICATION FAILED — RETRY TRANSMISSION — STOP');
  };

  return (
    <div className="page-wrapper py-12 flex items-center justify-center min-h-[70vh]">
      <div className="paper-card-lined max-w-md w-full p-8 text-center relative">
        <div className="airmail-border absolute top-0 left-0 right-0 h-2"></div>
        <div className="vintage-divider mb-6"></div>
        
        <h2 className="font-playfair text-3xl font-bold mb-2" style={{ color: '#1A1008' }}>
          IDENTIFICATION REQUIRED
        </h2>
        <p className="font-baskerville italic mb-8" style={{ color: '#3D2B1F' }}>
          Please present your credentials to the telegraph operator to access BalletBrains.
        </p>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
          />
        </div>

        {error && (
          <div className="telegram-card p-4 mt-6">
            <p className="font-elite text-sm m-0" style={{ color: '#B33A3A' }}>
              {error}
            </p>
          </div>
        )}

        <div className="vintage-divider mt-8"></div>
        <div className="absolute bottom-4 right-4 rubber-stamp" style={{ transform: 'rotate(-10deg)', opacity: 0.5 }}>
          RESTRICTED
        </div>
      </div>
    </div>
  );
}
