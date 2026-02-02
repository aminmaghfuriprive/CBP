
import React from 'react';
import { Lawyer } from '@cbp/core';
import { X, GraduationCap, Award, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface TeamMemberModalProps {
  member: Lawyer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button (Mobile Absolute) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-white/40 text-white md:text-slate-500 md:dark:text-white rounded-full transition-colors md:hidden"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Left: Image Side */}
        <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-slate-900">
           <Image 
             src={member.imageUrl} 
             alt={member.name} 
             fill 
             className="object-cover opacity-90"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/50"></div>
           
           <div className="absolute bottom-0 left-0 p-6 text-white md:hidden">
              <h3 className="text-2xl font-serif font-bold leading-tight">{member.name}</h3>
              <p className="text-cbp-gold text-sm font-bold uppercase tracking-widest mt-1">{member.specialty}</p>
           </div>
        </div>

        {/* Right: Content Side */}
        <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-950 relative">
           
           {/* Desktop Close Button */}
           <button 
             onClick={onClose}
             className="hidden md:block absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
           >
             <X className="h-6 w-6" />
           </button>

           {/* Desktop Header */}
           <div className="hidden md:block mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-cbp-gold/10 text-cbp-gold text-xs font-bold uppercase tracking-widest mb-3 border border-cbp-gold/20">
                {member.role}
              </span>
              <h2 className="text-3xl font-serif font-bold text-cbp-navy dark:text-white mb-1 leading-tight">
                {member.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg border-b border-slate-100 dark:border-slate-800 pb-6">
                {member.specialty}
              </p>
           </div>

           {/* Content Body */}
           <div className="space-y-8">
              {/* Bio */}
              <div>
                 <h4 className="flex items-center gap-2 font-bold text-cbp-navy dark:text-white mb-3 text-sm uppercase tracking-wide">
                    <User className="h-4 w-4 text-cbp-gold" /> Profil Profesional
                 </h4>
                 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                    {member.bio || "Profesional berdedikasi tinggi dengan fokus pada memberikan solusi hukum yang tepat dan efisien bagi setiap klien CBP Corp."}
                 </p>
              </div>

              {/* Education */}
              {member.education && member.education.length > 0 && (
                <div>
                   <h4 className="flex items-center gap-2 font-bold text-cbp-navy dark:text-white mb-3 text-sm uppercase tracking-wide">
                      <GraduationCap className="h-4 w-4 text-cbp-gold" /> Pendidikan
                   </h4>
                   <ul className="space-y-2">
                      {member.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                           <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0"></span>
                           {edu}
                        </li>
                      ))}
                   </ul>
                </div>
              )}

              {/* Expertise */}
              {member.expertise && member.expertise.length > 0 && (
                <div>
                   <h4 className="flex items-center gap-2 font-bold text-cbp-navy dark:text-white mb-3 text-sm uppercase tracking-wide">
                      <Award className="h-4 w-4 text-cbp-gold" /> Bidang Keahlian
                   </h4>
                   <div className="flex flex-wrap gap-2">
                      {member.expertise.map((exp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-md border border-slate-200 dark:border-slate-700">
                           {exp}
                        </span>
                      ))}
                   </div>
                </div>
              )}
           </div>

           {/* Footer Action */}
           <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button className="flex items-center gap-2 text-cbp-gold font-bold text-sm hover:gap-3 transition-all group">
                 Hubungi via WhatsApp <ArrowRight className="h-4 w-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
