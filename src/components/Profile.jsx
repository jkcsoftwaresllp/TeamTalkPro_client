import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Form.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ username: user?.username, avatar: user?.avatar });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const res = await axios.put('/api/auth/profile', form, { withCredentials: true });
      setUser(res.data);
      setEdit(false);
    } catch (err) {
      alert('Update failed');
    }
  };

  if (!user) return <p>Please log in</p>;

  return (
    <div className="form-container">
      <h2>Profile</h2>
      {edit ? (
        <>
          <input name="username" value={form.username} onChange={handleChange} />
          <input name="avatar" value={form.avatar || ''} onChange={handleChange} placeholder="Avatar URL" />
          <button onClick={saveChanges}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          {user.avatar && <img src={user.avatar} alt="avatar" width="100" />}
          <button onClick={() => setEdit(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Profile;