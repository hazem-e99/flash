import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Cpu, ArrowLeft, Radio, HardDrive, Filter } from 'lucide-react';

export const ReceiverModelsPage: React.FC = () => {
  const { models, brands, firmwares, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');

  const filteredModels = models.filter((m) => {
    if (selectedBrand !== 'all' && m.brandId !== selectedBrand) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const brand = brands.find((b) => b.id === m.brandId);
      return (
        m.name.toLowerCase().includes(q) ||
        m.processor.toLowerCase().includes(q) ||
        m.boardId.toLowerCase().includes(q) ||
        brand?.name.toLowerCase().includes(q) ||
        brand?.nameEn.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#0FAF9B] tracking-wider uppercase">
              قاعدة بيانات الأجهزة
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1825] mt-1">
              موديلات أجهزة الريسيفر والستالايت
            </h1>
            <p className="text-sm text-[#6B7D8D] mt-2 max-w-2xl leading-relaxed">
              استكشف المواصفات الهندسية لكل جهاز، نوع المعالج، سعة شريحة الفلاشة، ورقم البوردة المعتمد لتفادي أخطاء السوفت وير.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filter by brand */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 shadow-2xs focus:outline-none focus:border-[#0FAF9B]"
            >
              <option value="all">جميع الشركات</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث بالموديل، المعالج..."
                className="w-full sm:w-60 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B] shadow-2xs pr-8"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const brand = brands.find((b) => b.id === model.brandId);
          const modelFirmwares = firmwares.filter(
            (f) => f.modelId === model.id && f.status === 'published'
          );

          return (
            <div
              key={model.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                    {brand?.name}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    إصدار {model.releaseYear}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#0B1825] font-mono leading-tight">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {model.description}
                  </p>
                </div>

                {/* Specs Table */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">المعالج (Processor):</span>
                    <span className="text-[#0B1825] font-bold">{model.processor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">رقم البوردة (Board ID):</span>
                    <span className="text-[#0FAF9B] font-bold bg-[#0FAF9B]/10 px-1.5 py-0.5 rounded text-[11px]">
                      {model.boardId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">حجم الذاكرة (Flash):</span>
                    <span className="text-slate-700 font-semibold">{model.flashSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">التيونر والبث:</span>
                    <span className="text-slate-700 font-medium">{model.tunerType}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {modelFirmwares.length} فلاشة متاحة
                </span>
                <button
                  type="button"
                  onClick={() =>
                    navigateTo('library', {
                      brandId: model.brandId,
                      modelId: model.id,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0FAF9B] hover:text-[#0B796B] transition-colors"
                >
                  <span>عرض الفلاشات</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
