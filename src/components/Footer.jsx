import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 pb-8 border-b border-slate-800">
          {/* Column 1: Brand / Description (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <span className="text-xl font-bold text-white tracking-wide">
              BRAND<span className="text-indigo-500">NAME</span>
            </span>
            <p className="mt-4 text-sm text-slate-400 max-w-md">
              Building next-generation web applications with modern design systems. Making the web beautiful, one pixel
              at a time.
            </p>
            {/* Social Media Placeholder Icons */}
            <div className="mt-6 flex space-x-4">
              {['Facebook', 'Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors duration-200 text-xs font-semibold"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Solutions Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Solutions</h3>
            <ul className="mt-4 space-y-2">
              {['Analytics', 'Marketing', 'Commerce', 'Insights'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              {['Pricing', 'Documentation', 'Guides', 'API Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal Links */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-400">&copy; {currentYear} BrandName Inc. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
