import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, BarChart2, Target, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Database,
    step: '01',
    title: 'Data Collection',
    description: 'Seamlessly import financial data from multiple sources including banks, invoices, and spreadsheets.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'Financial Processing',
    description: 'Automated categorization, validation, and transformation of raw financial data.',
  },
  {
    icon: BarChart2,
    step: '03',
    title: 'Visualization & Analytics',
    description: 'Transform processed data into interactive dashboards, charts, and comprehensive reports.',
  },
  {
    icon: Target,
    step: '04',
    title: 'Decision Support',
    description: 'AI-powered insights and recommendations to drive strategic financial decisions.',
  },
];

export function WorkflowSection() {
  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Streamlined Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From raw data to actionable insights in four simple steps.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      Step {step.step}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 mt-2">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
