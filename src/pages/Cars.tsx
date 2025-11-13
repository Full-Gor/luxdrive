import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Car } from '../types/index';
import CarCard from '../components/CarCard';
import Navbar from '../components/Navbar';
import { Filter, Search } from 'lucide-react';
import { initializeCars, getCars } from '../data/mockCars';

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    fetchCars();
  }, [searchParams]);

  const fetchCars = async () => {
    try {
      console.log('🚗 Loading cars from localStorage...');

      // Initialiser les voitures si nécessaire
      initializeCars();

      // Récupérer les voitures
      const data = getCars();

      console.log('✅ Cars loaded successfully:', data.length);
      setCars(data);
    } catch (error) {
      console.error('💥 Error in fetchCars:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log('🔍 Filtered cars:', filteredCars.length, 'from total:', cars.length);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des véhicules...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Collection</h1>
            <p className="text-xl text-gray-600">Découvrez nos véhicules de luxe disponibles à la location</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une voiture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="standard">Standard</option>
                  <option value="electric">Électrique</option>
                  <option value="used">Occasion</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h3 className="font-bold text-blue-800 mb-2">Debug Info:</h3>
              <p className="text-blue-700">Total cars: {cars.length}</p>
              <p className="text-blue-700">Filtered cars: {filteredCars.length}</p>
              <p className="text-blue-700">Selected category: {selectedCategory}</p>
              <p className="text-blue-700">Search term: "{searchTerm}"</p>
            </div>
          )}

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Aucun véhicule trouvé</h3>
                <p className="text-yellow-700 mb-4">
                  Il semble qu'il y ait un problème de connexion à la base de données.
                </p>
                <button 
                  onClick={fetchCars}
                  className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-600">Aucun véhicule trouvé pour vos critères de recherche.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;