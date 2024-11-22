import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.js';

const queryClient = new QueryClient(); // Initialize QueryClient

// Create a root using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
