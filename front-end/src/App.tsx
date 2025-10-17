import { useState, ReactNode } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Toaster } from 'react-hot-toast';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  TransactionsPage,
  DashboardPage,
  AccountsPage,
} from './presentation/pages';

import './styles/index.css';
import { TooltipProvider } from './presentation/components';
import { SidebarProvider } from './contexts';

function App() {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <Toaster position='top-right' reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/transactions' element={<TransactionsPage />} />
            <Route path='/accounts' element={<AccountsPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default App;
