import style from '../LandingPage.module.css'

const Benefits = () => {
  return (
    <section className={style.section}>
      <h2>Benefits</h2>
      <ul className={style.benefits}>
        <li className={style.benefit}>
          <h3>Save Time</h3>
          <p>Our platform streamlines the event planning process, saving you time and effort.</p>
        </li>
        <li className={style.benefit}>
          <h3>Save Money</h3>
          <p>Our platform is free to use. We only charge a small fee for paid events.</p>
        </li>
        <li className={style.benefit}>
          <h3>Reach More People</h3>
          <p>Our platform allows you to reach a wider audience and attract more attendees.</p>
        </li>
        <li className={style.benefit}>
          <h3>Get Valuable Insights</h3>
          <p>Our platform provides you with real-time analytics and insights to help you make data-driven decisions.</p>
        </li>
      </ul>
    </section>
  )
}

export default Benefits