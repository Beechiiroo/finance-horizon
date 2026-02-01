import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import financeErpLogo from '@/assets/finance-erp-logo.png';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Modules', href: '#modules' },
  { label: 'How it Works', href: '#workflow' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <img src={financeErpLogo} alt="Finance-Horizon" className="h-10 w-10" />
              <span className="text-xl font-bold">Finance-Horizon</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')} className="gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-card border-l border-border z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold">Menu</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full gap-2"
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
