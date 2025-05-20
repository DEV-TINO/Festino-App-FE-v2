import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { baseApi } from './utils/api';

const initializeApp = async () => {
  try {
    const response = await baseApi.post('/main/auth/init');

    console.log('Auth init success:', response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Auth init failed: ${error.message}`);
    } else {
      alert('An unknown error occurred during auth init');
    }
  }

  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
};

initializeApp();
