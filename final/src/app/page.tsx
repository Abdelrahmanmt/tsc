'use client';

import { Html as DemoHtml } from './demo';
import { Html as HeroHtml } from './hero-futuristic';
import { Gallery4 } from './gallery4';
import { HeroSection } from './hero-section-5';
import { HoverButton } from '@/components/ui/hover-button';
import Link from 'next/link';
import { About3 } from './about-3';


export default function Home() {
  return (
    <main>


      <HeroSection /> 

      <div className="pt-32">
      <Gallery4 />
      </div>
      <div className="flex justify-center py-12">
        <Link href="https://calendly.com/transcenda-io/30min" target="_blank" rel="noopener noreferrer">
          <HoverButton size="lg" variant="default">
            Schedule a Free Consultation
          </HoverButton>
        </Link>
      </div>
      <About3 />
    </main>
  );
}
