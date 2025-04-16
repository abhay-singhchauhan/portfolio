
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-display font-bold text-portfolio-dark">
          Abhay<span className="text-portfolio-primary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLinks />
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4">
            <nav className="flex flex-col space-y-4">
              <NavLinks mobile onClick={toggleMenu} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks = ({ mobile, onClick }: NavLinksProps) => {
  const links = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/projects", text: "Projects" },
    { to: "/experience", text: "Experience" },
    { to: "/blog", text: "Blog" },
    { to: "/contact", text: "Contact" },
  ];

  const linkClasses = mobile 
    ? "block py-2 hover:text-portfolio-primary transition-colors" 
    : "hover:text-portfolio-primary transition-colors";

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.to} 
          to={link.to} 
          className={linkClasses}
          onClick={onClick}
        >
          {link.text}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
