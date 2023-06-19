import React from 'react'
import styles from '../LandingPage.module.css'

const Hero = () => {
  return (
    <header className={styles.hero}>
      <p className={styles.introText}>Manage your Event reservations seamlessly</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Exercitationem, debitis non optio praesentium voluptate quibusdam ipsum
        nostrum nemo voluptatibus assumenda sit dolor quidem tempore aut dolores
        sed, qui officia libero!
      </p>
      {/* <img
        src="/assets/illustrations/Womancrossingoffdaystilldeadline.png"
        alt=""
        className={styles.heroImage}
        width={350}
      /> */}
    </header>
  );
}

export default Hero