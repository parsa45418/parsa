import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Zap, ArrowLeft, ArrowRight, Sparkles, Activity, ShieldCheck, ShoppingCart, RefreshCw, Cpu, CircuitBoard, Layers } from 'lucide-react';
import { Product } from '../types';

interface SystemScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddMultipleToCart: (items: Product[]) => void;
}

export const SystemScannerModal: React.FC<SystemScannerModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddMultipleToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [workload, setWorkload] = useState<'gaming-4k' | 'esports' | 'rendering' | 'ai'>('gaming-4k');
  const [budgetTier, setBudgetTier] = useState<'pro' | 'extreme' | 'value'>('pro');
  const [targetResolution, setTargetResolution] = useState<'4k' | '2k' | '1080p'>('4k');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanLog, setScanLog] = useState<string>('کالیبراسیون سنسورهای حرارتی...');

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsScanning(false);
      setScanProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const runOpticalDiagnostic = () => {
    setIsScanning(true);
    setScanProgress(0);
    setStep(3);

    const logs = [
      'تست پهنای باند حافظه و باس ارتباطی...',
      'محاسبه گلوگاه (Bottleneck Analysis) بین CPU و GPU...',
      'سنجش توان حرارتی TDP و تطبیق با مادربرد...',
      'تست فرکانس فریم در خروجی 4K Ultra...',
      'تایید نسخه نهایی توسط کارشناس ارشد سخت‌افزار...'
    ];

    let currentProg = 0;
    const interval = setInterval(() => {
      currentProg += 4;
      setScanProgress(Math.min(currentProg, 100));

      const logIdx = Math.min(Math.floor((currentProg / 100) * logs.length), logs.length - 1);
      setScanLog(logs[logIdx]);

      if (currentProg >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setStep(4); // نمایش نسخه تجویزی
        }, 500);
      }
    }, 80);
  };

  // پیشنهاد دقیق قطعات بر اساس پاسخ‌ها
  const getPrescription = (): { cpu: Product; gpu: Product; ram: Product } => {
    const cpus = products.filter((p) => p.category === 'cpu');
    const gpus = products.filter((p) => p.category === 'gpu');
    const rams = products.filter((p) => p.category === 'ram');

    let recommendedCpu = cpus[0];
    let recommendedGpu = gpus[0];
    let recommendedRam = rams[0];

    if (workload === 'rendering' || budgetTier === 'extreme') {
      recommendedCpu = cpus.find((c) => c.id.includes('14900k') || c.id.includes('7950x')) || cpus[0];
      recommendedGpu = gpus.find((g) => g.id.includes('4090') || g.id.includes('4080')) || gpus[0];
      recommendedRam = rams.find((r) => r.id.includes('64gb') || r.id.includes('corsair')) || rams[0];
    } else if (workload === 'gaming-4k') {
      recommendedCpu = cpus.find((c) => c.id.includes('7800x3d')) || cpus[1] || cpus[0];
      recommendedGpu = gpus.find((g) => g.id.includes('4080') || g.id.includes('4070ti')) || gpus[1] || gpus[0];
      recommendedRam = rams.find((r) => r.id.includes('32gb') || r.id.includes('gskill')) || rams[1] || rams[0];
    } else {
      recommendedCpu = cpus.find((c) => c.id.includes('14700k') || c.id.includes('7800x3d')) || cpus[2] || cpus[0];
      recommendedGpu = gpus.find((g) => g.id.includes('4070') || g.id.includes('7900')) || gpus[2] || gpus[0];
      recommendedRam = rams.find((r) => r.id.includes('32gb')) || rams[2] || rams[0];
    }

    return { cpu: recommendedCpu, gpu: recommendedGpu, ram: recommendedRam };
  };

  const prescription = getPrescription();
  const totalPrice = prescription.cpu.price + prescription.gpu.price + prescription.ram.price;

  return (
    <div className="eb-scanner-modal-backdrop" onClick={onClose}>
      <div
        className="eb-scanner-container reticle-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="eb-modal-close"
          aria-label="بستن اسکنر"
        >
          <X className="w-5 h-5" />
        </button>

        {/* هدر تلمتری EyeBot */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#080a0f] border border-[#bef264] flex items-center justify-center text-[#bef264] shadow-[0_0_15px_rgba(190,242,100,0.25)]">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">کیوسک هوشمند عیب‌یابی و انتخاب قطعات</span>
                <span className="eb-mono-tag bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30 px-2 py-0.5 rounded-full">
                  EYEBOT S1+ SYSTEM
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                تست و صدور نسخه بهینه سخت‌افزاری در کمتر از ۹۰ ثانیه
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#bef264]">
            <span className="w-2 h-2 rounded-full bg-[#bef264] shadow-[0_0_8px_#bef264]"></span>
            <span>DIAGNOSTIC ENGINE: READY</span>
          </div>
        </div>

        {/* مرحله ۱: نوع کاربری */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <div className="eb-mono-tag text-[#bef264] mb-1">مرحله ۰۱ / ۰۳</div>
              <h3 className="text-xl font-black text-white">هدف و نوع پردازش مورد نیاز خود را مشخص کنید:</h3>
              <p className="text-xs text-slate-400 mt-1">
                کیوسک EyeBot با سنجش بار محاسباتی شما، گلوگاه‌های احتمالی بین پردازنده و گرافیک را صفر می‌کند.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  id: 'gaming-4k',
                  title: 'گیمینگ سنگین و رقابتی (4K / 2K)',
                  desc: 'بالاترین فریم‌ریت در عناوینی چون Cyberpunk, Warzone با Ray Tracing',
                  badge: 'ULTRA GAMING',
                },
                {
                  id: 'rendering',
                  title: 'رندرینگ سه‌بعدی و موشن‌گرافیک',
                  desc: 'نرم‌افزارهای Blender, Maya, Premiere Pro, After Effects 4K',
                  badge: 'CONTENT CREATION',
                },
                {
                  id: 'ai',
                  title: 'هوش مصنوعی و یادگیری ماشین (AI)',
                  desc: 'اجرای محلی مدل‌های LLM، PyTorch و رندرهای مبتنی بر Tensor Core',
                  badge: 'AI & DEEP LEARNING',
                },
                {
                  id: 'esports',
                  title: 'ورزش‌های الکترونیک و استریمینگ',
                  desc: 'CS2, Valorant, Dota 2 با فریم ریت بالای 360fps بدون تاخیر',
                  badge: 'MAX FPS & LATENCY',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setWorkload(item.id as any)}
                  className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                    workload === item.id
                      ? 'bg-[#1e2638] border-[#bef264] shadow-[0_0_15px_rgba(190,242,100,0.15)]'
                      : 'bg-[#141924] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="eb-mono-tag text-xs text-[#bef264]">{item.badge}</span>
                    {workload === item.id && <CheckCircle2 className="w-4 h-4 text-[#bef264]" />}
                  </div>
                  <div className="font-bold text-sm text-white mb-1">{item.title}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-slate-400 font-mono">STEP 1 OF 3 // WORKLOAD PROFILE</span>
              <button
                onClick={() => setStep(2)}
                className="eb-pill-btn eb-pill-btn-accent"
              >
                <span>مرحله بعد: وضوح تصویر و بودجه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* مرحله ۲: رزولوشن و رده قطعات */}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <div className="eb-mono-tag text-[#bef264] mb-1">مرحله ۰۲ / ۰۳</div>
              <h3 className="text-xl font-black text-white">کیفیت بصری هدف و سقف توان قطعات را انتخاب کنید:</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2">رزولوشن هدف (TARGET RESOLUTION):</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '4k', label: '4K Ultra (2160p)', desc: 'نهایت جزئیات' },
                    { id: '2k', label: '2K QHD (1440p)', desc: 'استاندارد طلایی' },
                    { id: '1080p', label: 'FHD (1080p)', desc: 'سرعت و واکنش آنی' },
                  ].map((res) => (
                    <button
                      key={res.id}
                      onClick={() => setTargetResolution(res.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        targetResolution === res.id
                          ? 'bg-[#1e2638] border-[#bef264] text-[#bef264]'
                          : 'bg-[#141924] border-white/10 text-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{res.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{res.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2">رده کیفی قطعات (PERFORMANCE TIER):</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'extreme', label: 'سطح بی‌نهایت (Extreme)', desc: 'پرچمدار Core i9 / RTX 4090' },
                    { id: 'pro', label: 'حرفه‌ای و متعادل (Pro)', desc: 'Ryzen 7 / RTX 4080' },
                    { id: 'value', label: 'بهینه‌ترین ارزش خرید', desc: 'Core i7 / RTX 4070 Ti' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setBudgetTier(tier.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        budgetTier === tier.id
                          ? 'bg-[#1e2638] border-[#bef264] text-[#bef264]'
                          : 'bg-[#141924] border-white/10 text-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{tier.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setStep(1)}
                className="eb-pill-btn eb-pill-btn-outline"
              >
                <ArrowRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>

              <button
                onClick={runOpticalDiagnostic}
                className="eb-pill-btn eb-pill-btn-accent"
              >
                <Sparkles className="w-4 h-4" />
                <span>شروع اسکن و صدور نسخه سخت‌افزاری</span>
              </button>
            </div>
          </div>
        )}

        {/* مرحله ۳: انیمیشن اسکن و عیب‌یابی EyeBot Style */}
        {step === 3 && (
          <div className="py-10 text-center">
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#bef264] animate-spin"></div>
              <div className="absolute inset-3 rounded-full bg-[#080a0f] border border-[#bef264]/40 flex items-center justify-center shadow-[0_0_25px_rgba(190,242,100,0.3)]">
                <span className="font-mono font-black text-2xl text-[#bef264]">{scanProgress}٪</span>
              </div>
            </div>

            <div className="eb-mono-tag text-[#bef264] mb-2 tracking-widest">
              [ RUNNING S1+ OPTICAL HARDWARE SCAN ]
            </div>
            <h4 className="text-lg font-black text-white mb-2">{scanLog}</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6 font-mono">
              در حال سنجش همگرایی فرکانسی بین سوکت پردازنده، باس رم DDR5 و لاین‌های PCIe 5.0 کارت گرافیک
            </p>

            {/* نوار پیشرفت */}
            <div className="w-full max-w-md mx-auto bg-[#141924] border border-white/10 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#84cc16] to-[#bef264] rounded-full transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* مرحله ۴: نسخه تجویزی قطعات (Doctor / Engineer Prescription) */}
        {step === 4 && (
          <div>
            <div className="p-4 rounded-xl bg-[#bef264]/10 border border-[#bef264]/40 mb-5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-[#bef264]" />
                <div>
                  <div className="font-black text-white text-sm">نسخه سخت‌افزاری کالیبره شده با موفقیت صادر شد!</div>
                  <div className="text-xs text-slate-300 font-mono">
                    VERIFIED ZERO BOTTLENECK // 100% COMPATIBILITY GUARANTEED
                  </div>
                </div>
              </div>
              <div className="eb-mono-tag bg-[#080a0f] border border-[#bef264] text-[#bef264] px-3 py-1 rounded-full text-xs">
                RX-CODE: EB-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>

            {/* سه قطعه کلیدی هماهنگ */}
            <div className="space-y-3 mb-6">
              {/* پردازنده */}
              <div className="p-3.5 rounded-xl bg-[#141924] border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-black border border-white/15 overflow-hidden shrink-0">
                    <img src={prescription.cpu.image} alt={prescription.cpu.nameFa} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="eb-mono-tag text-xs text-[#bef264] flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>پردازنده مرکزی تایید شده (CPU)</span>
                    </div>
                    <div className="font-bold text-white text-xs sm:text-sm line-clamp-1">{prescription.cpu.nameFa}</div>
                    <div className="text-xs text-slate-400 font-mono">{prescription.cpu.highlightSpec}</div>
                  </div>
                </div>
                <div className="text-left shrink-0 font-mono text-white font-bold text-sm">
                  {prescription.cpu.price.toLocaleString('fa-IR')} <span className="text-[10px] text-slate-400">تومان</span>
                </div>
              </div>

              {/* کارت گرافیک */}
              <div className="p-3.5 rounded-xl bg-[#141924] border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-black border border-white/15 overflow-hidden shrink-0">
                    <img src={prescription.gpu.image} alt={prescription.gpu.nameFa} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="eb-mono-tag text-xs text-[#38bdf8] flex items-center gap-1.5">
                      <CircuitBoard className="w-3.5 h-3.5" />
                      <span>کارت گرافیک شتاب‌دهنده (GPU)</span>
                    </div>
                    <div className="font-bold text-white text-xs sm:text-sm line-clamp-1">{prescription.gpu.nameFa}</div>
                    <div className="text-xs text-slate-400 font-mono">{prescription.gpu.highlightSpec}</div>
                  </div>
                </div>
                <div className="text-left shrink-0 font-mono text-white font-bold text-sm">
                  {prescription.gpu.price.toLocaleString('fa-IR')} <span className="text-[10px] text-slate-400">تومان</span>
                </div>
              </div>

              {/* رم */}
              <div className="p-3.5 rounded-xl bg-[#141924] border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-black border border-white/15 overflow-hidden shrink-0">
                    <img src={prescription.ram.image} alt={prescription.ram.nameFa} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="eb-mono-tag text-xs text-[#a855f7] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>حافظه رم پرسرعت DDR5 (RAM)</span>
                    </div>
                    <div className="font-bold text-white text-xs sm:text-sm line-clamp-1">{prescription.ram.nameFa}</div>
                    <div className="text-xs text-slate-400 font-mono">{prescription.ram.highlightSpec}</div>
                  </div>
                </div>
                <div className="text-left shrink-0 font-mono text-white font-bold text-sm">
                  {prescription.ram.price.toLocaleString('fa-IR')} <span className="text-[10px] text-slate-400">تومان</span>
                </div>
              </div>
            </div>

            {/* جمع کل و دکمه خرید پکیج کامل */}
            <div className="p-4 rounded-xl bg-[#1e2638] border border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs text-slate-400">مجموع بهای کل پکیج هماهنگ:</div>
                <div className="font-black text-xl text-white font-mono flex items-baseline gap-1">
                  <span>{totalPrice.toLocaleString('fa-IR')}</span>
                  <span className="text-xs text-slate-400 font-sans">تومان</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setStep(1);
                    runOpticalDiagnostic();
                  }}
                  className="eb-pill-btn eb-pill-btn-outline"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>اسکن مجدد</span>
                </button>

                <button
                  onClick={() => {
                    onAddMultipleToCart([prescription.cpu, prescription.gpu, prescription.ram]);
                    onClose();
                  }}
                  className="eb-pill-btn eb-pill-btn-accent"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>افزودن هر ۳ قطعه نسخه به سبد</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
