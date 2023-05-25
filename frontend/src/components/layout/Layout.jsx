import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.AppLayout}>
      <Navbar />
      <Sidebar />
      <main className={styles.AppMain}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
