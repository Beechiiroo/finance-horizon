import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Financial Analyst',
    company: 'TechCorp Inc.',
    avatar: 'SM',
    rating: 5,
    text: 'Finance-Horizon transformed how we visualize our financial data. The real-time dashboards are incredibly intuitive and the reporting features save us hours every week.',
  },
  {
    name: 'Ahmed Hassan',
    role: 'MBA Student',
    company: 'Business School',
    avatar: 'AH',
    rating: 5,
    text: 'As a student learning financial analysis, this platform has been invaluable. The clean interface makes complex financial concepts easy to understand and analyze.',
  },
  {
    name: 'Emily Chen',
    role: 'Startup Founder',
    company: 'FinFlow Startup',
    avatar: 'EC',
    rating: 5,
    text: 'We needed an affordable yet powerful financial management tool for our startup. Finance-Horizon delivered exactly what we needed with room to scale.',
  },
  {
    name: 'Marcus Johnson',
    role: 'IT Manager',
    company: 'Enterprise Solutions',
    avatar: 'MJ',
    rating: 4,
    text: 'The modular architecture impressed our technical team. Integration was seamless and the security features meet our enterprise compliance requirements.',
  },
  {
    name: 'Lisa Park',
    role: 'Accounting Lead',
    company: 'Retail Group',
    avatar: 'LP',
    rating: 5,
    text: 'The forecasting features have significantly improved our budget planning. The AI-powered insights help us make data-driven decisions with confidence.',
  },
  {
    name: 'David Brown',
    role: 'Developer',
    company: 'Freelance',
    avatar: 'DB',
    rating: 5,
    text: 'From a technical standpoint, the codebase is clean and well-structured. It\'s a great example of modern React development practices.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users say about their experience with Finance-Horizon.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 relative">
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
