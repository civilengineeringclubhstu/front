'use client';

import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const MAGAZINES = [
  { id: 'vol4', title: 'Volume 4: The Innovation Issue', image: 'https://picsum.photos/seed/mag1/800/1100' },
  { id: 'vol3', title: 'Volume 3: Leadership in Tech', image: 'https://picsum.photos/seed/mag2/800/1100' },
  { id: 'vol2', title: 'Volume 2: Community Impact', image: 'https://picsum.photos/seed/mag3/800/1100' },
];

export default function MagazinePage() {
  const [selected, setSelected] = useState(MAGAZINES[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-6 max-w-5xl pb-24">
      <PageHeader title="Our Magazine" description="Dive deep into our curated stories, interviews, and showcases." />
      
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-[32px] overflow-hidden glass shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={selected.image}
            alt={selected.title}
            fill
            className="object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="relative">
            <h3 className="text-sm font-bold text-info-light uppercase tracking-widest mb-2">Select Edition</h3>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full input-glass flex items-center justify-between font-bold text-lg"
            >
              {selected.title}
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 glass rounded-2xl z-20 flex flex-col gap-1">
                {MAGAZINES.map(mag => (
                  <button
                    key={mag.id}
                    onClick={() => { setSelected(mag); setIsOpen(false); }}
                    className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${selected.id === mag.id ? 'bg-info-light/10 text-info-light' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                  >
                    {mag.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">{selected.title}</h2>
            <p className="text-primary-light/70 dark:text-primary/70 leading-relaxed mb-8">
              Explore our latest publication featuring in-depth interviews with industry leaders, highlights from our recent events, and articles written by our talented community members. Available in high-resolution PDF format.
            </p>
            
            <button className="btn-primary w-full sm:w-auto">
              <Download className="w-5 h-5 mr-2" /> Download PDF
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
