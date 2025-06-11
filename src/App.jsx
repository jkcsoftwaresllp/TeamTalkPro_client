
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div style={{ textAlign: 'center' }}>
        <h1>TeamTalkPro</h1>
        <RegisterForm />
        <LoginForm />
        <Profile />
      </div>
    </AuthProvider>
  );
}

export default App;
