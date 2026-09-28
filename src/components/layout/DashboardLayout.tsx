import type { ReactNode } from 'react';
import { DashboardSidebar } from '../navigation/DashboardSidebar';
import { DashboardTopbar } from '../navigation/DashboardTopbar';

interface DashboardLayoutProps {
  currentRole: 'kitchen' | 'ngo' | 'admin';
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onLogout: () => void;
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  onRoleChange,
  onLogout,
  children
}) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar
        currentRole={currentRole}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar
          currentRole={currentRole}
          onRoleChange={onRoleChange}
          onNavigate={onNavigate}
        />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
