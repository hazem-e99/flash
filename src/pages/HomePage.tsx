import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ArrowLeft, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Layers, 
  Radio, 
  AlertTriangle,
  Microchip,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    brands, 
    models, 
    firmwares, 
    navigateTo, 
    openDownloadModal,
    setFilters 
  } = useApp();

  const [heroSearch, setHeroSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSearch.trim()) {
      navigateTo('library');
      return;
    }
    navigateTo('library', { search: heroSearch.trim() });
  };

  const handleShortcutClick = (type: 'latest' | 'brands' | 'models') => {
    if (type === 'latest') {
      setFilters(prev => ({ ...prev, sortBy: 'date-desc', search: '' }));
      navigateTo('library');
    } else if (type === 'brands') {
      navigateTo('brands');
    } else if (type === 'models') {
      navigateTo('models');
    }
  };

  // Filter published firmwares for featured display
  const latestFirmwares = firmwares
    .filter(f => f.status === 'published')
    .slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION — EDITORIAL SATELLITE TECH LAYOUT */}
      <section className="relative overflow-hidden bg-[#0B1825] text-white pt-16 pb-24 border-b border-[#132B40]">
        {/* Abstract Precision Signal & Orbital Wave Grid (SVG Geometric Art) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
            {/* Concentric Radar Signal Arcs */}
            <circle cx="1200" cy="180" r="160" stroke="#0FAF9B" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="1200" cy="180" r="280" stroke="#0FAF9B" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="1200" cy="180" r="420" stroke="#E5A54B" strokeWidth="1" strokeDasharray="8 8" strokeOpacity="0.3" />
            <circle cx="1200" cy="180" r="580" stroke="#0FAF9B" strokeWidth="1" strokeOpacity="0.15" />
            
            {/* Fine coordinate guidelines */}
            <line x1="0" y1="180" x2="1440" y2="180" stroke="#132B40" strokeWidth="1" />
            <line x1="1200" y1="0" x2="1200" y2="600" stroke="#132B40" strokeWidth="1" />
            <line x1="300" y1="0" x2="300" y2="600" stroke="#132B40" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="750" y1="0" x2="750" y2="600" stroke="#132B40" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Subtle Technology Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132B40]/80 border border-[#0FAF9B]/30 text-xs font-semibold text-[#0FAF9B] mb-6 shadow-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>المكتبة المرجعية الأولى لفلاشات أجهزة الاستقبال الفضائي</span>
          </div>

          {/* Main Editorial Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] text-white">
            فلاشة جهازك... <span className="text-[#0FAF9B]">هتلاقيها هنا</span>
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-medium text-slate-300">
            مكتبة متكاملة لفلاشات وتحديثات الريسيفرات والدامبات الأصلية
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            دوّر على موديل الريسيفر، اعرف تفاصيل السوفت وير المناسب لجهازك ورقم البوردة، وحمّل التحديثات بسهولة ومن مكان واحد موثوق.
          </p>

          {/* Large Centerpiece Search Bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center bg-white rounded-2xl p-2 shadow-2xl border-2 border-slate-200/20 focus-within:border-[#0FAF9B] transition-all">
                <div className="p-3 text-slate-400">
                  <Search className="w-6 h-6 text-[#0FAF9B]" />
                </div>
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="اكتب اسم الشركة أو موديل الريسيفر (مثال: Starsat 2000, Tiger T8, 1506TV)..."
                  className="w-full bg-transparent text-[#142536] placeholder-slate-400 text-sm sm:text-base font-medium px-2 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-3.5 bg-[#0FAF9B] hover:bg-[#0B796B] text-white font-bold text-sm sm:text-base rounded-xl transition-colors shrink-0 flex items-center gap-2 shadow-sm"
                >
                  <span>بحث</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Meaningful Visual Shortcuts */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 ml-1">روابط سريعة:</span>
              <button
                onClick={() => handleShortcutClick('latest')}
                className="px-3 py-1.5 rounded-lg bg-[#132B40] hover:bg-[#1C3D5A] text-slate-200 border border-slate-700/60 transition-colors inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E5A54B]" />
                <span>أحدث الفلاشات المضافة</span>
              </button>
              <button
                onClick={() => handleShortcutClick('brands')}
                className="px-3 py-1.5 rounded-lg bg-[#132B40] hover:bg-[#1C3D5A] text-slate-200 border border-slate-700/60 transition-colors inline-flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-[#0FAF9B]" />
                <span>جميع الشركات ({brands.length})</span>
              </button>
              <button
                onClick={() => handleShortcutClick('models')}
                className="px-3 py-1.5 rounded-lg bg-[#132B40] hover:bg-[#1C3D5A] text-slate-200 border border-slate-700/60 transition-colors inline-flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>بحث بالموديل والمعالج</span>
              </button>
            </div>
          </div>

          {/* Trust Strip Metrics */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                +{firmwares.length}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">فلاشة وسوفت وير معتمد</p>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#0FAF9B] font-mono tracking-tight">
                {brands.length}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">علامة تجارية كبرى</p>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                +{models.length}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">موديل ريسيفر مفهرس</p>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#E5A54B] font-mono tracking-tight">
                100%
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">توافق البوت لودر وفحص الأخطاء</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#0FAF9B] tracking-wider uppercase">
              الشركات المصنعة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1825] mt-1">
              اختار شركة الريسيفر
            </h2>
            <p className="text-sm text-[#6B7D8D] mt-1">
              تصفح الملفات والفلاشات حسب الشركة المصنعة لجهازك
            </p>
          </div>
          <button
            onClick={() => navigateTo('brands')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1825] hover:text-[#0FAF9B] transition-colors"
          >
            <span>عرض كل الشركات ({brands.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Tiles with Custom Typographic Identities */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((brand) => {
            const brandModels = models.filter((m) => m.brandId === brand.id);
            const brandFws = firmwares.filter((f) => f.brandId === brand.id && f.status === 'published');
            return (
              <div
                key={brand.id}
                onClick={() => navigateTo('brand-details', { brandId: brand.id })}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#0FAF9B]/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top monogram badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-base text-white shadow-xs"
                      style={{ backgroundColor: brand.accentColor }}
                    >
                      {brand.symbol}
                    </div>
                    <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      {brandFws.length} ملف
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[#0B1825] group-hover:text-[#0FAF9B] transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-mono text-[#6B7D8D] mt-0.5">
                    {brand.nameEn}
                  </p>

                  <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{brandModels.length} موديل مسجل</span>
                  <span className="text-[#0FAF9B] font-semibold group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                    تصفح
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LATEST FIRMWARE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#0FAF9B] tracking-wider uppercase">
              تحديثات مستمرة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1825] mt-1">
              أحدث الفلاشات المضافة
            </h2>
            <p className="text-sm text-[#6B7D8D] mt-1">
              ملفات السوفت وير والدامبات الأصلية المحدثة لهذا الأسبوع
            </p>
          </div>
          <button
            onClick={() => navigateTo('library')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1825] hover:text-[#0FAF9B] transition-colors"
          >
            <span>فتح مكتبة الفلاشات كاملة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Rich Firmware Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestFirmwares.map((fw) => {
            const brand = brands.find((b) => b.id === fw.brandId);
            const model = models.find((m) => m.id === fw.modelId);

            return (
              <div
                key={fw.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6">
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-[#6B7D8D] mb-3">
                    <span className="font-semibold text-[#0FAF9B]">{fw.type}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span>{fw.fileFormat}</span>
                      <span>·</span>
                      <span>{fw.fileSize}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                    className="font-bold text-base text-[#0B1825] hover:text-[#0FAF9B] transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {fw.title}
                  </h3>

                  {/* Device and Hardware Specs */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
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
                      <span className="text-slate-600 text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">
                        {fw.boardNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-400">المعالج:</span>
                      <span className="text-slate-600 text-[11px]">{fw.chipset}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                    className="text-xs font-semibold text-slate-600 hover:text-[#0B1825] transition-colors"
                  >
                    تفاصيل الملف والتعليمات
                  </button>
                  <button
                    type="button"
                    onClick={() => openDownloadModal(fw)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0FAF9B]" />
                    <span>تحميل</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION — CREATIVE EDITORIAL PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#132B40] text-white rounded-3xl p-8 sm:p-12 border border-[#0FAF9B]/20 relative overflow-hidden">
          {/* Subtle background circuit wave */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0FAF9B]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-[#0FAF9B] tracking-wider uppercase">
              دليل الاستخدام السريع
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              كيف تقوم بتحديث ريسيفرك أو إنقاذه بأمان؟
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              ثلاث خطوات هندسية بسيطة لضمان تنزيل الفلاشة الصحيحة وتفادي أي أخطاء في السوفت وير.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-[#0B1825]/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#0FAF9B]/10 text-[#0FAF9B] border border-[#0FAF9B]/30 flex items-center justify-center font-mono font-bold text-lg">
                  01
                </span>
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-lg text-white">ابحث عن جهازك</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                استخدم شريط البحث واكتب اسم الشركة أو موديل الريسيفر، أو افتح غطاء الجهاز واقرأ رقم البوردة المطبوع على اللوحة الأم.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0B1825]/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#E5A54B]/10 text-[#E5A54B] border border-[#E5A54B]/30 flex items-center justify-center font-mono font-bold text-lg">
                  02
                </span>
                <Microchip className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-lg text-white">اختار الفلاشة المناسبة</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                قارن المعالج (Ali, GX, Sunplus) وتاريخ الإصدار وحجم الفلاشة (4M أو 8M أو 16M) ونوع الملف (سوفت رسمي أو دامب إنقاذ بالمبرمجة).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0B1825]/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-lg">
                  03
                </span>
                <Download className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-lg text-white">راجع التفاصيل وحمّل الملف</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                اطلع على تعليمات التمرير باللودر أو الفلاشة USB، وقم بالتنزيل بأعلى سرعة من خوادمنا الفورية والمفحوصة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & COMPATIBILITY SECTION — TECHNICAL BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-[#E5A54B]" />
              <span>قاعدة ذهبية لجميع فنيي الستالايت والصيانة</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1825] leading-snug">
              الفلاشة الصح بتبدأ من معرفة موديل جهازك ورقم البوردة
            </h2>

            <p className="text-sm text-[#6B7D8D] leading-relaxed">
              تحميل سوفت وير غير متطابق بنسبة 100% قد يؤدي إلى فقدان الإشارة أو تلف البوت لودر أو عطل اللمبة الحمراء الشهير. في منصة أسد السات، نقوم بتوثيق كل ملف بالمعالج ورقم البوردة ونوع التيونر.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FAF9B] shrink-0 mt-1" />
                <div className="text-xs text-slate-700">
                  <strong className="text-[#0B1825]">مطابقة رقم اللوحة الأم (Board ID):</strong> ابحث عن الأرقام المحفورة على لوحة الـ PCB مثل (GS3201BA أو MP2_1506TV) للتأكد التام من تطابق الهاردوير.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FAF9B] shrink-0 mt-1" />
                <div className="text-xs text-slate-700">
                  <strong className="text-[#0B1825]">حجم شريحة الـ SPI Flash:</strong> لا تقم أبداً بتمرير سوفت وير 8 ميجا لجهاز يحمل شريحة 4 ميجا حتى لا يتوقف الجهاز عن الإقلاع.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FAF9B] shrink-0 mt-1" />
                <div className="text-xs text-slate-700">
                  <strong className="text-[#0B1825]">فحص سلامة الـ Checksum:</strong> جميع ملفات أسد السات يتم التحقق من بصمتها وتجربتها مسبقاً على أجهزة حقيقية.
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('library')}
                className="px-6 py-3 bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                تصفح الفلاشات الآمنة الآن
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                استفسار فني عن جهازك
              </button>
            </div>
          </div>

          {/* Technical Receiver Architecture Graphic */}
          <div className="lg:col-span-5 bg-[#0B1825] rounded-2xl p-6 text-white border border-[#132B40] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0FAF9B]" />
                <span className="text-xs font-bold font-mono">SPECIFICATION DIAGRAM</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">ASAD-SAT LAB</span>
            </div>

            {/* Motherboard Layout Mock Component */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#132B40]/70 rounded-xl border border-slate-700">
                <div className="text-[#E5A54B] text-[11px] font-semibold">MAIN SOC PROCESSOR</div>
                <div className="text-sm font-bold text-white mt-0.5">Ali 3511 / GX6605S / SP1506TV</div>
                <div className="text-[10px] text-slate-400 mt-1">32-Bit Dual Threading Core Architecture</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#132B40]/70 rounded-xl border border-slate-700">
                  <div className="text-[#0FAF9B] text-[11px] font-semibold">SPI FLASH MEMORY</div>
                  <div className="font-bold text-white mt-0.5">Winbond 25Q64 / 32</div>
                  <div className="text-[10px] text-slate-400">4MB / 8MB / 16MB</div>
                </div>
                <div className="p-3 bg-[#132B40]/70 rounded-xl border border-slate-700">
                  <div className="text-blue-400 text-[11px] font-semibold">TUNER MODULE</div>
                  <div className="font-bold text-white mt-0.5">DVB-S2 Multistream</div>
                  <div className="text-[10px] text-slate-400">950MHz ~ 2150MHz</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>بروتوكول البوت: Safe Boot v2.4</span>
                <span className="text-emerald-400 font-bold">COMPATIBLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
