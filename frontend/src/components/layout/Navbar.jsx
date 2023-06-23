import { memo, useEffect, useRef, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import styles from "./Layout.module.css";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  const { client, isLoading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownGroupRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    // close dropdown when clicked outside
    const closeDropdown = (e) => {
      if (!dropdownGroupRef?.current?.contains(e.target) && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [dropdownOpen]);
  return (
    <header className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>{title ? <h1>EventSpot</h1> : null}</div>
        <nav className={styles.nav}>
          {!isLoading && (
            <ul>
              {!client && (
                <>
                  <li>
                    <Link to="/login" className="ctab">
                      Login as user
                    </Link>
                  </li>
                  <li>
                    <Link to="/login?organizer" className="ctab">
                      Login as an organizer
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="ctab ctab-primary">
                      Get Started
                    </Link>
                  </li>
                </>
              )}
              {client && (
                <>
                  {/* {client.role === "organizer" && (
                  <li>
                    <Link
                      to="/organizer/create-event"
                      className="ctab ctab-primary ctab-sm">
                      Create Event
                    </Link>
                  </li>
                )} */}
                  {window.location.pathname === "/" && (
                    <li>
                      <Link to={`/${client.role}/dashboard`}>Dashboard</Link>
                    </li>
                  )}
                  <li>
                    <span className={styles.greeting}>
                      Hi <span>{client.name}</span>
                    </span>
                  </li>
                  <li>
                    <div className={styles.dropdownCtn} ref={dropdownGroupRef}>
                      <div className={styles.avatar} onClick={toggleDropdown}>
                        {client.avatar && (
                          <img src={client.avatar} alt="avatar" />
                        )}
                        {!client.avatar && (
                          <span
                            className={
                              "material-symbols-outlined " + styles.icon
                            }>
                            account_circle
                          </span>
                        )}
                      </div>

                      {dropdownOpen && (
                        <div className={styles.dropdown}>
                          <ul>
                            <li onClick={() => logout()}>
                              <span className="material-symbols-outlined">
                                Logout
                              </span>
                              Logout
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default memo(Navbar);
