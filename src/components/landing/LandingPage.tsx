import React from 'react';
import { Navbar } from './Navbar';
import { Scene1Hero } from './Scene1Hero';
import { Scene2Problem } from './Scene2Problem';
import { Scene3AIAvatar } from './Scene3AIAvatar';
import { Scene4FollowUpDemo } from './Scene4FollowUpDemo';
import { Scene5Analytics } from './Scene5Analytics';
import { Scene6Personalization } from './Scene6Personalization';
import { Scene7ReadinessPreview } from './Scene7ReadinessPreview';
import { Scene8Improvement } from './Scene8Improvement';
import { Scene9PracticePreview } from './Scene9PracticePreview';
import { Scene10PricingCTA } from './Scene10PricingCTA';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Scene1Hero />
        <Scene2Problem />
        <Scene3AIAvatar />
        <Scene4FollowUpDemo />
        <Scene5Analytics />
        <Scene6Personalization />
        <Scene7ReadinessPreview />
        <Scene8Improvement />
        <Scene9PracticePreview />
        <Scene10PricingCTA />
      </main>
      <Footer />
    </div>
  );
};
