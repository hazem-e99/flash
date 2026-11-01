import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  ShieldAlert, 
  Radio, 
  CheckCircle2,
  Clock,
  Mail
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, brands } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: 'starsat',
    modelName: '',
    boardNumber: '',
    issueType: 'red_light',
    details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.modelName || !formData.name) {
      showToast('يرجى ملء اسمك وموديل الريسيفر المطلوب', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('تم تسجيل طلب الفلاشة بنجاح في النسخة التجريبية! سيقوم الفريق بمراجعته.', 'success');
      setFormData({
        name: '',
        email: '',
        brand: 'starsat',
        modelName: '',
        boardNumber: '',
        issueType: 'red_light',
        details: ''
      });
    }, 600);
  };

  const faqs = [
    {
      q: 'كيف أعرف رقم البوردة (Board ID) الدقيق لريسيفري؟',
      a: 'قم بفصل الجهاز عن الكهرباء، ثم افتح الغطاء البلاستيكي أو المعدني العلوي بحذر. ستجد رقماً محفوراً بلون أبيض أو ذهبي على اللوحة الخضراء بجوار المعالج أو فلاشة الـ SPI (مثل: GS3201BA أو MP2_1506TV_V1.1). هذا الرقم هو المرجع النهائي لمطابقة الفلاشة.'
    },
    {
      q: 'ما هو الفرق بين السوفت الرسمي والدامب الخام (Dump)؟',
      a: 'السوفت الرسمي هو ملف مخصص للتحديث عبر منفذ USB، ويحتوي على أجزاء النظام المحدثة فقط. بينما الدامب (Dump) هو نسخة متطابقة 100% من كامل شريحة الفلاشة (تشمل البوت لودر، تعريفات التيونر، وتوزيع الذاكرة)، ويستخدم لشحن الفلاشة بالمبرمجة لإنقاذ الأجهزة الميتة.'
    },
    {
      q: 'جهازي متوقف على اللمبة الحمراء بعد تمرير سوفت وير خاطئ، ما الحل؟',
      a: 'عطل اللمبة الحمراء ينتج عن تدمير كود الإقلاع (Bootloader) أو تمرير سوفت بحجم غير مطابق (مثل تمرير 8M لشريحة 4M). الحل هو تحميل "دامب أصلي خام" مطابق لرقم البوردة وكتابته عبر مبرمجة CH341A أو اللودر الخاص بنوع المعالج (Ali أو Sunplus أو GX).'
    },
    {
      q: 'هل فلاشات أجهزة الستالايت الأندرويد 4K متوفرة؟',
      a: 'نعم، نوفر ملفات RomUpdate الخاصة بأجهزة الأندرويد (مثل معالجات HiSilicon و Ali 2661)، ويتم تثبيتها عبر وضع الريكفري Recovery Mode بإعادة التشغيل مع استمرار الضغط على زر التشغيل (Power).'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 mb-10">
        <span className="text-xs font-bold text-[#0FAF9B] tracking-wider uppercase">
          الدعم الهندسي
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1825] mt-1">
          طلب فلاشة نادرة والدعم الفني
        </h1>
        <p className="text-sm text-[#6B7D8D] mt-2 max-w-2xl leading-relaxed">
          لم تجد سوفت وير أو دامب جهازك في المكتبة؟ أرسل تفاصيل البوردة وسيقوم مهندسو أسد السات بالبحث عنها وسحبها من الأرشيف الهندسي.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* REQUEST FORM (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Radio className="w-5 h-5 text-[#0FAF9B]" />
            <h2 className="text-lg font-bold text-[#0B1825]">
              نموذج طلب فلاشة أو دامب غير مدرج
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  اسمك الكريم <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="المهندس / الفني..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  البريد الإلكتروني للرد
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  الشركة المصنعة
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0FAF9B]"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.nameEn})
                    </option>
                  ))}
                  <option value="other">شركة أخرى غير مدرجة</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  موديل الريسيفر المكتوب على الواجهة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.modelName}
                  onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                  placeholder="مثال: Starsat SR-2000 Extreme"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  رقم البوردة (المطبوع على اللوحة الأم)
                </label>
                <input
                  type="text"
                  value={formData.boardNumber}
                  onChange={(e) => setFormData({ ...formData, boardNumber: e.target.value })}
                  placeholder="مثال: GS3201BA أو MP2_1506TV"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0FAF9B] font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  نوع العطل أو سبب الطلب
                </label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#0FAF9B]"
                >
                  <option value="red_light">الجهاز متوقف على لمبة حمراء (Red Light)</option>
                  <option value="load">واقف على كلمة Load أو Boot</option>
                  <option value="official_update">أريد أحدث سوفت رسمي لتجديد السيرفر</option>
                  <option value="conversion">طلب تحويل معالج لصن بلص أو تايجر</option>
                  <option value="channels">طلب أحدث ملف قنوات</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                تفاصيل إضافية أو ملاحظات خاصة
              </label>
              <textarea
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="اذكر نوع شريحة الفلاشة إذا كنت تعرفها، أو اسم اللودر المستخدم..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#0FAF9B]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#0FAF9B]" />
                <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب الفلاشة للمختبر'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* FAQ ACCORDION (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <HelpCircle className="w-5 h-5 text-[#E5A54B]" />
              <h3 className="font-bold text-base text-[#0B1825]">
                الأسئلة الشائعة حول الفلاشات
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full text-right p-4 bg-slate-50/70 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-3 text-xs font-bold text-[#0B1825]"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
