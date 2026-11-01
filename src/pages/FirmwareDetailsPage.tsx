import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Download, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  FileCheck, 
  HardDrive, 
  Clock, 
  Terminal, 
  Share2, 
  CheckCircle2,
  FileCode,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const FirmwareDetailsPage: React.FC = () => {
  const { 
    selectedFirmwareId, 
    firmwares, 
    brands, 
    models, 
    navigateTo, 
    openDownloadModal,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'info' | 'install' | 'changelog'>('info');

  // Fallback if no firmware selected
  const firmware = firmwares.find((f) => f.id === selectedFirmwareId) || firmwares[0];
  const brand = brands.find((b) => b.id === firmware?.brandId);
  const model = models.find((m) => m.id === firmware?.modelId);

  // Related firmwares (same brand or same chipset)
  const relatedFirmwares = firmwares
    .filter(
      (f) =>
        f.id !== firmware?.id &&
        (f.brandId === firmware?.brandId || f.chipset === firmware?.chipset) &&
        f.status === 'published'
    )
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('تم نسخ رابط صفحة الفلاشة للمشاركة', 'success');
  };

  if (!firmware) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center" dir="rtl">
        <p className="text-slate-600">الملف غير موجود.</p>
        <button
          onClick={() => navigateTo('library')}
          className="mt-4 px-4 py-2 bg-[#0B1825] text-white text-xs font-bold rounded-xl"
        >
          العودة للمكتبة
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7D8D] mb-6 font-medium">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-[#0B1825] transition-colors"
        >
          الرئيسية
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('library')}
          className="hover:text-[#0B1825] transition-colors"
        >
          مكتبة الفلاشات
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('brand-details', { brandId: brand?.id })}
          className="hover:text-[#0B1825] transition-colors font-semibold text-slate-700"
        >
          {brand?.name}
        </button>
        <span>/</span>
        <span className="text-slate-400 truncate max-w-xs">{firmware.title}</span>
      </div>

      {/* TWO-COLUMN PRODUCTION TECHNICAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAIN TECHNICAL DETAILS COLUMN (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7D8D] mb-3">
                <span className="font-semibold text-[#0FAF9B]">{firmware.type}</span>
                <span>·</span>
                <span className="font-medium text-slate-700">{brand?.name}</span>
                <span>·</span>
                <span className="font-mono">{model?.name}</span>
                <span>·</span>
                <span className="font-mono text-slate-500">تم الرفع: {firmware.uploadDate}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1825] leading-snug">
                {firmware.title}
              </h1>
            </div>

            {/* MANDATORY ARABIC COMPATIBILITY WARNING */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-[#E5A54B] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="block font-bold mb-1">
                  تنبيه أمان الأجهزة:
                </strong>
                <p>
                  تأكد من تطابق موديل الريسيفر ورقم البوردة قبل استخدام الفلاشة، لأن تثبيت ملف غير متوافق قد يسبب مشاكل في الجهاز أو توقفه على اللمبة الحمراء.
                </p>
              </div>
            </div>

            {/* Hardware & Compatibility Matrix Table */}
            <div>
              <h3 className="text-sm font-bold text-[#0B1825] mb-3">
                جدول التوافق والمواصفات الهندسية
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block font-sans">الشركة المصنعة</span>
                  <span className="font-bold text-[#0B1825] font-sans mt-0.5 block">{brand?.name}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block font-sans">موديل الجهاز</span>
                  <span className="font-bold text-[#0B1825] mt-0.5 block">{model?.name}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block font-sans">رقم البوردة (Board ID)</span>
                  <span className="font-bold text-[#0FAF9B] mt-0.5 block">{firmware.boardNumber}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block font-sans">المعالج (Processor)</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{firmware.chipset}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block font-sans">إصدار السوفت وير</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{firmware.version}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block font-sans">صيغة الملف</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">.{firmware.fileFormat}</span>
                </div>
              </div>
            </div>

            {/* TABBED INTERFACE: Description, Changelog, Installation Guide */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('info')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'info'
                      ? 'bg-[#0B1825] text-white'
                      : 'text-slate-600 hover:text-[#0B1825]'
                  }`}
                >
                  وصف الملف وملاحظات الفحص
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('install')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'install'
                      ? 'bg-[#0B1825] text-white'
                      : 'text-slate-600 hover:text-[#0B1825]'
                  }`}
                >
                  طريقة التثبيت واللودر
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('changelog')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'changelog'
                      ? 'bg-[#0B1825] text-white'
                      : 'text-slate-600 hover:text-[#0B1825]'
                  }`}
                >
                  سجل التحديثات (Changelog)
                </button>
              </div>

              {/* Tab 1: Info */}
              {activeTab === 'info' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>{firmware.description}</p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <span className="font-bold text-[#0B1825] block">
                      فحص الجودة وسلامة البوت لودر:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>تمت مطابقة ترويسة الهيدر (Header Checksum) لكتابة الفلاشة بشكل مباشر دون أخطاء.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>خالي تماماً من الفيروسات أو ملفات التروجان الخبيثة.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>يدعم استعادة إعدادات المصنع والسيريال الأصلي للجهاز.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Install Guide */}
              {activeTab === 'install' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-[#0B1825] block mb-1">
                      اللودر أو الأداة الموصى بها:
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#0FAF9B] bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                      {firmware.loaderTool}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-[#0B1825] block mb-2">
                      خطوات التمرير:
                    </span>
                    <p className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-loose">
                      {firmware.installGuide}
                    </p>
                  </div>

                  <div className="text-xs text-slate-500">
                    * ملاحظة: يرجى عدم فصل كابل الطاقة الكهربائية أثناء تحديث الفلاشة حتى تكتمل النسبة إلى 100% ويعيد الجهاز التشغيل ذاتياً.
                  </div>
                </div>
              )}

              {/* Tab 3: Changelog */}
              {activeTab === 'changelog' && (
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-[#0B1825] block mb-2">
                    التحسينات والمزايا في هذا الإصدار ({firmware.version}):
                  </span>
                  <div className="space-y-2">
                    {firmware.changelog.map((log, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                      >
                        <span className="w-5 h-5 rounded-md bg-[#0FAF9B]/10 text-[#0FAF9B] font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {index + 1}
                        </span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RELATED FIRMWARES */}
          {relatedFirmwares.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
              <h3 className="text-base font-bold text-[#0B1825]">
                فلاشات ذات صلة لنفس العائلة والمعالج
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedFirmwares.map((rf) => (
                  <div
                    key={rf.id}
                    onClick={() => navigateTo('firmware-details', { firmwareId: rf.id })}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-[#0FAF9B] font-mono">
                        {rf.type} · {rf.fileFormat}
                      </span>
                      <h4 className="font-bold text-xs text-[#0B1825] line-clamp-2 mt-1">
                        {rf.title}
                      </h4>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{rf.fileSize}</span>
                      <span className="text-[#0FAF9B] font-sans font-bold flex items-center gap-1">
                        عرض
                        <ArrowLeft className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECONDARY SIDEBAR: PROMINENT DOWNLOAD PANEL (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0B1825] text-white rounded-3xl p-6 border border-[#132B40] shadow-xl space-y-6">
            {/* Header / File Icon */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-[#132B40] border border-[#0FAF9B]/40 flex items-center justify-center text-[#0FAF9B] shrink-0">
                <HardDrive className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#0FAF9B]">
                  {firmware.fileFormat} ARCHIVE
                </span>
                <h3 className="font-bold text-lg text-white font-mono mt-0.5">
                  {firmware.fileSize}
                </h3>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="space-y-2.5 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">الإصدار:</span>
                <span className="font-bold text-white">{firmware.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">تاريخ التحديث:</span>
                <span className="text-slate-300">{firmware.uploadDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">مرات التنزيل:</span>
                <span className="text-slate-300">{firmware.downloadsCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">نوع الفلاشة:</span>
                <span className="text-[#0FAF9B] font-bold font-sans">{firmware.type}</span>
              </div>
            </div>

            {/* Primary Download Button (Triggers Demo Arabic Notice Modal) */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => openDownloadModal(firmware)}
                className="w-full py-4 px-6 bg-[#0FAF9B] hover:bg-[#0B796B] text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>تحميل الفلاشة الآن</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 bg-[#132B40] hover:bg-[#1C3D5A] text-slate-200 text-xs font-semibold rounded-xl border border-slate-700/80 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>نسخ رابط الفلاشة</span>
              </button>
            </div>

            {/* Safety & Demo Verification notice */}
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>فحص الفلاشة نظيف 100% ومجرب على جهاز حي</span>
              </div>
              <p className="leading-relaxed">
                ملاحظة للمعاينة: هذا الزر استعراضي تفاعلي لتقديم تجربة تصفح واقعية للعميل.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
