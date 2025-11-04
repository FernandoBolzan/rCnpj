import React from 'react';
import { getBrandConfig } from '../config/brand';

export function Footer() {
  const brand = getBrandConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {brand.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Consulta de CNPJ e CNAE de forma rápida, gratuita e completa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              Links Rápidos
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Consulta CNPJ
                </a>
              </li>
              <li>
                <a 
                  href="/" 
                  className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Consulta CNAE
                </a>
              </li>
              <li>
                <a 
                  href={brand.website}
                  className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {brand.name} Website
                </a>
              </li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              Informações
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2">
              Dados atualizados da Receita Federal do Brasil.
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Sistema gratuito e sem limite de consultas.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mb-4"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-600">
              © {currentYear} {brand.name}. Todos os direitos reservados.
            </p>
          </div>

          {/* Made by GreenHub.buzz */}
          <div className="flex items-center gap-2">
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

        {/* Extra Info for Mobile */}
        <div className="mt-4 pt-4 border-t border-gray-200 sm:hidden">
          <p className="text-center text-xs text-gray-500">
            Consultas ilimitadas • Dados oficiais • Gratuito
          </p>
        </div>
      </div>
    </footer>
  );
}

