import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  X,
  FileCode
} from 'lucide-react';

export const FirmwareLibraryPage: React.FC = () => {
  const { 
    firmwares, 
    brands, 
    models, 
    filters, 
    setFilters, 
    resetFilters, 
    navigateTo, 
    openDownloadModal 
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const itemsPerPage = 8;

  // Filtered models based on selected brand
  const filteredModels = useMemo(() => {
    if (filters.brandId === 'all') return models;
    return models.filter((m) => m.brandId === filters.brandId);
  }, [models, filters.brandId]);

  // Main filter calculation
  const filteredFirmwares = useMemo(() => {
    return firmwares.filter((item) => {
      // Must be published for public view
      if (item.status !== 'published') return false;

      // Brand filter
      if (filters.brandId !== 'all' && item.brandId !== filters.brandId) {
        return false;
      }

      // Model filter
      if (filters.modelId !== 'all' && item.modelId !== filters.modelId) {
        return false;
      }

      // Format filter
      if (filters.fileFormat !== 'all' && item.fileFormat !== filters.fileFormat) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }

      // Search query (search in title, chipset, boardNumber, version)
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const brand = brands.find((b) => b.id === item.brandId);
        const model = models.find((m) => m.id === item.modelId);
        
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchBrand = brand?.name.toLowerCase().includes(query) || brand?.nameEn.toLowerCase().includes(query);
        const matchModel = model?.name.toLowerCase().includes(query);
        const matchBoard = item.boardNumber.toLowerCase().includes(query);
        const matchChipset = item.chipset.toLowerCase().includes(query);
        const matchVersion = item.version.toLowerCase().includes(query);

        return matchTitle || matchBrand || matchModel || matchBoard || matchChipset || matchVersion;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'date-desc') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      if (filters.sortBy === 'date-asc') {
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      }
      if (filters.sortBy === 'downloads') {
        return b.downloadsCount - a.downloadsCount;
      }
      if (filters.sortBy === 'size') {
        return parseFloat(b.fileSize) - parseFloat(a.fileSize);
      }
      return 0;
    });
  }, [firmwares, filters, brands, models]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredFirmwares.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredFirmwares.slice(start, start + itemsPerPage);
  }, [filteredFirmwares, currentPageNum, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPageNum(newPage);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleBrandChange = (brandId: string) => {
    setFilters((prev) => ({
      ...prev,
      brandId,
      modelId: 'all', // reset model if brand changed
    }));
    setCurrentPageNum(1);
  };

  const activeFiltersCount = 
    (filters.brandId !== 'all' ? 1 : 0) +
    (filters.modelId !== 'all' ? 1 : 0) +
    (filters.fileFormat !== 'all' ? 1 : 0) +
    (filters.type !== 'all' ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Page Title & Header */}
      <div className="border-b border-slate-200 pb-8 mb-8">
        <span className="text-xs font-bold text-[#0FAF9B] tracking-wider uppercase">
          الأرشيف الكامل
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1825] mt-1">
          مكتبة فلاشات وسوفت وير الريسيفرات
        </h1>
        <p className="text-sm text-[#6B7D8D] mt-2 max-w-3xl leading-relaxed">
          تصفح وحمّل ملفات الفلاشات الأصلية المسحوبة (Dumps) وسوفت وير التحديث الرسمي وملفات القنوات المرتبة لجميع موديلات الريسيفر والمعالجات الفضائية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0B1825]">
                <Filter className="w-4 h-4 text-[#0FAF9B]" />
                <span>تصفية النتائج</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                    setCurrentPageNum(1);
                  }}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة ضبط ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* Search within Library */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">كلمة البحث</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, search: e.target.value }));
                    setCurrentPageNum(1);
                  }}
                  placeholder="ابحث بالاسم، المعالج، البوردة..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B] pr-8"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3" />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">الشركة المصنعة</label>
              <select
                value={filters.brandId}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B]"
              >
                <option value="all">جميع الشركات ({brands.length})</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.nameEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Model Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">موديل الريسيفر</label>
              <select
                value={filters.modelId}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, modelId: e.target.value }));
                  setCurrentPageNum(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B]"
              >
                <option value="all">جميع الموديلات ({filteredModels.length})</option>
                {filteredModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Firmware Type Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">نوع الملف</label>
              <select
                value={filters.type}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, type: e.target.value }));
                  setCurrentPageNum(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B]"
              >
                <option value="all">جميع الأنواع</option>
                <option value="سوفت رسمي">سوفت رسمي (Official)</option>
                <option value="دامب مسحوب">دامب مسحوب أصلي (Clean Dump)</option>
                <option value="سوفت معدل">سوفت معدل وتحويلات</option>
                <option value="ملف قنوات">ملفات قنوات مرتبة</option>
              </select>
            </div>

            {/* File Format Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">صيغة الملف</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['all', 'BIN', 'ABS', 'ZIP'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, fileFormat: fmt }));
                      setCurrentPageNum(1);
                    }}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-mono font-medium transition-colors ${
                      filters.fileFormat === fmt
                        ? 'bg-[#0B1825] text-white border-[#0B1825]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {fmt === 'all' ? 'الكل' : `.${fmt}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS AREA */}
        <main className="lg:col-span-3 space-y-6">
          {/* Action Bar (Results Count, Sort, Grid/List toggle, Mobile Filter trigger) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
              >
                <Filter className="w-3.5 h-3.5 text-[#0FAF9B]" />
                <span>الفلاتر ({activeFiltersCount})</span>
              </button>

              <p className="text-xs text-[#6B7D8D]">
                إجمالي النتائج: <strong className="text-[#0B1825] font-mono font-bold text-sm">{filteredFirmwares.length}</strong> فلاشة متاحة
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 hidden sm:inline">الترتيب:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
                >
                  <option value="date-desc">الأحدث إضافة</option>
                  <option value="date-asc">الأقدم تاريخاً</option>
                  <option value="downloads">الأكثر طلباً</option>
                  <option value="size">حجم الملف</option>
                </select>
              </div>

              {/* View Toggle (Grid / List) */}
              <div className="flex items-center p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-[#0B1825] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="عرض شبكي"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-[#0B1825] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="عرض قائمة"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS: EMPTY STATE */}
          {filteredFirmwares.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileCode className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#0B1825]">لم يتم العثور على فلاشات مطابقة</h3>
              <p className="text-xs text-[#6B7D8D] max-w-sm mx-auto leading-relaxed">
                لا توجد ملفات متطابقة مع شروط البحث أو الفلاتر المحددة. جرب كتابة اسم المعالج أو تفريغ الفلاتر.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-[#0B1825] text-white text-xs font-bold rounded-xl hover:bg-[#132B40] transition-colors"
              >
                إلغاء جميع الفلاتر
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paginatedItems.map((fw) => {
                const brand = brands.find((b) => b.id === fw.brandId);
                const model = models.find((m) => m.id === fw.modelId);

                return (
                  <div
                    key={fw.id}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#6B7D8D]">
                        <span className="font-semibold text-[#0FAF9B]">{fw.type}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span>{fw.fileFormat}</span>
                          <span>·</span>
                          <span>{fw.fileSize}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                        className="font-bold text-base text-[#0B1825] hover:text-[#0FAF9B] cursor-pointer transition-colors line-clamp-2 leading-snug"
                      >
                        {fw.title}
                      </h3>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">الشركة:</span>
                          <span className="font-semibold text-slate-700">{brand?.name || 'عام'}</span>
                        </div>
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-slate-400">الموديل:</span>
                          <span className="font-medium text-slate-800">{model?.name || 'متعدد'}</span>
                        </div>
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-slate-400">رقم البوردة:</span>
                          <span className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                            {fw.boardNumber}
                          </span>
                        </div>
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-slate-400">المعالج:</span>
                          <span className="text-slate-600 text-[11px]">{fw.chipset}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                        className="text-xs font-semibold text-slate-600 hover:text-[#0B1825]"
                      >
                        التفاصيل
                      </button>
                      <button
                        type="button"
                        onClick={() => openDownloadModal(fw)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#0FAF9B]" />
                        <span>تحميل</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden divide-y divide-slate-100 shadow-2xs">
              {paginatedItems.map((fw) => {
                const brand = brands.find((b) => b.id === fw.brandId);
                const model = models.find((m) => m.id === fw.modelId);

                return (
                  <div
                    key={fw.id}
                    className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2 text-xs text-[#6B7D8D]">
                        <span className="font-semibold text-[#0FAF9B]">{fw.type}</span>
                        <span>·</span>
                        <span className="font-semibold text-slate-700">{brand?.name}</span>
                        <span>·</span>
                        <span className="font-mono">{model?.name}</span>
                      </div>
                      <h3
                        onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                        className="font-bold text-base text-[#0B1825] hover:text-[#0FAF9B] cursor-pointer transition-colors leading-snug"
                      >
                        {fw.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono pt-1">
                        <span>البوردة: {fw.boardNumber}</span>
                        <span>·</span>
                        <span>المعالج: {fw.chipset}</span>
                        <span>·</span>
                        <span>الحجم: {fw.fileSize}</span>
                        <span>·</span>
                        <span>التاريخ: {fw.uploadDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                        className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        التفاصيل
                      </button>
                      <button
                        type="button"
                        onClick={() => openDownloadModal(fw)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-[#0FAF9B]" />
                        <span>تحميل</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                type="button"
                onClick={() => handlePageChange(currentPageNum - 1)}
                disabled={currentPageNum === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                aria-label="الصفحة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                const isActive = pageNumber === currentPageNum;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-[#0B1825] text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handlePageChange(currentPageNum + 1)}
                disabled={currentPageNum === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                aria-label="الصفحة التالية"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" dir="rtl">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-base text-[#0B1825]">
                  <Filter className="w-4 h-4 text-[#0FAF9B]" />
                  <span>تصفية الفلاشات</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">الشركة المصنعة</label>
                  <select
                    value={filters.brandId}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="all">جميع الشركات</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">الموديل</label>
                  <select
                    value={filters.modelId}
                    onChange={(e) => setFilters((p) => ({ ...p, modelId: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="all">جميع الموديلات</option>
                    {filteredModels.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">نوع الملف</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="all">جميع الأنواع</option>
                    <option value="سوفت رسمي">سوفت رسمي</option>
                    <option value="دامب مسحوب">دامب مسحوب أصلي</option>
                    <option value="سوفت معدل">سوفت معدل</option>
                    <option value="ملف قنوات">ملف قنوات</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="w-1/2 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200"
              >
                إلغاء التصفية
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-bold text-white bg-[#0B1825] rounded-xl hover:bg-[#132B40]"
              >
                تطبيق ({filteredFirmwares.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
