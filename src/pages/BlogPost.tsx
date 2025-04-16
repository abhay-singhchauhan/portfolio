
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, MessageSquare } from 'lucide-react';

// Mock data for blog posts
const BLOG_POSTS = [
  {
    id: "1",
    title: "Building Scalable Node.js Applications",
    content: `
      <p>Node.js has become the go-to platform for building server-side applications, especially when scalability is a concern. In this article, we'll explore the best practices for building Node.js applications that can scale to handle millions of users.</p>
      
      <h2>Understanding Node.js Scalability</h2>
      <p>Node.js is designed to be scalable from the ground up, with its event-driven, non-blocking I/O model. This architecture makes it particularly well-suited for handling multiple concurrent connections with minimal overhead.</p>
      
      <h2>Key Strategies for Scaling Node.js Applications</h2>
      
      <h3>1. Leverage the Cluster Module</h3>
      <p>The cluster module allows you to create child processes (workers) that all share the same server port. This lets you take full advantage of multi-core systems, effectively multiplying your application's throughput.</p>
      
      <pre><code>
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log("Master process " + process.pid + " is running");

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log("Worker " + worker.process.pid + " died");
    cluster.fork(); // Replace the dead worker
  });
} else {
  // Workers share the same TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\\n');
  }).listen(8000);

  console.log("Worker " + process.pid + " started");
}
      </code></pre>
      
      <h3>2. Use a Load Balancer</h3>
      <p>For production applications, implementing a load balancer like Nginx in front of your Node.js servers is essential. This distributes incoming requests across multiple server instances, improving both performance and reliability.</p>
      
      <h3>3. Implement Caching</h3>
      <p>Caching frequently accessed data can significantly reduce database load and improve response times. Redis is a popular choice for implementing a caching layer in Node.js applications.</p>
      
      <h3>4. Optimize Database Queries</h3>
      <p>Slow database queries can become a major bottleneck in high-traffic applications. Make sure to optimize your database schema, create appropriate indexes, and use connection pooling.</p>
      
      <h3>5. Use Asynchronous Programming Patterns</h3>
      <p>Embrace the asynchronous nature of Node.js by using promises, async/await, and avoiding blocking operations in your request handlers.</p>
      
      <h2>Conclusion</h2>
      <p>Building scalable Node.js applications requires a combination of architectural decisions, implementation practices, and infrastructure considerations. By following these best practices, you'll be well on your way to creating applications that can handle significant load while maintaining performance and reliability.</p>
    `,
    date: "April 10, 2024",
    readTime: "8 min read",
    author: "Abhay Singh Chauhan",
    tags: ["Node.js", "Scaling", "Backend"],
    imageSrc: "/placeholder.svg"
  }
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the blog post by ID
  const post = BLOG_POSTS.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="section-padding pt-24 text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Blog Post Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-portfolio-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden mb-8">
              <img 
                src={post.imageSrc} 
                alt={post.title} 
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-12">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {post.author}
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {post.date}
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
            </div>
            
            {/* Blog Post Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Comments Section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <MessageSquare className="mr-2 h-6 w-6" />
                Comments
              </h3>
              
              {/* Login to comment */}
              <div className="card p-8 text-center">
                <h4 className="text-xl font-bold mb-4">Join the conversation</h4>
                <p className="text-gray-600 mb-6">
                  Sign in to leave comments and engage with the community.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="btn-primary">Sign In</button>
                  <button className="btn-outline">Create Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
