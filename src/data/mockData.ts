import { ReceiverBrand, ReceiverModel, FirmwareItem, SiteSettings } from '../types';

export const INITIAL_BRANDS: ReceiverBrand[] = [
  {
    id: 'starsat',
    name: 'ستار سات',
    nameEn: 'Starsat',
    country: 'دبي / عالمي',
    description: 'أشهر أجهزة الاستقبال الفضائي في الشرق الأوسط وشمال أفريقيا، تتميز بدعم سيرفرات الشيرنج والصوتيات.',
    accentColor: '#E5A54B',
    symbol: 'ST'
  },
  {
    id: 'tiger',
    name: 'تايجر',
    nameEn: 'Tiger',
    country: 'الأردن / دبي',
    description: 'سلسلة أجهزة تايجر المتطورة والمعروفة باستقرار سيرفرات الفوريفر والأبولو ودعم الأندرويد.',
    accentColor: '#0FAF9B',
    symbol: 'TG'
  },
  {
    id: 'geant',
    name: 'جيون',
    nameEn: 'Geant Electronics',
    country: 'الجزائر / المغرب العربي',
    description: 'الأجهزة الأكثر انتشاراً في دول المغرب العربي، متخصصة في استقبال البث الفضائي عالي الدقة وتقنيات Multistream.',
    accentColor: '#3B82F6',
    symbol: 'GN'
  },
  {
    id: 'sunplus',
    name: 'صن بلص',
    nameEn: 'Sunplus Family',
    country: 'معالجات عالمية / تجميع محلي',
    description: 'أجهزة المعالج الشهير صن بلص (1506TV / 1507A / 2507L) الأكثر شيوعاً في السوق المصري بفضل سهولة التعديل.',
    accentColor: '#10B981',
    symbol: 'SP'
  },
  {
    id: 'senator',
    name: 'سيناتور',
    nameEn: 'Senator',
    country: 'مصر / دبي',
    description: 'العلامة الرائدة في أجهزة الفا وواي فاي وسيرفرات ميفا وميديا ستار المتطورة الداعمة لتطبيقات IPTV الحديثة.',
    accentColor: '#F59E0B',
    symbol: 'SN'
  },
  {
    id: 'echolink',
    name: 'إيكولينك',
    nameEn: 'Echolink',
    country: 'المغرب / أوروبا',
    description: 'أجهزة متميزة في فك شفرات القنوات الأوروبية ودعم نظام الميلتي ستريم والتحديثات الدورية عبر الساتلايت.',
    accentColor: '#6366F1',
    symbol: 'EC'
  },
  {
    id: 'qmax',
    name: 'كيوماكس عبد العال',
    nameEn: 'Qmax MST 999',
    country: 'مصر',
    description: 'الاسم الكلاسيكي الأقدم في السوق الفضائي، موديلات السالك وسلسلة H مع فلاشات الإنقاذ والتحويلات النادرة.',
    accentColor: '#EC4899',
    symbol: 'QM'
  }
];

export const INITIAL_MODELS: ReceiverModel[] = [
  // Starsat
  {
    id: 'starsat-sr-2000hd-hyper',
    brandId: 'starsat',
    name: 'Starsat SR-2000HD Hyper',
    processor: 'Ali 3511 Dual Core',
    flashSize: '8 MB',
    boardId: 'GS3201BA-V1.0',
    tunerType: 'DVB-S2 Full HD',
    releaseYear: 2018,
    description: 'الريسيفر الأسطوري الأكثر طلباً لتحديثات التحويل والتطوير، يدعم سيرفر G-Share ومداخل USB مزدوجة.'
  },
  {
    id: 'starsat-sr-t14-extreme',
    brandId: 'starsat',
    name: 'Starsat SR-T14 Extreme',
    processor: 'GX6621 NationalChip',
    flashSize: '16 MB',
    boardId: 'GX6621-H265-V2.1',
    tunerType: 'DVB-S2 Multistream',
    releaseYear: 2021,
    description: 'جهاز ميني عالي الأداء مع دعم تشفير H.265 وخصائص الصوتيات المدمجة وسيرفر Forever.'
  },
  {
    id: 'starsat-sr-x1-extreme-4k',
    brandId: 'starsat',
    name: 'Starsat SR-X1 Extreme 4K',
    processor: 'HiSilicon Hi3798MV200',
    flashSize: '16 GB eMMC',
    boardId: 'HISIL-4K-V3.4',
    tunerType: 'DVB-S2X 4K Ultra HD',
    releaseYear: 2023,
    description: 'نظام أندرويد متكامل بدقة 4K الحقيقية، معالج هاي سيليكون جبار مع تيونر حساس لترددات الأقمار الضعيفة.'
  },

  // Tiger
  {
    id: 'tiger-t8-high-class',
    brandId: 'tiger',
    name: 'Tiger T8 High Class',
    processor: 'Ali 3516',
    flashSize: '8 MB',
    boardId: 'TG-ALI3516-MAIN',
    tunerType: 'DVB-S2 Full HD',
    releaseYear: 2019,
    description: 'من أفضل أجهزة تايجر فئة الهاي كلاس مع شاشة رقمية أمامية ومدخل LAN مدمج.'
  },
  {
    id: 'tiger-t3000-mega-4k',
    brandId: 'tiger',
    name: 'Tiger T3000 Mega 4K',
    processor: 'Hisilicon 3798',
    flashSize: '8 GB Flash',
    boardId: 'TG-HI3798-ANDROID9',
    tunerType: 'DVB-S2X 4K UHD',
    releaseYear: 2022,
    description: 'جهاز ذكي يجمع بين نظام الأندرويد والستالايت، يدعم بلوتوث وتطبيقات البث المباشر بدقة 60fps.'
  },
  {
    id: 'tiger-ag-999-mini',
    brandId: 'tiger',
    name: 'Tiger AG 999 Mini',
    processor: 'Sunplus 1506TV',
    flashSize: '4 MB',
    boardId: 'MP2-1506TV-EJ-V1.2',
    tunerType: 'DVB-S2 HD',
    releaseYear: 2020,
    description: 'ريسيفر ميني اقتصادي واسع الانتشار، يعتمد على معالج صن بلص الشهير ويدعم واي فاي خارجي 5370.'
  },

  // Geant
  {
    id: 'geant-2500-hd-plus',
    brandId: 'geant',
    name: 'Geant 2500 HD Plus',
    processor: 'Ali 3516 Dual Core',
    flashSize: '8 MB',
    boardId: 'GN-2500-REV3',
    tunerType: 'Twin Tuner DVB-S2',
    releaseYear: 2017,
    description: 'جهاز ثنائي التيونر مخصص للشيرنج عبر الأقمار والإنترنت، مع فلاشات نادرة لحل مشاكل اللمبة الحمراء.'
  },
  {
    id: 'geant-gn-ott-750-4k-allure',
    brandId: 'geant',
    name: 'Geant GN-OTT 750 4K Allure',
    processor: 'Hisilicon Quad Core',
    flashSize: '16 GB',
    boardId: 'OTT750-ALLURE-V4',
    tunerType: 'DVB-S2X Multistream',
    releaseYear: 2022,
    description: 'الرائد في عالم الجيون بدقة 4K وسيرفر فوريفر برو وتطبيق أندرويد مفتوح لجميع المنصات.'
  },

  // Sunplus
  {
    id: 'sunplus-1506tv-generic',
    brandId: 'sunplus',
    name: 'Sunplus 1506TV 4M Wi-Fi',
    processor: 'Sunplus 1506TV',
    flashSize: '4 MB',
    boardId: 'MP2_AVL1506TV_DSZ_V1.1',
    tunerType: 'DVB-S2 HD',
    releaseYear: 2021,
    description: 'البوردة العامة الأكثر استخداماً في عشرات الأجهزة المجمعة بمصر، تدعم فلاشات التحويل عبر USB ولودر 1506.'
  },
  {
    id: 'sunplus-1507a-8m-combo',
    brandId: 'sunplus',
    name: 'Sunplus 1507A 8M LAN',
    processor: 'Sunplus 1507A (DK)',
    flashSize: '8 MB',
    boardId: 'SP-1507A-LAN-V2.0',
    tunerType: 'DVB-S2 / T2 Combo',
    releaseYear: 2022,
    description: 'معالج متقدم من عائلة صن بلص فلاشة 8 ميجا مع مدخل إيثرنت LAN لثبات فائق لسيرفرات سيسكام وناشير.'
  },
  {
    id: 'sunplus-2507l-h265',
    brandId: 'sunplus',
    name: 'Sunplus 2507L H.265 8M',
    processor: 'Sunplus 2507L',
    flashSize: '8 MB',
    boardId: 'BOARD-SP2507L-H265',
    tunerType: 'DVB-S2 HEVC 10-bit',
    releaseYear: 2023,
    description: 'جيل حديث من معالجات صن بلص داعم لقنوات BeIN الفرنسية وكافة ترددات نظام HEVC 265 بضغط عالي.'
  },

  // Senator
  {
    id: 'senator-9900-plus',
    brandId: 'senator',
    name: 'Senator 9900 Plus',
    processor: 'Sunplus 2507L',
    flashSize: '8 MB',
    boardId: 'SENATOR-9900P-V2',
    tunerType: 'DVB-S2 H.265',
    releaseYear: 2022,
    description: 'الجهاز الأشهر في مصر بسيرفر ألفا المميز مع ريموت بلوتوث حساس وخصائص التعليق العربي المتزامن.'
  },
  {
    id: 'senator-octane-4k',
    brandId: 'senator',
    name: 'Senator Octane 4K',
    processor: 'Ali 2661 4K Processor',
    flashSize: '16 MB + 4GB RAM',
    boardId: 'SEN-OCTANE-2661-A1',
    tunerType: 'DVB-S2X 4K HDR',
    releaseYear: 2023,
    description: 'أقوى أجهزة سيناتور بنظام معالج علي 2661، دقة 4K حقيقية، دعم سيرفر Forever IKS والصوتيات الحية.'
  },
  {
    id: 'senator-captain-4040',
    brandId: 'senator',
    name: 'Senator Captain 4040',
    processor: 'GX6605S NationalChip',
    flashSize: '4 MB',
    boardId: 'GX6605S-SEN-4040-V1',
    tunerType: 'DVB-S2 Full HD',
    releaseYear: 2021,
    description: 'جهاز اقتصادي عالي الجودة يعتمد على معالج الجي إكس فلاشة 4 ميجا معروف بنقاء صورته وسرعة التنقل.'
  },

  // Echolink
  {
    id: 'echolink-zen-4k',
    brandId: 'echolink',
    name: 'Echolink Zen 4K',
    processor: 'Ali 2661',
    flashSize: '16 MB',
    boardId: 'ECH-ZEN4K-V3.0',
    tunerType: 'DVB-S2X Multistream 4K',
    releaseYear: 2023,
    description: 'جهاز النخبة في المغرب العربي، ممتاز في قراءة بطاقات الشيرنج الرسمية وقنوات الملتي ستريم الإيطالية والفرنسية.'
  },
  {
    id: 'echolink-tornado-v7',
    brandId: 'echolink',
    name: 'Echolink Tornado V7',
    processor: 'GX6605S',
    flashSize: '4 MB',
    boardId: 'TORNADO-V7-MAIN',
    tunerType: 'DVB-S2 HD',
    releaseYear: 2020,
    description: 'جهاز ميني خفيف الوزن يدعم سيرفر فانيلا وتحديث الشيفرات بنظام بيس وتاندبرج تلقائياً.'
  },

  // Qmax MST
  {
    id: 'qmax-mst-999-h4',
    brandId: 'qmax',
    name: 'Qmax MST-999 H4 Full HD',
    processor: 'Ali 3606',
    flashSize: '8 MB',
    boardId: 'QMAX-H4-V2.4',
    tunerType: 'DVB-S2 HD',
    releaseYear: 2016,
    description: 'الجهاز الكلاسيكي الشهير لشركة عبد العال، متوفر له فلاشات تحويل لتايجر وتصليح البوت العالق.'
  },
  {
    id: 'salik-h1-mini',
    brandId: 'qmax',
    name: 'Salik H1 Mini (Qmax)',
    processor: 'GX6605S',
    flashSize: '4 MB',
    boardId: 'SALIK-H1-GX-REV1',
    tunerType: 'DVB-S2 HD',
    releaseYear: 2019,
    description: 'جهاز سالك الميني الأكثر شعبية لسهولة إعادة شحن فلاشة SPI بمبرمجة CH341A أو اللودر السحري.'
  },
  {
    id: 'qmax-mst-999-h7',
    brandId: 'qmax',
    name: 'Qmax MST-999 H7 4K',
    processor: 'Ali 2661',
    flashSize: '16 MB',
    boardId: 'H7-4K-ALIBOARD-V2',
    tunerType: 'DVB-S2X 4K Ultra HD',
    releaseYear: 2022,
    description: 'أحدث أجيال الكيوماكس بدقة 4K وسيرفر الفوريفر ودعم كامل لخاصية الترجمة الفورية عبر الأقمار.'
  }
];

export const INITIAL_FIRMWARES: FirmwareItem[] = [
  // 1
  {
    id: 'fw-starsat-2000hyper-v284',
    title: 'سوفت ستار سات 2000 هايبر الرسمي V2.84 مع معالجة السيرفرات',
    brandId: 'starsat',
    modelId: 'starsat-sr-2000hd-hyper',
    version: 'V2.84',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '4.85 MB',
    uploadDate: '2024-03-12',
    boardNumber: 'GS3201BA-V1.0',
    chipset: 'Ali 3511',
    status: 'published',
    isFeatured: true,
    downloadsCount: 1420,
    description: 'أحدث تحديث رسمي لريسيفر Starsat SR-2000HD Hyper، يقوم بتثبيت سريال الجهاز وتحسين أداء تطبيق YouTube وتحديث مفاتيح BISS و Tandberg التلقائية.',
    changelog: [
      'تحديث بروتوكول اتصال السيرفر المدمج لتقليل التقطيع على النايل سات وبدر سات',
      'إصلاح خروج تطبيق يوتيوب المفاجئ عند تشغيل مقاطع 1080p',
      'تسريع قراءة كروت الاشتراكات وبطاقات التشفير Conax',
      'إضافة خاصية حفظ ملف القنوات الاحتياطي على USB بضغطة زر واحدة'
    ],
    installGuide: 'يتم فك الضغط عن الملف ووضعه في جذر فلاشة USB مفرمتة بنظام FAT32. ادخل إلى قائمة التحديث عبر الريموت واضغط تحديث البطاقة واصبر حتى إعادة التشغيل.',
    loaderTool: 'Ali Mini Upgrade Tool v1.20'
  },
  // 2
  {
    id: 'fw-starsat-2000hyper-dump-clean',
    title: 'دامب أصلي خام مسحوب بالمبرمجة لعلاج اللمبة الحمراء SR-2000 Hyper',
    brandId: 'starsat',
    modelId: 'starsat-sr-2000hd-hyper',
    version: 'Dump Clean',
    type: 'دامب مسحوب',
    fileFormat: 'BIN',
    fileSize: '8.00 MB',
    uploadDate: '2024-01-20',
    boardNumber: 'GS3201BA-V1.0',
    chipset: 'Ali 3511',
    status: 'published',
    isFeatured: true,
    downloadsCount: 980,
    description: 'فلاشة كاملة مسحوبة بواسطة مبرمجة RT809F لفلاشة Winbond 25Q64. الملف يحل بشكل جذري مشاكل توقف الجهاز على Boot أو اللمبة الزرقاء أو الشاشة السوداء.',
    changelog: [
      'دامب خام بدون أي تعديل وبوتيبل سليم 100%',
      'يحتوي على إعدادات المصنع الافتراضية مع ملف قنوات عربي نظيف',
      'متوافق حصرياً مع البوردة GS3201BA ولا يصلح للبوردات الأقدم 2013'
    ],
    installGuide: 'يتطلب فك آي سي الفلاشة من البوردة وكتابتها بمبرمجة CH341A أو RT809H، أو التمرير عبر كابل RS-232 ولودر Ali Dump.',
    loaderTool: 'CH341A Programmer Software v1.34'
  },
  // 3
  {
    id: 'fw-starsat-t14-v198',
    title: 'سوفت وير ستار سات T14 Extreme الرسمي داعم Forever Pro V1.98',
    brandId: 'starsat',
    modelId: 'starsat-sr-t14-extreme',
    version: 'V1.98',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '11.20 MB',
    uploadDate: '2024-04-05',
    boardNumber: 'GX6621-H265-V2.1',
    chipset: 'GX6621 NationalChip',
    status: 'published',
    isFeatured: true,
    downloadsCount: 1850,
    description: 'سوفت وير استثنائي لريسيفر Starsat T14 Extreme مع تحسين استقبال قنوات Multistream الفرنسية والإيطالية على قمر 5 درجات غرب وقمر الهسباسات.',
    changelog: [
      'ترقية سيرفر Forever إلى أحدث حزمة تشفير لمواكبة التغييرات الأخيرة',
      'إصلاح التزامن بين الصوت والصورة على القنوات المشفرة بتقنية H.265',
      'إضافة محرك بحث فوري داخل قائمة القنوات حسب التردد أو القمر'
    ],
    installGuide: 'يوضع الملف في USB ثم ضبط المصنع قبل وبعد التمرير لتفادي مشكلة امتلاء الذاكرة المؤقتة.',
    loaderTool: 'GXDownloader_Boot_V1.1'
  },
  // 4
  {
    id: 'fw-tiger-t8-v392',
    title: 'سوفت تايجر T8 High Class التحديث النهائي V3.92 لثبات الشيرنج',
    brandId: 'tiger',
    modelId: 'tiger-t8-high-class',
    version: 'V3.92',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '7.45 MB',
    uploadDate: '2024-02-18',
    boardNumber: 'TG-ALI3516-MAIN',
    chipset: 'Ali 3516',
    status: 'published',
    isFeatured: false,
    downloadsCount: 710,
    description: 'التحديث المستقر لجهاز تايجر T8 فئة الهاي كلاس، يضمن استقرار اتصال كابل الإنترنت LAN وسيرفرات CCCam وNewCamd.',
    changelog: [
      'تحديث درايفرات كروت الشبكة LAN المدمجة',
      'معالجة بطء قائمة القنوات عند وجود أكثر من 5000 قناة مسجلة',
      'دعم ملفات الترجمة SRT الخارجية عبر منفذ USB'
    ],
    installGuide: 'التمرير بالفلاشة USB مباشرة بدون الحاجة لجهاز كمبيوتر.',
    loaderTool: 'Tiger Upgrade Studio v2.0'
  },
  // 5
  {
    id: 'fw-tiger-t3000-mega-v41',
    title: 'تحديث روم أندرويد لتايجر Tiger T3000 Mega 4K بنظام نوجا V4.1.2',
    brandId: 'tiger',
    modelId: 'tiger-t3000-mega-4k',
    version: 'V4.1.2',
    type: 'سوفت رسمي',
    fileFormat: 'ZIP',
    fileSize: '540.00 MB',
    uploadDate: '2024-03-28',
    boardNumber: 'TG-HI3798-ANDROID9',
    chipset: 'Hisilicon 3798',
    status: 'published',
    isFeatured: true,
    downloadsCount: 2210,
    description: 'سوفت وير كامل بصيغة Update.zip لجهاز التايجر T3000 Mega بنظام هاي سيليكون، يحدّث مشغلات الفيديو 4K ويدعم خاصية PIP صورة داخل صورة.',
    changelog: [
      'ترقية متجر التطبيقات وخدمات جوجل بلاي لتجنب رسائل الخطأ',
      'دعم تشغيل شفرات الـ BISS 16 Digit بدون الحاجة للضغط على زر التعديل',
      'تحسين حساسية التيونر لترددات البث 4K UHD 60fps'
    ],
    installGuide: 'يتم نسخ الملف باسم update.zip في فلاشة USB ثم إدخال الجهاز وضع الريكفري بالضغط على زر الباور وتشغيل الكهرباء.',
    loaderTool: 'HiSilicon Recovery Tool'
  },
  // 6
  {
    id: 'fw-tiger-ag999-dump-4m',
    title: 'دامب سحري لريسيفر تايجر AG 999 Mini صن بلص 1506TV مسحوب',
    brandId: 'tiger',
    modelId: 'tiger-ag-999-mini',
    version: 'Dump V1.0',
    type: 'دامب مسحوب',
    fileFormat: 'BIN',
    fileSize: '4.00 MB',
    uploadDate: '2024-01-15',
    boardNumber: 'MP2-1506TV-EJ-V1.2',
    chipset: 'Sunplus 1506TV',
    status: 'published',
    isFeatured: false,
    downloadsCount: 1120,
    description: 'دامب 4 ميجا أصلي مسحوب من جهاز كرتونة، مخصص لإنقاذ الأجهزة التي تقف على كلمة Load أو إشارة حمراء بعد سوفت وير خاطئ.',
    changelog: [
      'فلاشة 4 ميجا كاملة تحتوي اللودر الأصلي ونظام الحماية',
      'تفعيل تلقائي لريموت التايجر الأصلي وريموت LM',
      'حفظ الترددات الأساسية لنايل سات مرتبة إسلامي ورياضي'
    ],
    installGuide: 'يمرر بلودر الصن بلص Sunplus Loader عبر وصلة السوفت جاك 3.5mm إلى كوم RS232.',
    loaderTool: 'Sunplus 1506TV Loader 2024'
  },
  // 7
  {
    id: 'fw-geant-2500hd-v255',
    title: 'سوفت جيون Geant 2500 HD Plus التحديث الرسمي المستقر V2.55',
    brandId: 'geant',
    modelId: 'geant-2500-hd-plus',
    version: 'V2.55',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '5.20 MB',
    uploadDate: '2023-11-10',
    boardNumber: 'GN-2500-REV3',
    chipset: 'Ali 3516 Dual Core',
    status: 'published',
    isFeatured: false,
    downloadsCount: 890,
    description: 'السوفت الرسمي المستقر للجيون 2500 بلس ثنائي التيونر، يعمل بكفاءة مع الدونجل الداخلي على الأقمار المتاحة دون انقطاع.',
    changelog: [
      'تحديث بيانات أقمار الدونجل W14 و Yahsat',
      'إصلاح مشكلة توقف الريموت كنترول بعد فترات التشغيل الطويلة',
      'تحسين التوافق مع شاشات LED بدقة 1080p 60Hz'
    ],
    installGuide: 'التمرير بواسطة USB ثم عمل ضبط مصنع وإعادة البحث عن القنوات.',
    loaderTool: 'Geant Tool 3516'
  },
  // 8
  {
    id: 'fw-geant-ott750-v394',
    title: 'تحديث جيون Geant GN-OTT 750 4K Allure الرسمي الحزمة V3.9.4',
    brandId: 'geant',
    modelId: 'geant-gn-ott-750-4k-allure',
    version: 'V3.9.4',
    type: 'سوفت رسمي',
    fileFormat: 'ZIP',
    fileSize: '620.00 MB',
    uploadDate: '2024-04-18',
    boardNumber: 'OTT750-ALLURE-V4',
    chipset: 'Hisilicon Quad Core',
    status: 'published',
    isFeatured: true,
    downloadsCount: 3100,
    description: 'أقوى تحديثات عملاق الجيون OTT 750 Allure الداعم للأندرويد، يتضمن تحسين استجابة المعالج، ومزامنة الصوتيات لقنوات بي إن سبورت، ودعم ترجمة DVB.',
    changelog: [
      'تحديث سيرفر Forever Pro إلى أحدث نسخة استقرارية',
      'إصلاح تقطع قنوات 4K HDR على قمر هوتبيرد وأسترا 19',
      'تحديث برامج الـ IPTV المدمجة مثل Apollo و Lynx'
    ],
    installGuide: 'يتم فك الضغط ونقل مجلد التحديث إلى فلاشة USB ومن تطبيق Update داخل الأندرويد اضغط تفعيل.',
    loaderTool: 'Geant Android Updater'
  },
  // 9
  {
    id: 'fw-sunplus-1506tv-clean-dump',
    title: 'فلاشة دامب نظيفة 4 ميجا عامة لجميع أجهزة صن بلص 1506TV الشعبية',
    brandId: 'sunplus',
    modelId: 'sunplus-1506tv-generic',
    version: 'Clean Dump 4M',
    type: 'دامب مسحوب',
    fileFormat: 'BIN',
    fileSize: '4.00 MB',
    uploadDate: '2024-03-01',
    boardNumber: 'MP2_AVL1506TV_DSZ_V1.1',
    chipset: 'Sunplus 1506TV',
    status: 'published',
    isFeatured: true,
    downloadsCount: 4500,
    description: 'الفلاشة المرجعية لمهندسي وفنيي الصيانة. تصلح لمعظم أجهزة 1506TV في مصر والوطن العربي فلاشة 4 ميجا (وينبوند 25Q32). تقوم بإحياء الأجهزة الميتة.',
    changelog: [
      'حل جذري لمشكلة اللمبة الحمراء واختفاء أرقام العدسة',
      'تدعم ريموت الصن بلص الشهير (LM) وريموت التايمر وريموت الصفين',
      'تفعيل خيار إظهار خانة الشفرات السيرفر عبر الكود 1506 في أي قائمة'
    ],
    installGuide: 'البرمجة عن طريق المبرمجة مع التأكد من مسح الفلاشة القديمة (Erase) قبل كتابة هذا الملف.',
    loaderTool: 'CH341A Black Edition Programmer'
  },
  // 10
  {
    id: 'fw-sunplus-1507a-nashare',
    title: 'سوفت تحويل صن بلص 1507A 8M إلى سيرفر Nashare Pro مع دعم الصوتيات',
    brandId: 'sunplus',
    modelId: 'sunplus-1507a-8m-combo',
    version: 'V2.62-Nashare',
    type: 'سوفت معدل',
    fileFormat: 'BIN',
    fileSize: '8.00 MB',
    uploadDate: '2024-02-25',
    boardNumber: 'SP-1507A-LAN-V2.0',
    chipset: 'Sunplus 1507A (DK)',
    status: 'published',
    isFeatured: false,
    downloadsCount: 1640,
    description: 'سوفت وير معدل بعناية من خبراء الساتلايت، يضيف دعم سيرفر Nashare Pro وسيرفرات نوفا، مع تشغيل فلاشات الواي فاي 7601 و 5370 معاً.',
    changelog: [
      'إضافة تطبيق التايم شيفت اليدوي حتى 30 ثانية لتطابق صوتيات الراديو',
      'تحسين سرعة الفتح على قنوات أوسن والمجد',
      'واجهة مستخدم جرافيك أنيقة مع شريط معلومات الطقس'
    ],
    installGuide: 'إذا كان جهازك على سوفت أصلي، يتم التحويل أولاً بسوفت التمهيد ثم تمرير هذا الملف عبر USB.',
    loaderTool: 'Sunplus Convert Tool 8M'
  },
  // 11
  {
    id: 'fw-sunplus-2507l-official-v11',
    title: 'التحديث الرسمي لبوردات صن بلص Sunplus 2507L H.265 داعم الصوتيات V1.1',
    brandId: 'sunplus',
    modelId: 'sunplus-2507l-h265',
    version: 'V1.10',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '8.00 MB',
    uploadDate: '2024-04-10',
    boardNumber: 'BOARD-SP2507L-H265',
    chipset: 'Sunplus 2507L',
    status: 'published',
    isFeatured: false,
    downloadsCount: 1390,
    description: 'تحديث مخصص للأجهزة الحاملة لمعالج 2507L بذاكرة 8 ميجا، يعالج تقطيع الصوتيات عند التنقل بين قنوات الستالايت والبث الرقمي.',
    changelog: [
      'دعم كامل لخاصية Audio Delay ومزامنة الصوت بدون لاج',
      'تحديث شفرات Tandberg تلقائياً عند الوقوف على القناة لمدة 10 ثواني',
      'تثبيت استقرار اتصال الواي فاي بشبكات الجيل الخامس عبر محول مخصص'
    ],
    installGuide: 'يمرر عبر الفلاشة ميموري FAT32.',
    loaderTool: 'USB direct update'
  },
  // 12
  {
    id: 'fw-senator-9900p-v128',
    title: 'سوفت سيناتور 9900 بلس الرسمي V1.28 داعم سيرفر ألفا برو',
    brandId: 'senator',
    modelId: 'senator-9900-plus',
    version: 'V1.28',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '8.00 MB',
    uploadDate: '2024-04-01',
    boardNumber: 'SENATOR-9900P-V2',
    chipset: 'Sunplus 2507L',
    status: 'published',
    isFeatured: true,
    downloadsCount: 3950,
    description: 'السوفت الأحدث والمعتمد لجهاز Senator 9900 Plus، يعزز أداء سيرفر Alfa IPTV وسيرفر الفا شيرنج ويعالج تشنج قائمة البلوتوث.',
    changelog: [
      'تحديث شامل لبروتوكول Alpha Pro IPTV وتقليل استهلاك الباندويث',
      'تسريع إقلاع الجهاز بمعدل 40% مقارنة بالإصدار السابق',
      'حل مشكلة خروج ريموت البلوتوث من الاقتران عند انقطاع التيار الكهربائي'
    ],
    installGuide: 'التحديث بالـ USB يليه ضبط مصنع، ثم تفعيل السيرفرات بالضغط على الزر الأحمر في قائمة الوسائط المتعددة.',
    loaderTool: 'Senator USB Flasher'
  },
  // 13
  {
    id: 'fw-senator-octane-4k-v212',
    title: 'سوفت وير سيناتور أوكتان 4K الأصلي V2.12 مع ترقية Forever 143',
    brandId: 'senator',
    modelId: 'senator-octane-4k',
    version: 'V2.12',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '15.80 MB',
    uploadDate: '2024-03-22',
    boardNumber: 'SEN-OCTANE-2661-A1',
    chipset: 'Ali 2661 4K Processor',
    status: 'published',
    isFeatured: true,
    downloadsCount: 2840,
    description: 'التحديث الأقوى لريسيفر سيناتور أوكتان 4K الحقيقي، يرفع أداء التيونر لاستقبال الترددات الصعبة ويدعم تقنية التباين العالي HDR10+.',
    changelog: [
      'ترقية سيرفر Forever IKS إلى أحدث بروتوكول مشفر 143',
      'إضافة قنوات صوتية حصرية للتعليق الرياضي العربي المتطابق',
      'تحسين مظهر شريط القنوات والقوائم وتنسيق الألوان'
    ],
    installGuide: 'يمرر السوفت وير من الفلاشة ويجب عدم فصل الكهرباء نهائياً أثناء مرحلة الحرق التي تستغرق 3 دقائق.',
    loaderTool: 'Ali 2661 Fast Loader'
  },
  // 14
  {
    id: 'fw-senator-captain4040-dump',
    title: 'دامب سيناتور كابتن 4040 فلاشة 4M كامل بمبرمجة RT809',
    brandId: 'senator',
    modelId: 'senator-captain-4040',
    version: 'Dump Clean',
    type: 'دامب مسحوب',
    fileFormat: 'BIN',
    fileSize: '4.00 MB',
    uploadDate: '2024-01-08',
    boardNumber: 'GX6605S-SEN-4040-V1',
    chipset: 'GX6605S NationalChip',
    status: 'published',
    isFeatured: false,
    downloadsCount: 820,
    description: 'دامب كامل ومجرب لعلاج توقف جهاز Senator Captain 4040 على كلمة On أو اللمبة الحمراء بعد ملف قنوات غير مطابق.',
    changelog: [
      'إرجاع الجهاز لوضع المصنع مع السوفت الأصلي لشركة سيناتور',
      'سيريال سليم ولا يفقد اشتراك الشيرنج المدمج',
      'يحتوي أحدث ملف قنوات نايل سات عربي منظم'
    ],
    installGuide: 'الكتابة عبر اللودر السحري لمعالجات GX6605S أو المبرمجة.',
    loaderTool: 'GxDumpTool_V2'
  },
  // 15
  {
    id: 'fw-echolink-zen4k-v116',
    title: 'تحديث إيكولينك Echolink Zen 4K مع تحسين Multistream V1.16',
    brandId: 'echolink',
    modelId: 'echolink-zen-4k',
    version: 'V1.16',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '14.50 MB',
    uploadDate: '2024-03-15',
    boardNumber: 'ECH-ZEN4K-V3.0',
    chipset: 'Ali 2661',
    status: 'published',
    isFeatured: false,
    downloadsCount: 1250,
    description: 'سوفت وير إيكولينك زن 4K، يحتوي على أحدث ترقيات معالجة إشارات الملتستريم وباقات القنوات الأرضية الفرنسية والإسبانية.',
    changelog: [
      'حل مشكلة تشنج تيونر السات عند البحث العشوائي Blind Scan',
      'ترقية سيرفر فوريفر برو وثبات باقات الأقمار',
      'تحديث محرك تشغيل الفيديوهات بصيغة MKV و MP4 عبر USB'
    ],
    installGuide: 'التحديث عبر USB مباشرة.',
    loaderTool: 'Echolink USB Tool'
  },
  // 16
  {
    id: 'fw-echolink-tornado-v7-v204',
    title: 'سوفت وير إيكولينك تورنادو V7 الرسمي V2.04 وثبات سيرفر فانيلا',
    brandId: 'echolink',
    modelId: 'echolink-tornado-v7',
    version: 'V2.04',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '4.00 MB',
    uploadDate: '2023-12-05',
    boardNumber: 'TORNADO-V7-MAIN',
    chipset: 'GX6605S',
    status: 'published',
    isFeatured: false,
    downloadsCount: 640,
    description: 'التحديث الأكثر استقراراً لجهاز Tornado V7، يحل مشكلة توقف الجهاز عند تشغيل مقاطع اليوتيوب والطقس.',
    changelog: [
      'تحديث API اليوتيوب ليعمل بدون توقف',
      'تحسين سرعة التقاط إشارة الواي فاي',
      'إصلاح خيار ترتيب القنوات أبجدياً'
    ],
    installGuide: 'يمرر بالفلاشة USB.',
    loaderTool: 'Echolink GX Tool'
  },
  // 17
  {
    id: 'fw-qmax-h4-v215-convert',
    title: 'سوفت تحويل كيوماكس 999 H4 إلى تايجر T6 High Class مع فك التشفير',
    brandId: 'qmax',
    modelId: 'qmax-mst-999-h4',
    version: 'V2.15 Convert',
    type: 'سوفت معدل',
    fileFormat: 'BIN',
    fileSize: '7.80 MB',
    uploadDate: '2023-10-14',
    boardNumber: 'QMAX-H4-V2.4',
    chipset: 'Ali 3606',
    status: 'published',
    isFeatured: false,
    downloadsCount: 1530,
    description: 'تحويل ممتاز ومجرب لجهاز كيوماكس H4 القديم ليتحول إلى جهاز تايجر T6 بمزايا جديدة وخفة وسرعة غير مسبوقة.',
    changelog: [
      'تغيير الواجهة بالكامل إلى واجهة تايجر الذهبية الأنيقة',
      'دعم تشغيل فلاشات الواي فاي الحديثة RT5370',
      'تجديد دعم سيرفرات السيسكام والنيوكامد المجانية'
    ],
    installGuide: 'يمرر باللودر عبر كابل التحديث الكمبيوتر من السوفت الأصلي للتحويل.',
    loaderTool: 'Qmax H4 Upgrade Tool'
  },
  // 18
  {
    id: 'fw-salik-h1-clean-dump',
    title: 'دامب مسحوب أصلي لريسيفر سالك H1 الميني Salik H1 Mini فلاشة 4M',
    brandId: 'qmax',
    modelId: 'salik-h1-mini',
    version: 'Dump Clean GX',
    type: 'دامب مسحوب',
    fileFormat: 'BIN',
    fileSize: '4.00 MB',
    uploadDate: '2024-02-01',
    boardNumber: 'SALIK-H1-GX-REV1',
    chipset: 'GX6605S',
    status: 'published',
    isFeatured: true,
    downloadsCount: 3820,
    description: 'فلاشة سالك H1 الأصلية التي يبحث عنها كل فني لعلاج مشكلة لمبة حمراء وتوقف العدسة الرقمية. دامب سليم خالي من أي أخطاء.',
    changelog: [
      'حل مشكلة توقف الجهاز على Boot بعد ملف قنوات سالك خاطئ',
      'متوافق مع جميع ريموتات سالك الأصلية وبديل التايمر',
      'بوتيبل نظيف يقبل التحديث بعد ذلك من USB دون أدنى مشكلة'
    ],
    installGuide: 'يمكن كتابته بلودر الجي إكس الشهير باختيار معالج GX6605S وحجم فلاشة 4MB أو بالمبرمجة.',
    loaderTool: 'GX6605S Dump Loader 2024'
  },
  // 19
  {
    id: 'fw-qmax-h7-v134',
    title: 'سوفت كيوماكس H7 4K الرسمي V1.34 داعم الفور ايفر والأبولو',
    brandId: 'qmax',
    modelId: 'qmax-mst-999-h7',
    version: 'V1.34',
    type: 'سوفت رسمي',
    fileFormat: 'BIN',
    fileSize: '16.00 MB',
    uploadDate: '2024-04-12',
    boardNumber: 'H7-4K-ALIBOARD-V2',
    chipset: 'Ali 2661',
    status: 'published',
    isFeatured: false,
    downloadsCount: 1940,
    description: 'التحديث الأحدث لموديل كيوماكس 999 H7 بدقة الفور كيه، يعالج مشكلة تهنيج الجهاز عند تشغيل قنوات بي إن 4K على نايل سات وسهيل سات.',
    changelog: [
      'تحديث كودك H.265 و H.264 لتقليل استهلاك الذاكرة العشوائية',
      'تحديث سيرفر الشيرنج وسيرفر أبولو IPTV',
      'إضافة خاصية التكبير الرقمي Zoom للقنوات بجودة 4K'
    ],
    installGuide: 'التحديث بالـ USB مع مراعاة عدم إطفاء الجهاز أثناء الخطوة 2/2.',
    loaderTool: 'Qmax 4K USB Flasher'
  },
  // 20
  {
    id: 'fw-starsat-x1-android-v37',
    title: 'روم أندرويد 9 كامل لستار سات Starsat SR-X1 Extreme 4K',
    brandId: 'starsat',
    modelId: 'starsat-sr-x1-extreme-4k',
    version: 'V3.7.1 Rom',
    type: 'سوفت رسمي',
    fileFormat: 'ZIP',
    fileSize: '780.00 MB',
    uploadDate: '2024-03-30',
    boardNumber: 'HISIL-4K-V3.4',
    chipset: 'HiSilicon Hi3798MV200',
    status: 'published',
    isFeatured: false,
    downloadsCount: 1720,
    description: 'روم أندرويد كامل أصلي مخصص للإنقاذ والتحديث الشامل لعملاق ستار سات X1، يعيد تهيئة الذاكرة الداخلية eMMC ويحل مشكلة التعليق على شعار Starsat.',
    changelog: [
      'تحديث محرك الأندرويد واستقرار معالجة الجرافيكس',
      'تثبيت أحدث إصدار لمشغل قنوات الساتلايت المدمج DVB Player',
      'تحسين التوافق مع أقراص الهارد ديسك الخارجية عبر منفذ USB 3.0'
    ],
    installGuide: 'طريقة الريكفري: سمِّ الملف RomUpdate.bin وضعه في مجلد RomUpdate على الفلاشة، ثم قم بالتشغيل مع الضغط على زر الباور.',
    loaderTool: 'HiSilicon HiTool 5.3'
  },
  // 21
  {
    id: 'fw-sunplus-channels-arab-2024',
    title: 'ملف قنوات عربي إسلامي ومسيحي كامل نايل سات لجميع معالجات صن بلص',
    brandId: 'sunplus',
    modelId: 'sunplus-1506tv-generic',
    version: 'NileSat 2024.04',
    type: 'ملف قنوات',
    fileFormat: 'BIN',
    fileSize: '0.25 MB',
    uploadDate: '2024-04-20',
    boardNumber: 'All 1506 / 2507',
    chipset: 'Sunplus All',
    status: 'published',
    isFeatured: true,
    downloadsCount: 5200,
    description: 'أحدث ملف قنوات نايل سات شامل جميع الترددات والقنوات الجديدة (الوثائقية، قنوات الدراما والسينما، الأطفال، الرياضة) مرتب ترتيباً دقيقاً.',
    changelog: [
      'إضافة ترددات قناة أون تايم سبورت الأرضية والفضائية الجديدة',
      'حذف القنوات المغلقة والمكررة وضبط الصوتيات العربية الافتراضية',
      'باقة مخصصة للأطفال وباقة للقرآن الكريم في مقدمة اللائحة'
    ],
    installGuide: 'من قائمة USB اختر تحديث المستخدم واضغط نعم ثم انتظر 5 ثواني.',
    loaderTool: 'USB Direct Channel Flash'
  },
  // 22
  {
    id: 'fw-gx6605s-channels-2024',
    title: 'ملف قنوات مرتب عربي ومتحرك 7 أقمار لجميع أجهزة معالج GX6605S',
    brandId: 'senator',
    modelId: 'senator-captain-4040',
    version: '7Sat-Arabic-2024',
    type: 'ملف قنوات',
    fileFormat: 'BIN',
    fileSize: '0.35 MB',
    uploadDate: '2024-04-15',
    boardNumber: 'GX6605S All',
    chipset: 'GX6605S NationalChip',
    status: 'published',
    isFeatured: false,
    downloadsCount: 3150,
    description: 'ملف قنوات احترافي لجميع ريسيفرات معالج GX6605S (سالك، سيناتور، إيكولينك، بريفكس) يشمل نايل سات، أموس، هوتبيرد، يوتلسات 16، أسترا 19، عربسات.',
    changelog: [
      'ترتيب رياضي متقن لأهم قنوات الشيرنج الأوروبية',
      'ضبط دقيق لمواقع الديزك والدايسك 1.0 و 1.1 لجميع الأقمار',
      'خفيف جداً ولا يسبب بطء في التنقل بين القنوات'
    ],
    installGuide: 'التحديث عبر USB باختيار خيار ملف القنوات (User DB).',
    loaderTool: 'USB direct'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'أسد السات',
  siteNameEn: 'ASAD AL SAT',
  tagline: 'المكتبة المتكاملة لفلاشات وسوفت وير أجهزة الريسيفر والستالايت والدعم الفني',
  announcementText: 'مرحباً بك في النسخة الاستعراضية لموقع أسد السات — مكتبة التحميل التقنية الشاملة لجميع أجهزة الاستقبال الفضائي.',
  isAnnouncementActive: true,
  contactEmail: 'support@asadalsat.com',
  telegramChannel: 'https://t.me/asadalsat_support',
  demoModeNotice: true
};
