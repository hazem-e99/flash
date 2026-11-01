import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Cpu, 
  Award, 
  Layers, 
  HardDrive, 
  CheckCircle2, 
  Radio, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="pb-16" dir="rtl">
      {/* Editorial Header */}
      <section className="bg-[#0B1825] text-white py-16 border-b border-[#132B40]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#132B40] text-xs font-semibold text-[#0FAF9B] border border-[#0FAF9B]/30">
            <Radio className="w-3.5 h-3.5" />
            <span>عن منصة أسد السات التقنية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            نحمي أجهزة الاستقبال... ونبسط وصول الفنيين للفلاشات
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            تأسست منصة «أسد السات» بهدف بناء أرشيف تقني عربي موثوق يجمع فلاشات ودامبات وسوفت وير أجهزة الريسيفر، بعد فحصها واختبارها هندسياً لإنقاذ الأجهزة من التلف.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#0FAF9B] uppercase tracking-wider">
              رؤيتنا التقنية
            </span>
            <h2 className="text-2xl font-black text-[#0B1825]">
              لماذا أسد السات؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              لسنوات طويلة، عانى فنيو ومهندسو صيانة الستالايت في الوطن العربي من فوضى المنتديات العشوائية، والروابط التالفة، والفلاشات الملغومة أو غير المتطابقة التي تتسبب في حرق اللوحات الأم وتوقف معالجات الاستقبال عن الإقلاع.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              جاءت منصة أسد السات لتقدم حلاً جذرياً: تصنيف دقيق بحسب المعالج (Ali, GX, Sunplus)، مطابقة صريحة لرقم البوردة (Board ID)، وفحص دوري للبوت لودر، مع خوادم تحميل فورية ومباشرة.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-[#0B1825]">ركائزنا في العمل الهندسي</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FAF9B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">فحص البوت النظيف 100%:</strong>
                  <span className="text-slate-500">سحب الدامبات بمبرمجات احترافية (RT809H و CH341A) دون أي تلاعب في أكواد الحماية.</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FAF9B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">توثيق رقم البوردة:</strong>
                  <span className="text-slate-500">لا نكتفي باسم الموديل التجاري، بل نوثق رقم لوحة الدوائر المطبوعة (Hardware Revision).</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0FAF9B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-800 block">تحديثات مستمرة لملفات القنوات:</strong>
                  <span className="text-slate-500">تحديث أسبوعي لكافة الترددات الجديدة على النايل سات والأقمار الرياضية.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Capabilities Matrix */}
        <div className="bg-[#132B40] text-white rounded-3xl p-8 sm:p-10 border border-[#0FAF9B]/20 space-y-8">
          <div>
            <span className="text-xs font-bold text-[#0FAF9B] uppercase tracking-wider">
              تغطية المعالجات
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              المعالجات والشرائح المدعومة في الأرشيف
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              ندعم أكثر من 95% من شرائح أجهزة الاستقبال الفضائي المتداولة في المنطقة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0B1825]/90 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-[#0FAF9B] font-mono">Ali Micro</span>
              <h4 className="font-bold text-white text-sm">Ali 3511 / 3516 / 2661</h4>
              <p className="text-[11px] text-slate-400">فلاشات 8MB و 16MB لأجهزة الهاي كلاس والفور كيه مع دعم خاصية Multistream.</p>
            </div>
            <div className="bg-[#0B1825]/90 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-[#E5A54B] font-mono">Sunplus Family</span>
              <h4 className="font-bold text-white text-sm">1506TV / 1507A / 2507</h4>
              <p className="text-[11px] text-slate-400">أكثر المعالجات شيوعاً بالشرق الأوسط، تحويلات مدمجة ودامبات لحل مشكلة Load.</p>
            </div>
            <div className="bg-[#0B1825]/90 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-blue-400 font-mono">NationalChip</span>
              <h4 className="font-bold text-white text-sm">GX6605S / GX6621</h4>
              <p className="text-[11px] text-slate-400">معالجات الجي إكس السريعة ذات الصورة فائقة النقاء وفلاشات SPI بسعة 4MB و 16MB.</p>
            </div>
            <div className="bg-[#0B1825]/90 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">HiSilicon</span>
              <h4 className="font-bold text-white text-sm">Hi3798MV200 4K</h4>
              <p className="text-[11px] text-slate-400">أنظمة أندرويد 4K المتطورة، رومات RomUpdate كاملة لإنقاذ شاشات التوقف.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-xl font-bold text-[#0B1825]">
            تبحث عن فلاشة محددة أو تريد استشارة مهندس؟
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            فريق أسد السات التقني يرحب بطلبات الفلاشات النادرة واستفسارات مطابقة البوردات.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('library')}
              className="px-6 py-2.5 bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold rounded-xl transition-colors"
            >
              تصفح مكتبة الفلاشات
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              إرسال طلب فلاشة نادرة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
