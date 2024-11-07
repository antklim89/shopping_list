import { StrictMode } from 'react';
import './index.css';
import { domAnimation, LazyMotion } from 'framer-motion';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';


const root = document.getElementById('root');
if (root == null) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <LazyMotion strict features={domAnimation}>
      <App />
    </LazyMotion>
  </StrictMode>,
);
