import React from 'react';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import MissionVision from '../components/about/MissionVision';
import OurValues from '../components/about/OurValues';
import LeadershipTeam from '../components/about/LeadershipTeam';
import CommunitySection from '../components/about/CommunitySection';
import AboutCTA from '../components/about/AboutCTA';

export function About() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 font-sans selection:bg-blue-600 selection:text-white">
      <AboutHero />
      <LeadershipTeam />
      <OurStory />
      <MissionVision />
      <OurValues />
      <CommunitySection />
      <AboutCTA />
    </div>
  );
}

export default About;
