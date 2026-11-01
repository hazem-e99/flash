import React from 'react';
import { useApp, PageRoute } from '../../context/AppContext';
import { Logo } from '../../components/Logo';
import { 
  LayoutDashboard, 
  HardDrive, 
  Layers, 
  Cpu, 
  Settings, 
  Globe, 
  Plus,
  Shield,
  RotateCcw
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  actionButton,
}) => {
  const { currentPage, navigateTo, firmwares, brands, models, resetAllDemoData } = useApp();

  const sidebarLinks: { label: string; page: PageRoute; icon: React.ReactNode; count?: number }[] = [
    { label: 'نظرة عامة', page: 'admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'إدارة الفلاشات', page: 'admin-firmware', icon: <HardDrive className="w-4 h-4" />, count: firmwares.length },
    { label: 'الشركات المصنعة', page: 'admin-brands', icon: <Layers className="w-4 h-4" />, count: brands.length },
    { label: 'موديلات الأجهزة', page: 'admin-models', icon: <Cpu className="w-4 h-4" />, count: models.length },
    { label: 'إعدادات المنصة', page: 'admin-settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col" dir="rtl">
      {/* Top Bar for Admin */}
      <div className="bg-[#0B1825] text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" theme="dark" variant="full" onClick={() => navigateTo('home')} />
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#0FAF9B] bg-[#132B40] px-2.5 py-0.5 rounded border border-[#0FAF9B]/20">
            لوحة الإدارة التجريبية · Admin Console Demo
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetAllDemoData}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="استعادة البيانات الافتراضية"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>استعادة البيانات</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#132B40] text-xs font-bold text-white hover:bg-[#1C3D5A] border border-slate-700 transition-colors shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#0FAF9B]" />
            <span>معاينة الموقع كزائر</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* SIDEBAR NAVIGATION (260px) */}
        <aside className="w-full md:w-64 bg-white border-l border-slate-200/90 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="px-3 pt-2">
              <span className="text-[11px] font-bold text-[#6B7D8D] uppercase tracking-wider block">
                أقسام لوحة التحكم
              </span>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => navigateTo(item.page)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#0B1825] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-[#0B1825]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-[#0FAF9B]' : 'text-slate-500'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.count !== undefined && (
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.2 rounded font-medium ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Add Firmware Button */}
            <div className="pt-2 px-1">
              <button
                type="button"
                onClick={() => navigateTo('admin-add-firmware')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#0FAF9B] hover:bg-[#0B796B] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة فلاشة جديدة</span>
              </button>
            </div>
          </div>

          {/* Storage Snapshot Preview in Sidebar */}
          <div className="pt-6 border-t border-slate-100 px-2 space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
              <span>استهلاك الذاكرة</span>
              <span>1.84 GB / 25 GB</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0FAF9B] rounded-full" style={{ width: '12%' }} />
            </div>
            <p className="text-[10px] text-slate-400">
              * مساحة الأرشيف السحابي المستهلكة
            </p>
          </div>
        </aside>

        {/* MAIN ADMIN WORKSPACE */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl">
          {/* Header breadcrumb & actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
            <div>
              <h1 className="text-2xl font-black text-[#0B1825]">{title}</h1>
              {subtitle && (
                <p className="text-xs text-[#6B7D8D] mt-1">{subtitle}</p>
              )}
            </div>

            {actionButton && <div>{actionButton}</div>}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};
