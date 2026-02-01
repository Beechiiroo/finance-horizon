import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TeamSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
            Meet the Creator
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About the Project
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A final-year project (PFE) demonstrating modern web development practices 
            and financial software engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              {/* Image/Avatar Side */}
              <div className="bg-gradient-to-br from-primary via-primary/80 to-info p-12 flex flex-col items-center justify-center text-center">
                <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center mb-6">
                  <span className="text-6xl font-bold text-white">BC</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Bechir Chaieb</h3>
                <p className="text-white/80 mb-6">Full-Stack Developer</p>
                <div className="flex gap-3">
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Info Side */}
              <div className="p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Academic Project</p>
                    <p className="font-semibold">Final Year Project (PFE)</p>
                  </div>
                </div>

                <h4 className="text-xl font-semibold mb-4">About This Project</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Finance-Horizon is a comprehensive financial management platform developed 
                  as part of a final-year project. It demonstrates proficiency in modern 
                  web technologies including React, TypeScript, and cloud-native architectures.
                </p>

                <div className="space-y-3">
                  <h5 className="font-semibold">Technical Skills Demonstrated:</h5>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Recharts', 'Framer Motion'].map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
