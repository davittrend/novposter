import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Policy from './pages/Policy';
import DashboardAccounts from './pages/dashboard/Accounts';
import DashboardSchedulePins from './pages/dashboard/SchedulePins';
import DashboardScheduledPins from './pages/dashboard/ScheduledPins';
import DashboardSettings from './pages/dashboard/Settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/termsofuse" element={<Terms />} />
                <Route path="/policy" element={<Policy />} />
                
                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<ProtectedRoute />}>
                  <Route path="accounts" element={<DashboardAccounts />} />
                  <Route path="schedulepins" element={<DashboardSchedulePins />} />
                  <Route path="scheduledpins" element={<DashboardScheduledPins />} />
                  <Route path="settings" element={<DashboardSettings />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;