import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from './AdminLayout';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Download, 
  CheckCircle2, 
  XCircle,
  FileCode,
  HardDrive
} from 'lucide-react';

export const AdminManageFirmware: React.FC = () => {
  const { 
    firmwares, 
    brands, 
    models, 
    deleteFirmware, 
    toggleFirmwareStatus, 
    navigateTo, 
    openDownloadModal,
    showToast 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all');

  const filteredFirmwares = firmwares.filter((fw) => {
    if (selectedBrand !== 'all' && fw.brandId !== selectedBrand) return false;
    if (selectedStatus !== 'all' && fw.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const brand = brands.find((b) => b.id === fw.brandId);
      const model = models.find((m) => m.id === fw.modelId);
      return (
        fw.title.toLowerCase().includes(q) ||
        fw.boardNumber.toLowerCase().includes(q) ||
        fw.chipset.toLowerCase().includes(q) ||
        brand?.name.toLowerCase().includes(q) ||
        model?.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف الفلاشة:\n${title}؟`)) {
      deleteFirmware(id);
    }
  };

  return (
    <AdminLayout
      title="إدارة فلاشات وسوفت وير الريسيفرات"
      subtitle={`إجمالي الفلاشات المسجلة: ${firmwares.length} ملف`}
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
      <div className="space-y-6">
        {/* FILTERS & SEARCH BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالاسم، البوردة، المعالج..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B] pr-8"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">جميع الشركات</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="published">المنشورة فقط</option>
              <option value="draft">المسودات فقط</option>
            </select>
          </div>
        </div>

        {/* FIRMWARE DATA TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-4">اسم الفلاشة والنوع</th>
                  <th className="p-4">الشركة والموديل</th>
                  <th className="p-4">رقم البوردة والمعالج</th>
                  <th className="p-4">الحجم والصيغة</th>
                  <th className="p-4">تاريخ الإضافة</th>
                  <th className="p-4">حالة النشر</th>
                  <th className="p-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFirmwares.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-slate-400">
                      لا توجد فلاشات مطابقة لمعايير البحث.
                    </td>
                  </tr>
                ) : (
                  filteredFirmwares.map((fw) => {
                    const brand = brands.find((b) => b.id === fw.brandId);
                    const model = models.find((m) => m.id === fw.modelId);

                    return (
                      <tr key={fw.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 max-w-xs">
                          <span className="font-bold text-[#0B1825] block truncate">
                            {fw.title}
                          </span>
                          <span className="text-[11px] text-[#0FAF9B] font-semibold mt-0.5 block">
                            {fw.type} · إصدار {fw.version}
                          </span>
                        </td>

                        <td className="p-4 font-mono">
                          <span className="font-semibold text-slate-800 block">
                            {brand?.name}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            {model?.name}
                          </span>
                        </td>

                        <td className="p-4 font-mono text-[11px]">
                          <span className="font-bold text-[#0B1825] bg-slate-100 px-1.5 py-0.5 rounded block w-fit">
                            {fw.boardNumber}
                          </span>
                          <span className="text-slate-500 mt-1 block">
                            {fw.chipset}
                          </span>
                        </td>

                        <td className="p-4 font-mono text-slate-600">
                          <span className="font-bold block">{fw.fileSize}</span>
                          <span className="text-[10px] text-slate-400 uppercase">.{fw.fileFormat}</span>
                        </td>

                        <td className="p-4 font-mono text-slate-500">
                          {fw.uploadDate}
                        </td>

                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => toggleFirmwareStatus(fw.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
                              fw.status === 'published'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${fw.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span>{fw.status === 'published' ? 'منشور' : 'مسودة'}</span>
                          </button>
                        </td>

                        <td className="p-4 text-left">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => navigateTo('firmware-details', { firmwareId: fw.id })}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                              title="معاينة الملف"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openDownloadModal(fw)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                              title="اختبار التحميل"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(fw.id, fw.title)}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50"
                              title="حذف الفلاشة"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
