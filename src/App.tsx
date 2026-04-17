/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X } from 'lucide-react';

interface ProjectContent {
  images: string[];
  video?: string;
  description: string;
}

interface CardItem {
  id: string;
  label: string;
  type: 'item' | 'category';
  col: number; // 0 to 4 derived column position
  content?: ProjectContent;
  categoryId?: string; // which category this item belongs to
}

const DATA: CardItem[] = [
  // BACK (Index 0)
  { id: '94', label: 'oil lamp', type: 'item', col: 2, categoryId: 'O' },
  { id: '95', label: 'oats', type: 'item', col: 3, categoryId: 'O' },
  { id: 'O', label: '010', type: 'category', col: 1 },
 

  { id: '100', label: 'phisher', type: 'item', col: 2, categoryId: 'P' },
  { id: '101', label: 'palo alto', type: 'item', col: 3, categoryId: 'P' },
  { id: '102', label: 'pencile', type: 'item', col: 2, categoryId: 'P' },
  { id: '103', label: 'photos', type: 'item', col: 3, categoryId: 'P' },
  { id: '104', label: 'quiet', type: 'item', col: 0, categoryId: 'Q' },
  { id: 'P', label: '00000', type: 'category', col: 2 },
  { id: '105', label: 'queen', type: 'item', col: 3, categoryId: 'Q' },
  { id: '106', label: 'questions', type: 'item', col: 2, categoryId: 'Q' },
  { id: '107', label: 'quizz', type: 'item', col: 3, categoryId: 'Q' },
  { id: '108', label: 'quit', type: 'item', col: 2, categoryId: 'Q' },
  { id: 'Q', label: 'AI art', type: 'category', col: 3 },
  { id: '109', label: 'raccoon', type: 'item', col: 2, categoryId: 'R' },
  { id: '111', label: 'rizz', type: 'item', col: 3, categoryId: 'R' },
  { id: '112', label: 'rum', type: 'item', col: 0, categoryId: 'R' },

  { id: '114', label: 'rain', type: 'item', col: 2, categoryId: 'R' },
  { id: '115', label: 'rug', type: 'item', col: 3, categoryId: 'R' },
  { id: '116', label: 'ruby', type: 'item', col: 2, categoryId: 'R' },
  { id: '117', label: 'sider', type: 'item', col: 3, categoryId: 'R' },
  { id: 'R', label: 'UI/UX design', type: 'category', col: 1 },
  { id: '118', label: 'sony', type: 'item', col: 2, categoryId: 'S' },
  { id: '119', label: 'sun', type: 'item', col: 3, categoryId: 'S' },
  { id: '120', label: 'seller', type: 'item', col: 2, categoryId: 'S' },
  { id: '121', label: 'sims', type: 'item', col: 3, categoryId: 'S' },
  { id: '122', label: 'slides', type: 'item', col: 2, categoryId: 'S' },
  { id: '123', label: 'simpsons', type: 'item', col: 3, categoryId: 'S' },
  { id: '124', label: 'sir', type: 'item', col: 2, categoryId: 'S' },
  { id: 'S', label: 'project work', type: 'category', col: 0 },
  { id: '900', label: 'about me', type: 'category', col: 2 },
  // FRONT (Last Index)
];

const MOCK_CONTENT: ProjectContent = {
  images: [
    'https://i.postimg.cc/wMhVvPhT/2.jpg',
    'https://picsum.photos/seed/arch2/800/600',
    'https://picsum.photos/seed/arch3/800/600',
  ],
  video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  description: 'Detailed exploration of the archival systems architecture. This module focuses on the intersection of physical indexing and high-frequency digital retrieval. Each component is treated as a tangibile object with weight and history.'
};

const Tab = ({ item, onClick }: { item: CardItem, onClick?: () => void }) => {
  const isCategory = item.type === 'category';
  const leftPositions = ['15%', '25%', '50%', '75%', '85%'];
  const left = leftPositions[item.col] || '20px';
  const width = isCategory ? '160px' : '140px';

  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className={`absolute -top-[27px] h-[28px] px-3 rounded-t-lg flex items-center index-stroke transition-all duration-300 border-b-white z-[100] cursor-pointer
        ${isCategory 
          ? 'bg-black text-white text-[10px] font-bold tracking-widest uppercase shadow-md' 
          : 'bg-white text-black text-[12px] font-mono shadow-sm'
        }
      `}
      style={{ left, width }}
    >
      <span className={`opacity-60 mr-auto ${isCategory ? 'text-[8px] mr-2' : 'text-[10px] mr-3'}`}>
        {item.id}
      </span>
      <span className="flex-1 text-center truncate italic font-sans">{item.label}</span>
    </div>
  );
};

interface CardProps {
  item: CardItem;
  index: number;
  total: number;
  onTabClick?: (item: CardItem) => void;
  onCardClick?: (item: CardItem) => void;
}

const Card: React.FC<CardProps> = ({ item, index, total, onTabClick, onCardClick }) => {
  const isFront = index === total - 1;
  const zIndex = index;
  const topOffset = index * 16; 
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
      transition={{ delay: (total - index) * 0.02, duration: 0.4 }}
      onClick={() => onCardClick?.(item)}
      style={{ 
        zIndex,
        top: topOffset,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transformOrigin: 'bottom center',
        rotateX: -1.5,
      }}
      className={`absolute left-1/2 -translate-x-1/2 w-[760px] h-[550px] bg-white index-stroke rounded-t-md transition-shadow duration-300 ${isFront ? 'shadow-2xl' : 'shadow-sm'} cursor-pointer group`}
    >
      <Tab item={item} onClick={() => onTabClick?.(item)} />
      
      {isFront && (
        <div className="p-12 h-full flex flex-col items-start justify-start animate-in fade-in zoom-in-95 duration-500">
           <div className="w-full border-b-1.5 border-black pb-8 mb-10 flex justify-between items-end">
              <div>
                <span className="block text-[11px] uppercase tracking-widest text-[#777] mb-2 font-bold font-sans">Index Classification</span>
                <h1 className="text-[56px] font-black leading-none tracking-tighter uppercase font-sans italic underline decoration-1 underline-offset-8 decoration-black/10">
                  {item.label}—DRV
                </h1>
              </div>
              <div className="text-right">
                <div className="mb-4">
                  <span className="block text-[10px] uppercase font-bold text-[#777]">Ref No.</span>
                  <span className="text-[20px] font-mono leading-none">{item.id}-F022</span>
                </div>
                <div className="px-3 py-1 bg-black text-white text-[10px] uppercase font-bold tracking-widest rounded-full">
                  Verified Data
                </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-12 w-full">
              <div className="space-y-6">
                <div className="border-l-2 border-black pl-5">
                  <span className="block text-[10px] uppercase font-bold text-[#777] mb-1">Archive Dept</span>
                  <span className="text-[16px] font-medium font-sans italic opacity-80">Portfolio Systems & Design</span>
                </div>
                <div className="border-l-2 border-black pl-5">
                  <span className="block text-[10px] uppercase font-bold text-[#777] mb-1">Date Logged</span>
                  <span className="text-[16px] font-medium font-sans italic opacity-80">Friday, April 17, 2026</span>
                </div>
              </div>
              <div className="space-y-6">
                 <div className="border-l-2 border-black pl-5">
                    <span className="block text-[10px] uppercase font-bold text-[#777] mb-1">Status</span>
                    <span className="text-[16px] font-medium font-sans italic opacity-80">Active Retrieval Enabled</span>
                 </div>
                 <div className="border-l-2 border-black pl-5">
                    <span className="block text-[10px] uppercase font-bold text-[#777] mb-1">Access Tier</span>
                    <span className="text-[16px] font-medium font-sans italic opacity-80">Unrestricted / Internal</span>
                 </div>
              </div>
           </div>

           <div className="mt-12 max-w-[500px]">
              <span className="block text-[10px] uppercase font-bold text-[#777] mb-3">Item Description</span>
              <p className="text-[17px] leading-relaxed font-sans text-black/90 font-light italic">
                A physical-first approach to complex digital navigation. This interface prioritizes tactile hierarchy, using staggered indexing and solid material representation to organize a vast creative archive.
              </p>
           </div>
        </div>
      )}
    </motion.div>
  );
};

interface DetailViewProps {
  item: CardItem;
  hasCategoryContext: boolean;
  onBackToIndex: () => void;
  onBackToCategory: () => void;
}

const DetailView = ({ item, hasCategoryContext, onBackToIndex, onBackToCategory }: DetailViewProps) => {
  const content = item.content || MOCK_CONTENT;

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[1000] bg-[#F0F0F0] overflow-y-auto"
    >
      <div className="max-w-[1000px] mx-auto pt-32 pb-24 px-8">
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {hasCategoryContext && (
            <button 
              onClick={onBackToCategory}
              className="group flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-bold uppercase text-[12px] tracking-widest">Back to Category</span>
            </button>
          )}
          <button 
            onClick={onBackToIndex}
            className="group flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg bg-black text-white shadow-[4px_4px_0px_rgba(100,100,100,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer ml-auto"
          >
            <span className="font-bold uppercase text-[12px] tracking-widest">Main Index</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="border-b-2 border-black pb-12 mb-16">
          <span className="text-[12px] font-mono text-black/40 uppercase mb-4 block">Ref: {item.id} // Portfolio Archive</span>
          <h2 className="text-[90px] font-black italic uppercase leading-[0.85] tracking-tighter mix-blend-multiply">
            {item.label}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-6 block">Document Overview</span>
              <p className="text-[20px] font-sans leading-relaxed italic text-black/80 font-light">
                {content.description}
              </p>
            </div>

            {content.video && (
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <video autoPlay muted loop playsInline controls className="w-full h-full object-cover">
                  <source src={content.video} type="video/mp4" />
                </video>
              </div>
            )}
          </div>

          <div className="space-y-8">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-2 block">Visual Assets</span>
             {content.images.map((img, i) => (
               <div key={i} className="group relative aspect-[4/3] bg-white border-2 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02]">
                  <img 
                    src={img} 
                    alt={`Project image ${i+1}`} 
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 text-white text-[9px] font-mono px-2 py-1 rounded">
                    IMG_00{i+1}.DAT
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProfileView = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[1000] bg-[#F0F0F0] overflow-y-auto"
    >
      <div className="max-w-[1000px] mx-auto pt-32 pb-24 px-8">
        <button 
          onClick={onBack}
          className="group mb-12 flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-bold uppercase text-[12px] tracking-widest">Close Profile</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <div className="border-b-2 border-black pb-8 mb-12">
               <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-black/30 block mb-4">Master Profile // SYS.USR</span>
               <h2 className="text-[100px] font-black italic uppercase leading-[0.75] tracking-tighter mix-blend-multiply mb-4">
                 SAM<br/>ARCHIVE
               </h2>
            </div>
            <div className="space-y-12">
               <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 block">Introduction</span>
                  <p className="text-[22px] font-sans italic font-light leading-relaxed text-black/90">
                    A multi-disciplinary designer and systems architect dedicated to the preservation of tactile methodology in a digital-first era. Specialized in high-fidelity archival interfaces and complex information hierarchy.
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="border-l border-black pl-5">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-2 block">Background</span>
                     <p className="text-[14px] font-medium opacity-70 italic font-sans">Digital Arts & Systemic Design</p>
                  </div>
                  <div className="border-l border-black pl-5">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-2 block">Focus</span>
                     <p className="text-[14px] font-medium opacity-70 italic font-sans">Physical UI Metaphors</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-10">
             <div className="aspect-square bg-white border-2 border-black rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://picsum.photos/seed/personality/800/800"
                  alt="Portrait"
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
             </div>
             
             <div className="bg-white border-2 border-black rounded-xl p-8 shadow-[12px_12px_0px_rgba(0,0,0,0.05)]">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-6 block">Classification: Core Skills</span>
                <div className="flex flex-wrap gap-2">
                   {['ARCHIVAL MAPPING', 'UI METAPHYSICS', 'MOTION DESIGN', 'DATA TOPOGRAPHY', 'BRAND ARCHITECTURE'].map((skill, i) => (
                     <span key={i} className="px-3 py-1 bg-black text-white text-[9px] font-bold tracking-widest uppercase rounded">
                       {skill}
                     </span>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'main' | 'category' | 'detail' | 'profile'>('main');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<CardItem | null>(null);

  const filteredData = useMemo(() => {
    if (view === 'category' && selectedCategory) {
      if (selectedCategory === '900') return [DATA.find(d => d.id === '900')!];
      return DATA.filter(d => d.categoryId === selectedCategory || d.id === selectedCategory);
    }
    return DATA;
  }, [view, selectedCategory]);

  const stackHeight = filteredData.length * 16 + 550;

  const handleTabClick = (item: CardItem) => {
    if (item.id === '900') {
      setView('profile');
      return;
    }
    if (item.type === 'category') {
      setSelectedCategory(item.id);
      setView('category');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedProject(item);
      setView('detail');
    }
  };

  const handleBackToIndex = () => {
    setView('main');
    setSelectedCategory(null);
    setSelectedProject(null);
  };

  const handleBackToCategory = () => {
    setView('category');
    setSelectedProject(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F0F0] font-sans scroll-smooth overflow-x-hidden p-0 m-0 relative">
      
      {/* HEADER LAYER */}
      <header className="relative w-full py-24 flex flex-col items-center pointer-events-none z-[100]">
         <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center"
         >
           <h1 className="text-[110px] font-black italic uppercase tracking-tighter leading-[0.8] mb-2 opacity-[0.04] select-none pointer-events-none absolute left-1/2 -translate-x-1/2 top-12 whitespace-nowrap">
             Physical Indexing System
           </h1>
           <div className="relative pointer-events-auto">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-black/30 block mb-3">Archive Retrieval // V.002</span>
              <h2 className="text-[48px] font-black uppercase tracking-tight text-black flex items-center gap-4">
                PORTFOLIO <span className="w-12 h-[3px] bg-black" /> INDEX
              </h2>
           </div>
         </motion.div>
      </header>

      {/* FOLDER SYSTEM LAYER */}
      <main className="relative w-full flex flex-col items-center min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div 
            key={view === 'category' ? `cat-${selectedCategory}` : 'main'}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="relative flex flex-col items-center w-full"
          >
            {view === 'category' && (
              <div className="w-[760px] mb-12 flex justify-start">
                 <button 
                  onClick={handleBackToIndex}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Full Index
                </button>
              </div>
            )}

            <div className="relative w-[760px]" style={{ height: stackHeight }}>
              {filteredData.map((item, idx) => (
                <Card 
                  key={`${item.id}-${idx}`} 
                  item={item} 
                  index={idx} 
                  total={filteredData.length} 
                  onTabClick={handleTabClick}
                  onCardClick={(i) => i.type === 'item' && handleTabClick(i)}
                />
              ))}
            </div>

            <div className="h-32 w-full" />

            {/* Bottom Hardware */}
            <div className="pb-24 w-full flex flex-col items-center justify-center">
               <div className="relative group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[2px] bg-black/5 scale-x-125" />
                  <motion.div 
                     whileHover={{ scale: 1.05, y: -4 }}
                     whileTap={{ scale: 0.98 }}
                     className="relative px-10 py-4 bg-[#FFF799] border-2 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center gap-6 cursor-pointer"
                  >
                     <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-black/40 tracking-[0.3em] mb-0.5">Physical Archive Access</span>
                        <span className="text-[18px] font-black italic uppercase tracking-tighter text-black">sam's secret files</span>
                     </div>
                     <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center bg-white/30">
                        <div className="w-2 h-2 rounded-full bg-black group-hover:scale-125 transition-transform" />
                     </div>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* DETAIL LAYER */}
      <AnimatePresence>
        {view === 'detail' && selectedProject && (
          <DetailView 
            item={selectedProject} 
            hasCategoryContext={selectedCategory !== null}
            onBackToIndex={handleBackToIndex} 
            onBackToCategory={handleBackToCategory}
          />
        )}
      </AnimatePresence>

      {/* PROFILE LAYER */}
      <AnimatePresence>
        {view === 'profile' && (
          <ProfileView onBack={handleBackToIndex} />
        )}
      </AnimatePresence>

      <footer className="fixed bottom-6 left-6 text-[10px] font-mono text-black/20 z-[2000] pointer-events-none">
          SYSTEM_STATE: {view.toUpperCase()} // RETRIEVAL_ACTIVE
      </footer>
    </div>
  );
}

