import React, { useState } from 'react';
import { Logo } from '../components/brand/Logo';
import { ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: 'kitchen' | 'ngo' | 'admin') => void;
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('kitchen.partner@annasetu.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<'kitchen' | 'ngo' | 'admin'>('kitchen');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  const handleDemoContinue = (role: 'kitchen' | 'ngo' | 'admin') => {
    onLoginSuccess(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-block mb-4 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sign in to AnnaSetu</h2>
          <p className="text-sm text-slate-600 mt-1">AI-Powered Food Resource Network Prototype</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* Role selector for demo convenience */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Select Demo Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['kitchen', 'ngo', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border capitalize transition-all ${
                    selectedRole === r 
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Simulated password reset email sent.'); }} className="text-xs text-emerald-700 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-slate-600 font-medium">Remember me</span>
              </label>
              <span className="text-slate-400">Simulated Auth</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-white font-semibold shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 text-sm"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <span>Sign In as {selectedRole.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 uppercase font-semibold">Or Quick Demo Entry</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoContinue('kitchen')}
              className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors border border-slate-200 text-center"
            >
              Kitchen Demo
            </button>
            <button
              onClick={() => handleDemoContinue('ngo')}
              className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors border border-slate-200 text-center"
            >
              NGO Demo
            </button>
            <button
              onClick={() => handleDemoContinue('admin')}
              className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors border border-slate-200 text-center"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Smart India Hackathon 2026 • Prototype Environment</span>
        </div>
      </div>
    </div>
  );
};
