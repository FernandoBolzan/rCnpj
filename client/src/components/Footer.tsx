import React from 'react';
import { getBrandConfig } from '../config/brand';

export function Footer() {
  const brand = getBrandConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Footer Content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Copyright */}
          <div className="text-center sm:text-left order-2 sm:order-1">
            <p className="text-xs sm:text-sm text-gray-600">
              © {currentYear} {brand.name}. Todos os direitos reservados.
            </p>
          </div>

          {/* Made by GreenHub.buzz */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <span className="text-xs sm:text-sm text-gray-500">Desenvolvido por</span>
            <a 
              href="https://greenhub.buzz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">🌿</span>
              <span className="text-xs sm:text-sm font-semibold text-green-700">
                GreenHub.buzz
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

