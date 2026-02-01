import React from 'react';
import { motion } from 'framer-motion';
import { 
  Paintbrush, 
  Smartphone, 
  Accessibility, 
  Sparkles,
  Monitor,
  Tablet
} from 'lucide-react';

const features = [
  {
    icon: Paintbrush,
    title: 'Consistent Design System',
    description: 'Unified visual language with reusable components ensuring brand consistency across all modules.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Layout',
    description: 'Optimized experience across all devices - desktop, tablet, and mobile platforms.',
  },
  {
    icon: Accessibility,
    title: 'Accessibility First',
    description: 'WCAG 2.1 compliant with keyboard navigation, screen reader support, and high contrast modes.',
  },
  {
    icon: Sparkles,
    title: 'Smooth Animations',
    description: 'Subtle, purposeful animations that enhance usability without compromising performance.',
  },
];

export function UIUXSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Desktop Mockup */}
            <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-warning/70" />
                  <div className="w-3 h-3 rounded-full bg-success/70" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-muted rounded text-xs text-muted-foreground">
                    finance-horizon.app
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 h-64 flex items-center justify-center">
                <Monitor className="w-20 h-20 text-muted-foreground/30" />
              </div>
            </div>
            
            {/* Tablet Mockup - Overlapping */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 w-48"
            >
              <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                <div className="bg-muted/50 px-2 py-1.5 border-b border-border flex justify-center">
                  <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
                </div>
                <div className="p-2 bg-gradient-to-br from-muted/50 to-muted/30 h-32 flex items-center justify-center">
                  <Tablet className="w-10 h-10 text-muted-foreground/30" />
                </div>
              </div>
            </motion.div>
            
            {/* Mobile Mockup - Overlapping */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 left-8 w-28"
            >
              <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                <div className="bg-muted/50 px-2 py-1 border-b border-border flex justify-center">
                  <div className="w-6 h-0.5 bg-muted-foreground/30 rounded-full" />
                </div>
                <div className="p-2 bg-gradient-to-br from-muted/50 to-muted/30 h-24 flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-muted-foreground/30" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              UI/UX Excellence
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Designed for Humans
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Every pixel is crafted with purpose. Our design philosophy puts user experience 
              at the center of everything we build.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
