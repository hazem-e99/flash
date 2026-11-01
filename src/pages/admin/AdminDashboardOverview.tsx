import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from './AdminLayout';
import { 
  HardDrive, 
  Layers, 
  Cpu, 
  Plus, 
  ArrowLeft, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Server
} from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const { firmwares, brands, models, navigateTo, toggleFirmwareStatus } = useApp();

  const publishedCount = firmwares.filter((f) => f.status === 'published').length;
  const draftCount = firmwares.filter((f) => f.status === 'draft').length;
  const recentFirmwares = firmwares.slice(0, 5);

  return (
    <AdminLayout
      title="نظرة عامة على لوحة الإدارة"
      subtitle="إدارة وتحديث محتوى مكتبة فلاشات أسد السات والتحكم في النشر"
      actionButton={
        <button
          type="button"
          onClick={() => navigateTo('admin-add-firmware')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#0FAF9B]" />
          <span>إضافة فلاشة جديدة</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* STATS METRIC TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold text-slate-600">إجمالي الفلاشات</span>
              <HardDrive className="w-4 h-4 text-[#0FAF9B]" />
            </div>
            <div className="text-2xl font-black text-[#0B1825] font-mono">
              {firmwares.length}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="text-emerald-600 font-bold">{publishedCount} منشور</span>
              <span>·</span>
              <span>{draftCount} مسودة</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold text-slate-600">الشركات المسجلة</span>
              <Layers className="w-4 h-4 text-[#E5A54B]" />
            </div>
            <div className="text-2xl font-black text-[#0B1825] font-mono">
              {brands.length}
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Starsat, Tiger, Geant, Sunplus...
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold text-slate-600">موديلات الأجهزة</span>
              <Cpu className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-[#0B1825] font-mono">
              {models.length}
            </div>
            <p className="text-[11px] text-slate-400">
              مفهرسة بالمعالج ورقم البوردة
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold text-slate-600">المساحة التخزينية</span>
              <Server className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-[#0B1825] font-mono">
              1.84 GB
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              متاح 23.16 GB متبقية
            </p>
          </div>
        </div>

        {/* QUICK MANAGEMENT SHORTCUTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => navigateTo('admin-firmware')}
            className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-[#0FAF9B]/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-sm text-[#0B1825]">إدارة الفلاشات والسوفتات</h4>
              <p className="text-xs text-[#6B7D8D] mt-0.5">تعديل، نشر، أو حذف ملفات الأجهزة</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-slate-400" />
          </div>

          <div
            onClick={() => navigateTo('admin-brands')}
            className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-[#0FAF9B]/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-sm text-[#0B1825]">إدارة شركات الريسيفر</h4>
              <p className="text-xs text-[#6B7D8D] mt-0.5">إضافة أو تعديل أسماء الشركات والرموز</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-slate-400" />
          </div>

          <div
            onClick={() => navigateTo('admin-models')}
            className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-[#0FAF9B]/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-sm text-[#0B1825]">إدارة موديلات الأجهزة</h4>
              <p className="text-xs text-[#6B7D8D] mt-0.5">تخصيص المعالجات وأرقام البوردات</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* RECENTLY ADDED FIRMWARES TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#0B1825]">أحدث الفلاشات المسجلة</h3>
              <p className="text-xs text-[#6B7D8D] mt-0.5">آخر 5 ملفات تم إضافتها أو تعديلها</p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('admin-firmware')}
              className="text-xs font-bold text-[#0FAF9B] hover:underline"
            >
              عرض كل الفلاشات ({firmwares.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold">
                <tr>
                  <th className="p-4">اسم الفلاشة</th>
                  <th className="p-4">الشركة والموديل</th>
                  <th className="p-4">البوردة</th>
                  <th className="p-4">الحجم</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentFirmwares.map((fw) => {
                  const brand = brands.find((b) => b.id === fw.brandId);
                  const model = models.find((m) => m.id === fw.modelId);

                  return (
                    <tr key={fw.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-semibold text-[#0B1825] max-w-xs truncate">
                        {fw.title}
                      </td>
                      <td className="p-4 text-slate-600 font-mono">
                        {brand?.name} · {model?.name}
                      </td>
                      <td className="p-4 font-mono text-slate-500">
                        {fw.boardNumber}
                      </td>
                      <td className="p-4 font-mono text-slate-500">
                        {fw.fileSize}
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => toggleFirmwareStatus(fw.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                            fw.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {fw.status === 'published' ? 'منشور' : 'مسودة'}
                        </button>
                      </td>
                      <td className="p-4 text-left">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                            title="معاينة"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
