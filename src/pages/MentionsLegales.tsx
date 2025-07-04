import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MentionsLegales: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Mentions Légales</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Informations légales</h2>
              <p className="mb-4">
                Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, 
                dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Éditeur du site</h3>
              <p className="mb-4">
                <strong>LuxDrive SARL</strong><br />
                Société à responsabilité limitée au capital de 50 000 euros<br />
                Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France<br />
                RCS Paris : 123 456 789<br />
                SIRET : 123 456 789 00012<br />
                Code APE : 7711A (Location de courte durée de voitures et de véhicules automobiles légers)<br />
                TVA intracommunautaire : FR12 123456789
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Directeur de la publication</h3>
              <p className="mb-4">
                Monsieur Jean-Pierre MARTIN, Gérant de la société LuxDrive SARL<br />
                Adresse : 123 Avenue des Champs-Élysées, 75008 Paris, France<br />
                Téléphone : +33 1 23 45 67 89<br />
                Email : contact@luxdrive.com
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Hébergement</h2>
              <p className="mb-4">
                Le site internet LuxDrive est hébergé par :<br />
                <strong>OVH SAS</strong><br />
                2 rue Kellermann, 59100 Roubaix, France<br />
                Téléphone : +33 8 99 70 17 61<br />
                Site web : www.ovh.com
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="mb-4">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Responsabilité</h2>
              <p className="mb-4">
                Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, 
                mais peut toutefois contenir des inexactitudes ou des omissions.
              </p>
              <p className="mb-4">
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, 
                à l'adresse contact@luxdrive.com, en décrivant le problème de la manière la plus précise possible.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Liens hypertextes</h2>
              <p className="mb-4">
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet 
                ne sauraient engager la responsabilité de LuxDrive.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Collecte et traitement de données</h2>
              <p className="mb-4">
                Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles.
              </p>
              <p className="mb-4">
                Ces droits peuvent être exercés en nous contactant à l'adresse : contact@luxdrive.com ou par courrier postal à l'adresse du siège social.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Droit applicable</h2>
              <p className="mb-4">
                Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, 
                quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable, 
                les tribunaux français seront seuls compétents pour connaître de ce litige.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Contact</h2>
              <p className="mb-4">
                Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :<br />
                Par email : contact@luxdrive.com<br />
                Par téléphone : +33 1 23 45 67 89<br />
                Par courrier : LuxDrive SARL, 123 Avenue des Champs-Élysées, 75008 Paris, France
              </p>
              
              <p className="text-sm text-gray-600 mt-8">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentionsLegales;