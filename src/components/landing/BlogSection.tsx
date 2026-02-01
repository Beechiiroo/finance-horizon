import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const articles = [
  {
    title: 'How Finance-Horizon Revolutionizes Financial Analysis',
    excerpt: 'Discover how modern ERP-style dashboards and real-time analytics can transform your financial decision-making process.',
    author: 'Bechir Chaieb',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    category: 'Product',
    color: 'bg-primary',
  },
  {
    title: 'Why ERP-Style Dashboards Improve Decision Making',
    excerpt: 'Learn the psychology and data science behind effective financial visualization and how it leads to better business outcomes.',
    author: 'Finance Team',
    date: 'Jan 25, 2026',
    readTime: '8 min read',
    category: 'Insights',
    color: 'bg-info',
  },
  {
    title: 'Frontend Performance for Financial Platforms',
    excerpt: 'Technical deep-dive into building fast, responsive financial applications using React and modern web technologies.',
    author: 'Tech Blog',
    date: 'Jan 22, 2026',
    readTime: '12 min read',
    category: 'Technical',
    color: 'bg-success',
  },
];

export function BlogSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-info/10 text-info text-sm font-medium mb-4">
              Latest Insights
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              From Our Blog
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Stay updated with the latest trends in financial technology and analytics.
            </p>
          </div>
          <Button variant="outline" className="gap-2 mt-6 md:mt-0">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image Placeholder */}
                <div className={`h-48 ${article.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
