"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LinkedIn,
  GitHub,
  Download,
  MapPin,
} from "./icons";
import { useLanguage } from "../i18n/LanguageContext";

export const SidebarProfile: React.FC = () => {
  const { t } = useLanguage();
  const socialLinks = [
    { icon: LinkedIn, href: "https://www.linkedin.com/in/%C3%A1lvaro-langa-dev/", label: "LinkedIn" },
    { icon: GitHub, href: "https://github.com/Laanga", label: "GitHub" },
  ];

  return (
    <div className="flex flex-col items-center space-y-6 md:space-y-8 w-full max-w-[340px] mx-auto lg:mx-0">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative rounded-3xl md:rounded-[32px] bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] p-8 md:p-10 w-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
        }}
      >
        {/* iOS-style subtle inner glow */}
        <div
          className="absolute inset-0 rounded-3xl md:rounded-[32px] opacity-60"
          style={{
            background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)"
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="relative w-[140px] md:w-[160px] h-[140px] md:h-[160px] mb-6 md:mb-8">
            <div className="w-full h-full rounded-full overflow-hidden bg-white/5 ring-1 ring-white/10"
                 style={{
                   boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                 }}>
              <Image
                src="/avatar.jpg"
                alt="Profile picture"
                width={160}
                height={160}
                className="w-full h-full object-cover scale-105"
              />
            </div>
            {/* iOS-style outer ring */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/[0.03]" />
          </div>

          {/* Name */}
          <h1 className="text-white font-bold text-[28px] md:text-[32px] leading-[32px] md:leading-[38px] mb-3 tracking-[-0.8px] font-mono">
            Álvaro Langa
          </h1>

          {/* Job Title */}
          <p className="text-white/70 text-[15px] md:text-[16px] font-medium mb-6 md:mb-8 tracking-[0.2px]">
            {t.profile.jobTitle}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2.5 text-white/60 text-[14px] md:text-[15px] mb-8 md:mb-10 px-3 py-1.5 rounded-full bg-white/[0.06]">
            <MapPin size={16} className="text-white/50 md:w-[18px] md:h-[18px]" />
            <span className="font-medium">{t.profile.location}</span>
          </div>

          {/* CV Download Button */}
          <a
            href="/CV-Alvaro-Langa.pdf" 
            download="CV-Álvaro-Langa.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full h-[52px] md:h-[56px] px-6 md:px-8 bg-white hover:bg-white/95 text-black rounded-2xl text-[15px] md:text-[16px] font-semibold transition-all duration-500 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.97] hover:shadow-2xl active:shadow-lg"
            style={{
              boxShadow: "0 12px 32px rgba(255,255,255,0.15), 0 2px 8px rgba(255,255,255,0.1)"
            }}
          >
            <Download size={16} className="md:w-[18px] md:h-[18px]" />
            <span>{t.profile.downloadCV}</span>
          </a>
        </div>
      </motion.div>

      {/* Follow Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className="w-full space-y-6"
      >
        {/* Section Title */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-white text-[22px] md:text-[26px] font-bold tracking-[-0.6px] text-center font-mono">
            {t.profile.followMe}
          </h2>
        </div>

        {/* Email Button */}
        <div className="mb-6 md:mb-8">
          <a
            href={`mailto:${t.profile.email}`}
            className="group w-full h-[56px] md:h-[60px] px-6 md:px-7 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.2] rounded-2xl text-white text-[15px] md:text-[16px] font-medium transition-all duration-500 flex items-center justify-start active:scale-[0.98] backdrop-blur-xl"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
            }}
          >
            <span className="flex items-center gap-4 w-full">
              <div className="text-white/60 group-hover:text-white/80 transition-colors duration-300 flex-shrink-0">
                <svg width="18" height="18" className="md:w-[20px] md:h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
              </div>
              <span className="truncate font-medium tracking-[0.1px]">{t.profile.email}</span>
            </span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
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
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-white/60 hover:text-white transition-all duration-500 hover:scale-105 active:scale-95 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-lg"
                aria-label={social.label}
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
                }}
              >
                <IconComponent size={22} className="md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarProfile;