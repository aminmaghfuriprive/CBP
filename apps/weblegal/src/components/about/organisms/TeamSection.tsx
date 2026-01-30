
import React from 'react';
import { Lawyer } from '@cbp/core';
import { SectionHeader } from '@cbp/ui';
import { TEAM_SECTION_TITLES } from '@/data/about-content';
import { ExpertTeamCard } from '../molecules/ExpertTeamCard';
import { SupportStaffRow } from '../molecules/SupportStaffRow';

interface TeamSectionProps {
  expertStaff: Lawyer[];
  supportStaff: Lawyer[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ expertStaff, supportStaff }) => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title={TEAM_SECTION_TITLES.mainTitle} 
          subtitle={TEAM_SECTION_TITLES.mainSubtitle}
        />
        
        {/* Expert Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {expertStaff.map((member) => (
              <ExpertTeamCard 
                key={member.id}
                name={member.name}
                role={member.role}
                specialty={member.specialty}
                imageUrl={member.imageUrl}
              />
            ))}
        </div>

        {/* Support Staff List */}
        {supportStaff.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
               <h3 className="text-xl font-serif font-bold text-slate-400 uppercase tracking-widest">
                 {TEAM_SECTION_TITLES.supportTitle}
               </h3>
               <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {supportStaff.map((member) => (
                  <SupportStaffRow 
                    key={member.id}
                    name={member.name}
                    specialty={member.specialty}
                    imageUrl={member.imageUrl}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
