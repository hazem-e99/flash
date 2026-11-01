import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from './AdminLayout';
import { ReceiverBrand } from '../../types';
import { Plus, Search, Edit3, Trash2, X, Check, Layers } from 'lucide-react';

export const AdminManageBrands: React.FC = () => {
  const { brands, models, firmwares, addBrand, updateBrand, deleteBrand, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<ReceiverBrand | null>(null);

  const [form, setForm] = useState({
    name: '',
    nameEn: '',
    country: 'عالمي',
    description: '',
    accentColor: '#0FAF9B',
    symbol: 'ST',
  });

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.nameEn.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingBrand(null);
    setForm({
      name: '',
      nameEn: '',
      country: 'مصر / دبي',
      description: '',
      accentColor: '#0FAF9B',
      symbol: 'NEW',
    });
    setModalOpen(true);
  };

  const openEditModal = (b: ReceiverBrand) => {
    setEditingBrand(b);
    setForm({
      name: b.name,
      nameEn: b.nameEn,
      country: b.country,
      description: b.description,
      accentColor: b.accentColor,
      symbol: b.symbol,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.nameEn.trim()) {
      showToast('يرجى كتابة اسم الشركة بالعربية والإنجليزية', 'warning');
      return;
    }

    if (editingBrand) {
      updateBrand(editingBrand.id, form);
    } else {
      addBrand(form);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف شركة ${name}؟`)) {
      deleteBrand(id);
    }
  };

  return (
    <AdminLayout
      title="إدارة شركات أجهزة الاستقبال"
      subtitle={`إجمالي الشركات المسجلة: ${brands.length} شركة`}
      actionButton={
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#0FAF9B]" />
          <span>إضافة شركة جديدة</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search Header */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن اسم الشركة..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B] pr-8"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
          </div>
        </div>

        {/* Brands Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">الرمز والشعار</th>
                <th className="p-4">اسم الشركة</th>
                <th className="p-4">بلد المنشأ / التوزيع</th>
                <th className="p-4">الموديلات المسجلة</th>
                <th className="p-4">الفلاشات المتوفرة</th>
                <th className="p-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBrands.map((b) => {
                const brandModelsCount = models.filter((m) => m.brandId === b.id).length;
                const brandFwCount = firmwares.filter((f) => f.brandId === b.id).length;

                return (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-white text-xs shadow-2xs"
                        style={{ backgroundColor: b.accentColor }}
                      >
                        {b.symbol}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-[#0B1825] block text-sm">{b.name}</span>
                      <span className="text-[11px] font-mono text-slate-500 block">{b.nameEn}</span>
                    </td>
                    <td className="p-4 text-slate-600">{b.country}</td>
                    <td className="p-4 font-mono font-bold text-slate-700">{brandModelsCount} موديل</td>
                    <td className="p-4 font-mono font-bold text-[#0FAF9B]">{brandFwCount} ملف</td>
                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(b)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="تعديل الشركة"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(b.id, b.name)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50"
                          title="حذف الشركة"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1825]/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-right space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#0B1825]">
                {editingBrand ? 'تعديل بيانات الشركة' : 'إضافة شركة جديدة'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">اسم الشركة بالعربية *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: ستار سات"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">الاسم بالإنجليزية *</label>
                <input
                  type="text"
                  required
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  placeholder="مثال: Starsat"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">رمز الحرفين (Monogram)</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={form.symbol}
                    onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold focus:outline-none text-center"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">لون التمييز</label>
                  <input
                    type="color"
                    value={form.accentColor}
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                    className="w-full h-9 rounded-xl border border-slate-200 cursor-pointer p-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">بلد المنشأ أو التوزيع</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="مثال: الأردن / دبي"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">الوصف المختصر</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="نبذة عن الشركة والأجهزة..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1825] hover:bg-[#132B40] text-white rounded-xl font-bold"
                >
                  حفظ في الدليل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
