'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_ITEMS = [
  { type: 'image', url: 'https://picsum.photos/seed/g1/800/800', title: 'Annual Tech Symposium' },
  { type: 'video', url: 'https://picsum.photos/seed/g2/800/800', title: 'Hackathon 2025 Highlights' },
  { type: 'image', url: 'https://picsum.photos/seed/g3/800/800', title: 'Leadership Workshop' },
  { type: 'image', url: 'https://picsum.photos/seed/g4/800/800', title: 'Community Outreach' },
  { type: 'video', url: 'https://picsum.photos/seed/g5/800/800', title: 'Alumni Meetup' },
  { type: 'image', url: 'https://picsum.photos/seed/g6/800/800', title: 'Farewell Gala' },
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-6 max-w-7xl pb-24">
      <PageHeader title="Gallery" description="Capturing moments, memories, and milestones." />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative rounded-[24px] overflow-hidden aspect-square cursor-pointer"
            onClick={() => setSelectedIndex(idx)}
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-white/40 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              onClick={() => setSelectedIndex(null)} 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-[110]"
            >
              <X className="w-10 h-10" />
            </button>
            
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setSelectedIndex(selectedIndex === 0 ? GALLERY_ITEMS.length - 1 : selectedIndex - 1);
              }}
              className="absolute left-4 md:left-10 text-white/50 hover:text-white p-4 z-[110] transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setSelectedIndex(selectedIndex === GALLERY_ITEMS.length - 1 ? 0 : selectedIndex + 1);
              }}
              className="absolute right-4 md:right-10 text-white/50 hover:text-white p-4 z-[110] transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <motion.div 
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-[85vw] h-[75vh] max-w-6xl flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                 src={GALLERY_ITEMS[selectedIndex].url}
                 alt={GALLERY_ITEMS[selectedIndex].title}
                 fill
                 className="object-contain"
                 referrerPolicy="no-referrer"
              />
              {GALLERY_ITEMS[selectedIndex].type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-2xl">
                    <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
                  </div>
                </div>
              )}
              <div className="absolute -bottom-14 text-white font-medium text-xl bg-black/50 px-6 py-2 rounded-full backdrop-blur-md">
                 {GALLERY_ITEMS[selectedIndex].title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
