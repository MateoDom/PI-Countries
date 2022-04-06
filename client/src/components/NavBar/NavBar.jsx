import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className={styles.nav_container}>
        <div className={styles.nav_home}>
          <Link to="/" className={styles.nav_home}><h3>H<span>o</span>m<span>e</span></h3></Link>
        </div>
          {// If we are in home, show SearchBar else show nothing
          window.location.pathname === "/paises" ? <div className={styles.nav_searchbar}>
          <SearchBar className={styles.nav_searchbar} />
        </div>
        : null}


        
        <div className={styles.nav_text}>
          <Link to="/paises" className={styles.nav_home}><h3>P<span>a</span>i<span>s</span>e<span>s</span></h3></Link>
          <Link to="/actividades" className={styles.nav_home}><h3>C<span>r</span>e<span>a</span>r A<span>c</span>t<span>i</span>v<span>i</span>d<span>a</span>d</h3>  </Link> 
        </div>
        
      </nav>
    </div>
  );
}

export default NavBar;
