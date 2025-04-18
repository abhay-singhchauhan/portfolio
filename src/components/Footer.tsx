
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 transition-colors">
      <div className="container mx-auto px-4">
        <div className={`flex ${isMobile ? 'flex-col items-center space-y-8' : 'flex-row justify-between items-center'}`}>
          <div className={`${isMobile ? 'text-center' : ''} mb-6 md:mb-0`}>
            <h3 className="text-xl font-display font-bold text-portfolio-dark dark:text-white">
              Abhay<span className="text-portfolio-primary">.</span>
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Technology Enabler</p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-portfolio-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-portfolio-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:abhaysinghchauhan@zohomail.in" 
              className="text-gray-600 dark:text-gray-300 hover:text-portfolio-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
          
          <div className={`text-gray-600 dark:text-gray-300 text-sm ${isMobile ? 'text-center' : ''}`}>
            <nav className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-wrap justify-center gap-x-6 gap-y-2'} mb-4`}>
              <Link to="/" className="hover:text-portfolio-primary transition-colors">Home</Link>
              <Link to="/about" className="hover:text-portfolio-primary transition-colors">About</Link>
              <Link to="/projects" className="hover:text-portfolio-primary transition-colors">Projects</Link>
              <Link to="/experience" className="hover:text-portfolio-primary transition-colors">Experience</Link>
              <Link to="/blog" className="hover:text-portfolio-primary transition-colors">Blog</Link>
              <Link to="/contact" className="hover:text-portfolio-primary transition-colors">Contact</Link>
            </nav>
            <p>&copy; {currentYear} Abhay Singh Chauhan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
