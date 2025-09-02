import React, { useState } from 'react';
import { api } from '../lib/api';

interface ToolbarProps {
  isOffline: boolean;
  favoritesCount: number;
  onShowFavorites: () => void;
  onShowHistory: () => void;
}

export function Toolbar({
  isOffline,
  favoritesCount,
  onShowFavorites,
  onShowHistory
}: ToolbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 relative">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo e Status */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">rCnpj</h1>
          
          <div className="hidden sm:flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500' : 'bg-green-500'}`} />
            <span className={`text-sm ${isOffline ? 'text-red-600' : 'text-green-600'}`}>
              {isOffline ? 'Offline (mock)' : 'Online'}
            </span>
          </div>
        </div>

        {/* Status Mobile */}
        <div className="sm:hidden flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500' : 'bg-green-500'}`} />
          <span className={`text-xs ${isOffline ? 'text-red-600' : 'text-green-600'}`}>
            {isOffline ? 'Offline' : 'Online'}
          </span>
        </div>
        
        {/* Botões Desktop */}
        <div className="hidden lg:flex items-center space-x-2">
          <button
            onClick={onShowFavorites}
            className="rounded-xl px-3 py-2 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition text-sm font-medium"
          >
            Favoritos ({favoritesCount})
          </button>
          
          <button
            onClick={onShowHistory}
            className="rounded-xl px-3 py-2 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition text-sm font-medium"
          >
            Histórico
          </button>
        </div>

        {/* Botões Mobile - Favoritos sempre visível */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={onShowFavorites}
            className="rounded-xl px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition text-sm font-medium"
          >
            ❤️ {favoritesCount}
          </button>
          
          <button
            onClick={toggleMenu}
            className="rounded-xl p-2 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <>
          {/* Overlay para fechar o menu */}
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={closeMenu}
          />
          
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-4xl mx-auto px-4 py-3 space-y-2">
              <button
                onClick={() => { onShowHistory(); closeMenu(); }}
                className="w-full rounded-xl px-4 py-3 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition text-sm font-medium text-left flex items-center space-x-3"
              >
                <span className="text-lg">📋</span>
                <span>Histórico</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
