import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Car } from '../types';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Fuel, 
  Gauge, 
  Shield,
  Star,
  Heart
} from 'lucide-react';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCar(id);
    }
  }, [id]);

  const fetchCar = async (carId: string) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single();

      if (error) throw error;
      setCar(data);
    } catch (error) {
      console.error('Error fetching car:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${car?.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Véhicule non trouvé</h1>
            <Link to="/cars" className="text-gold-500 hover:text-gold-600">
              Retour au catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/cars"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour au catalogue
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Car Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img
                src={car.image_url}
                alt={`${car.brand} ${car.name}`}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  size={24}
                  className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
                />
              </button>
            </motion.div>

            {/* Car Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-2">{car.brand} {car.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    car.category === 'electric' 
                      ? 'bg-green-100 text-green-800'
                      : car.category === 'used'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {car.category === 'electric' ? 'Électrique' : 
                     car.category === 'used' ? 'Occasion' : 'Standard'}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-gold-500 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600">(4.8)</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gold-600 mb-6">
                  {car.price_per_month}€ / mois
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Fuel className="h-6 w-6 text-gold-500" />
                  <div>
                    <p className="font-medium">Émissions</p>
                    <p className="text-sm text-gray-600">{car.pollution_quota}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Users className="h-6 w-6 text-gold-500" />
                  <div>
                    <p className="font-medium">Passagers</p>
                    <p className="text-sm text-gray-600">5 places</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Gauge className="h-6 w-6 text-gold-500" />
                  <div>
                    <p className="font-medium">Transmission</p>
                    <p className="text-sm text-gray-600">Automatique</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Shield className="h-6 w-6 text-gold-500" />
                  <div>
                    <p className="font-medium">Assurance</p>
                    <p className="text-sm text-gray-600">Tous risques</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>

              {/* Booking Section */}
              <div className="bg-white p-6 rounded-lg border-2 border-gold-200">
                <h3 className="text-xl font-bold mb-4">Réserver ce véhicule</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Calendar size={20} />
                    <span>Disponible immédiatement</span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleBooking}
                      className="flex-1 bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      {user ? 'Réserver maintenant' : 'Se connecter pour réserver'}
                    </button>
                    
                    <button className="px-6 py-3 border border-gold-500 text-gold-500 hover:bg-gold-50 rounded-lg transition-colors">
                      Essai gratuit
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 text-center">
                    Annulation gratuite jusqu'à 48h avant la prise en charge
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-bold mb-3">Inclus dans la location</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Assurance tous risques</li>
                <li>• Assistance 24h/24</li>
                <li>• Kilométrage illimité</li>
                <li>• Carburant inclus</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-bold mb-3">Conditions</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Âge minimum : 25 ans</li>
                <li>• Permis depuis 3 ans</li>
                <li>• Caution : 2000€</li>
                <li>• Pièce d'identité requise</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-bold mb-3">Services optionnels</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Livraison à domicile (+50€)</li>
                <li>• Chauffeur privé (+200€/jour)</li>
                <li>• GPS premium (+10€/jour)</li>
                <li>• Siège bébé (+15€/jour)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;