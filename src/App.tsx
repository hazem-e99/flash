/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { DownloadModal } from './components/DownloadModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { FirmwareLibraryPage } from './pages/FirmwareLibraryPage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandDetailsPage } from './pages/BrandDetailsPage';
import { ReceiverModelsPage } from './pages/ReceiverModelsPage';
import { FirmwareDetailsPage } from './pages/FirmwareDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminManageFirmware } from './pages/admin/AdminManageFirmware';
import { AdminAddEditFirmware } from './pages/admin/AdminAddEditFirmware';
import { AdminManageBrands } from './pages/admin/AdminManageBrands';
import { AdminManageModels } from './pages/admin/AdminManageModels';
import { AdminSettings } from './pages/admin/AdminSettings';

import { Sparkles, Shield, AlertCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentPage, settings, navigateTo } = useApp();

  const isAdmin = currentPage.startsWith('admin');

  // Render Page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'library':
        return <FirmwareLibraryPage />;
      case 'brands':
        return <BrandsPage />;
      case 'brand-details':
        return <BrandDetailsPage />;
      case 'models':
        return <ReceiverModelsPage />;
      case 'firmware-details':
        return <FirmwareDetailsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;

      // Admin Routes
      case 'admin':
        return <AdminDashboardOverview />;
      case 'admin-firmware':
        return <AdminManageFirmware />;
      case 'admin-add-firmware':
        return <AdminAddEditFirmware />;
      case 'admin-brands':
        return <AdminManageBrands />;
      case 'admin-models':
        return <AdminManageModels />;
      case 'admin-settings':
        return <AdminSettings />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FA] text-[#142536] font-sans antialiased" dir="rtl">
      {/* Top Demo Notice & Announcement Bar */}
      {settings.isAnnouncementActive && (
        <div className="bg-[#132B40] text-white text-[11px] py-1.5 px-4 text-center border-b border-[#0FAF9B]/20 flex items-center justify-center gap-2 font-medium">
          <span className="inline-block px-1.5 py-0.2 rounded bg-[#0FAF9B] text-[#0B1825] font-bold text-[10px]">
            معاينة العميل
          </span>
          <span>{settings.announcementText}</span>
          <button
            onClick={() => navigateTo('admin')}
            className="text-[#0FAF9B] underline hover:text-white mr-2 font-bold cursor-pointer"
          >
            تجربة لوحة التحكم
          </button>
        </div>
      )}

      {/* Public Header (only on non-admin pages) */}
      {!isAdmin && <Header />}

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Public Footer (only on non-admin pages) */}
      {!isAdmin && <Footer />}

      {/* Global Interactive Overlays */}
      <DownloadModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
