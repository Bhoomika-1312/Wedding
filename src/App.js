import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaImages, FaHome, FaBookOpen, FaCalendar, FaHourglassHalf, FaBars, FaTimes } from 'react-icons/fa';
import { weddingConfig } from './config';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date(weddingConfig.weddingDate);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { events, galleryImages, story } = weddingConfig;

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'story', label: 'Our Story', icon: <FaBookOpen /> },
    { id: 'events', label: 'Events', icon: <FaCalendar /> },
    { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
    { id: 'countdown', label: 'Countdown', icon: <FaHourglassHalf /> }
  ];

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaHeart className="heart-icon" />
            <span>{weddingConfig.couple.nickname}</span>
          </motion.div>
          
          {/* Desktop Menu */}
          <ul className="nav-menu desktop-menu">
            {navItems.map((item) => (
              <motion.li 
                key={item.id}
                className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  className="nav-link"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="mobile-nav-menu">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.id}
                    className={`mobile-nav-item ${currentSection === item.id ? 'active' : ''}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      className="mobile-nav-link"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              {weddingConfig.couple.groom} weds {weddingConfig.couple.bride}
              <FaHeart className="title-heart" />
            </h1>
            <p className="hero-subtitle">Join us in celebrating our love story</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="floating-couple"
          >
            <div className="couple-illustration">
              <div className="person person-1"></div>
              <div className="person person-2"></div>
              <div className="hearts">
                <FaHeart />
                <FaHeart />
                <FaHeart />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="countdown-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="countdown-container"
        >
          <h2>Counting Down to Our Special Day</h2>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
          <p className="wedding-date">{weddingConfig.weddingDateDisplay}</p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="story-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="story-container"
        >
          <h2>Our Love Story</h2>
          <div className="story-content">
            <div className="story-text">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="story-illustration">
              <div className="story-hearts">
                <FaHeart />
                <FaHeart />
                <FaHeart />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="events-container"
        >
          <h2>Wedding Events</h2>
          <div className="events-grid">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="event-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="event-header">
                  <FaCalendarAlt className="event-icon" />
                  <h3>{event.event}</h3>
                </div>
                <div className="event-details">
                  <div className="event-info">
                    <FaClock className="info-icon" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="event-info">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="gallery-container"
        >
          <h2>Our Memories</h2>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={image} alt={`Memory ${index + 1}`} />
                <div className="gallery-overlay">
                  <FaImages className="gallery-icon" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-hearts">
            <FaHeart />
            <FaHeart />
            <FaHeart />
          </div>
          <p>{weddingConfig.couple.groom} & {weddingConfig.couple.bride}</p>
          <p>February 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
