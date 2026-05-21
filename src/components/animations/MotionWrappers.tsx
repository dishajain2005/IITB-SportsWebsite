'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const FadeInUp = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  once = true,
  ...props 
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  once = true,
  ...props 
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  once = true,
  ...props 
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  once = true,
  ...props 
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  delay = 0,
  once = true,
  ...props 
}: { children: ReactNode; staggerDelay?: number; delay?: number; once?: boolean } & HTMLMotionProps<'div'>) => {
  const variants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children, 
  duration = 0.8,
  ...props 
}: { children: ReactNode; duration?: number } & HTMLMotionProps<'div'>) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  );
};
