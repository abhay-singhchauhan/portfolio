
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Server } from 'lucide-react';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppSelector } from '@/hooks/use-redux';

const Home = () => {
  const isMobile = useIsMobile();
  const { textContrast } = useAppSelector(state => state.theme);
  
  const titles = [
    "Backend Developer",
    "Tech Consultant",
    "Tech Advisor",
    "Just that one guy who fixes stuff"
  ];

  // Helper function to determine text color class based on contrast setting
  const getTextColorClass = (defaultClass: string) => {
    if (textContrast === 'high') {
      return defaultClass.replace('text-gray-600', 'text-gray-300');
    }
    return defaultClass;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding min-h-[90vh] flex items-center">
        <div className="container mx-auto">
          <div className={`flex flex-col ${isMobile ? 'flex-col' : 'md:flex-row'} items-center`}>
            {isMobile && (
              <div className="md:w-1/2 mb-10 flex justify-center animate-fade-in animate-delay-300">
                <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-gradient-to-r from-portfolio-primary to-portfolio-secondary p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Abhay Singh Chauhan" 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="md:w-1/2 mb-10 md:mb-0">
              <p className="text-portfolio-primary font-medium animate-fade-in animate-delay-100">
                Hi, I'm Abhay 👋
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 animate-fade-in animate-delay-200">
                <AnimatedTitle titles={titles} />
              </h1>
              <p className={getTextColorClass("text-lg text-gray-600 dark:text-gray-300 mt-6 animate-fade-in animate-delay-300")}>
                Building robust technology solutions with <span className="text-portfolio-primary font-medium">Node.js</span>, 
                <span className="text-portfolio-secondary font-medium"> Express</span>, and 
                <span className="text-portfolio-accent font-medium"> MySQL</span>
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-400">
                <Link to="/projects" className="btn-primary">
                  View My Work
                </Link>
                <Link to="/contact" className="btn-outline">
                  Get In Touch
                </Link>
              </div>
            </div>
            
            {!isMobile && (
              <div className="md:w-1/2 flex justify-center animate-fade-in animate-delay-300">
                <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-gradient-to-r from-portfolio-primary to-portfolio-secondary p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Abhay Singh Chauhan" 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Specializations */}
      <section className="bg-gray-50 dark:bg-gray-800 section-padding transition-colors">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What I <span className="text-portfolio-primary">Specialize</span> In
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpecializationCard 
              icon={<Server className="w-12 h-12 text-portfolio-primary" />}
              title="Backend Development"
              description="Building robust, scalable and maintainable server-side applications with Node.js and Express."
              delay="100"
              textContrast={textContrast}
            />
            
            <SpecializationCard 
              icon={<Database className="w-12 h-12 text-portfolio-secondary" />}
              title="Database Management"
              description="Designing and optimizing database schemas, writing queries, and managing data with MySQL, PostgreSQL and Firebase."
              delay="200"
              textContrast={textContrast}
            />
            
            <SpecializationCard 
              icon={<Code className="w-12 h-12 text-portfolio-accent" />}
              title="API Development"
              description="Creating RESTful APIs with clean architecture that enable seamless communication between front-end and back-end."
              delay="300"
              textContrast={textContrast}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work together?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time opportunities.
            Let's discuss your project and how I can help!
          </p>
          
          <Link to="/contact" className="inline-flex items-center bg-white text-portfolio-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface SpecializationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  textContrast: 'normal' | 'high';
}

const SpecializationCard = ({ icon, title, description, delay, textContrast }: SpecializationCardProps) => {
  const descriptionClass = textContrast === 'high' 
    ? "text-gray-600 dark:text-gray-200" 
    : "text-gray-600 dark:text-gray-300";

  return (
    <div className={`card p-8 animate-fade-in animate-delay-${delay} dark:bg-gray-700 dark:text-white transition-colors`}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className={descriptionClass}>{description}</p>
    </div>
  );
};

export default Home;
