import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Booking, Car } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-hot-toast';
import {
  Calendar,
  Car as CarIcon,
  CreditCard,
  User,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Camera,
  Edit,
  Save,
  X
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name,
        phone: profile.phone,
      });
    }
  }, [profile]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          car:cars(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          phone: editForm.phone,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast.success('Profil mis à jour avec succès !');
      setIsEditing(false);
      // Refresh the page to get updated profile
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner une image à uploader.');
      }

      const file = event.target.files[0];

      // Vérifier la taille du fichier (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('Le fichier est trop volumineux. Taille maximum : 2MB');
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        throw new Error('Veuillez sélectionner un fichier image valide.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Créer le bucket s'il n'existe pas
      const { data: buckets } = await supabase.storage.listBuckets();
      const avatarBucket = buckets?.find(bucket => bucket.name === 'avatars');

      if (!avatarBucket) {
        const { error: bucketError } = await supabase.storage.createBucket('avatars', {
          public: true,
          allowedMimeTypes: ['image/*'],
          fileSizeLimit: 2097152 // 2MB
        });

        if (bucketError) {
          console.error('Error creating bucket:', bucketError);
          throw new Error('Erreur lors de la création du stockage');
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Erreur lors de l\'upload de l\'image');
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: data.publicUrl,
        })
        .eq('id', user?.id);

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error('Erreur lors de la mise à jour du profil');
      }

      toast.success('Photo de profil mise à jour !');

      // Attendre un peu avant de recharger pour que l'image soit disponible
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error: any) {
      console.error('Avatar upload error:', error);
      toast.error(error.message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'cancelled':
        return 'Annulée';
      case 'completed':
        return 'Terminée';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Mon Tableau de Bord</h1>
            <p className="text-gray-600">Gérez vos réservations et votre profil</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Mon Profil</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gold-600 hover:text-gold-700"
                    >
                      <Edit size={20} />
                    </button>
                  )}
                </div>

                {/* Avatar Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                        onError={(e) => {
                          // Si l'image ne charge pas, afficher l'avatar par défaut
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}

                    <div className={`w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center ${profile?.avatar_url ? 'hidden' : ''}`}>
                      <User size={32} className="text-white" />
                    </div>

                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50">
                      <Camera size={16} className="text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {uploading && (
                    <p className="text-sm text-gray-500 mt-2">Upload en cours...</p>
                  )}
                </div>

                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          value={editForm.full_name}
                          onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={handleProfileUpdate}
                          className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
                        >
                          <Save size={16} className="mr-2" />
                          Sauvegarder
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
                        >
                          <X size={16} className="mr-2" />
                          Annuler
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{profile?.full_name}</p>
                          <p className="text-sm text-gray-600">Nom complet</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{profile?.email}</p>
                          <p className="text-sm text-gray-600">Email</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{profile?.phone || 'Non renseigné'}</p>
                          <p className="text-sm text-gray-600">Téléphone</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Statistiques</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total réservations:</span>
                    <span className="font-bold">{bookings.length}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Réservations actives:</span>
                    <span className="font-bold text-green-600">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Total dépensé:</span>
                    <span className="font-bold text-gold-600">
                      {bookings.reduce((sum, booking) => sum + booking.total_amount, 0)}€
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bookings Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Mes Réservations</h2>

                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <CarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucune réservation
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Vous n'avez pas encore effectué de réservation.
                    </p>
                    <a
                      href="/cars"
                      className="inline-flex items-center px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Découvrir nos véhicules
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            {booking.car && (
                              <img
                                src={booking.car.image_url}
                                alt={`${booking.car.brand} ${booking.car.name}`}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            )}

                            <div className="flex-1">
                              <h4 className="font-bold text-lg">
                                {booking.car?.brand} {booking.car?.name}
                              </h4>

                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {format(new Date(booking.start_date), 'dd MMM yyyy', { locale: fr })} -
                                    {format(new Date(booking.end_date), 'dd MMM yyyy', { locale: fr })}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-1">
                                  <CreditCard className="h-4 w-4" />
                                  <span>{booking.total_amount}€</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(booking.status)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {getStatusText(booking.status)}
                              </span>
                            </div>

                            <p className="text-xs text-gray-500">
                              Créée le {format(new Date(booking.created_at), 'dd/MM/yyyy', { locale: fr })}
                            </p>
                          </div>
                        </div>

                        {booking.status === 'pending' && (
                          <div className="mt-4 flex space-x-2">
                            <button className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm rounded-md transition-colors">
                              Annuler
                            </button>
                            <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm rounded-md transition-colors">
                              Modifier
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;