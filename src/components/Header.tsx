import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronsDown, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="relative h-screen w-full overflow-hidden">
      {/* Video Background - Nouvelle vidéo supercar */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source 
            src="https://videos.pexels.com/video-files/5309343/5309343-hd_1920_1080_25fps.mp4" 
            type="video/mp4" 
          />
          {/* Fallback videos au cas où la principale ne charge pas */}
          <source 
            src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-6">
        {/* Logo - Titre seulement sans icône */}
        <Link to="/" className="flex items-center">
          <span className="text-white text-xl font-bold">LuxDrive</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 text-white">
          <Link to="/cars" className="hover:text-gold-400 transition-colors duration-300">Modèles</Link>
          <Link to="/cars?category=electric" className="hover:text-gold-400 transition-colors duration-300">Gamme Électrique</Link>
          <Link to="/cars?category=used" className="hover:text-gold-400 transition-colors duration-300">Occasions</Link>
          <Link to="/contact" className="hover:text-gold-400 transition-colors duration-300">Contact</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                to={profile?.role === 'admin' ? '/admin' : '/dashboard'} 
                className="text-white hover:text-gold-400 transition-colors"
              >
                {profile?.role === 'admin' ? 'Admin' : 'Mon Compte'}
              </Link>
              <button 
                onClick={handleSignOut}
                className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-full transition-colors"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="text-white hover:text-gold-400 transition-colors"
              >
                Connexion
              </Link>
              <Link 
                to="/register" 
                className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-full transition-colors"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-sm z-30 p-6"
        >
          <div className="flex flex-col space-y-4 text-white">
            <Link to="/cars" className="hover:text-gold-400 transition-colors">Modèles</Link>
            <Link to="/cars?category=electric" className="hover:text-gold-400 transition-colors">Gamme Électrique</Link>
            <Link to="/cars?category=used" className="hover:text-gold-400 transition-colors">Occasions</Link>
            <Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link>
            {user ? (
              <>
                <Link 
                  to={profile?.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="hover:text-gold-400 transition-colors"
                >
                  {profile?.role === 'admin' ? 'Admin' : 'Mon Compte'}
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-full transition-colors text-left"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gold-400 transition-colors">Connexion</Link>
                <Link to="/register" className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-full transition-colors text-center">Inscription</Link>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Expérience de Conduite Exceptionnelle
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl max-w-3xl mb-8"
        >
          Découvrez notre sélection de véhicules de luxe pour une expérience de conduite inoubliable
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link 
            to="/cars" 
            className="bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Découvrir nos véhicules
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronsDown size={32} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;