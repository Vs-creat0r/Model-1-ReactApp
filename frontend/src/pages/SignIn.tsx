.import { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const verifyDb = async (emailToVerify: string) => {
    try {
      const verifyResponse = await axios.get('/api/auth/verify', {
        params: { email: emailToVerify }
      });
      return verifyResponse.data;
    } catch (err: any) {
      console.error('Verify DB error:', err);
      return {
        success: false,
        stored: false,
        message: 'Error verifying storage in MongoDB.'
      };
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password
      });

      if (response.data.success) {
        const verify = await verifyDb(response.data.user.email);

        if (verify.success && verify.stored) {
          setSuccess('Sign in successful! Data sent to MongoDB and verified.');
        } else {
          setError('Sign in successful, but data was not verified in MongoDB.');
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setEmail('');
        setPassword('');
        
        console.log('User signed in:', response.data.user);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during sign in';
      setError(errorMessage);
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const name = prompt('Enter your name:');
      if (!name) {
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      });

      if (response.data.success) {
        const verify = await verifyDb(response.data.user.email);

        if (verify.success && verify.stored) {
          setSuccess('Account created successfully and MongoDB storage verified.');
        } else {
          setError('Account created, but data was not verified in MongoDB.');
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setEmail('');
        setPassword('');
        
        console.log('User created:', response.data.user);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during sign up';
      setError(errorMessage);
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container flex-center">
      <div className="signin-card">
        <h2>Sign In</h2>
        
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
        
        <form onSubmit={handleSignIn}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Log In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Don't have an account?</p>
          <button 
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
