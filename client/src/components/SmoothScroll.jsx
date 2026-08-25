import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useLocation, useNavigationType } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();
  const navigationType = useNavigationType();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Scroll to top on every route change except when going back (POP)
  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, location.search, navigationType]);

  useEffect(() => {
    // Skip smooth scroll for admin panel and mobile devices (causes lag)
    if (isAdminPath || isMobile) return;

    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // ─── Lenis + GSAP ScrollTrigger integration ───────────────────────
    // Tell ScrollTrigger to update whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker instead of a raw RAF loop
    // so both share the same frame loop and scroll positions stay in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from adding extra lag frames that desync scroll position
    gsap.ticker.lagSmoothing(0);
    // ─────────────────────────────────────────────────────────────────

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [isAdminPath, isMobile]);

  return <div className="w-full overflow-x-hidden">{children}</div>;
};

export default SmoothScroll;
