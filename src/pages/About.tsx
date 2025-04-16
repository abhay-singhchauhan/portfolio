
import React from 'react';
import { Link } from 'react-router-dom';
import { FileDown, Calendar, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* About Section */}
      <section className="section-padding pt-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About Me</h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in animate-delay-100">
              Get to know my journey, skills, and what drives me as a developer.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/5 animate-fade-in animate-delay-200">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Abhay Singh Chauhan" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="md:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 animate-fade-in animate-delay-200">
                Abhay Singh Chauhan
              </h2>
              
              <div className="space-y-4 text-gray-600 animate-fade-in animate-delay-300">
                <p>
                  I'm a passionate and results-driven backend developer with experience in 
                  Node.js, Express.js, MySQL, Firebase, PostgreSQL, and Adonis.js. Currently 
                  pursuing MCA and working at Language and Learning Foundation.
                </p>
                <p>
                  My journey in software development began during my undergraduate studies, 
                  where I discovered my passion for building server-side applications. Since then, 
                  I've been continuously learning and growing as a developer.
                </p>
                <p>
                  I enjoy solving complex problems and creating efficient, scalable solutions 
                  that make a real impact. When I'm not coding, you can find me exploring new 
                  technologies, contributing to open-source projects, or enjoying a good book.
                </p>
              </div>
              
              <Link to="/resume.pdf" className="btn-outline inline-flex items-center mt-8 animate-fade-in animate-delay-400">
                <FileDown className="mr-2 h-5 w-5" />
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            My <span className="text-portfolio-primary">Skills</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SkillCard name="Node.js" level={90} />
            <SkillCard name="Express.js" level={85} />
            <SkillCard name="MySQL" level={80} />
            <SkillCard name="TypeScript" level={75} />
            <SkillCard name="Firebase" level={85} />
            <SkillCard name="PostgreSQL" level={70} />
            <SkillCard name="MongoDB" level={65} />
            <SkillCard name="Adonis.js" level={70} />
            <SkillCard name="REST API" level={90} />
            <SkillCard name="Git" level={85} />
            <SkillCard name="Docker" level={60} />
            <SkillCard name="AWS" level={55} />
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            My <span className="text-portfolio-primary">Journey</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <TimelineItem 
              icon={<Briefcase />}
              title="Language and Learning Foundation"
              subtitle="Backend Developer"
              date="Aug 2024 - Present"
              description="Working on educational technology platforms to improve literacy and numeracy in primary education."
            />
            
            <TimelineItem 
              icon={<Briefcase />}
              title="iDesign.Market"
              subtitle="Backend Developer"
              date="Jun 2024 - Aug 2024"
              description="Developed and maintained REST APIs for an interior design marketplace platform."
            />
            
            <TimelineItem 
              icon={<Briefcase />}
              title="LeadMint Technologies"
              subtitle="Backend Developer"
              date="Feb 2024 - Jun 2024"
              description="Built backend services for lead generation and management applications."
            />
            
            <TimelineItem 
              icon={<GraduationCap />}
              title="Master of Computer Applications"
              subtitle="In Progress"
              date="2023 - Present"
              description="Pursuing advanced studies in computer applications with focus on software development."
              isLast={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface SkillCardProps {
  name: string;
  level: number;
}

const SkillCard = ({ name, level }: SkillCardProps) => {
  return (
    <div className="card p-6 animate-fade-in">
      <h3 className="font-medium mb-3">{name}</h3>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem = ({ icon, title, subtitle, date, description, isLast = false }: TimelineItemProps) => {
  return (
    <div className="relative pl-10 pb-10 animate-fade-in">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-1 bottom-0 w-0.5 bg-gray-200"></div>
      )}
      
      {/* Timeline icon */}
      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-portfolio-primary text-white flex items-center justify-center">
        {icon}
      </div>
      
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>
        
        <p className="text-portfolio-primary font-medium mb-3">{subtitle}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default About;
