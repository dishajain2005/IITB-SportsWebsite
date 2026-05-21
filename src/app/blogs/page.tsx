/* eslint-disable @next/next/no-img-element */
'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { SportBadge } from '@/components/ui/SportBadge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/data/blogs';

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-cream-topo text-[#111111] selection:bg-accent selection:text-black font-iitb-text">
      <Navbar />
      
      {/* Spanning magazine image — bleeds from hero into content */}
      <div className="relative">
      <img loading="lazy" fetchPriority="low" src="/news magazine/6997fcceb0ba7.preview.jpg" alt=""
        className="hidden xl:block"
        style={{ position:'absolute', top:0, right:'-20px', width:'340px', height:'130%', objectFit:'cover', objectPosition:'center top', transform:'rotate(1.5deg)', filter:'sepia(40%) contrast(1.2) brightness(0.55)', opacity:0.38, mixBlendMode:'luminosity', zIndex:5, pointerEvents:'none', userSelect:'none', boxShadow:'0 40px 100px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.05)', clipPath:'polygon(0 0, 100% 0, 100% 92%, 90% 100%, 0 100%)', WebkitMaskImage:'linear-gradient(to bottom, black 60%, transparent 100%)', maskImage:'linear-gradient(to bottom, black 60%, transparent 100%)' }} />

      {/* Hero Section */}
      <section className="relative bg-[#0d0b09] pt-48 pb-0 px-6 md:px-12 lg:px-24 overflow-hidden min-h-[85vh] flex flex-col">

        {/* ── BACKGROUND SCATTER (6 images, ultra-low opacity) ── */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          {/* Large anchor — top right */}
          <img loading="lazy" fetchPriority="low" src="/news magazine/_131914198_monday_star.jpg" alt=""
            style={{ position:'absolute', top:'-40px', right:'-60px', width:'420px', height:'580px', objectFit:'cover', objectPosition:'center top', transform:'rotate(4deg)', filter:'sepia(40%) contrast(1.15) brightness(0.75)', opacity:0.13, mixBlendMode:'luminosity', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
          {/* Medium — bottom left */}
          <img loading="lazy" fetchPriority="low" src="/news magazine/Sports_Pluse_English__17_January_2025-2.jpg" alt=""
            style={{ position:'absolute', bottom:'-60px', left:'-40px', width:'320px', height:'420px', objectFit:'cover', transform:'rotate(-6deg)', filter:'sepia(40%) contrast(1.15) brightness(0.75)', opacity:0.11, mixBlendMode:'luminosity', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
          {/* Small — center right mid */}
          <img loading="lazy" fetchPriority="low" src="/news magazine/sport-now--newspaper-cover-template.jpg" alt=""
            style={{ position:'absolute', top:'35%', right:'180px', width:'200px', height:'280px', objectFit:'cover', transform:'rotate(2deg)', filter:'sepia(40%) contrast(1.15) brightness(0.75)', opacity:0.10, mixBlendMode:'luminosity', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
          {/* Top left corner */}
          <img loading="lazy" fetchPriority="low" src="/news magazine/_132529311_times.jpg.png" alt=""
            style={{ position:'absolute', top:'60px', left:'20px', width:'260px', height:'340px', objectFit:'cover', transform:'rotate(-3deg)', filter:'sepia(40%) contrast(1.15) brightness(0.75)', opacity:0.09, mixBlendMode:'luminosity', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
          {/* Bottom center */}
          <img loading="lazy" fetchPriority="low" src="/news magazine/61fad50ce96a0.jpg" alt=""
            style={{ position:'absolute', bottom:'-20px', left:'40%', width:'240px', height:'320px', objectFit:'cover', transform:'rotate(5deg)', filter:'sepia(40%) contrast(1.15) brightness(0.75)', opacity:0.09, mixBlendMode:'luminosity', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
          {/* Mid-left */}
          <img loading="lazy" fetchPriority="low" src="/news magazine/imageprocessor.jpg" alt=""
            style={{ position:'absolute', top:'25%', left:'60px', width:'180px', height:'240px', objectFit:'cover', transform:'rotate(-5deg)', filter:'sepia(40%) contrast(1.15) brightness(0.75)', opacity:0.08, mixBlendMode:'luminosity', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />
        </div>

        {/* ── CENTRE CIRCULAR BG IMAGE ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]">
          <img loading="lazy" fetchPriority="low" src="/news magazine/_133272150_express_sun.jpg" alt=""
            style={{ width:'1100px', height:'960px', objectFit:'cover', objectPosition:'center', filter:'sepia(40%) contrast(1.15) brightness(0.7)', opacity:0.22, mixBlendMode:'luminosity', WebkitMaskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 15%, transparent 70%)', maskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 15%, transparent 70%)' }} />
        </div>

        {/* ── FOREGROUND FEATURE IMAGE — right side ── */}
        <div className="absolute top-24 right-12 hidden xl:block pointer-events-none select-none z-[2]">
          <img loading="lazy" fetchPriority="low" src="/news magazine/Ebrd0n4WoAAENHe.jpg" alt=""
            style={{ width:'280px', height:'380px', objectFit:'cover', transform:'rotate(1.5deg)', filter:'sepia(40%) contrast(1.2) brightness(0.6)', opacity:0.55, mixBlendMode:'luminosity', border:'1px solid rgba(255,255,255,0.06)', boxShadow:'0 24px 80px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)', clipPath:'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }} />
        </div>

        {/* ── GRAIN ── */}
        <div className="absolute inset-0 pointer-events-none z-[3]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity:0.035, mixBlendMode:'overlay', backgroundSize:'160px 160px' }} />

        {/* ── TEXT CONTENT ── */}
        <div className="max-w-[1400px] mx-auto relative z-10 flex-1 flex flex-col justify-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif-display text-[clamp(80px,12vw,180px)] leading-[0.85] uppercase tracking-[-0.04em] text-[#F5F0E8] mb-12">
              SPORTS<br />
              <span className="text-accent normal-case tracking-normal">Gazette.</span>
            </h1>
            <p className="font-mono-custom text-[#F5F0E8]/40 text-xs tracking-[0.2em] uppercase font-bold max-w-sm leading-relaxed border-l border-accent/30 pl-6">
              Official records, highlights, and insights from the heart of the IIT Bombay sports community.
            </p>
          </motion.div>
        </div>

        {/* ── MARQUEE STRIP ── */}
        <div className="relative z-10 w-full border-t border-white/10 overflow-hidden">
          <style>{`
            @keyframes marquee-blogs {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-blogs { animation: marquee-blogs 28s linear infinite; }
          `}</style>
          <div className="marquee-blogs flex whitespace-nowrap py-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-0 shrink-0">
                {['BADMINTON', 'FOOTBALL', 'ATHLETICS', 'SWIMMING', 'CRICKET', 'VOLLEYBALL', 'BASKETBALL', 'TENNIS', 'HOCKEY', 'SQUASH', 'TABLE TENNIS', 'WRESTLING'].map((sport) => (
                  <span key={sport} className="flex items-center gap-6 px-8">
                    <span className="font-mono-custom text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{sport}</span>
                    <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10">

        {/* Scattered magazine accents — peek from behind cards */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img loading="lazy" fetchPriority="low" src="/news magazine/6997fcceb0ba7.preview.jpg" alt=""
            style={{ position:'absolute', top:'-20px', right:'-80px', width:'260px', height:'340px', objectFit:'cover', transform:'rotate(5deg)', filter:'sepia(40%) contrast(1.1) brightness(0.7)', opacity:0.18, mixBlendMode:'multiply', WebkitMaskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)', maskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)' }} />
          <img loading="lazy" fetchPriority="low" src="/news magazine/5c56273d8332f04a12e71e3ea5588b5d.jpg" alt=""
            style={{ position:'absolute', top:'40%', left:'-60px', width:'220px', height:'300px', objectFit:'cover', transform:'rotate(-7deg)', filter:'sepia(40%) contrast(1.1) brightness(0.7)', opacity:0.15, mixBlendMode:'multiply', WebkitMaskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)', maskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)' }} />
          <img loading="lazy" fetchPriority="low" src="/news magazine/_133272150_express_sun.jpg" alt=""
            style={{ position:'absolute', bottom:'60px', right:'-40px', width:'200px', height:'260px', objectFit:'cover', transform:'rotate(-4deg)', filter:'sepia(40%) contrast(1.1) brightness(0.7)', opacity:0.14, mixBlendMode:'multiply', WebkitMaskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)', maskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)' }} />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 auto-rows-auto">
          
          {/* 1. Featured Card (Span 12 for impact) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12 bg-white border border-[#111111]/05 shadow-sm hover:shadow-2xl transition-all duration-700 rounded-[32px] overflow-hidden flex flex-col lg:flex-row group"
          >
            <div className="lg:w-3/5 relative overflow-hidden bg-[#0d0d0d] min-h-[400px]">
              <Image 
                src={BLOG_POSTS[0].image}
                alt={BLOG_POSTS[0].title}
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              <SportBadge text={BLOG_POSTS[0].imageText} />
              
              <div className="absolute bottom-8 left-8 z-20">
                <span className="font-mono-custom text-xs text-white/60 uppercase tracking-[0.2em] font-black">{BLOG_POSTS[0].date}</span>
              </div>
            </div>
            
            <div className="lg:w-2/5 p-10 md:p-14 flex flex-col justify-center bg-white relative">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none hidden md:block">
                <div className="font-condensed font-black text-8xl uppercase tracking-tighter">01</div>
              </div>
              
              <h3 className="font-serif-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-[0.95] text-[#111111] tracking-[-0.02em]">
                {BLOG_POSTS[0].title}.
              </h3>
              <p className="text-[#555] text-lg leading-relaxed mb-10 flex-1">
                {BLOG_POSTS[0].excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {BLOG_POSTS[0].tags.map(t => (
                  <span key={t} className="text-[9px] font-mono-custom uppercase tracking-widest border border-[#111111]/10 px-4 py-2 rounded-full text-[#111111]/60 font-bold">{t}</span>
                ))}
              </div>
              
              <Link href="/blogs/1" className="inline-flex items-center gap-4 font-mono-custom text-xs font-black uppercase tracking-[0.2em] text-[#111111] hover:text-accent transition-colors group/link">
                READ THE FULL STORY 
                <div className="w-10 h-px bg-[#111111]/20 group-hover/link:bg-accent group-hover/link:w-14 transition-all" />
              </Link>
            </div>
          </motion.div>

          {/* 2. Secondary Card (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 bg-white border border-[#111111]/05 shadow-sm hover:shadow-xl transition-all duration-700 rounded-[24px] overflow-hidden flex flex-col group"
          >
            <div className="h-[400px] relative overflow-hidden bg-[#0a1a0d]">
              <Image 
                src={BLOG_POSTS[1].image}
                alt={BLOG_POSTS[1].title}
                fill
                className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <SportBadge text={BLOG_POSTS[1].imageText} />
              
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="font-serif-display text-3xl md:text-4xl text-white leading-[0.95] mb-2 tracking-tight">
                  {BLOG_POSTS[1].title}.
                </h3>
              </div>
            </div>
            <div className="p-8 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase font-black text-[#111111]/40">{BLOG_POSTS[1].date}</span>
                <div className="flex gap-2">
                  {BLOG_POSTS[1].tags.map(t => (
                    <span key={t} className="font-mono-custom text-[9px] uppercase tracking-widest text-[#111111]/40 font-bold italic">#{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-[#555] leading-relaxed mb-8">
                {BLOG_POSTS[1].excerpt}
              </p>
              <Link href="/blogs/2" className="font-mono-custom text-[10px] font-black uppercase tracking-[0.25em] text-[#111111] hover:text-accent transition-all flex items-center gap-3">
                VIEW SHOWDOWN <ChevronRight />
              </Link>
            </div>
          </motion.div>

          {/* 3. Small Cards (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#111111]/05 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[24px] overflow-hidden group flex-1"
            >
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src={BLOG_POSTS[2].image}
                  alt={BLOG_POSTS[2].title}
                  fill
                  className="object-cover opacity-85 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <SportBadge text={BLOG_POSTS[2].imageText} />
              </div>
              <div className="p-8">
                <span className="font-mono-custom text-[9px] tracking-[0.3em] uppercase font-black mb-3 block text-[#111111]/40">{BLOG_POSTS[2].date}</span>
                <h3 className="font-serif-display text-2xl text-[#111111] mb-4 leading-tight">{BLOG_POSTS[2].title}.</h3>
                <Link href="/blogs/1" className="font-mono-custom text-[9px] font-black uppercase tracking-[0.2em] border-b border-accent/20 pb-0.5 hover:border-accent transition-all">
                  LEARN MORE
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-accent p-10 rounded-[24px] flex flex-col justify-center relative overflow-hidden shadow-xl shadow-accent/10"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
              <span className="font-mono-custom text-black text-[10px] tracking-[0.4em] uppercase font-black mb-6">NEWSLETTER</span>
              <h3 className="font-condensed font-black text-4xl mb-8 leading-[0.9] uppercase tracking-tighter text-black">
                Never miss<br />a highlight.
              </h3>
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Your IITB Email" 
                  className="bg-black/10 border-b border-black/20 py-3 px-1 font-mono-custom text-xs placeholder:text-black/30 focus:outline-none focus:border-black transition-all"
                />
                <button className="bg-black text-white font-mono-custom text-[11px] uppercase tracking-widest py-4 px-8 rounded-full hover:bg-[#222] transition-colors self-start">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>

          {/* 4. Full Width Reveal (Span 12) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12 relative h-[500px] rounded-[32px] overflow-hidden group"
          >
            <Image 
              src={BLOG_POSTS[3].image}
              alt={BLOG_POSTS[3].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
            
            <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-accent" />
                </div>
                <h3 className="font-serif-display text-4xl md:text-6xl text-[#F5F0E8] leading-[0.95] mb-8">
                  {BLOG_POSTS[3].title}.
                </h3>
                <p className="text-[#F5F0E8]/60 text-lg mb-10 max-w-xl">
                  {BLOG_POSTS[3].excerpt}
                </p>
                <Link href="/yearbook" className="inline-flex items-center gap-4 font-mono-custom text-xs font-black uppercase tracking-[0.3em] text-accent group/btn">
                  EXPLORE ARCHIVES
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      </div>{/* end spanning wrapper */}

      {/* From the Archives — magazine texture strip */}
      <section className="relative overflow-hidden bg-[#0d0b09] py-24 px-6 md:px-12 lg:px-24">
        {/* Background scatter */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {[
            { src: '/news magazine/_131914198_monday_star.jpg', style: { top:0, left:0, width:'100%', height:'100%', objectFit:'cover' as const, filter:'sepia(40%) contrast(1.1) brightness(0.4)', opacity:0.18, mixBlendMode:'luminosity' as const } },
          ].map((img, i) => (
            <img key={i} src={img.src} alt="" style={{ position:'absolute', ...img.style }} />
          ))}
          {/* Individual scattered mags */}
          <img loading="lazy" fetchPriority="low" src="/news magazine/Sports_Pluse_English__17_January_2025-2.jpg" alt=""
            style={{ position:'absolute', top:'-30px', left:'5%', width:'180px', height:'240px', objectFit:'cover', transform:'rotate(-3deg)', filter:'sepia(40%) contrast(1.2) brightness(0.55)', opacity:0.45, mixBlendMode:'luminosity', boxShadow:'0 24px 60px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.05)', clipPath:'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }} />
          <img loading="lazy" fetchPriority="low" src="/news magazine/Ebrd0n4WoAAENHe.jpg" alt=""
            style={{ position:'absolute', top:'-10px', left:'22%', width:'160px', height:'210px', objectFit:'cover', transform:'rotate(2deg)', filter:'sepia(40%) contrast(1.2) brightness(0.55)', opacity:0.5, mixBlendMode:'luminosity', boxShadow:'0 24px 60px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.05)' }} />
          <img loading="lazy" fetchPriority="low" src="/news magazine/sport-now--newspaper-cover-template.jpg" alt=""
            style={{ position:'absolute', top:'-20px', left:'38%', width:'170px', height:'225px', objectFit:'cover', transform:'rotate(-1deg)', filter:'sepia(40%) contrast(1.2) brightness(0.55)', opacity:0.45, mixBlendMode:'luminosity', boxShadow:'0 24px 60px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.05)', clipPath:'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }} />
          <img loading="lazy" fetchPriority="low" src="/news magazine/imageprocessor.jpg" alt=""
            style={{ position:'absolute', top:'-10px', left:'55%', width:'155px', height:'205px', objectFit:'cover', transform:'rotate(3.5deg)', filter:'sepia(40%) contrast(1.2) brightness(0.55)', opacity:0.4, mixBlendMode:'luminosity', boxShadow:'0 24px 60px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.05)' }} />
          <img loading="lazy" fetchPriority="low" src="/news magazine/61fad50ce96a0.jpg" alt=""
            style={{ position:'absolute', top:'-15px', left:'70%', width:'165px', height:'218px', objectFit:'cover', transform:'rotate(-2.5deg)', filter:'sepia(40%) contrast(1.2) brightness(0.55)', opacity:0.45, mixBlendMode:'luminosity', boxShadow:'0 24px 60px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.05)', clipPath:'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }} />
          <img loading="lazy" fetchPriority="low" src="/news magazine/_132529311_times.jpg.png" alt=""
            style={{ position:'absolute', top:'-5px', left:'85%', width:'150px', height:'200px', objectFit:'cover', transform:'rotate(1.5deg)', filter:'sepia(40%) contrast(1.2) brightness(0.55)', opacity:0.4, mixBlendMode:'luminosity', boxShadow:'0 24px 60px rgba(0,0,0,0.7)', border:'1px solid rgba(255,255,255,0.05)' }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0b09] to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0d0b09] to-transparent" />
        </div>

        {/* Text */}
        <div className="relative z-10 max-w-[1400px] mx-auto mt-48 text-center">
          <h2 className="font-serif-display text-[clamp(40px,6vw,80px)] text-[#F5F0E8]/80 uppercase leading-[0.9] tracking-[-0.03em] mb-8">
            Every story,<br /><span className="text-accent normal-case">preserved.</span>
          </h2>
          <p className="font-mono-custom text-[11px] uppercase tracking-[0.25em] text-white/30 max-w-md mx-auto">
            A living record of IITB sports — victories, records, and moments that define campus legacy.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
