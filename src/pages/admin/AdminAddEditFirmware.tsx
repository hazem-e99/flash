import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from './AdminLayout';
import { FirmwareType, FileFormat } from '../../types';
import { 
  ArrowRight, 
  Upload, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Save, 
  X,
  FileCode
} from 'lucide-react';

export const AdminAddEditFirmware: React.FC = () => {
  const { brands, models, addFirmware, navigateTo, showToast } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    brandId: brands[0]?.id || 'starsat',
    modelId: models[0]?.id || '',
    version: 'V1.00',
    type: 'سوفت رسمي' as FirmwareType,
    fileFormat: 'BIN' as FileFormat,
    fileSize: '4.00 MB',
    uploadDate: new Date().toISOString().split('T')[0],
    boardNumber: '',
    chipset: 'Sunplus 1506TV',
    status: 'published' as 'published' | 'draft',
    description: '',
    changelogStr: 'تحسين استقرار النظام ومعالجة السيرفرات\nتحديث ملف القنوات الافتراضي',
    installGuide: 'يوضع الملف في فلاشة USB مفعل عليها نظام FAT32 ثم التحديث من قائمة الوسائط المتعددة.',
    loaderTool: 'USB Direct / CH341A',
    isFeatured: false,
  });

  const [localFile, setLocalFile] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableModels = models.filter((m) => m.brandId === formData.brandId);

  const handleBrandChange = (brandId: string) => {
    const firstModel = models.find((m) => m.brandId === brandId);
    setFormData((prev) => ({
      ...prev,
      brandId,
      modelId: firstModel?.id || '',
    }));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      const sizeMb = (f.size / (1024 * 1024)).toFixed(2) + ' MB';
      setLocalFile({ name: f.name, size: sizeMb });
      setFormData((prev) => ({
        ...prev,
        fileSize: sizeMb,
        title: prev.title || f.name.replace(/\.[^/.]+$/, ''),
      }));
      showToast('تمت قراءة بيانات الملف محلياً للمعاينة (Demo File Selected)', 'info');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const sizeMb = (f.size / (1024 * 1024)).toFixed(2) + ' MB';
      setLocalFile({ name: f.name, size: sizeMb });
      setFormData((prev) => ({
        ...prev,
        fileSize: sizeMb,
        title: prev.title || f.name.replace(/\.[^/.]+$/, ''),
      }));
      showToast('تمت قراءة بيانات الملف محلياً للمعاينة', 'info');
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'اسم الفلاشة مطلوب';
    if (!formData.boardNumber.trim()) errs.boardNumber = 'رقم البوردة إلزامي لضمان التوافق';
    if (!formData.chipset.trim()) errs.chipset = 'المعالج مطلوب';
    if (!formData.description.trim()) errs.description = 'وصف الفلاشة مطلوب';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('يرجى تصحيح الأخطاء في الحقول المحددة', 'error');
      return;
    }

    const changelog = formData.changelogStr
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    addFirmware({
      title: formData.title,
      brandId: formData.brandId,
      modelId: formData.modelId || availableModels[0]?.id || 'general',
      version: formData.version,
      type: formData.type,
      fileFormat: formData.fileFormat,
      fileSize: formData.fileSize,
      uploadDate: formData.uploadDate,
      boardNumber: formData.boardNumber,
      chipset: formData.chipset,
      status: formData.status,
      description: formData.description,
      changelog,
      installGuide: formData.installGuide,
      loaderTool: formData.loaderTool,
      isFeatured: formData.isFeatured,
    });

    navigateTo('admin-firmware');
  };

  return (
    <AdminLayout
      title="إضافة فلاشة جديدة للمكتبة"
      subtitle="أدخل التفاصيل الفنية ورقم البوردة لتوثيق ملف السوفت وير"
      actionButton={
        <button
          type="button"
          onClick={() => navigateTo('admin-firmware')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجدول الفلاشات</span>
        </button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
          <h2 className="text-base font-bold text-[#0B1825] border-b border-slate-100 pb-3">
            المعلومات الأساسية للفلاشة
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                اسم وعنوان الفلاشة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: سوفت ستار سات 2000 هايبر الرسمي V2.84 مع معالجة السيرفرات"
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none ${
                  errors.title ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#0FAF9B]'
                }`}
              />
              {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  الشركة المصنعة
                </label>
                <select
                  value={formData.brandId}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B]"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  موديل الريسيفر
                </label>
                <select
                  value={formData.modelId}
                  onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B]"
                >
                  {availableModels.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  نوع الملف
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as FirmwareType })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B]"
                >
                  <option value="سوفت رسمي">سوفت رسمي (Official)</option>
                  <option value="دامب مسحوب">دامب مسحوب أصلي (Clean Dump)</option>
                  <option value="سوفت معدل">سوفت معدل وتحويل</option>
                  <option value="ملف قنوات">ملف قنوات مرتب</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  صيغة الملف
                </label>
                <select
                  value={formData.fileFormat}
                  onChange={(e) => setFormData({ ...formData, fileFormat: e.target.value as FileFormat })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#0FAF9B]"
                >
                  <option value="BIN">.BIN</option>
                  <option value="ABS">.ABS</option>
                  <option value="ZIP">.ZIP</option>
                  <option value="HEX">.HEX</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  رقم البوردة (Hardware Revision) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.boardNumber}
                  onChange={(e) => setFormData({ ...formData, boardNumber: e.target.value })}
                  placeholder="مثال: GS3201BA أو MP2_1506TV_V1.1"
                  className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs font-mono focus:outline-none ${
                    errors.boardNumber ? 'border-red-500' : 'border-slate-200 focus:border-[#0FAF9B]'
                  }`}
                />
                {errors.boardNumber && <p className="text-[11px] text-red-500 mt-1">{errors.boardNumber}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  المعالج (Processor / SoC) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.chipset}
                  onChange={(e) => setFormData({ ...formData, chipset: e.target.value })}
                  placeholder="مثال: Ali 3511 أو Sunplus 1506TV"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  إصدار السوفت وير (Version)
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="مثال: V2.84"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DEMO DRAG AND DROP FILE SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0B1825]">
                ملف الفلاشة (استعراض محلي للنسخة التجريبية)
              </h2>
              <p className="text-xs text-[#6B7D8D] mt-0.5">
                يمكنك سحب أي ملف .bin أو .zip محلياً لمعاينة استخراج الحجم والاسم في العرض التجريبي
              </p>
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              isDragging
                ? 'border-[#0FAF9B] bg-[#0FAF9B]/5'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <input
              type="file"
              id="firmware-file-input"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {localFile ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="font-mono font-bold text-xs text-[#0B1825]">
                  {localFile.name}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  الحجم المستخرج: {localFile.size}
                </div>
                <label
                  htmlFor="firmware-file-input"
                  className="mt-2 text-xs text-[#0FAF9B] hover:underline cursor-pointer font-bold"
                >
                  تغيير الملف
                </label>
              </div>
            ) : (
              <label htmlFor="firmware-file-input" className="cursor-pointer space-y-3 block">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-[#0FAF9B]" />
                </div>
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-[#0FAF9B]">اضغط لاختيار ملف</span> أو اسحبه هنا
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  صيغ معتمدة: .bin, .abs, .zip, .hex
                </p>
              </label>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              إشعار النسخة التجريبية: يتم حفظ بيانات الفلاشة في الذاكرة التخزينية المحلية للمتصفح (localStorage) لأغراض المعاينة فقط، دون رفع ملفات ثنائية حقيقية إلى خادم خارجي.
            </span>
          </div>
        </div>

        {/* TECHNICAL DETAILS & INSTRUCTIONS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
          <h2 className="text-base font-bold text-[#0B1825] border-b border-slate-100 pb-3">
            الوصف الفني وتعليمات التمرير
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                وصف الفلاشة <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="اكتب نبذة فنية عن محتويات السوفت وير أو نوع الدامب ومصدره..."
                className={`w-full bg-slate-50 border rounded-xl p-3 text-xs focus:outline-none ${
                  errors.description ? 'border-red-500' : 'border-slate-200 focus:border-[#0FAF9B]'
                }`}
              />
              {errors.description && <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  سجل التحديثات (سطر لكل ميزة)
                </label>
                <textarea
                  rows={3}
                  value={formData.changelogStr}
                  onChange={(e) => setFormData({ ...formData, changelogStr: e.target.value })}
                  placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  طريقة التثبيت واللودر
                </label>
                <textarea
                  rows={3}
                  value={formData.installGuide}
                  onChange={(e) => setFormData({ ...formData, installGuide: e.target.value })}
                  placeholder="خطوات التمرير باللودر أو الفلاشة..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  اللودر الموصى به
                </label>
                <input
                  type="text"
                  value={formData.loaderTool}
                  onChange={(e) => setFormData({ ...formData, loaderTool: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#0FAF9B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  حالة النشر
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0FAF9B]"
                >
                  <option value="published">منشور ومتاح للزوار (Published)</option>
                  <option value="draft">مسودة داخلية مؤقتة (Draft)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTONS */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigateTo('admin-firmware')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            إلغاء التغييرات
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0B1825] hover:bg-[#132B40] text-xs font-bold text-white transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#0FAF9B]" />
            <span>حفظ الفلاشة في الأرشيف (Demo Save)</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
