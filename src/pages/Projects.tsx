
import React from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';

const Projects = () => {
  return (
    <div>
      {/* Projects Header */}
      <section className="section-padding pt-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">My Projects</h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              A collection of my recent work and personal projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Educational Platform API"
              description="A RESTful API for an educational platform with user authentication, course management, and progress tracking."
              tags={["Node.js", "Express", "MySQL", "JWT"]}
              githubLink="https://github.com"
              liveLink="https://example.com"
              imageSrc="/placeholder.svg"
            />
            
            <ProjectCard 
              title="E-commerce Backend"
              description="Complete backend system for an e-commerce platform with product management, cart functionality, and order processing."
              tags={["Node.js", "Express", "PostgreSQL", "Stripe"]}
              githubLink="https://github.com"
              liveLink="https://example.com"
              imageSrc="/placeholder.svg"
            />
            
            <ProjectCard 
              title="Real-time Chat API"
              description="WebSocket-based backend for a real-time chat application with user presence, messaging, and notifications."
              tags={["Node.js", "Socket.io", "MongoDB", "Redis"]}
              githubLink="https://github.com"
              liveLink="https://example.com"
              imageSrc="/placeholder.svg"
            />
            
            <ProjectCard 
              title="Task Management System"
              description="Backend for a task management application with teams, projects, tasks, and role-based permissions."
              tags={["Node.js", "Express", "MySQL", "TypeScript"]}
              githubLink="https://github.com"
              liveLink="https://example.com"
              imageSrc="/placeholder.svg"
            />
            
            <ProjectCard 
              title="Content Management API"
              description="Headless CMS backend with content modeling, API endpoints, and user management."
              tags={["Node.js", "Express", "PostgreSQL", "GraphQL"]}
              githubLink="https://github.com"
              liveLink="https://example.com"
              imageSrc="/placeholder.svg"
            />
            
            <ProjectCard 
              title="Authentication Microservice"
              description="Standalone authentication service with JWT, OAuth, and role-based authorization."
              tags={["Node.js", "Express", "MongoDB", "JWT"]}
              githubLink="https://github.com"
              liveLink="https://example.com"
              imageSrc="/placeholder.svg"
            />
          </div>
          
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-6">
              Want to see more of my work? Check out my GitHub repositories.
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center"
            >
              <Github className="mr-2 h-5 w-5" />
              Visit My GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
  imageSrc: string;
}

const ProjectCard = ({ title, description, tags, githubLink, liveLink, imageSrc }: ProjectCardProps) => {
  return (
    <div className="card overflow-hidden animate-fade-in h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6 pt-0 flex space-x-3 mt-auto">
        {githubLink && (
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-700 hover:text-portfolio-primary transition-colors"
          >
            <Github className="mr-2 h-5 w-5" />
            Code
          </a>
        )}
        
        {liveLink && (
          <a 
            href={liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-700 hover:text-portfolio-primary transition-colors"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default Projects;
