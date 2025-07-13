import { NavLink, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './MainNav.module.css';

export default function MainNav() {
  const user = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.authorities?.some(auth => auth.name === 'ROLE_ADMIN');

  function toggleMenu() {
    setIsOpen(prev => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeMenu();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function renderNavLink(to, label) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.activeLink : ''}`
        }
        onClick={closeMenu}
      >
        {label}
      </NavLink>
    );
  }

  return (
    <>
      <button onClick={toggleMenu} className={styles.hamburger} aria-label="Toggle menu">
        ☰
      </button>

      {isOpen && <div className={styles.navOverlay} onClick={closeMenu}></div>}

      <nav className={`${styles.navContainer} ${isOpen ? styles.open : ''}`}>
        {renderNavLink("/", "Home")}
        {user && renderNavLink("/mood", "Log Mood")}
        {user && renderNavLink("/history", "Mood History")}
        {user && renderNavLink("/stats", "Mood Stats")}
        {user && renderNavLink("/userProfile", "Profile")}
        {isAdmin && renderNavLink("/admin", "Admin Panel")}
        {user ? (
          renderNavLink("/logout", "Logout")
        ) : (
          <>
            {renderNavLink("/login", "Login")}
            {renderNavLink("/register", "Register")}
          </>
        )}
      </nav>
    </>
  );
}
