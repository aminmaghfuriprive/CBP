
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
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- EXPERT STAFF (DIVISIONS) --- */}
        <SectionHeader 
          title={TEAM_SECTION_TITLES.mainTitle} 
          subtitle={TEAM_SECTION_TITLES.mainSubtitle}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
            {expertStaff.map((member) => (
              <ExpertTeamCard 
                key={member.id}
                name={member.name}
                role={member.role} 
                specialty={member.specialty}
                imageUrl={member.imageUrl}
                onClick={() => setSelectedMember(member)}
              />
            ))}
        </div>

        {/* --- SUPPORT STAFF (ROUND PHOTOS) --- */}
        {supportStaff.length > 0 && (
          <div className="relative">
            {/* Visual Divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-cbp-gold rounded-full mb-12"></div>
            
            <div className="text-center mb-16 pt-12">
               <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white tracking-wide uppercase">
                 {TEAM_SECTION_TITLES.supportTitle}
               </h3>
            </div>

            {/* Changed from Grid to Flex to allow centering of the last row */}
            <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
                {supportStaff.map((member) => (
                  <div key={member.id} className="w-full sm:w-72">
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
