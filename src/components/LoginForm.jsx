import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Form.css';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { fetchUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', form, { withCredentials: true });
      await fetchUser();
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;