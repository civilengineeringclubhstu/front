'use client';

import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const GALLERY_ITEMS = [
  { type: 'image', url: 'https://picsum.photos/seed/g1/800/800', title: 'Annual Tech Symposium' },
  { type: 'video', url: 'https://picsum.photos/seed/g2/800/800', title: 'Hackathon 2025 Highlights' },
  { type: 'image', url: 'https://picsum.photos/seed/g3/800/800', title: 'Leadership Workshop' },
  { type: 'image', url: 'https://picsum.photos/seed/g4/800/800', title: 'Community Outreach' },
  { type: 'video', url: 'https://picsum.photos/seed/g5/800/800', title: 'Alumni Meetup' },
  { type: 'image', url: 'https://picsum.photos/seed/g6/800/800', title: 'Farewell Gala' },
];

export default function GalleryPage() {
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
    </div>
  );
}
