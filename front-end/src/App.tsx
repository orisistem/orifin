import { useState, ReactNode } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Toaster } from 'react-hot-toast';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterExpense } from './pages';
import { TransactionsPage } from './presentation/pages';

import './styles/index.css';
import { TooltipProvider } from './components/';
import { SidebarProvider } from './contexts';

function App() {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <Toaster position='top-right' reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<RegisterExpense />} />
            <Route
              path='/transactions/adicionar'
              element={<TransactionsPage />}
            />
            {/* <Route path='/' element={<TransactionsPage />} /> */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default App;
