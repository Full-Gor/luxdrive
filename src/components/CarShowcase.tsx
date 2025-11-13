import React, { useEffect, useRef } from 'react';
import { useCarRental } from '../context/CarRentalContext';
import { useInView } from '../hooks/useInView';
import { toast } from 'react-hot-toast';

const CarShowcase: React.FC = () => {
  const { cars, openModal } = useCarRental();

  const handleTryOut = (car: any) => {
    toast.success(`Essai gratuit demandé pour ${car.brand} ${car.name} ! Nous vous contacterons bientôt.`, {
      duration: 4000,
      icon: '🚗',
    });
  };

  return (
    <section id="models" className="py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Notre Collection de Véhicules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onRequestOffer={() => openModal(car)}
              onTryOut={() => handleTryOut(car)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CarCard: React.FC<{
  car: any;
  onRequestOffer: () => void;
  onTryOut: () => void;
}> = ({ car, onRequestOffer, onTryOut }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.3 });

  return (
    <div
      ref={cardRef}
      className={`group perspective rounded-xl overflow-hidden shadow-lg transition-all duration-1000 h-[400px] ${
        isInView ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'
      }`}
    >
      <div className="preserve-3d relative w-full h-full transition-transform duration-700 group-hover:rotate-y-180">
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 bg-white p-6 flex flex-col backface-hidden rotate-y-180 shadow-lg">
          <h3 className="text-2xl font-bold mb-2">{car.brand} {car.name}</h3>
          <p className="text-gray-500 mb-4">Émissions: {car.pollutionQuota}</p>
          <p className="text-sm text-gray-700 flex-grow mb-4">{car.description}</p>
          <div className="text-gold-600 text-xl font-bold mb-4">
            {car.pricePerMonth}€ / mois
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onTryOut}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium transition-colors"
            >
              Essayer
            </button>
            <button
              onClick={onRequestOffer}
              className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              Demander une offre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarShowcase;
