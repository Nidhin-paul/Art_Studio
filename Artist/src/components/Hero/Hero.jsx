import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 4, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="hero" id="hero">
      <motion.div 
        className="hero__inner"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.span variants={itemVariants} className="section-label hero__badge" id="hero-badge">
          Sponsored Live
        </motion.span>
        
        <motion.h1 variants={itemVariants} className="hero__heading" id="hero-heading">
          Capturing the Essence<br />of Motion and Light.
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero__subtext" id="hero-subtext">
          A curatorial exploration of form, texture, and the transient moments of<br />
          existence through fine art.
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          className="hero__scroll-hint" 
          aria-hidden="true"
        >
          <div className="hero__scroll-line"></div>
          <svg className="hero__scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
