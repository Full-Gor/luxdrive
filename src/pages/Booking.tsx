import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Car } from '../types';
import { useAuth } from '../hooks/useAuth';
import { format, addDays, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, CreditCard, User, Phone, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';

interface BookingForm {
  startDate: string;
  endDate: string;
  driverLicense: string;
  emergencyContact: string;
  specialRequests?: string;
}

const Booking: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingForm>({
    defaultValues: {
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 7), 'yyyy-MM-dd')
    }
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (carId) {
      fetchCar(carId);
    }
  }, [carId]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const days = differenceInDays(new Date(endDate), new Date(startDate));
      if (days > 0) {
        setRentalDays(days);
        // Calculate monthly rate based on daily rate
        const dailyRate = car.price_per_month / 30;
        setTotalAmount(Math.round(dailyRate * days));
      }
    }
  }, [startDate, endDate, car]);

  const fetchCar = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCar(data);
    } catch (error) {
      console.error('Error fetching car:', error);
      toast.error('Erreur lors du chargement du véhicule');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: BookingForm) => {
    if (!car || !user) return;

    setSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          car_id: car.id,
          start_date: data.startDate,
          end_date: data.endDate,
          total_amount: totalAmount,
          status: 'pending',
          payment_status: 'pending'
        });

      if (error) throw error;

      toast.success('Réservation créée avec succès !');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Erreur lors de la création de la réservation');
    } finally {
      setSubmitting(false);
    }
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
            <button onClick={() => navigate('/cars')} className="text-gold-500 hover:text-gold-600">
              Retour au catalogue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Réserver votre véhicule</h1>
            <p className="text-gray-600">Finalisez votre réservation en quelques étapes</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold mb-6">Informations de réservation</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-2" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={profile?.full_name || ''}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile?.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Rental Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={16} className="inline mr-2" />
                        Date de début
                      </label>
                      <input
                        type="date"
                        {...register('startDate', { required: 'Date de début requise' })}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={16} className="inline mr-2" />
                        Date de fin
                      </label>
                      <input
                        type="date"
                        {...register('endDate', { required: 'Date de fin requise' })}
                        min={startDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Driver Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de permis de conduire
                      </label>
                      <input
                        type="text"
                        {...register('driverLicense', { required: 'Numéro de permis requis' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Ex: 123456789"
                      />
                      {errors.driverLicense && (
                        <p className="mt-1 text-sm text-red-600">{errors.driverLicense.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Contact d'urgence
                      </label>
                      <input
                        type="tel"
                        {...register('emergencyContact', { required: 'Contact d\'urgence requis' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Ex: +33 6 12 34 56 78"
                      />
                      {errors.emergencyContact && (
                        <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Demandes spéciales (optionnel)
                    </label>
                    <textarea
                      {...register('specialRequests')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="Livraison à domicile, siège bébé, etc."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || rentalDays <= 0}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Création en cours...
                      </div>
                    ) : (
                      'Confirmer la réservation'
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={car.image_url}
                      alt={`${car.brand} ${car.name}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-bold">{car.brand} {car.name}</h4>
                      <p className="text-sm text-gray-600">{car.category}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Prix par mois:</span>
                      <span>{car.price_per_month}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durée:</span>
                      <span>{rentalDays} jour{rentalDays > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prix journalier:</span>
                      <span>{Math.round(car.price_per_month / 30)}€</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-gold-600">{totalAmount}€</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h5 className="font-medium mb-2">Inclus:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Assurance tous risques</li>
                      <li>• Assistance 24h/24</li>
                      <li>• Kilométrage illimité</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CreditCard size={16} />
                    <span>Paiement sécurisé</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;