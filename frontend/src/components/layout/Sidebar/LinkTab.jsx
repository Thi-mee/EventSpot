import { NavLink } from 'react-router-dom'
import style from '../Layout.module.css'

const LinkTab = ({to="/", iconName="home", text="home"}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? style.active : "")}>
        <span className="material-symbols-outlined">{iconName}</span>
        {text}
      </NavLink>
    </li>
  );
}

export default LinkTab