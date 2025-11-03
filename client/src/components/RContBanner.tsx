import React from 'react';

export function RContBanner() {
  return (
    <a 
      href="https://www.rcont.org" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-blue-900 truncate">
              💼 Precisa abrir sua empresa?
            </p>
            <p className="text-xs text-blue-700 mt-0.5 hidden sm:block">
              Fale com um contador especializado da <strong className="text-blue-800">RCont</strong>
            </p>
            <p className="text-xs text-blue-700 mt-0.5 sm:hidden">
              Fale com a <strong className="text-blue-800">RCont</strong>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0">
          <span className="text-xs font-medium hidden md:inline">Saiba mais</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

