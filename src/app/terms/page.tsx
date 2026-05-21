'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { motion } from 'framer-motion';
import { FileText, Shield, Scale, Clock, Eye, Lock, Database, UserCheck } from 'lucide-react';

const LEGAL_SECTIONS = [
  {
    category: 'Terms of Use',
    items: [
      {
        title: 'Acceptance of Terms',
        icon: Shield,
        content: 'By accessing and using the IIT Bombay Sports website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
      },
      {
        title: 'Use License',
        icon: FileText,
        content: 'Permission is granted to temporarily download one copy of the materials (information or software) on IIT Bombay Sports\' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
      },
      {
        title: 'Disclaimer',
        icon: Scale,
        content: 'The materials on IIT Bombay Sports\' website are provided on an \'as is\' basis. IIT Bombay Sports makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
      },
      {
        title: 'Limitations',
        icon: Clock,
        content: 'In no event shall IIT Bombay Sports or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on IIT Bombay Sports\' website, even if IIT Bombay Sports or an authorized representative has been notified orally or in writing of the possibility of such damage.',
      },
    ]
  },
  {
    category: 'Privacy Policy',
    items: [
      {
        title: 'Information We Collect',
        icon: Database,
        content: 'We collect information that you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, student ID, and sports preferences.',
      },
      {
        title: 'How We Use Info',
        icon: Eye,
        content: 'We use the information we collect to provide, maintain, and improve our services, including processing sports facility bookings, organizing events, and sending important updates related to IIT Bombay Sports.',
      },
      {
        title: 'Data Security',
        icon: Lock,
        content: 'We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the internet is 100% secure.',
      },
      {
        title: 'Your Rights',
        icon: UserCheck,
        content: 'You have the right to access, update, or delete your personal information. If you have any questions about how we handle your data, please contact the Institute Sports Technical Head.',
      },
    ]
  }
];

export default function LegalPage() {
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
              Terms & <br /> Privacy.
            </motion.h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Side: Navigation/Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-32 space-y-8">
                <div className="p-8 bg-white rounded-3xl border border-[#111111]/05 shadow-sm">
                  <h3 className="font-condensed text-xl font-black uppercase tracking-widest text-accent mb-4">Last Updated</h3>
                  <p className="font-mono-custom text-sm font-bold opacity-60">APRIL 18, 2026</p>
                </div>
                
                <div className="space-y-4">
                  <p className="font-condensed text-lg text-[#111111]/60 uppercase tracking-tight leading-relaxed">
                    This combined legal center outlines the rules of the road for IIT Bombay Sports. We prioritize your data safety and a fair playing field for all athletes.
                  </p>
                </div>

                <nav className="space-y-2">
                  {LEGAL_SECTIONS.map((section) => (
                    <a 
                      key={section.category}
                      href={`#${section.category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block font-condensed font-black uppercase tracking-widest text-sm hover:text-accent transition-colors"
                    >
                      {section.category}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Right Side: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-8 space-y-24"
            >
              {LEGAL_SECTIONS.map((category, catIdx) => (
                <div key={catIdx} id={category.category.toLowerCase().replace(/\s+/g, '-')} className="space-y-12">
                  <div className="border-b border-[#111111]/10 pb-4">
                    <h2 className="font-mono-custom text-[11px] font-black uppercase tracking-[0.4em] text-accent">
                      {category.category}
                    </h2>
                  </div>
                  
                  <div className="space-y-12">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.04)] border border-[#111111]/05">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                            <item.icon size={24} />
                          </div>
                          <h2 className="font-condensed text-3xl font-black uppercase tracking-tight">{item.title}</h2>
                        </div>
                        <p className="font-condensed text-xl text-[#111111]/70 leading-relaxed uppercase tracking-tight">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="p-12 bg-[#111111] text-[#F5F0E8] rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="font-condensed text-3xl font-black uppercase tracking-tight text-accent mb-6">Contact Legal Team</h2>
                  <p className="font-condensed text-xl opacity-80 leading-relaxed uppercase tracking-tight max-w-2xl">
                    For any legal inquiries regarding these terms or our privacy practices, please contact the G-Sec Sports Affairs or the Technical Head.
                  </p>
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
