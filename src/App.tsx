import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { KitchenDashboard } from './pages/KitchenDashboard';
import { NgoDashboard } from './pages/NgoDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AiFoodLoopPage } from './pages/AiFoodLoopPage';
import { SurplusManagementPage } from './pages/SurplusManagementPage';
import { NgoMatchingPage } from './pages/NgoMatchingPage';
import { RoutePickupPage } from './pages/RoutePickupPage';
import { FoodPassportPage } from './pages/FoodPassportPage';
import { ImpactAnalyticsPage } from './pages/ImpactAnalyticsPage';
import { InventoryPage } from './pages/InventoryPage';
import { FoodSourcesPage } from './components/food-sources/FoodSourcesPage';
import { FoodSourceProfilePage } from './components/food-sources/FoodSourceProfilePage';
import { DashboardLayout } from './components/layout/DashboardLayout';

import { AppDataProvider } from './context/AppDataContext';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [currentRole, setCurrentRole] = useState<'kitchen' | 'ngo' | 'admin'>('kitchen');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: 'kitchen' | 'ngo' | 'admin') => {
    setCurrentRole(role);
    setCurrentPage('overview');
  };

  const handleRoleSelect = (role: 'kitchen' | 'ngo' | 'admin') => {
    setCurrentRole(role);
    setCurrentPage('overview');
  };

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  return (
    <AppDataProvider>
      <AppContent
        currentPage={currentPage}
        currentRole={currentRole}
        handleNavigate={handleNavigate}
        handleLoginSuccess={handleLoginSuccess}
        handleRoleSelect={handleRoleSelect}
        handleLogout={handleLogout}
        setCurrentRole={setCurrentRole}
      />
    </AppDataProvider>
  );
}

function AppContent({
  currentPage,
  currentRole,
  handleNavigate,
  handleLoginSuccess,
  handleRoleSelect,
  handleLogout,
  setCurrentRole
}: {
  currentPage: string;
  currentRole: 'kitchen' | 'ngo' | 'admin';
  handleNavigate: (page: string) => void;
  handleLoginSuccess: (role: 'kitchen' | 'ngo' | 'admin') => void;
  handleRoleSelect: (role: 'kitchen' | 'ngo' | 'admin') => void;
  handleLogout: () => void;
  setCurrentRole: (role: 'kitchen' | 'ngo' | 'admin') => void;
}) {
  if (currentPage.startsWith('source-profile-')) {
    const sourceId = currentPage.replace('source-profile-', '');
    return (
      <DashboardLayout
        currentRole={currentRole}
        currentPage="food-sources"
        onNavigate={handleNavigate}
        onRoleChange={setCurrentRole}
        onLogout={handleLogout}
      >
        <FoodSourceProfilePage sourceId={sourceId} onNavigate={handleNavigate} />
      </DashboardLayout>
    );
  }

  switch (currentPage) {
    case 'landing':
      return <LandingPage onNavigate={handleNavigate} />;
    
    case 'login':
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
    
    case 'role-selection':
      return <RoleSelectionPage onSelectRole={handleRoleSelect} onNavigate={handleNavigate} />;
    
    case 'overview':
    case 'dashboard':
      if (currentRole === 'kitchen') {
        return <KitchenDashboard currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
      } else if (currentRole === 'ngo') {
        return <NgoDashboard currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
      } else {
        return <AdminDashboard currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
      }

    case 'ai-foodloop':
      return <AiFoodLoopPage currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
    
    case 'food-sources':
      return (
        <DashboardLayout
          currentRole={currentRole}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onRoleChange={setCurrentRole}
          onLogout={handleLogout}
        >
          <FoodSourcesPage onNavigate={handleNavigate} />
        </DashboardLayout>
      );

    case 'inventory':
      return <InventoryPage currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;

    case 'surplus':
      return <SurplusManagementPage currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
    
    case 'ngo-matching':
      return <NgoMatchingPage currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
    
    case 'routes':
      return <RoutePickupPage currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
    
    case 'food-passport':
      return <FoodPassportPage currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;
    
    case 'impact':
      return <ImpactAnalyticsPage currentRole={currentRole} currentPage={currentPage} onNavigate={handleNavigate} onRoleChange={setCurrentRole} onLogout={handleLogout} />;

    default:
      return <LandingPage onNavigate={handleNavigate} />;
  }
}

export default App;
