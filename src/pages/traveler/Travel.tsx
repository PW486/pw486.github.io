import { useEffect } from 'react'
import { motion, easeOut } from 'framer-motion'
import { FaInstagram, FaRegEnvelope } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import './Travel.css'

import journeyData from '../../data/journey.json'

type TravelEntry = {
  flag: string
  city: string
  country: string
  gallery?: string[]
}

const travelEntries = [...(journeyData as TravelEntry[])].reverse()

export default function Travel() {
  useEffect(() => {
    document.documentElement.classList.add('travel-html')
    document.body.classList.add('travel-body')
    window.scrollTo(0, 0)
    const favLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
      )
    )
    const originalHrefs = favLinks.map((l) => l.href)
    favLinks.forEach((l) => {
      if (l.rel === 'icon') l.href = '/traveler/favicon.png'
      if (l.rel === 'shortcut icon') l.href = '/traveler/favicon.ico'
      if (l.rel === 'apple-touch-icon') l.href = '/traveler/profile.jpg'
    })

    const manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')
    const originalManifest = manifestLink?.href
    if (manifestLink) manifestLink.href = '/traveler/site.webmanifest'

    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]')
    const twitterImage = document.querySelector<HTMLMetaElement>('meta[property="twitter:image"]')
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[property="twitter:title"]')
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    const twitterDesc = document.querySelector<HTMLMetaElement>('meta[property="twitter:description"]')
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]')

    const originalOgImage = ogImage?.content
    const originalTwitterImage = twitterImage?.content
    const originalOgUrl = ogUrl?.content
    const originalOgTitle = ogTitle?.content
    const originalTwitterTitle = twitterTitle?.content
    const originalOgDesc = ogDesc?.content
    const originalTwitterDesc = twitterDesc?.content
    const originalDesc = desc?.content

    if (ogImage) ogImage.content = 'https://pw486.github.io/traveler/og-image.jpg'
    if (twitterImage) twitterImage.content = 'https://pw486.github.io/traveler/og-image.jpg'
    if (ogUrl) ogUrl.content = 'https://pw486.github.io/travel'
    if (ogDesc) ogDesc.content = 'Traveler'
    if (twitterDesc) twitterDesc.content = 'Traveler'
    if (desc) desc.content = 'Traveler'
    let themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    const hadTheme = !!themeMeta
    const originalTheme = themeMeta?.content
    if (!themeMeta) {
      themeMeta = document.createElement('meta')
      themeMeta.name = 'theme-color'
      document.head.appendChild(themeMeta)
    }
    themeMeta.content = '#120c05'

    return () => {
      document.documentElement.classList.remove('travel-html')
      document.body.classList.remove('travel-body')
      favLinks.forEach((l, i) => (l.href = originalHrefs[i]))
      if (manifestLink && originalManifest) manifestLink.href = originalManifest
      if (ogImage && originalOgImage) ogImage.content = originalOgImage
      if (twitterImage && originalTwitterImage) twitterImage.content = originalTwitterImage
      if (ogUrl && originalOgUrl) ogUrl.content = originalOgUrl
      if (ogTitle && originalOgTitle) ogTitle.content = originalOgTitle
      if (twitterTitle && originalTwitterTitle) twitterTitle.content = originalTwitterTitle
      if (ogDesc && originalOgDesc) ogDesc.content = originalOgDesc
      if (twitterDesc && originalTwitterDesc) twitterDesc.content = originalTwitterDesc
      if (desc && originalDesc) desc.content = originalDesc
      if (hadTheme && originalTheme) themeMeta!.content = originalTheme
      else themeMeta?.remove()
    }
  }, [])

  const total = travelEntries.length
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: easeOut }
    }
  }

  return (
    <div className="travel-root">
      <div className="travel-container">
        <motion.nav
          className="travel-top-nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://instagram.com/lim.deep"
            target="_blank"
            rel="noopener noreferrer"
            className="travel-social-link"
            aria-label="Instagram"
            title="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="mailto:ooqwe486@gmail.com"
            className="travel-social-link"
            aria-label="Email"
            title="Email"
          >
            <FaRegEnvelope size={20} />
          </a>
        </motion.nav>

        <motion.section
          className="travel-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/" className="travel-hero-header travel-hero-header-link" aria-label="Go to home page" draggable={false} onDragStart={(e) => e.preventDefault()}>
            <motion.div
              className="travel-avatar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <img src="/traveler/profile.jpg" alt="Donggeon Lim" draggable={false} onDragStart={(e) => e.preventDefault()} />
            </motion.div>
            <div className="travel-hero-text">
              <motion.h1
                className="travel-hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                Donggeon Lim
              </motion.h1>
              <motion.p
                className="travel-hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Traveler
              </motion.p>
            </div>
          </Link>
        </motion.section>

        <section>
          <motion.h2
            className="travel-section-title"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            Journey
          </motion.h2>

          <div className="travel-timeline">
            {travelEntries.map((entry, i) => {
              const order = total - i
              const isRecent = i === 0
              const isSecondRecent = i === 1 || i === 2
              return (
                <motion.div
                  key={`${entry.city}-${entry.country}-${i}`}
                  className={`travel-timeline-item ${isRecent ? 'is-recent' : ''} ${isSecondRecent ? 'is-second' : ''}`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="travel-timeline-dot" aria-hidden />
                  <div className="travel-timeline-card">
                    <div className="travel-card-top">
                      <div className="travel-card-main">
                        <div className="travel-card-city">
                          <span className="flag" aria-hidden>{entry.flag}</span>
                          {entry.city}
                          {isRecent && <span className="travel-badge">Latest</span>}
                        </div>
                        <div className="travel-card-country">{entry.country}</div>
                      </div>
                      <span className={`travel-card-index ${isRecent ? 'recent' : ''}`}>#{order}</span>
                    </div>

                    {entry.gallery && (
                      <div className={`travel-gallery cols-${entry.gallery.length}`}>
                        {entry.gallery.map((src, idx) => (
                          <div key={src + idx} className="travel-gallery-item">
                            <img src={src} alt={`${entry.city} ${idx + 1}`} loading="lazy" decoding="async" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        <footer className="travel-footer">
          <p>© {new Date().getFullYear()} Donggeon Lim · PW486</p>
        </footer>
      </div>
    </div>
  )
}
