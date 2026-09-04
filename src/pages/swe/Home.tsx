import { motion, easeOut } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaArrowUpRightFromSquare, FaRegEnvelope } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import projects from '../../data/projects.json'
import './Home.css'

export default function Home() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/PW486',
      icon: <FaGithub size={20} />
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/PW486',
      icon: <FaLinkedinIn size={20} />
    },
    {
      name: 'Email',
      url: 'mailto:ooqwe486@gmail.com',
      icon: <FaRegEnvelope size={20} />
    }
  ]

  const linkItems = projects as {
    name: string
    url: string
    image: string
    label: string
  }[]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 0
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: easeOut }
    }
  }

  return (
    <div className="container">
      <motion.nav
        className="top-nav"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            {link.icon}
          </a>
        ))}
      </motion.nav>

      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/travel" className="hero-header hero-header-link" aria-label="Go to travel page" draggable={false} onDragStart={(e) => e.preventDefault()}>
          <motion.div
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <img src="/profile.jpg" alt="Donggeon Lim" draggable={false} onDragStart={(e) => e.preventDefault()} />
          </motion.div>
          <div className="hero-text">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              Donggeon Lim
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Software Engineer
            </motion.p>
          </div>
        </Link>
      </motion.section>

      <section className="links-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="link-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {linkItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="og-card"
              variants={itemVariants}
            >
              <div className="og-image-container">
                <img src={item.image} alt={item.name} className="og-image" loading="lazy" decoding="async" />
              </div>
              <div className="og-content">
                <div className="og-title">{item.name}</div>
                <div className="og-description">{item.label}</div>
                <div className="og-cta">
                  Visit <FaArrowUpRightFromSquare size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Donggeon Lim · PW486</p>
      </footer>
    </div>
  )
}
