export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center mb-4 group">
              <div className="relative">
                <span className="text-[1.7rem] font-extrabold tracking-tight bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent font-sans" style={{ letterSpacing: '-0.02em' }}>
                  LET
                </span>
                <span className="text-[1.7rem] font-light tracking-widest bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent font-sans pl-[0.1em]" style={{ letterSpacing: '0.15em' }}>
                  ORA
                </span>
                <div className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 group-hover:scale-125 transition-transform duration-300 animate-pulse" />
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transform group-hover:translate-y-1 transition-all duration-300" />
                <div className="absolute inset-0 bg-blue-400/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" style={{ mixBlendMode: 'overlay' }} />
              </div>
            </div>
            <p className="text-gray-400">
              Providing secure, long-term lease solutions for landlords.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              {/* LinkedIn button hidden for now */}
              {/* <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a> */}
              <a
                href="https://x.com/LetoraOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <a href="/terms" className="block text-gray-400 hover:text-primary transition-colors duration-300">
                Terms & Conditions
              </a>
              <a href="/privacy" className="block text-gray-400 hover:text-primary transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-700">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Letora. All rights reserved.
          </p>
          {/* Company Legal Details */}
          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p className="font-medium">LETORA LIMITED</p>
            <p>Company Registration No: 14829162</p>
            <p>71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</p>
            <p>Registered in England and Wales</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 