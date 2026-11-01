import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowLeft, Layers, ShieldCheck, Cpu } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  const { brands, models, firmwares, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#0FAF9B] tracking-wider uppercase">
              الدليل الشامل
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1825] mt-1">
              شركات ومصنعي أجهزة الاستقبال
            </h1>
            <p className="text-sm text-[#6B7D8D] mt-2 max-w-2xl leading-relaxed">
              اختر العلامة التجارية لريسيفرك لتصفح جميع الموديلات المدعومة وسوفت وير التحديث الرسمي والدامبات الأصلية المصنفة.
            </p>
          </div>

          {/* Search within brands */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن ماركة الريسيفر..."
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0FAF9B] shadow-2xs pr-8"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => {
          const brandModels = models.filter((m) => m.brandId === brand.id);
          const brandFirmwares = firmwares.filter(
            (f) => f.brandId === brand.id && f.status === 'published'
          );

          return (
            <div
              key={brand.id}
              onClick={() => navigateTo('brand-details', { brandId: brand.id })}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-xl text-white shadow-xs"
                    style={{ backgroundColor: brand.accentColor }}
                  >
                    {brand.symbol}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {brand.country}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#0B1825] group-hover:text-[#0FAF9B] transition-colors">
                    {brand.name}
                  </h3>
                  <div className="text-xs font-mono text-[#6B7D8D]">
                    {brand.nameEn}
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {brand.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-500 font-mono">
                  <span>{brandModels.length} موديل</span>
                  <span>·</span>
                  <span>{brandFirmwares.length} ملف فلاشة</span>
                </div>
                <span className="text-[#0FAF9B] font-bold group-hover:translate-x-[-3px] transition-transform inline-flex items-center gap-1">
                  استعراض الموديلات
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
