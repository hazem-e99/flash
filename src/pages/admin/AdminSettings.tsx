import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from './AdminLayout';
import { Logo } from '../../components/Logo';
import { Save, RotateCcw, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetAllDemoData, showToast } = useApp();

  const [form, setForm] = useState({
    siteName: settings.siteName,
    siteNameEn: settings.siteNameEn,
    tagline: settings.tagline,
    announcementText: settings.announcementText,
    isAnnouncementActive: settings.isAnnouncementActive,
    contactEmail: settings.contactEmail,
    telegramChannel: settings.telegramChannel,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  const handleReset = () => {
    if (window.confirm('هل تريد استعادة جميع بيانات النسخة التجريبية إلى حالتها الأصلية؟')) {
      resetAllDemoData();
      setForm({
        siteName: 'أسد السات',
        siteNameEn: 'ASAD AL SAT',
        tagline: 'المكتبة المتكاملة لفلاشات وسوفت وير أجهزة الريسيفر والستالايت والدعم الفني',
        announcementText: 'مرحباً بك في النسخة الاستعراضية لموقع أسد السات.',
        isAnnouncementActive: true,
        contactEmail: 'support@asadalsat.com',
        telegramChannel: 'https://t.me/asadalsat_support',
      });
    }
  };

  return (
    <AdminLayout
      title="إعدادات المنصة والموقع"
      subtitle="تخصيص الهوية النصية، بيانات التواصل، وإدارة حالة النسخة التجريبية"
    >
      <div className="space-y-8 max-w-3xl">
        {/* Brand identity preview */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-[#0B1825] border-b border-slate-100 pb-3">
            معاينة الهوية البصرية الحالية
          </h2>
          <div className="p-6 bg-slate-50 rounded-2xl flex flex-wrap items-center justify-around gap-6">
            <Logo size="lg" theme="light" variant="full" />
            <Logo size="lg" theme="dark" variant="full" className="bg-[#0B1825] p-3 rounded-2xl" />
          </div>
        </div>

        {/* Form settings */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
          <h2 className="text-base font-bold text-[#0B1825] border-b border-slate-100 pb-3">
            بيانات الموقع الرئيسية
          </h2>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">اسم الموقع بالعربية</label>
                <input
                  type="text"
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">اسم الموقع بالإنجليزية</label>
                <input
                  type="text"
                  value={form.siteNameEn}
                  onChange={(e) => setForm({ ...form, siteNameEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-mono focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">الشعار والوصف التعريفي (Tagline)</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0FAF9B]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">نص الشريط الإعلاني العلوي</label>
              <textarea
                rows={2}
                value={form.announcementText}
                onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#0FAF9B]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="announcement-toggle"
                checked={form.isAnnouncementActive}
                onChange={(e) => setForm({ ...form, isAnnouncementActive: e.target.checked })}
                className="w-4 h-4 rounded text-[#0FAF9B] accent-[#0FAF9B]"
              />
              <label htmlFor="announcement-toggle" className="font-semibold text-slate-700 cursor-pointer">
                تفعيل ظهور الشريط الإعلاني أعلى الموقع
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#0FAF9B]" />
              <span>حفظ الإعدادات</span>
            </button>
          </div>
        </form>

        {/* Demo reset card */}
        <div className="bg-red-50/50 border border-red-200 rounded-3xl p-6 space-y-4 text-xs text-red-950">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-red-900">إعادة تعيين بيانات العرض (Reset Demo Data)</h3>
              <p className="text-slate-600 leading-relaxed">
                إذا قمت بإجراء تجارب متعددة بإضافة أو حذف فلاشات وشركات وترغب في إرجاع المنصة لحالتها الأولية النظيفة مع كافة الفلاشات والموديلات التجريبية، اضغط الزر أدناه.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط البيانات الأولية الآن</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
