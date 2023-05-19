import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CartContextProvider from './CartContext/CartContextProvider';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from './AuthContext/AuthProvider';
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnMount: false ,
      refetchOnWindowFocus :false
    }
  }
}) ;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        
        <BrowserRouter>
          <AuthProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
          </AuthProvider>
        </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </React.StrictMode>
);
