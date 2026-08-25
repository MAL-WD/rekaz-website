import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const Blog = () => {
  const { t } = useTranslation();

  const articles = [
    { type: t('blog.articles.0.type', 'Article'), date: t('blog.articles.0.date', 'Dec 19, 2024'), title: t('blog.articles.0.title', 'How to Prepare Effectively for the BAC'), img: 'RpohCsUVpxbg7M4DXDsPIpImTs.jpg' },
    { type: t('blog.articles.1.type', 'News'), date: t('blog.articles.1.date', 'Dec 13, 2024'), title: t('blog.articles.1.title', '5 Smart Habits Every Successful Student Should Build'), img: 'e5AT39nawfjujfDX2f57PtrLIL0.jpg' },
    { type: t('blog.articles.2.type', 'News'), date: t('blog.articles.2.date', 'Dec 13, 2024'), title: t('blog.articles.2.title', 'How to Stay Motivated During Exam Season'), img: 'ac0m6FfR1kVL9ZuCIwf8supgo.jpg' }
  ];

  return (
    <section className="py-24 bg-white border-b border-rekaz-border/30 relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-start"
        >
          <SectionTag text={t('blog.tag', 'Resources')} />
          <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-5 max-w-2xl leading-[1.15] tracking-[-0.03em]">
            {t('blog.title', 'Explore helpful articles for students, families, learners, and entrepreneurs')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer bg-white rounded-[20px] ring-1 ring-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-400"
            >
              <div className="h-[210px] overflow-hidden relative">
                <img
                  src={`https://framerusercontent.com/images/${art.img}`}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-600 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-rekaz-cyan shadow-sm ring-1 ring-white/50">
                    {art.type}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 text-start">
                <div className="text-[11px] font-bold text-rekaz-muted mb-3 flex items-center gap-2">
                  <span>{art.date}</span>
                </div>
                <h3 className="text-lg font-satoshi font-bold group-hover:text-rekaz-cyan transition-colors duration-300 leading-snug tracking-tight mb-4 flex-1">
                  {art.title}
                </h3>
                <div className="flex items-center gap-1.5 text-rekaz-cyan text-[13px] font-bold group-hover:translate-x-1.5 transition-transform duration-300 mt-auto">
                  <span>Read Article</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Blog;
