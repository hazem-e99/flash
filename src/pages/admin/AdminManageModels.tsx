import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from './AdminLayout';
import { ReceiverModel } from '../../types';
import { Plus, Search, Edit3, Trash2, X, Cpu } from 'lucide-react';

export const AdminManageModels: React.FC = () => {
  const { models, brands, firmwares, addModel, updateModel, deleteModel, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<ReceiverModel | null>(null);

  const [form, setForm] = useState({
    name: '',
    brandId: brands[0]?.id || 'starsat',
    processor: 'Ali 3511 Dual Core',
    flashSize: '8 MB',
    boardId: 'GS3201BA-V1.0',
    tunerType: 'DVB-S2 Full HD',
    releaseYear: 2023,
    description: '',
  });

  const filteredModels = models.filter((m) => {
    if (selectedBrand !== 'all' && m.brandId !== selectedBrand) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const brand = brands.find((b) => b.id === m.brandId);
      return (
        m.name.toLowerCase().includes(q) ||
        m.processor.toLowerCase().includes(q) ||
        m.boardId.toLowerCase().includes(q) ||
        brand?.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openAddModal = () => {
    setEditingModel(null);
    setForm({
      name: '',
      brandId: brands[0]?.id || 'starsat',
      processor: 'Sunplus 1506TV',
      flashSize: '4 MB',
      boardId: 'MP2-1506TV-V1.2',
      tunerType: 'DVB-S2 HD',
      releaseYear: 2023,
      description: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (m: ReceiverModel) => {
    setEditingModel(m);
    setForm({
      name: m.name,
      brandId: m.brandId,
      processor: m.processor,
      flashSize: m.flashSize,
      boardId: m.boardId,
      tunerType: m.tunerType,
      releaseYear: m.releaseYear,
      description: m.description,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.boardId.trim()) {
      showToast('يرجى ملء اسم الموديل ورقم البوردة المعتمد', 'warning');
      return;
    }

    if (editingModel) {
      updateModel(editingModel.id, form);
    } else {
      addModel(form);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف موديل ${name}؟`)) {
      deleteModel(id);
    }
  };

  return (
    <AdminLayout
      title="إدارة موديلات أجهزة الريسيفر"
      subtitle={`إجمالي الموديلات المسجلة: ${models.length} موديل`}
      actionButton={
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1825] hover:bg-[#132B40] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#0FAF9B]" />
          <span>إضافة موديل جديد</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالموديل، البوردة، المعالج..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B] pr-8"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
          </div>

          <div>
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
          </div>
        </div>

        {/* Models Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">اسم الموديل</th>
                <th className="p-4">الشركة</th>
                <th className="p-4">المعالج (Processor)</th>
                <th className="p-4">رقم البوردة (Board ID)</th>
                <th className="p-4">حجم الفلاشة</th>
                <th className="p-4">السنة</th>
                <th className="p-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredModels.map((m) => {
                const brand = brands.find((b) => b.id === m.brandId);

                return (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-[#0B1825]">
                      {m.name}
                    </td>
                    <td className="p-4 font-sans font-semibold text-slate-700">
                      {brand?.name}
                    </td>
                    <td className="p-4 text-slate-600">
                      {m.processor}
                    </td>
                    <td className="p-4 text-[#0FAF9B] font-bold">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                        {m.boardId}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {m.flashSize}
                    </td>
                    <td className="p-4 text-slate-500">
                      {m.releaseYear}
                    </td>
                    <td className="p-4 text-left font-sans">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(m)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="تعديل الموديل"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(m.id, m.name)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50"
                          title="حذف الموديل"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-right space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#0B1825]">
                {editingModel ? 'تعديل بيانات الموديل' : 'إضافة موديل ريسيفر جديد'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">اسم الموديل التجاري *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="مثال: Starsat SR-2000HD Hyper"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-[#0FAF9B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">الشركة المصنعة</label>
                  <select
                    value={form.brandId}
                    onChange={(e) => setForm({ ...form, brandId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1 font-sans">المعالج (Processor)</label>
                  <input
                    type="text"
                    value={form.processor}
                    onChange={(e) => setForm({ ...form, processor: e.target.value })}
                    placeholder="Ali 3511 أو Sunplus 1506TV"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1 font-sans">رقم البوردة (Board ID) *</label>
                  <input
                    type="text"
                    required
                    value={form.boardId}
                    onChange={(e) => setForm({ ...form, boardId: e.target.value })}
                    placeholder="GS3201BA أو MP2_1506TV"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none font-bold text-[#0FAF9B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">حجم الفلاشة</label>
                  <input
                    type="text"
                    value={form.flashSize}
                    onChange={(e) => setForm({ ...form, flashSize: e.target.value })}
                    placeholder="4 MB أو 8 MB"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">نوع التيونر</label>
                  <input
                    type="text"
                    value={form.tunerType}
                    onChange={(e) => setForm({ ...form, tunerType: e.target.value })}
                    placeholder="DVB-S2 Multistream"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">سنة الإصدار</label>
                  <input
                    type="number"
                    value={form.releaseYear}
                    onChange={(e) => setForm({ ...form, releaseYear: parseInt(e.target.value) || 2023 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">الوصف والملاحظات</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="ملاحظات فنية عن الريسيفر..."
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
                  حفظ الموديل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
