"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  LinkedIn, 
  GitHub, 
  ProductHunt,
  MessageCircle,
  Instagram,
  Download,
  MapPin,
  Copy
} from "./icons";

export const SidebarProfile: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  
  const socialLinks = [
    { icon: LinkedIn, href: "#", label: "LinkedIn" },
    { icon: GitHub, href: "#", label: "GitHub" },
    { icon: ProductHunt, href: "#", label: "ProductHunt" },
    { icon: MessageCircle, href: "#", label: "Telegram" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("alvarolangadev@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-4 md:space-y-6 w-full max-w-[320px] mx-auto lg:mx-0">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative rounded-[20px] md:rounded-[24px] bg-black/20 backdrop-blur-md border border-white/20 p-6 md:p-8 w-full"
        style={{
          background: "linear-gradient(145deg, rgba(0,0,0,0.25) 0%, rgba(20,20,20,0.35) 100%)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Subtle glow effect */}
        <div 
          className="absolute inset-0 rounded-[20px] md:rounded-[24px] opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)"
          }}
        />
        
        <div className="relative flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="relative w-[120px] md:w-[140px] h-[120px] md:h-[140px] mb-4 md:mb-6">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/15 bg-gray-800/50">
              <Image 
                src="/avatar.jpg" 
                alt="Profile picture" 
                width={140} 
                height={140} 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Subtle ring around profile */}
            <div className="absolute inset-0 rounded-full border border-white/5" />
          </div>

          {/* Name */}
          <h1 className="text-white font-bold text-[24px] md:text-[28px] leading-[28px] md:leading-[34px] mb-2 tracking-[-0.5px]">
            Álvaro Langa
          </h1>
          
          {/* Job Title */}
          <p className="text-white/60 text-[14px] md:text-[15px] font-medium mb-4 md:mb-6 tracking-wide">
            Software Developer
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/50 text-[13px] md:text-[14px] mb-6 md:mb-8">
            <MapPin size={14} className="text-white/40 md:w-4 md:h-4" />
            <span>Madrid, Spain</span>
          </div>

          {/* CV Download Button */}
          <button className="w-full h-[44px] md:h-[48px] px-4 md:px-6 bg-white hover:bg-white/95 text-black rounded-[10px] md:rounded-[12px] text-[13px] md:text-[14px] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
            <Download size={14} className="md:w-4 md:h-4" />
            <span>Download CV</span>
          </button>
        </div>
      </motion.div>

      {/* Follow Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="w-full"
      >
        {/* Section Title */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-white text-[20px] md:text-[25px] font-bold tracking-[-0.2px] text-center">
            Follow me
          </h2>
        </div>

        {/* Email Button */}
        <div className="mb-4 md:mb-6">
          <button 
            onClick={handleEmailCopy}
            className="group w-full h-[48px] md:h-[52px] px-4 md:px-5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-[14px] md:rounded-[16px] text-white text-[13px] md:text-[14px] font-medium transition-all duration-300 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99]"
            style={{
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}
          >
            <span className="flex items-center gap-3">
              <div className="text-white/60">
                <svg width="16" height="16" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-10 5L2 7"/>
                </svg>
              </div>
              <span className="truncate">alvarolangadev@gmail.com</span>
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Copy size={14} className="text-white/50 md:w-4 md:h-4" />
            </div>
          </button>
          {emailCopied && (
            <p className="text-green-400 text-[11px] md:text-[12px] mt-2 text-center font-medium">
              Email copiado en el portapapeles!
            </p>
          )}
        </div>

        {/* Social Icons in a single row */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="group w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label={social.label}
              >
                <IconComponent size={20} className="md:w-6 md:h-6 transition-transform duration-200" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarProfile;