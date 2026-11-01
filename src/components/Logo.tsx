import React from 'react';

interface LogoProps {
  variant?: 'full' | 'symbol' | 'compact';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  onClick,
}) => {
  const isDark = theme === 'dark';

  // Dimension mapping
  const symbolSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      role="banner"
    >
      {/* Precision Geometric SVG Emblem */}
      <div className={`relative shrink-0 ${symbolSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Background hexagon/shield rounded container */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            fill={isDark ? '#132B40' : '#0B1825'}
            stroke={isDark ? '#0FAF9B' : '#132B40'}
            strokeWidth="2.5"
            strokeOpacity={isDark ? '0.4' : '0.15'}
          />

          {/* Satellite Orbit Rings (signal arcs) */}
          <circle
            cx="50"
            cy="52"
            r="34"
            stroke="#0FAF9B"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
          <circle
            cx="50"
            cy="52"
            r="26"
            stroke={isDark ? '#ffffff' : '#0FAF9B'}
            strokeWidth="1.5"
            strokeOpacity="0.25"
          />

          {/* Parabolic Satellite Dish + Lion Mane Chevron Geometry */}
          {/* Lion Crown / Dish Feed Horn Assembly forming 'A' */}
          <path
            d="M50 18L64 42H36L50 18Z"
            fill="url(#accentGoldGrad)"
          />
          <path
            d="M50 24L58 40H42L50 24Z"
            fill={isDark ? '#132B40' : '#0B1825'}
          />

          {/* Dish Parabola Curve */}
          <path
            d="M22 56C22 71.464 34.536 84 50 84C65.464 84 78 71.464 78 56C69 66 59 70 50 70C41 70 31 66 22 56Z"
            fill="url(#tealGlowGrad)"
          />

          {/* Transmitter / Feed Beam */}
          <line
            x1="50"
            y1="40"
            x2="50"
            y2="64"
            stroke="#E5A54B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Center Orbital Core Beacon */}
          <circle cx="50" cy="52" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="52" r="2" fill="#0FAF9B" />

          {/* Concentric Signal Wave Emitters */}
          <path
            d="M66 32C72 38 74 46 72 54"
            stroke="#0FAF9B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M74 24C82 32 85 45 81 58"
            stroke="#0FAF9B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="accentGoldGrad" x1="36" y1="18" x2="64" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5C067" />
              <stop offset="1" stopColor="#E5A54B" />
            </linearGradient>
            <linearGradient id="tealGlowGrad" x1="22" y1="56" x2="78" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0FAF9B" />
              <stop offset="1" stopColor="#0B796B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'symbol' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-black tracking-tight ${textSizes[size]} ${
                isDark ? 'text-white' : 'text-[#0B1825]'
              }`}
              style={{ fontFamily: "'Cairo', 'IBM Plex Sans Arabic', sans-serif" }}
            >
              أسد السات
            </span>
            {variant === 'full' && (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0FAF9B] font-mono">
                SatTech
              </span>
            )}
          </div>
          <span
            className={`text-[11px] font-bold tracking-widest uppercase font-mono ${
              isDark ? 'text-slate-300' : 'text-[#6B7D8D]'
            }`}
          >
            ASAD AL SAT
          </span>
        </div>
      )}
    </div>
  );
};
