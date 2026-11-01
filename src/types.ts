export type FileFormat = 'BIN' | 'ABS' | 'ZIP' | 'HEX';

export type FirmwareType = 'سوفت رسمي' | 'دامب مسحوب' | 'سوفت معدل' | 'ملف قنوات';

export interface ReceiverBrand {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  description: string;
  modelsCount?: number;
  firmwareCount?: number;
  accentColor: string;
  symbol: string; // e.g. SVG symbol ID or short monogram
}

export interface ReceiverModel {
  id: string;
  brandId: string;
  name: string;
  processor: string; // e.g. GX6605S, Sunplus 1506TV, Ali 3511, Montage
  flashSize: string; // 4MB, 8MB, 16MB
  boardId: string; // e.g. GS3201BA, MP2_AVL1506F
  tunerType: string; // DVB-S2, Multistream, 4K UHD
  releaseYear: number;
  description: string;
}

export interface FirmwareItem {
  id: string;
  title: string;
  brandId: string;
  modelId: string;
  version: string;
  type: FirmwareType;
  fileFormat: FileFormat;
  fileSize: string; // e.g. "4.12 MB"
  uploadDate: string; // YYYY-MM-DD
  boardNumber: string; // Hardware Revision
  chipset: string;
  status: 'published' | 'draft';
  description: string;
  changelog: string[];
  installGuide: string;
  loaderTool: string;
  isFeatured?: boolean;
  downloadsCount: number;
}

export interface SiteSettings {
  siteName: string;
  siteNameEn: string;
  tagline: string;
  announcementText: string;
  isAnnouncementActive: boolean;
  contactEmail: string;
  telegramChannel: string;
  demoModeNotice: boolean;
}
