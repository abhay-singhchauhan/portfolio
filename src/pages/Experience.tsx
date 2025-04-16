
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Experience = () => {
  return (
    <div>
      {/* Experience Header */}
      <section className="section-padding pt-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">My Experience</h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              My professional journey and the companies I've worked with.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ExperienceCard
              company="Language and Learning Foundation"
              role="Backend Developer"
              duration="August 2024 - Present"
              location="Delhi, India"
              type="Hybrid"
              description={[
                "Developing RESTful APIs for educational technology platforms",
                "Working with Node.js, Express, and MySQL to build scalable backend solutions",
                "Implementing database design and optimization for improved performance",
                "Collaborating with cross-functional teams to deliver features on time"
              ]}
              current
            />
            
            <ExperienceCard
              company="iDesign.Market"
              role="Backend Developer"
              duration="June 2024 - August 2024"
              location="Noida, India"
              type="On-site"
              description={[
                "Built and maintained APIs for an interior design marketplace",
                "Implemented authentication and authorization systems using JWT",
                "Designed database schemas and wrote complex SQL queries",
                "Collaborated with frontend developers to integrate APIs"
              ]}
            />
            
            <ExperienceCard
              company="LeadMint Technologies"
              role="Backend Developer"
              duration="February 2024 - June 2024"
              location="Delhi, India"
              type="Remote"
              description={[
                "Developed backend services for lead generation applications",
                "Created RESTful APIs using Node.js and Express",
                "Worked with Firebase for real-time data synchronization",
                "Implemented authentication and authorization systems"
              ]}
              isLast
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface ExperienceCardProps {
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  description: string[];
  current?: boolean;
  isLast?: boolean;
}

const ExperienceCard = ({ 
  company, 
  role, 
  duration, 
  location, 
  type, 
  description, 
  current = false, 
  isLast = false 
}: ExperienceCardProps) => {
  return (
    <div className="relative pl-10 pb-10 animate-fade-in">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
      )}
      
      {/* Timeline icon */}
      <div className="absolute left-0 top-8 w-8 h-8 rounded-full bg-portfolio-primary text-white flex items-center justify-center">
        <Calendar className="w-5 h-5" />
      </div>
      
      <div className={`card p-8 border-l-4 ${current ? 'border-l-portfolio-primary' : 'border-l-portfolio-secondary'}`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">{company}</h3>
            <p className="text-portfolio-primary font-medium mt-1">{role}</p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <div className="flex items-center justify-end text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              {duration}
            </div>
            <div className="flex items-center justify-end text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {location} • {type}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium mb-3">Key Responsibilities:</h4>
          <ul className="space-y-2 text-gray-600">
            {description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-portfolio-primary mt-2 mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
