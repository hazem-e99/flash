import React, { useState, useEffect } from 'react';
import { useApp, PageRoute } from '../context/AppContext';
import { Logo } from './Logo';
import { Menu, X, Shield, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPage, navigateTo, firmwares } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageRoute }[] = [
    { label: 'الرئيسية', page: 'home' },
    { label: 'مكتبة الفلاشات', page: 'library' },
    { label: 'الشركات', page: 'brands' },
    { label: 'الموديلات', page: 'models' },
    { label: 'من نحن', page: 'about' },
    { label: 'تواصل معنا', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    setMobileMenuOpen(false);
    navigateTo(page);
  };

  const isAdminSection = currentPage.startsWith('admin');

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-200/60 py-4'
        }`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark & Logo */}
            <div className="shrink-0">
              <Logo
                size="md"
                variant="full"
                onClick={() => handleNavClick('home')}
                className="cursor-pointer"
              />
            </div>

            {/* Zone 2: Navigation Links (Clean typography, no pills) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#142536]">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`whitespace-nowrap transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#0FAF9B] font-bold'
                        : 'text-[#142536] hover:text-[#0FAF9B]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#0FAF9B] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Admin Portal Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Quick Search Shortcut button on desktop */}
              <button
                onClick={() => handleNavClick('library')}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                title="بحث سريع في المكتبة"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>بحث في {firmwares.length} فلاشة</span>
              </button>

              {/* Admin Dashboard Switch */}
              <button
                onClick={() => handleNavClick(isAdminSection ? 'home' : 'admin')}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  isAdminSection
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                    : 'bg-[#0B1825] text-white hover:bg-[#132B40] shadow-sm'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#0FAF9B]" />
                <span>{isAdminSection ? 'العودة للموقع' : 'لوحة الإدارة'}</span>
              </button>

              {/* Mobile menu hamburger toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="القائمة الرئيسية"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" dir="rtl">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Logo
                  size="sm"
                  onClick={() => handleNavClick('home')}
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = currentPage === item.page;
                  return (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`w-full text-right px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#0FAF9B]/10 text-[#0FAF9B]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-[#0B1825] rounded-xl hover:bg-[#132B40]"
              >
                <Shield className="w-4 h-4 text-[#0FAF9B]" />
                <span>لوحة تحكم الإدارة (Demo)</span>
              </button>
              <p className="text-[11px] text-center text-slate-400">
                أسد السات — مكتبة سوفت وير الريسيفرات
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
