'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, AlertCircle, Lightbulb } from 'lucide-react';
import { useState } from 'react';

const FEEDBACK_TYPES = [
  { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'text-blue-500' },
  { id: 'bug', label: 'Report a Bug', icon: AlertCircle, color: 'text-red-500' },
  { id: 'praise', label: 'Praise', icon: Heart, color: 'text-pink-500' },
  { id: 'other', label: 'Other', icon: MessageSquare, color: 'text-accent' },
];

export default function FeedbackPage() {
  const [selectedType, setSelectedType] = useState('suggestion');

  return (
    <div className="min-h-screen bg-cream text-[#111111] selection:bg-accent selection:text-white">
      <Navbar />
      <CursorGlow />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <div className="mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif-display text-[clamp(60px,10vw,120px)] leading-[0.9] uppercase tracking-tighter"
            >
              Speak <br /> Your Mind.
            </motion.h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Side: Feedback Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 space-y-12"
            >
              <div className="space-y-6">
                <h2 className="font-condensed text-3xl font-black uppercase tracking-tight">We value your input.</h2>
                <p className="font-condensed text-xl text-[#111111]/70 leading-relaxed uppercase tracking-tight">
                  Help us make IIT Bombay Sports better for everyone. Whether it&apos;s a bug report, a suggestion for a new feature, or just some words of encouragement, we&apos;re listening.
                </p>
              </div>

              <div className="grid gap-4">
                {FEEDBACK_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center gap-4 p-6 rounded-2xl border transition-all text-left ${
                      selectedType === type.id 
                      ? 'bg-accent border-accent text-white shadow-lg' 
                      : 'bg-white border-[#111111]/05 text-[#111111] hover:border-accent/20'
                    }`}
                  >
                    <type.icon size={24} className={selectedType === type.id ? 'text-white' : type.color} />
                    <div>
                      <span className="font-condensed font-black uppercase tracking-widest block">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-8 bg-[#111111] text-[#F5F0E8] rounded-3xl space-y-4 shadow-xl">
                <h3 className="font-condensed text-xl font-black uppercase tracking-widest text-accent">Response Time</h3>
                <p className="font-condensed text-lg leading-relaxed opacity-80 uppercase tracking-tight">
                  We review all feedback within 48 hours. If you report a critical bug, our technical team will prioritize it immediately.
                </p>
              </div>
            </motion.div>

            {/* Right Side: Feedback Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7"
            >
              <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                <h2 className="font-condensed text-3xl font-black uppercase tracking-tight mb-8">Send Feedback</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Your Name (Optional)</label>
                      <input type="text" className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Email (For Follow-up)</label>
                      <input type="email" className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Title</label>
                    <input type="text" className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="Brief summary..." />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Details</label>
                    <textarea rows={6} className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all resize-none" placeholder="Share your thoughts with us..."></textarea>
                  </div>
                  <button className="bg-accent hover:bg-[#A3501F] text-white w-full py-5 rounded-2xl font-condensed font-black text-xl uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                    Submit Feedback
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
