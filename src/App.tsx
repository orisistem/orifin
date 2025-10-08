import { useState, ReactNode } from 'react';
import { invoke } from '@tauri-apps/api/core';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RegisterExpense } from './pages';

import './styles/index.css';
import { TooltipProvider } from './components/';
import { SidebarProvider } from './contexts';

function App() {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<RegisterExpense />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default App;
