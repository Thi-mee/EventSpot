import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import { useEffect, useState } from "react";

const TITLE = "EventSpot";


const Layout = ({ sidebar }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (sidebar)
    return (
      <div className={styles.AppLayoutGrid}>
        <Navbar />
        <Sidebar title={TITLE} />
        <main className={styles.AppMain}>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  else
    return (
      <div className={styles.AppLayoutFlex}>
        <Navbar title={TITLE} />
        <main className={styles.AppMain}>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
};

export default Layout;
