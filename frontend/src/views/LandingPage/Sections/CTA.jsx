import { Link } from 'react-router-dom';
import style from '../LandingPage.module.css'

const CTA = () => {

  return (
    <div className={style.cta}>
      <p>Get started today and take your events to the next level.</p>
      <Link to="/register" className={style.ctab}>Get Started</Link>
    </div>
  );
}

export default CTA