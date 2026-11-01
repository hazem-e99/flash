import React from 'react';
import { useApp } from '../context/AppContext';
import { Download, AlertTriangle, ShieldCheck, FileCheck, X, HardDrive } from 'lucide-react';

export const DownloadModal: React.FC = () => {
  const { downloadModal, closeDownloadModal, showToast } = useApp();
  const { isOpen, firmware } = downloadModal;

  if (!isOpen || !firmware) return null;

  const handleSimulateCopyHash = () => {
    navigator.clipboard?.writeText?.('SHA256: 8f9b2c4e1a0d3f7e6b5c4d3a2b1c0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3');
    showToast('تم نسخ بصمة التحقق (SHA256 Hash) للحافظة', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1825]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right"
        dir="rtl"
      >
        {/* Top Header Strip */}
        <div className="bg-[#0B1825] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#132B40] border border-[#0FAF9B]/40 flex items-center justify-center text-[#0FAF9B]">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">مركز تنزيل الفلاشات</h3>
              <p className="text-xs text-slate-300 mt-0.5">منصة أسد السات التقنية</p>
            </div>
          </div>
          <button
            onClick={closeDownloadModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* File Card info */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-[#0FAF9B] font-mono tracking-wide">
                  {firmware.fileFormat} ARCHIVE
                </span>
                <h4 className="font-bold text-[#0B1825] text-base mt-1 line-clamp-1">
                  {firmware.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#6B7D8D] font-mono">
                  <span>الإصدار: {firmware.version}</span>
                  <span>·</span>
                  <span>الحجم: {firmware.fileSize}</span>
                  <span>·</span>
                  <span>البوردة: {firmware.boardNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Requested Arabic Client Notification Callout */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#E5A54B] shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed">
              <p className="font-bold text-amber-950">إشعار النسخة الاستعراضية (Demo)</p>
              <p className="mt-1 text-xs text-amber-900">
                دي نسخة معاينة للموقع. تحميل الملفات الفعلي هيكون متاح في النسخة النهائية.
              </p>
            </div>
          </div>

          {/* Technical Hash & Security Checks */}
          <div className="text-xs space-y-2 text-[#6B7D8D] pt-1">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 font-mono text-[11px]">
              <span className="text-slate-500">SHA-256 Checksum:</span>
              <button 
                onClick={handleSimulateCopyHash}
                className="text-[#0FAF9B] hover:underline font-semibold"
              >
                نسخ كود الفحص
              </button>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>فحص الفيروسات: نظيف بنسبة 100% ومفحوص من مهندسي أسد السات</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <span>البوت لودر: بوتيبل أصلي معتمد وخالي من أخطاء الـ CRC32</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeDownloadModal}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            إغلاق النافذة
          </button>
          <button
            type="button"
            onClick={() => {
              showToast('تم تأكيد طلب التحميل في النسخة التجريبية (Demo Verified)', 'info');
              closeDownloadModal();
            }}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#0B1825] hover:bg-[#132B40] rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#0FAF9B]" />
            فهمت، متابعة المعاينة
          </button>
        </div>
      </div>
    </div>
  );
};
