import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';
import Card from '../ui/Card';

const Blog = () => {
  const { t } = useTranslation();

  const articles = [
    { type: t('blog.articles.0.type', 'Article'), date: t('blog.articles.0.date', 'Dec 19, 2024'), title: t('blog.articles.0.title', 'How to Prepare Effectively for the BAC'), img: 'RpohCsUVpxbg7M4DXDsPIpImTs.jpg' },
    { type: t('blog.articles.1.type', 'News'), date: t('blog.articles.1.date', 'Dec 13, 2024'), title: t('blog.articles.1.title', '5 Smart Habits Every Successful Student Should Build'), img: 'e5AT39nawfjujfDX2f57PtrLIL0.jpg' },
    { type: t('blog.articles.2.type', 'News'), date: t('blog.articles.2.date', 'Dec 13, 2024'), title: t('blog.articles.2.title', 'How to Stay Motivated During Exam Season'), img: 'ac0m6FfR1kVL9ZuCIwf8supgo.jpg' }
  ];

  return (
    <section className='py-24 bg-white border-b border-rekaz-border/50'>
      <Container>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6'>
          <div className='max-w-2xl'>
            <SectionTag text={t('blog.tag', 'Resources')} />
            <h2 className='text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-6 leading-tight'>
              {t('blog.title', 'Explore helpful articles for students, families, learners, and entrepreneurs')}
            </h2>
          </div>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {articles.map((art, idx) => (
            <Card key={idx} className='overflow-hidden group cursor-pointer'>
              <div className='h-56 overflow-hidden relative'>
                <img 
                  src={`https://framerusercontent.com/images/${art.img}`} 
                  alt={art.title} 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-8'>
                <div className='flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-rekaz-muted mb-4'>
                  <span className='text-rekaz-cyan'>{art.type}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
                <h3 className='text-xl font-satoshi font-bold group-hover:text-rekaz-cyan transition-colors'>
                  {art.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Blog;
