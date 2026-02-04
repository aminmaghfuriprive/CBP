
import React, { useState } from 'react';
import { Lawyer } from '@cbp/core';
import { SectionHeader } from '@cbp/ui';
import { TEAM_SECTION_TITLES } from '@/data/about-content';
import { ExpertTeamCard } from '../molecules/ExpertTeamCard';
import { SupportTeamCard } from '../molecules/SupportTeamCard';
import { TeamMemberModal } from '../molecules/TeamMemberModal';

interface TeamSectionProps {
  expertStaff: Lawyer[];
  supportStaff: Lawyer[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ expertStaff, supportStaff }) => {
  const [selectedMember, setSelectedMember] = useState<Lawyer | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- EXPERT STAFF (DIVISIONS) --- */}
        <SectionHeader 
          title={TEAM_SECTION_TITLES.mainTitle} 
          subtitle={TEAM_SECTION_TITLES.mainSubtitle}
        />
        
        {/* Use Flexbox for centering orphan items and easier control of widths */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-20 md:mb-24">
            {expertStaff.map((member) => (
              <div 
                key={member.id} 
                className="w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <ExpertTeamCard 
                  name={member.name}
                  role={member.role} 
                  specialty={member.specialty}
                  imageUrl={member.imageUrl}
                  onClick={() => setSelectedMember(member)}
                />
              </div>
            ))}
        </div>

        {/* --- SUPPORT STAFF (ROUND PHOTOS) --- */}
        {supportStaff.length > 0 && (
          <div className="relative">
            {/* Visual Divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-cbp-gold rounded-full mb-12"></div>
            
            <div className="text-center mb-10 md:mb-16 pt-12">
               <h3 className="text-xl md:text-2xl font-serif font-bold text-cbp-navy dark:text-white tracking-wide uppercase">
                 {TEAM_SECTION_TITLES.supportTitle}
               </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-y-8 gap-x-4 md:gap-10 max-w-5xl mx-auto">
                {supportStaff.map((member) => (
                  <div key={member.id} className="w-[calc(50%-0.5rem)] sm:w-72">
                    <SupportTeamCard 
                      name={member.name}
                      role={member.role}
                      specialty={member.specialty}
                      imageUrl={member.imageUrl}
                      onClick={() => setSelectedMember(member)}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Detail Modal */}
      <TeamMemberModal 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </section>
  );
};
