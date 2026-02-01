import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Cloud, 
  BarChart3, 
  Blocks, 
  Users, 
  Lock 
} from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Modern & Intuitive UI',
    description: 'Clean, professional interface designed for optimal user experience and productivity.',
  },
  {
    icon: Cloud,
    title: 'Fast Cloud Deployment',
    description: 'Deploy instantly with enterprise-grade infrastructure and 99.9% uptime guarantee.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Insights',
    description: 'Live financial data visualization with intelligent analytics and forecasting.',
  },
  {
    icon: Blocks,
    title: 'Modular Architecture',
    description: 'Scalable, component-based design that grows with your business needs.',
  },
  {
    icon: Users,
    title: 'Multi-user Support',
    description: 'Perfect for students, startups, and enterprises with role-based access control.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, SOC2 compliance, and advanced threat protection.',
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Finance-Horizon
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Built for Modern Finance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of financial management with our cutting-edge platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
