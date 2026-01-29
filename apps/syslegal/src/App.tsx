import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, NotificationProvider, DataProvider, ThemeProvider } from '@cbp/core';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { AppHeader } from './components/AppHeader';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CaseManagement } from './pages/CaseManagement';
import { CaseDetail } from './pages/CaseDetail';
import { BookingManagement } from './pages/BookingManagement';
import { ClientDatabase } from './pages/ClientDatabase';
import { Documents } from './pages/Documents';
import { Schedule } from './pages/Schedule';
import { Finance } from './pages/Finance';
import { LegalAssistant } from './pages/LegalAssistant';
import { ClientCases } from './pages/ClientCases';
import { ClientInvoices } from './pages/ClientInvoices';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        <AppHeader />
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/app" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="cases" element={<CaseManagement />} />
                  <Route path="cases/:id" element={<CaseDetail />} />
                  <Route path="bookings" element={<BookingManagement />} />
                  <Route path="clients" element={<ClientDatabase />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="finance" element={<Finance />} />
                  <Route path="my-cases" element={<ClientCases />} />
                  <Route path="my-invoices" element={<ClientInvoices />} />
                  <Route path="assistant" element={<LegalAssistant />} />
                </Route>

                {/* Redirect root to app */}
                <Route path="*" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;