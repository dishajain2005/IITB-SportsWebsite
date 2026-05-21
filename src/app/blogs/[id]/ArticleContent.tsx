'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Calendar, Clock, Share2, ArrowLeft, Bookmark, User } from 'lucide-react';
import { BlogPost } from '@/lib/data/blogs';

interface ArticleContentProps {
  post: BlogPost;
}

export default function ArticleContent({ post }: ArticleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-cream-topo text-[#111111] selection:bg-accent selection:text-black font-iitb-text">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-black">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image 
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: headerOpacity }}
          className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-20 max-w-[1400px] mx-auto z-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/blogs" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="h-px w-12 bg-accent/60" />
          </div>
          
          <h1 className="font-serif-display text-[clamp(48px,8vw,100px)] leading-[0.9] text-[#F5F0E8] uppercase tracking-[-0.04em] mb-10 max-w-5xl">
            {post.title}.
          </h1>

          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <User size={14} />
              </div>
              <span className="font-mono-custom text-[10px] text-white/60 uppercase tracking-widest font-bold">{post.author}</span>
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <Calendar size={14} />
              <span className="font-mono-custom text-[10px] uppercase tracking-widest font-bold">{post.date}</span>
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <Clock size={14} />
              <span className="font-mono-custom text-[10px] uppercase tracking-widest font-bold">{post.readTime}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Article Body */}
      <section className="relative z-20 -mt-10 px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 bg-white rounded-[32px] p-8 md:p-16 lg:p-24 shadow-2xl shadow-black/5">
             <div 
               className="prose prose-xl prose-iitb max-w-none"
               dangerouslySetInnerHTML={{ __html: post.content }}
             />
             
             <div className="mt-20 pt-12 border-t border-[#111111]/05 flex flex-wrap items-center justify-between gap-8">
               <div className="flex items-center gap-4">
                 <span className="font-mono-custom text-[10px] text-[#111111]/40 uppercase tracking-widest font-black">TAGGED IN:</span>
                 <div className="flex flex-wrap gap-2">
                   {post.tags.map(t => (
                     <span key={t} className="text-[9px] font-mono-custom uppercase tracking-widest border border-[#111111]/10 px-4 py-2 rounded-full text-[#111111]/60 font-bold hover:border-accent hover:text-accent cursor-pointer transition-colors">
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
               
               <div className="flex items-center gap-3">
                 <button className="w-12 h-12 rounded-full border border-[#111111]/10 flex items-center justify-center text-[#111111]/40 hover:text-accent hover:border-accent transition-all">
                   <Share2 size={18} />
                 </button>
                 <button className="w-12 h-12 rounded-full border border-[#111111]/10 flex items-center justify-center text-[#111111]/40 hover:text-accent hover:border-accent transition-all">
                   <Bookmark size={18} />
                 </button>
               </div>
             </div>
          </div>

          {/* Side Rail */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-[#111111] rounded-[24px] p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <h4 className="font-serif-display text-2xl mb-8 leading-tight uppercase">Inter-Hostel Football Showdown.</h4>
               <Link href="/blogs/2" className="inline-flex items-center gap-3 font-mono-custom text-[10px] font-black uppercase tracking-[0.2em] text-accent hover:gap-5 transition-all">
                 READ ARTICLE <span>→</span>
               </Link>
            </div>

            <div className="border border-[#111111]/05 rounded-[24px] p-10 bg-white">
               <span className="font-mono-custom text-[#111111]/40 text-[9px] tracking-[0.4em] uppercase font-black mb-8 block">THE GAZETTE</span>
               <div className="space-y-8">
                 <div className="group cursor-pointer">
                    <h5 className="font-serif-display text-lg text-[#111111] group-hover:text-accent transition-colors leading-tight">UG Sports Orientation: A New Beginning.</h5>
                 </div>
                 <div className="h-px w-full bg-[#111111]/05" />
                 <div className="group cursor-pointer">
                    <h5 className="font-serif-display text-lg text-[#111111] group-hover:text-accent transition-colors leading-tight">PG Mania 2025: Weekend Warriors.</h5>
                 </div>
               </div>
            </div>

            <div className="p-10">
               <div className="space-y-4">
                 <div className="flex flex-col">
                   <span className="font-mono-custom text-[8px] text-[#111111]/40 uppercase tracking-widest font-bold">WRITER</span>
                   <span className="font-condensed font-black text-sm uppercase">Ishaan Gupta</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="font-mono-custom text-[8px] text-[#111111]/40 uppercase tracking-widest font-bold">PHOTOGRAPHY</span>
                   <span className="font-condensed font-black text-sm uppercase">IITB Sports Media Team</span>
                 </div>
               </div>
            </div>
          </aside>

        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .prose-iitb h3 {
          font-family: var(--font-iitb-heading), sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          font-size: 2rem;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #111;
        }
        .prose-iitb p {
          color: #444;
          line-height: 1.8;
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }
        .prose-iitb blockquote {
          border-left: 4px solid var(--color-accent);
          padding-left: 2rem;
          font-family: var(--font-iitb-display-text), serif;
          font-style: italic;
          font-size: 1.5rem;
          color: #111;
          margin: 4rem 0;
        }
      `}</style>
    </div>
  );
}
