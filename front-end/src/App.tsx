import { useState, ReactNode } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Toaster } from 'react-hot-toast';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {
  TransactionsPage,
  DashboardPage,
  AccountsPage,
  LoginPage,
} from './presentation/pages';

import './styles/index.css';
import { TooltipProvider } from './presentation/components/ui/tooltip';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PrivateRoute } from './presentation/routes/PrivateRoute';
import { SidebarProvider } from './contexts';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? <Navigate to='/dashboard' /> : <LoginPage />
          }
        />

        {/* Rotas Privadas */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          <Route path='/accounts' element={<AccountsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <TooltipProvider>
          <Toaster position='top-right' reverseOrder={false} />
          <AppRoutes />
        </TooltipProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
