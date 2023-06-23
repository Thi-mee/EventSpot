import React from 'react'
import styles from '../LandingPage.module.css'

const Hero = () => {
  return (
    <header className={styles.hero}>
      <p className={styles.introText}>
        Manage your Event reservations seamlessly
      </p>
      <p>
        Our event management platform makes it easy to create, promote, and
        manage events of all sizes. We give you all the tools you need to
        effortlessly create promotional pages, sell tickets, and manage
        registrations.
      </p>
      <img
        src="/assets/illustrations/Womancrossingoffdaystilldeadline.png"
        alt=""
        className={styles.heroImage}
        width={350}
      />
    </header>
  );
}

export default Hero