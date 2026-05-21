'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const CONTACT_INFO = [
  {
    category: 'General Secretary Sports Affairs',
    name: 'Rajwardhan Toraskar',
    email: 'gsecsport@iitb.ac.in',
    phone: '+91 96190 00065',
  },
  {
    category: 'Institute Sports Technical Head',
    name: 'Aryansh Kukreja',
    email: 'aryansh.techhead@gmail.com',
    phone: '+91 99928 88093',
  },
  {
    category: 'Institute Sports Creatives Head',
    name: 'Akanksha Patel',
    phone: '+91 97272 15454',
  },
  {
    category: 'Institute Sports Media Head',
    name: 'Yaman Singh',
    phone: '+91 98552 21266',
  }
];

export default function ContactPage() {
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
              Contact <br /> Us.
            </motion.h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Side: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                <h2 className="font-condensed text-3xl font-black uppercase tracking-tight mb-8">Send a Message</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Your Name</label>
                      <input type="text" className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Email Address</label>
                      <input type="email" className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Subject</label>
                    <input type="text" className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="Inquiry about..." />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono-custom text-[10px] uppercase tracking-widest font-bold text-[#111111]/40 ml-1">Message</label>
                    <textarea rows={5} className="w-full bg-[#F5F0E8]/50 border-none rounded-2xl px-6 py-4 font-condensed text-lg focus:ring-2 focus:ring-accent outline-none transition-all resize-none" placeholder="Tell us how we can help..."></textarea>
                  </div>
                  <button className="bg-accent hover:bg-[#A3501F] text-white w-full py-5 rounded-2xl font-condensed font-black text-xl uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                    Send Message
                  </button>

                </form>
              </div>
            </motion.div>

            {/* Right Side: Contact Info & Council */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5 space-y-12"
            >
              {/* Core Team Section */}
              <div className="space-y-8">
                <h3 className="font-condensed text-2xl font-black uppercase tracking-widest border-l-4 border-accent pl-4">Core Council</h3>
                <div className="grid gap-6">
                  {CONTACT_INFO.map((info, idx) => (
                    <div key={idx} className="group p-6 bg-white rounded-2xl border border-[#111111]/05 hover:border-accent/20 transition-all hover:shadow-md">
                      <span className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-accent mb-2 block font-black">{info.category}</span>
                      <h4 className="font-condensed text-xl font-black uppercase mb-3">{info.name}</h4>
                      <div className="space-y-2">
                        {info.email && (
                          <div className="flex items-center gap-3 text-sm text-[#555555]">
                            <Mail size={14} className="text-accent/50" />
                            <a href={`mailto:${info.email}`} className="hover:text-accent transition-colors">{info.email}</a>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-sm text-[#555555]">
                          <Phone size={14} className="text-accent/50" />
                          <a href={`tel:${info.phone}`} className="hover:text-accent transition-colors">{info.phone}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Location */}
              <div className="p-8 bg-[#111111] text-[#F5F0E8] rounded-3xl space-y-4 shadow-xl">
                <h3 className="font-condensed text-xl font-black uppercase tracking-widest text-accent">Office Location</h3>
                <div className="flex gap-4 items-start">
                  <MapPin className="text-accent mt-1 shrink-0" size={20} />
                  <p className="font-condensed text-lg leading-relaxed opacity-80 uppercase tracking-tight">
                    IIT Bombay Sports Office,<br />
                    Gymkhana, IIT Bombay,<br />
                    Powai, Mumbai - 400076
                  </p>
                </div>
              </div>

              {/* Quick Contact Links */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-[#111111]/05 text-center group hover:bg-accent transition-colors">
                  <span className="font-mono-custom text-[10px] uppercase tracking-widest block mb-1 group-hover:text-white/60">G-Sec Sports</span>
                  <a href="mailto:gsecsport@iitb.ac.in" className="font-condensed font-black uppercase group-hover:text-white">Email Us</a>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-[#111111]/05 text-center group hover:bg-accent transition-colors">
                  <span className="font-mono-custom text-[10px] uppercase tracking-widest block mb-1 group-hover:text-white/60">Tech Support</span>
                  <a href="mailto:aryansh.techhead@gmail.com" className="font-condensed font-black uppercase group-hover:text-white">Web Team</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-[1400px] mx-auto mt-24"
        >
          <h3 className="font-condensed text-3xl font-black uppercase tracking-tight mb-8">IITB New Gymkhana</h3>
          <div className="rounded-[32px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] w-full h-[480px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.40196496999!2d72.90936837570915!3d19.133874250152097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b80820306e3f%3A0xa4024d1ba55c8ed1!2sIITB%20New%20Gymkhana!5e0!3m2!1sen!2sin!4v1776470677052!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
