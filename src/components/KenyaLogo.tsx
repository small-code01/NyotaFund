import React from 'react';

interface KenyaLogoProps {
  className?: string;
  scrolled?: boolean;
}

export const KenyaLogo: React.FC<KenyaLogoProps> = ({ className = "", scrolled = false }) => {
  const textColor = scrolled ? 'text-kenya-black' : 'text-white';
  const accentColor = scrolled ? 'text-kenya-red' : 'text-kenya-green';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Graphic */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Kenya Map Outline */}
          <path
            d="M35,10 L45,8 L55,12 L65,15 L75,25 L80,40 L85,55 L80,70 L70,85 L55,92 L40,90 L25,80 L15,65 L10,45 L15,25 L25,15 Z"
            stroke={scrolled ? "#000000" : "#FFFFFF"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />
          
          {/* Internal Swooshes (Flag Colors) */}
          <path d="M20,40 Q35,45 50,40" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <path d="M18,50 Q35,55 52,50" stroke="#BB0000" strokeWidth="4" strokeLinecap="round" />
          <path d="M20,60 Q35,65 50,60" stroke="#006600" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`font-display font-black text-3xl tracking-tighter ${scrolled ? 'text-kenya-green' : 'text-white'}`}>
            NY
          </span>
          {/* The "O" with the Star */}
          <div className="relative w-8 h-8 mx-0.5">
            <div className="absolute inset-0 bg-kenya-green rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400 fill-current">
                <path d="M12 2L13.5 9H21L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9H10.5L12 2Z" />
              </svg>
            </div>
          </div>
          <span className={`font-display font-black text-3xl tracking-tighter ${scrolled ? 'text-kenya-green' : 'text-white'}`}>
            TA
          </span>
        </div>
        
        <div className="flex items-center gap-1 -mt-1">
          <span className={`text-xs font-black uppercase tracking-tight ${scrolled ? 'text-kenya-black' : 'text-white'}`}>
            FUND
          </span>
          <span className="text-xs font-black uppercase tracking-tight text-kenya-red">
            EMPOWERMENT
          </span>
        </div>
        
        <span className={`text-[9px] font-medium italic font-serif ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
          Kuza, Imarisha, Endeleza Vijana!
        </span>
      </div>
    </div>
  );
};
