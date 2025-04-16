
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/hooks/use-redux';
import { logout } from '@/store/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAdminPanel = () => {
    navigate('/admin/blog');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-display font-bold text-portfolio-dark dark:text-white">
          Abhay<span className="text-portfolio-primary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex space-x-8 mr-4">
            <NavLinks />
          </nav>
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {user?.isAdmin && (
                <Button variant="ghost" size="sm" onClick={handleAdminPanel}>
                  Admin
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={handleLogin} className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="text-gray-600 dark:text-gray-300" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-md p-4 transition-colors">
            <nav className="flex flex-col space-y-4">
              <NavLinks mobile onClick={toggleMenu} />
              
              {isAuthenticated ? (
                <>
                  {user?.isAdmin && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        handleAdminPanel();
                        toggleMenu();
                      }}
                    >
                      Admin Panel
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full justify-start"
                  onClick={() => {
                    handleLogin();
                    toggleMenu();
                  }}
                >
                  Login
                </Button>
              )}
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
    ? "block py-2 hover:text-portfolio-primary transition-colors dark:text-white" 
    : "hover:text-portfolio-primary transition-colors dark:text-white";

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
