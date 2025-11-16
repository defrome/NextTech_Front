import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ['home', 'cases'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="logo-container"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="logo-icon"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span style={{ 
                  fontSize: 28, 
                  background: 'linear-gradient(135deg, #00d9ff 35%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}>↗</span>
            </motion.div>
            <motion.span 
              className="logo-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              NextTech
            </motion.span>
          </motion.div>
          
          <nav className="nav">
            <motion.a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              whileHover={{ y: -2 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="#cases" 
              className={`nav-link ${activeSection === 'cases' ? 'active' : ''}`}
              whileHover={{ y: -2 }}
            >
              Cases
            </motion.a>
            <motion.a 
              href="#about" 
              className="nav-link"
              whileHover={{ y: -2 }}
            >
              About
            </motion.a>
            <motion.button 
              className="contact-btn"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0, 217, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

// Page Indicator Component (Right)
const PageIndicator = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section, index) => {
        const { offsetTop, offsetHeight } = section;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setCurrentPage(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="page-indicator"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {[1, 2, 3].map((page) => (
        <motion.div 
          key={page}
          className={`indicator-line ${currentPage === page ? 'active' : ''}`}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: currentPage === page ? 1 : 0.3 }}
        >
          <div className="indicator-number">
            {String(page).padStart(2, '0')}
          </div>
          <motion.div 
            className="indicator-bar"
            animate={{ 
              width: currentPage === page ? 60 : 40,
              backgroundColor: currentPage === page ? '#22c55e' : '#a3a3a3'
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Wave Background Component
const WaveBackground = () => {
  return (
    <div className="wave-bg">
      <svg className="wave-svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path
          d="M0,200 Q300,150 600,200 T1200,200 L1200,800 L0,800 Z"
          fill="rgba(34, 197, 94, 0.05)"
        />
        <path
          d="M0,300 Q400,250 800,300 T1200,300 L1200,800 L0,800 Z"
          fill="rgba(34, 197, 94, 0.03)"
        />
        <path
          d="M0,400 Q200,350 400,400 T1200,400 L1200,800 L0,800 Z"
          fill="rgba(34, 197, 94, 0.04)"
        />
      </svg>
    </div>
  );
};

// Hero Section
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="home" className="hero">
      <WaveBackground />
      <PageIndicator />
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          style={{ y, opacity }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span>Digital Excellence</span>
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building the{' '}
            <span className="highlight">Future</span> of Web Solutions
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We create modern web applications and innovative Telegram Mini Apps 
            that transform businesses and engage users.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Our Work →
            </motion.button>
            <motion.button 
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={() => {
          document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ cursor: 'pointer' }}
      >
        <motion.div 
          className="scroll-circle"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="scroll-arrow">↓</div>
        </motion.div>
        <p className="scroll-text">Scroll down</p>
      </motion.div>
    </section>
  );
};

// Project Modal Component
const ProjectModal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="project-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            
            <div className="project-modal-content">
              {/* Project Image */}
              <div className="project-modal-image">
                <img src={project.image} alt={project.title} />
              </div>

              {/* Project Info */}
              <div className="project-modal-info">
                <div className="project-modal-header">
                  <span className="project-modal-category">{project.category}</span>
                  <h2 className="project-modal-title">{project.title}</h2>
                </div>

                <p className="project-modal-description">{project.description}</p>

                {/* Features */}
                <div className="project-modal-section">
                  <h3 className="project-modal-section-title">Key Features</h3>
                  <div className="project-modal-features">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="project-modal-feature">
                        <span className="feature-icon">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="project-modal-section">
                  <h3 className="project-modal-section-title">Technologies</h3>
                  <div className="project-modal-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="project-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Cases Section
const Cases = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = [
    {
      id: 0,
      title: "TON Tracker",
      description: "System for managing personal TON wallet, tracking exchange rates, internal marketplace for usernames and Telegram gifts.",
      category: "Telegram Mini App",
      image: "https://assets.coingecko.com/coingecko/public/ckeditor_assets/pictures/7998/content_ton_keeper_landing.webp",
      technologies: ["React", "TypeScript", "TON Blockchain", "Telegram API"],
      features: ["Wallet management", "Exchange tracking", "Marketplace"],
      link: "https://t.me/GiftsBattle_bot"
    },
    {
      id: 1,
      title: "Voting Bot",
      description: "Telegram voting and polling with powerful admin analytics for communities.",
      category: "Telegram Bot",
      image: "https://roob.in/img-host/portfolio/telegram-mini-app/toygers1-tg-mini-app.jpg",
      technologies: ["Node.js", "Telegram Bot API", "MongoDB"],
      features: ["Groups voting", "Poll export", "Admin dashboard"],
      link: "https://t.me/example_voting_bot"
    },
    {
      id: 2,
      title: "Crypto Shop MiniApp",
      description: "A TWA shop for selling digital goods in Telegram: payments, catalog, CRM.",
      category: "E-commerce",
      image: "https://cdn.dribbble.com/userupload/16577086/file/original-976901487463b2f64c23998ba6aa042f.jpg?resize=752x&vertical=center",
      technologies: ["React", "Telegram TWA", "Stripe"],
      features: ["Payments", "Billing", "Realtime order support"],
      link: "https://t.me/example_shop_bot"
    }
  ];

  return (
    <section id="cases" className="cases-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Portfolio
          </motion.div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Explore our successful Telegram Mini Apps and web solutions
          </p>
        </motion.div>

        <div className="cases-grid">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className="case-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => {
                if (caseItem.link) {
                  window.open(caseItem.link, '_blank', 'noopener,noreferrer');
                } else {
                  setSelectedCase(caseItem);
                }
              }}
            >
              <div className="case-card-bg"></div>
              <div className="case-image-wrapper">
                <img 
                  src={caseItem.image} 
                  alt={caseItem.title}
                  className="case-image"
                  loading="lazy"
                />
              </div>
              
              <div className="case-content">
                <div className="case-category">{caseItem.category}</div>
                <h3 className="case-title">{caseItem.title}</h3>
                <p className="case-description">{caseItem.description}</p>
                
                <div className="case-features">
                  {caseItem.features.map((feature, idx) => (
                    <span key={idx} className="case-feature-tag">{feature}</span>
                  ))}
                </div>
                
                <div className="case-technologies">
                  {caseItem.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <ProjectModal 
        isOpen={selectedCase !== null} 
        onClose={() => setSelectedCase(null)}
        project={selectedCase}
      />
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-title">Let's Build Something Amazing</h2>
          <p className="contact-subtitle">
            Ready to transform your business with cutting-edge technology?
          </p>
          
          <motion.div 
            className="contact-buttons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a
              href="mailto:hello@nexttech.com"
              className="contact-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✉️ hello@nexttech.com
            </motion.a>
            <motion.a
              href="https://t.me/whatdeucalion"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📱 Telegram for contact
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Main App
function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Cases />
      <Contact />
    </div>
  );
}

export default App;
