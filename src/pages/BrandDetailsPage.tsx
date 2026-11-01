import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Search, 
  Download, 
  Cpu, 
  Layers, 
  HardDrive, 
  ArrowLeft,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const BrandDetailsPage: React.FC = () => {
  const { 
    selectedBrandId, 
    brands, 
    models, 
    firmwares, 
    navigateTo, 
    openDownloadModal 
  } = useApp();

  const [searchInBrand, setSearchInBrand] = useState('');

  // Fallback to first brand if not specified
  const brand = brands.find((b) => b.id === selectedBrandId) || brands[0];
  const brandModels = models.filter((m) => m.brandId === brand?.id);
  const brandFirmwares = firmwares.filter(
    (f) => f.brandId === brand?.id && f.status === 'published'
  );

  // Filter firmwares within brand
  const displayedFirmwares = brandFirmwares.filter((f) => {
    if (!searchInBrand.trim()) return true;
    const q = searchInBrand.toLowerCase();
    const model = models.find((m) => m.id === f.modelId);
    return (
      f.title.toLowerCase().includes(q) ||
      f.boardNumber.toLowerCase().includes(q) ||
      f.chipset.toLowerCase().includes(q) ||
      model?.name.toLowerCase().includes(q)
    );
  });

  if (!brand) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center" dir="rtl">
        <p className="text-slate-600">الشركة غير موجودة أو تم حذفها.</p>
        <button
          onClick={() => navigateTo('brands')}
          className="mt-4 px-4 py-2 bg-[#0B1825] text-white text-xs font-bold rounded-xl"
        >
          العودة لدليل الشركات
        </button>
      </div>
    );
  }

  return (
    <div className="pb-16" dir="rtl">
      {/* BRAND DIFFERENTIATED HERO */}
      <section 
        className="relative bg-[#0B1825] text-white border-b border-[#132B40] py-14 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Breadcrumb */}
          <button
            onClick={() => navigateTo('brands')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لدليل الشركات</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono font-bold text-3xl text-white shadow-lg shrink-0 border-2 border-white/20"
                style={{ backgroundColor: brand.accentColor }}
              >
                {brand.symbol}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl sm:text-4xl font-black text-white">
                    {brand.name}
                  </h1>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-[#0FAF9B]">
                    {brand.nameEn}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{brand.country}</p>
                <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex items-center gap-6 bg-[#132B40]/70 p-4 rounded-2xl border border-slate-700/80 shrink-0">
              <div className="text-center px-2">
                <span className="text-2xl font-mono font-black text-white block">
                  {brandModels.length}
                </span>
                <span className="text-[11px] text-slate-400">موديل مفهرس</span>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-center px-2">
                <span className="text-2xl font-mono font-black text-[#0FAF9B] block">
                  {brandFirmwares.length}
                </span>
                <span className="text-[11px] text-slate-400">فلاشة جاهزة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT TABS / SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Receiver Models registered for this Brand */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#0B1825]">
                موديلات أجهزة {brand.name}
              </h2>
              <p className="text-xs text-[#6B7D8D] mt-0.5">
                الموديلات الأكثر طلباً وسوفت وير الدعم الفني
              </p>
            </div>
            <button
              onClick={() => navigateTo('models')}
              className="text-xs font-semibold text-[#0FAF9B] hover:underline"
            >
              عرض جميع موديلات الأجهزة
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brandModels.map((model) => {
              const modelFirmwares = firmwares.filter(
                (f) => f.modelId === model.id && f.status === 'published'
              );

              return (
                <div
                  key={model.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B1825] font-mono">
                      {model.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      سنة {model.releaseYear}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1 text-xs font-mono text-slate-500">
                    <div className="flex justify-between">
                      <span>المعالج:</span>
                      <span className="text-slate-800 font-medium">{model.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رقم البوردة:</span>
                      <span className="text-slate-800 font-medium">{model.boardId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حجم الفلاشة:</span>
                      <span className="text-slate-800 font-medium">{model.flashSize}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {modelFirmwares.length} ملف متوفر
                    </span>
                    <button
                      onClick={() => navigateTo('library', { brandId: brand.id, modelId: model.id })}
                      className="text-xs font-bold text-[#0FAF9B] hover:underline flex items-center gap-1"
                    >
                      تصفية فلاشات هذا الموديل
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Firmwares for this Brand */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#0B1825]">
                فلاشات وسوفت وير {brand.name}
              </h2>
              <p className="text-xs text-[#6B7D8D] mt-0.5">
                قائمة الملفات المعتمدة الجاهزة للتحميل المباشر
              </p>
            </div>

            {/* Search within this brand's firmwares */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchInBrand}
                onChange={(e) => setSearchInBrand(e.target.value)}
                placeholder="بحث داخل فلاشات الشركة..."
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B] pr-8"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {displayedFirmwares.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              لا توجد فلاشات تطابق كلمة البحث داخل {brand.name}.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden divide-y divide-slate-100 shadow-2xs">
              {displayedFirmwares.map((fw) => {
                const model = models.find((m) => m.id === fw.modelId);
                return (
                  <div
                    key={fw.id}
                    className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2 text-xs text-[#6B7D8D]">
                        <span className="font-semibold text-[#0FAF9B]">{fw.type}</span>
                        <span>·</span>
                        <span className="font-mono font-medium text-slate-700">{model?.name}</span>
                        <span>·</span>
                        <span className="font-mono">{fw.fileFormat}</span>
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
                        <span>الإصدار: {fw.version}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                        className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        التفاصيل الفنية
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
        </section>
      </div>
    </div>
  );
};
