import React from 'react';
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";

const Layout = ({ children, theme, toggleTheme, sideNavOpen, setSideNavOpen }) => {
  const isLight = theme === 'light';

  return (
    <div
      className="relative min-h-screen flex flex-col text-foreground overflow-x-hidden transition-colors duration-500"
      style={{
        backgroundColor: isLight ? 'hsl(210, 40%, 99%)' : 'hsl(255, 47%, 14%)',
        backgroundImage: isLight
          ? 'radial-gradient(ellipse at 10% 10%, hsla(160, 100%, 94%, 0.5), transparent), radial-gradient(ellipse at 90% 90%, hsla(200, 100%, 94%, 0.5), transparent)'
          : 'radial-gradient(ellipse at 10% 10%, hsla(210, 96%, 20%, 0.08), transparent), radial-gradient(ellipse at 90% 90%, hsla(210, 96%, 20%, 0.08), transparent), radial-gradient(ellipse at 10% 90%, hsla(280, 90%, 18%, 0.05), transparent), radial-gradient(ellipse at 90% 10%, hsla(280, 90%, 18%, 0.05), transparent)',
      }}
    >
      <Header
        toggleTheme={toggleTheme}
        currentTheme={theme}
        onHamburgerClick={() => setSideNavOpen(true)}
      />
      <SideNav open={sideNavOpen} onClose={() => setSideNavOpen(false)} />
      
      <main className="grow pt-20 outline-none" tabIndex={-1}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default React.memo(Layout);