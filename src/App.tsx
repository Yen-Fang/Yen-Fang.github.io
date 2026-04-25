/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Calendar, MapPin, Award, Plus, Camera, Feather } from "lucide-react";
import { useState } from "react";
import { INITIAL_MEMORIES, MarathonMemory } from "./data";
import { MarathonMemory as MemoryType } from "./types";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [memories] = useState(INITIAL_MEMORIES);

  const selectedMemory = memories.find((m) => m.id === selectedId);

  return (
    <div className="min-h-screen bg-page-bg selection:bg-ink-primary selection:text-white px-6 md:px-16 flex flex-col">
      {/* Navigation / Header Section */}
      <header className="max-w-7xl w-full mx-auto pt-16 pb-8 border-b border-ui-border flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div 
          onClick={() => setSelectedId(null)} 
          className="cursor-pointer group"
        >
          <h1 className="text-4xl font-light tracking-tighter mb-1 select-none group-hover:opacity-70 transition-opacity">
            小籃子步履隨筆 <span className="text-xl text-ink-subtle ml-4 italic font-serif">Marathon Memories</span>
          </h1>
          <p className="text-ink-subtle text-xs tracking-[0.2em] font-sans uppercase">記錄奔跑中的每一次呼吸與思考</p>
        </div>
        <div className="text-left md:text-right font-sans">
          <span className="text-[10px] tracking-[0.3em] text-ink-extra-subtle block mb-1">SINCE 2024</span>
          <span className="text-sm text-ink-muted">南投 / 台灣</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto py-16 flex-1">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col divide-y divide-ui-border"
            >
              {memories.map((memory, index) => (
                <div
                  key={memory.id}
                  onClick={() => setSelectedId(memory.id)}
                  className="group relative py-16 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all px-8 -mx-8 rounded-xl overflow-hidden mb-4"
                >
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={memory.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-page-bg/20 group-hover:bg-transparent transition-colors duration-1000" />
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 w-full justify-between">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                      <span className="text-xs font-sans tracking-[0.2em] text-ink-extra-subtle uppercase w-32">
                        {memory.date}
                      </span>
                      <h2 className="text-3xl font-medium text-ink-primary group-hover:translate-x-2 transition-transform duration-700">
                        {memory.title}
                      </h2>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-6 text-sm text-ink-subtle italic">
                      <span className="opacity-60">{memory.location}</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-2 text-xs font-sans tracking-widest text-ink-subtle hover:text-ink-primary mb-12 uppercase cursor-pointer"
              >
                 ← 返回目錄
              </button>

              <div className="max-w-4xl mx-auto flex flex-col space-y-12">
                <div className="space-y-6">
                  <span className="text-[10px] text-ink-extra-subtle font-sans tracking-[0.3em] uppercase block">
                    Memory Entry / {selectedMemory?.date}
                  </span>
                  <h2 className="text-5xl font-medium leading-[1.2] text-ink-primary mb-6">
                    {selectedMemory?.title}
                  </h2>
                  <div className="flex space-x-8 text-[11px] text-ink-subtle font-sans tracking-[0.2em] uppercase">
                    <div className="flex items-center gap-2">
                      <span className="opacity-40 font-bold">LOC.</span> {selectedMemory?.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="opacity-40 font-bold">DIST.</span> {selectedMemory?.distance}
                      {selectedMemory?.time && <span className="text-ink-extra-subtle font-light">[{selectedMemory?.time}]</span>}
                    </div>
                  </div>
                  
                  {/* Highlighted Thoughts (No italic as requested) */}
                  <div className="pt-8 border-t border-ui-border">
                    <p className="text-2xl text-ink-primary font-medium leading-[1.6] text-justify font-serif">
                      {selectedMemory?.thoughts}
                    </p>
                  </div>

                  {/* Image in the middle - No grayscale */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-ui-border/20 shadow-2xl shadow-black/5">
                    <img
                      src={selectedMemory?.imageUrl}
                      alt={selectedMemory?.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Long Form Content */}
                  {selectedMemory?.content && (
                    <div className="pt-4">
                      <div className="text-lg text-ink-muted leading-[1.8] text-justify space-y-6 whitespace-pre-line font-light">
                        {selectedMemory.content}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Stats Section */}
      <footer className="max-w-7xl w-full mx-auto pt-16 pb-24 border-t border-ui-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-ink-extra-subtle font-sans uppercase">Max Dist.</p>
            <p className="text-4xl font-light font-sans tracking-tight text-ink-primary">100<span className="text-sm opacity-60">KM</span></p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-ink-extra-subtle font-sans uppercase">FM PB </p>
            <p className="text-4xl font-light font-sans tracking-tight text-ink-primary">03:42:15</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-ink-extra-subtle font-sans uppercase">Completed Full</p>
            <p className="text-4xl font-light font-sans tracking-tight text-ink-primary">04 <span className="text-sm opacity-60">RACES</span></p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-ink-extra-subtle font-sans uppercase">HM PB</p>
            <p className="text-4xl font-light font-sans tracking-tight text-ink-primary">90:05:32 </p>
          </div>
          
        </div>

        <div className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-ink-extra-subtle font-sans tracking-[0.3em] uppercase gap-4 text-center">
          <div>Every mile tells a story.</div>
        </div>
      </footer>
    </div>
  );
}
