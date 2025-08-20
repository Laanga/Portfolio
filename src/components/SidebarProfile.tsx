"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  LinkedIn, 
  GitHub, 
  Twitter,
  MessageCircle,
  Download,
  MapPin,
  Mail
} from "./icons";

export const SidebarProfile: React.FC = () => {
  const socialLinks = [
    { icon: LinkedIn, href: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
    { icon: GitHub, href: "https://github.com/your-username", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/your-handle", label: "X" },
    { icon: MessageCircle, href: "https://t.me/your-username", label: "Telegram" },
  ];

  return (
    <aside className="lg:sticky lg:top-8 space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-[20px] bg-black/60 backdrop-blur-sm border border-white/10 p-6 w-full max-w-[280px]"
      >
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-white/10 mb-4">
            <Image 
              src="/profile-photo.jpg" 
              alt="Profile picture" 
              width={120} 
              height={120} 
              className="w-full h-full object-cover bg-gray-800" 
            />
          </div>

          {/* Name and Title */}
          <h1 className="text-[24px] font-bold text-white mb-1 leading-tight">
            Your Name<br />Here
          </h1>
          <p className="text-white/60 text-[13px] mb-4">Your Job Title</p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-white/60 text-[13px] mb-6">
            <MapPin size={14} />
            <span>Your City, Country</span>
          </div>

          {/* CV Download Button */}
          <button className="w-full h-10 px-4 bg-white text-black hover:bg-white/90 rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center justify-center gap-2">
            <Download size={14} />
            <span>Download CV</span>
          </button>
        </div>
      </motion.div>

      {/* Follow Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className="w-full max-w-[280px]"
      >
        <div className="mb-4">
          <p className="text-white text-[14px] font-medium">Follow me</p>
        </div>

        {/* Email Button */}
        <div className="mb-4">
          <button className="w-full h-12 px-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg text-white text-[13px] font-medium transition-all duration-200 flex items-center justify-center gap-2">
            <Mail size={16} />
            <span>your.email@example.com</span>
          </button>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white/70 hover:text-white text-[12px] transition-all duration-200 flex items-center justify-center gap-2"
                aria-label={social.label}
              >
                <IconComponent size={18} />
                <span className="font-medium">{social.label}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </aside>
  );
};

export default SidebarProfile;