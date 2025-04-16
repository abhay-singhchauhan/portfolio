
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully! I'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div>
      {/* Contact Header */}
      <section className="section-padding pt-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Get In Touch</h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ContactInfoCard 
              icon={<Mail className="w-8 h-8 text-portfolio-primary" />}
              title="Email"
              content="abhaysinghchauhan@zohomail.in"
              link="mailto:abhaysinghchauhan@zohomail.in"
            />
            
            <ContactInfoCard 
              icon={<Phone className="w-8 h-8 text-portfolio-primary" />}
              title="Phone"
              content="+91 98765 43210"
              link="tel:+919876543210"
            />
            
            <ContactInfoCard 
              icon={<MapPin className="w-8 h-8 text-portfolio-primary" />}
              title="Location"
              content="Delhi, India"
              link="https://maps.google.com?q=Delhi,India"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in animate-delay-200">
              <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="input-field" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="input-field" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="input-field" 
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={6} 
                    className="input-field resize-none" 
                    placeholder="Hello, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
            
            {/* Social & Connect */}
            <div className="animate-fade-in animate-delay-300">
              <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
              
              <div className="card p-8 mb-8">
                <h3 className="text-xl font-bold mb-4">Let's Connect on Social Media</h3>
                <p className="text-gray-600 mb-6">
                  Follow me on social media to stay updated with my latest projects and articles.
                </p>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 flex items-center justify-center"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                  
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 flex items-center justify-center"
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">Open for Opportunities</h3>
                <p className="mb-6">
                  I'm currently available for freelance projects, full-time positions, and collaboration opportunities. 
                  Let's create something amazing together!
                </p>
                
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p>Backend Development</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p>API Development</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p>Database Design & Optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link: string;
}

const ContactInfoCard = ({ icon, title, content, link }: ContactInfoCardProps) => {
  return (
    <a 
      href={link} 
      target={link.startsWith('http') ? '_blank' : undefined}
      rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="card p-6 text-center hover:shadow-lg transition-shadow animate-fade-in"
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </a>
  );
};

export default Contact;
