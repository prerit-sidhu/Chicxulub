import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-prehistoric-900 text-prehistoric-100 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-jurassic mb-2">CHICXULUB</h3>
            <p className="text-sm opacity-70">From extinction... to evolution.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://t.me/chicxulub" className="hover:text-lava-500 transition-colors">
              <span className="sr-only">Telegram</span>
              <i className="fab fa-telegram"></i>
            </a>
            <a href="https://twitter.com/chicxulub_ton" className="hover:text-lava-500 transition-colors">
              <span className="sr-only">Twitter</span>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com/chicxulub-project" className="hover:text-lava-500 transition-colors">
              <span className="sr-only">GitHub</span>
              <i className="fab fa-github"></i>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm opacity-70">
            &copy; {new Date().getFullYear()} Chicxulub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;