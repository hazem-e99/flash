import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReceiverBrand, ReceiverModel, FirmwareItem, SiteSettings } from '../types';
import { INITIAL_BRANDS, INITIAL_MODELS, INITIAL_FIRMWARES, INITIAL_SETTINGS } from '../data/mockData';

export type PageRoute = 
  | 'home' 
  | 'library' 
  | 'brands' 
  | 'brand-details' 
  | 'models' 
  | 'firmware-details' 
  | 'about' 
  | 'contact' 
  | 'admin' 
  | 'admin-firmware' 
  | 'admin-add-firmware' 
  | 'admin-brands' 
  | 'admin-models' 
  | 'admin-settings';

interface FilterState {
  search: string;
  brandId: string;
  modelId: string;
  fileFormat: string;
  type: string;
  sortBy: 'date-desc' | 'date-asc' | 'downloads' | 'size';
}

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute, params?: { brandId?: string; modelId?: string; firmwareId?: string; search?: string }) => void;
  selectedBrandId: string | null;
  selectedModelId: string | null;
  selectedFirmwareId: string | null;
  
  brands: ReceiverBrand[];
  models: ReceiverModel[];
  firmwares: FirmwareItem[];
  settings: SiteSettings;
  
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // CRUD Operations
  addFirmware: (item: Omit<FirmwareItem, 'id' | 'downloadsCount'>) => string;
  updateFirmware: (id: string, item: Partial<FirmwareItem>) => void;
  deleteFirmware: (id: string) => void;
  toggleFirmwareStatus: (id: string) => void;
  
  addBrand: (brand: Omit<ReceiverBrand, 'id'>) => string;
  updateBrand: (id: string, brand: Partial<ReceiverBrand>) => void;
  deleteBrand: (id: string) => void;
  
  addModel: (model: Omit<ReceiverModel, 'id'>) => string;
  updateModel: (id: string, model: Partial<ReceiverModel>) => void;
  deleteModel: (id: string) => void;
  
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetAllDemoData: () => void;
  
  // UI & Demo Interactivity
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  downloadModal: { isOpen: boolean; firmware: FirmwareItem | null };
  openDownloadModal: (firmware: FirmwareItem) => void;
  closeDownloadModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BRANDS: 'asadalsat_brands_v1',
  MODELS: 'asadalsat_models_v1',
  FIRMWARES: 'asadalsat_firmwares_v1',
  SETTINGS: 'asadalsat_settings_v1',
};

const initialFilterState: FilterState = {
  search: '',
  brandId: 'all',
  modelId: 'all',
  fileFormat: 'all',
  type: 'all',
  sortBy: 'date-desc',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [selectedFirmwareId, setSelectedFirmwareId] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [downloadModal, setDownloadModal] = useState<{ isOpen: boolean; firmware: FirmwareItem | null }>({
    isOpen: false,
    firmware: null
  });

  // Load state from localStorage or initialize with defaults
  const [brands, setBrands] = useState<ReceiverBrand[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRANDS);
      return saved ? JSON.parse(saved) : INITIAL_BRANDS;
    } catch {
      return INITIAL_BRANDS;
    }
  });

  const [models, setModels] = useState<ReceiverModel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODELS);
      return saved ? JSON.parse(saved) : INITIAL_MODELS;
    } catch {
      return INITIAL_MODELS;
    }
  });

  const [firmwares, setFirmwares] = useState<FirmwareItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FIRMWARES);
      return saved ? JSON.parse(saved) : INITIAL_FIRMWARES;
    } catch {
      return INITIAL_FIRMWARES;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
    } catch (e) {
      console.error(e);
    }
  }, [brands]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models));
    } catch (e) {
      console.error(e);
    }
  }, [models]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FIRMWARES, JSON.stringify(firmwares));
    } catch (e) {
      console.error(e);
    }
  }, [firmwares]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Download Modal
  const openDownloadModal = (firmware: FirmwareItem) => {
    setDownloadModal({ isOpen: true, firmware });
  };

  const closeDownloadModal = () => {
    setDownloadModal({ isOpen: false, firmware: null });
  };

  // Navigation
  const navigateTo = (
    page: PageRoute, 
    params?: { brandId?: string; modelId?: string; firmwareId?: string; search?: string }
  ) => {
    if (params?.brandId) setSelectedBrandId(params.brandId);
    if (params?.modelId) setSelectedModelId(params.modelId);
    if (params?.firmwareId) setSelectedFirmwareId(params.firmwareId);
    if (params?.search !== undefined) {
      setFilters((prev) => ({ ...prev, search: params.search || '' }));
    }
    
    // Auto sync filter if brand selected when going to library
    if (params?.brandId && page === 'library') {
      setFilters((prev) => ({ ...prev, brandId: params.brandId! }));
    }
    
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  // Firmware CRUD
  const addFirmware = (item: Omit<FirmwareItem, 'id' | 'downloadsCount'>) => {
    const id = 'fw-' + Date.now().toString();
    const newItem: FirmwareItem = {
      ...item,
      id,
      downloadsCount: 0,
    };
    setFirmwares((prev) => [newItem, ...prev]);
    showToast('تمت إضافة الفلاشة بنجاح وحفظها في النسخة التجريبية', 'success');
    return id;
  };

  const updateFirmware = (id: string, updated: Partial<FirmwareItem>) => {
    setFirmwares((prev) =>
      prev.map((fw) => (fw.id === id ? { ...fw, ...updated } : fw))
    );
    showToast('تم تحديث بيانات الفلاشة بنجاح', 'success');
  };

  const deleteFirmware = (id: string) => {
    setFirmwares((prev) => prev.filter((fw) => fw.id !== id));
    showToast('تم حذف ملف الفلاشة من السجلات', 'info');
  };

  const toggleFirmwareStatus = (id: string) => {
    setFirmwares((prev) =>
      prev.map((fw) =>
        fw.id === id
          ? { ...fw, status: fw.status === 'published' ? 'draft' : 'published' }
          : fw
      )
    );
    showToast('تم تغيير حالة نشر الملف', 'info');
  };

  // Brand CRUD
  const addBrand = (brand: Omit<ReceiverBrand, 'id'>) => {
    const id = brand.nameEn.toLowerCase().replace(/\s+/g, '-');
    const newBrand: ReceiverBrand = { ...brand, id };
    setBrands((prev) => [...prev, newBrand]);
    showToast(`تمت إضافة الشركة ${brand.name} بنجاح`, 'success');
    return id;
  };

  const updateBrand = (id: string, updated: Partial<ReceiverBrand>) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
    showToast('تم تحديث بيانات الشركة بنجاح', 'success');
  };

  const deleteBrand = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    showToast('تم حذف الشركة من الدليل', 'info');
  };

  // Model CRUD
  const addModel = (model: Omit<ReceiverModel, 'id'>) => {
    const id = model.name.toLowerCase().replace(/\s+/g, '-');
    const newModel: ReceiverModel = { ...model, id };
    setModels((prev) => [...prev, newModel]);
    showToast(`تمت إضافة الموديل ${model.name} بنجاح`, 'success');
    return id;
  };

  const updateModel = (id: string, updated: Partial<ReceiverModel>) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
    showToast('تم تحديث بيانات الموديل بنجاح', 'success');
  };

  const deleteModel = (id: string) => {
    setModels((prev) => prev.filter((m) => m.id !== id));
    showToast('تم حذف الموديل', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('تم حفظ إعدادات الموقع بنجاح', 'success');
  };

  const resetAllDemoData = () => {
    setBrands(INITIAL_BRANDS);
    setModels(INITIAL_MODELS);
    setFirmwares(INITIAL_FIRMWARES);
    setSettings(INITIAL_SETTINGS);
    setFilters(initialFilterState);
    try {
      localStorage.removeItem(STORAGE_KEYS.BRANDS);
      localStorage.removeItem(STORAGE_KEYS.MODELS);
      localStorage.removeItem(STORAGE_KEYS.FIRMWARES);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    } catch (e) {
      console.error(e);
    }
    showToast('تمت استعادة البيانات الافتراضية للنسخة التجريبية', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedBrandId,
        selectedModelId,
        selectedFirmwareId,
        brands,
        models,
        firmwares,
        settings,
        filters,
        setFilters,
        resetFilters,
        addFirmware,
        updateFirmware,
        deleteFirmware,
        toggleFirmwareStatus,
        addBrand,
        updateBrand,
        deleteBrand,
        addModel,
        updateModel,
        deleteModel,
        updateSettings,
        resetAllDemoData,
        toasts,
        showToast,
        removeToast,
        downloadModal,
        openDownloadModal,
        closeDownloadModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
