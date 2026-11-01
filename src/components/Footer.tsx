import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, brands, models } = useApp();

  return (
    <footer className="bg-[#0B1825] text-slate-300 border-t border-slate-800" dir="rtl">
      {/* Top Banner with technical assurance */}
      <div className="border-b border-slate-800/80 bg-[#132B40]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0FAF9B]" />
              <span className="font-medium text-slate-200">
                أرشيف تقني موثوق: جميع الفلاشات مفحوصة البوت لودر ومطابقة لبوردات المعالجات الأصلية.
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#E5A54B]" />
                <span>دعم كامل لمعالجات Ali, Sunplus, GX, HiSilicon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" theme="dark" variant="full" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              المنصة العربية المتخصصة في أرشفة وتوفير فلاشات الريسيفرات، الدامبات الأصلية المسحوبة بالمبرمجة، وسوفت وير التحديث وأحدث ملفات القنوات لكافة الأجهزة والماركات الفضائية.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#132B40] text-xs font-semibold text-[#0FAF9B] border border-[#0FAF9B]/20">
                نسخة استعراضية متطورة (Interactive Client Demo)
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              أقسام المنصة
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('library')}
                  className="hover:text-[#0FAF9B] transition-colors"
                >
                  مكتبة الفلاشات الشاملة
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('brands')}
                  className="hover:text-[#0FAF9B] transition-colors"
                >
                  دليل الشركات المصنعة
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('models')}
                  className="hover:text-[#0FAF9B] transition-colors"
                >
                  دليل موديلات الريسيفر
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#0FAF9B] transition-colors"
                >
                  من نحن ومعايير الفحص
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#0FAF9B] transition-colors"
                >
                  طلب فلاشة نادرة أو دعم فني
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Brands */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              أبرز الشركات
            </h4>
            <ul className="space-y-2.5 text-sm">
              {brands.slice(0, 5).map((brand) => (
                <li key={brand.id}>
                  <button
                    onClick={() => navigateTo('brand-details', { brandId: brand.id })}
                    className="hover:text-[#0FAF9B] transition-colors flex items-center justify-between w-full"
                  >
                    <span>{brand.name}</span>
                    <span className="text-xs text-slate-500 font-mono">
                      {models.filter((m) => m.brandId === brand.id).length} موديل
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Notice */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              تنبيهات الاستخدام
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              يرجى دائماً مطابقة رقم البوردة (Board ID) والمعالج وحجم فلاشة SPI قبل شحن أي فلاشة أو تمرير سوفت وير، لتجنب حدوث عطل اللمبة الحمراء على جهاز الاستقبال.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => navigateTo('admin')}
                className="inline-flex items-center gap-1.5 text-xs text-[#0FAF9B] hover:underline font-semibold"
              >
                <span>دخول لوحة إدارة المحتوى</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} أسد السات — ASAD AL SAT. جميع الحقوق محفوظة لنسخة العرض التقنية.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('about')} className="hover:text-slate-300">
              سياسة الاستخدام
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-slate-300">
              الدعم الفني
            </button>
            <button onClick={() => navigateTo('admin')} className="hover:text-slate-300">
              لوحة التحكم
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
