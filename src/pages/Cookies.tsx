import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cookies: React.FC = () => {
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
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Politique de Gestion des Cookies</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Qu'est-ce qu'un cookie ?</h2>
              <p className="mb-4">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                lors de la visite d'un site internet. Il permet au site de reconnaître votre navigateur et de mémoriser certaines informations 
                vous concernant, comme vos préférences de navigation ou votre panier d'achat.
              </p>
              <p className="mb-4">
                Les cookies ne peuvent pas endommager votre terminal et ne contiennent pas de virus. 
                Ils facilitent votre navigation et permettent d'améliorer les performances et la sécurité du site.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Pourquoi utilisons-nous des cookies ?</h2>
              <p className="mb-4">
                LuxDrive utilise des cookies pour plusieurs raisons :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Fonctionnement du site :</strong> assurer le bon fonctionnement de nos services</li>
                <li><strong>Amélioration de l'expérience :</strong> personnaliser votre navigation et mémoriser vos préférences</li>
                <li><strong>Analyse d'audience :</strong> comprendre comment vous utilisez notre site pour l'améliorer</li>
                <li><strong>Sécurité :</strong> protéger votre compte et prévenir la fraude</li>
                <li><strong>Marketing :</strong> vous proposer des publicités pertinentes (avec votre consentement)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Types de cookies utilisés</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3.1 Cookies strictement nécessaires</h3>
              <p className="mb-4">
                Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. Ils comprennent :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Cookies de session :</strong> maintiennent votre connexion pendant votre visite</li>
                <li><strong>Cookies de sécurité :</strong> protègent contre les attaques et la fraude</li>
                <li><strong>Cookies de panier :</strong> mémorisent vos sélections de véhicules</li>
                <li><strong>Cookies de préférences :</strong> retiennent vos choix de langue et de région</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3.2 Cookies de performance et d'analyse</h3>
              <p className="mb-4">
                Ces cookies nous aident à comprendre comment vous utilisez notre site pour l'améliorer :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Google Analytics :</strong> mesure l'audience et le comportement des visiteurs</li>
                <li><strong>Hotjar :</strong> analyse les parcours utilisateurs et identifie les points d'amélioration</li>
                <li><strong>Cookies de performance :</strong> mesurent la vitesse de chargement des pages</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3.3 Cookies de fonctionnalité</h3>
              <p className="mb-4">
                Ces cookies améliorent votre expérience en mémorisant vos préférences :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Préférences de navigation :</strong> langue, devise, région</li>
                <li><strong>Historique de recherche :</strong> vos dernières recherches de véhicules</li>
                <li><strong>Favoris :</strong> vos véhicules préférés</li>
                <li><strong>Paramètres d'affichage :</strong> mode sombre/clair, taille de police</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3.4 Cookies publicitaires et de ciblage</h3>
              <p className="mb-4">
                Ces cookies permettent de vous proposer des publicités pertinentes (nécessitent votre consentement) :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Google Ads :</strong> publicités ciblées sur Google et ses partenaires</li>
                <li><strong>Facebook Pixel :</strong> publicités sur les réseaux sociaux</li>
                <li><strong>Cookies de retargeting :</strong> vous proposent des offres basées sur vos visites</li>
                <li><strong>Mesure de conversion :</strong> évaluent l'efficacité de nos campagnes publicitaires</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Durée de conservation</h2>
              <p className="mb-4">
                La durée de conservation des cookies varie selon leur type et leur finalité :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                <li><strong>Cookies de fonctionnalité :</strong> conservés jusqu'à 12 mois</li>
                <li><strong>Cookies d'analyse :</strong> conservés jusqu'à 26 mois (Google Analytics)</li>
                <li><strong>Cookies publicitaires :</strong> conservés jusqu'à 13 mois</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Cookies tiers</h2>
              <p className="mb-4">
                Notre site utilise des services tiers qui peuvent déposer leurs propres cookies :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Google :</strong> Analytics, Ads, Maps, reCAPTCHA</li>
                <li><strong>Facebook :</strong> Pixel, boutons de partage</li>
                <li><strong>YouTube :</strong> lecteur vidéo intégré</li>
                <li><strong>Stripe :</strong> traitement sécurisé des paiements</li>
                <li><strong>Zendesk :</strong> chat de support client</li>
              </ul>
              <p className="mb-4">
                Ces services tiers ont leurs propres politiques de cookies que nous vous invitons à consulter.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Gestion de vos préférences</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">6.1 Bandeau de consentement</h3>
              <p className="mb-4">
                Lors de votre première visite, un bandeau vous informe de l'utilisation de cookies et vous permet de :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Accepter tous les cookies</li>
                <li>Refuser les cookies non essentiels</li>
                <li>Personnaliser vos préférences par catégorie</li>
                <li>Obtenir plus d'informations sur chaque type de cookie</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">6.2 Centre de préférences</h3>
              <p className="mb-4">
                Vous pouvez à tout moment modifier vos préférences en cliquant sur le lien "Gestion des cookies" 
                présent en bas de chaque page de notre site. Vous pourrez :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Activer ou désactiver chaque catégorie de cookies</li>
                <li>Voir la liste détaillée des cookies utilisés</li>
                <li>Comprendre la finalité de chaque cookie</li>
                <li>Gérer les cookies tiers</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">6.3 Paramètres du navigateur</h3>
              <p className="mb-4">
                Vous pouvez également configurer votre navigateur pour gérer les cookies. Voici comment procéder :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                <li><strong>Firefox :</strong> Préférences → Vie privée et sécurité → Cookies</li>
                <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Conséquences du refus des cookies</h2>
              <p className="mb-4">
                Le refus de certains cookies peut affecter votre expérience sur notre site :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Cookies essentiels :</strong> le site peut ne pas fonctionner correctement</li>
                <li><strong>Cookies de fonctionnalité :</strong> perte de vos préférences et personnalisations</li>
                <li><strong>Cookies d'analyse :</strong> nous ne pourrons pas améliorer le site selon vos besoins</li>
                <li><strong>Cookies publicitaires :</strong> publicités moins pertinentes</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Cookies et données personnelles</h2>
              <p className="mb-4">
                Certains cookies peuvent contenir des données personnelles. Dans ce cas, ils sont traités conformément à notre politique de confidentialité 
                et au RGPD. Vous disposez des mêmes droits sur ces données (accès, rectification, suppression, etc.).
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Sécurité des cookies</h2>
              <p className="mb-4">
                Nous mettons en place des mesures de sécurité pour protéger les cookies :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Chiffrement :</strong> les cookies sensibles sont chiffrés</li>
                <li><strong>Secure flag :</strong> transmission uniquement via HTTPS</li>
                <li><strong>HttpOnly flag :</strong> protection contre les attaques XSS</li>
                <li><strong>SameSite :</strong> protection contre les attaques CSRF</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Évolution de cette politique</h2>
              <p className="mb-4">
                Cette politique de cookies peut être modifiée pour refléter les changements dans nos pratiques ou la réglementation. 
                Nous vous informerons de toute modification importante par email ou via un bandeau sur notre site.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Contact</h2>
              <p className="mb-4">
                Pour toute question concernant notre utilisation des cookies, vous pouvez nous contacter :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Email : dpo@luxdrive.com</li>
                <li>Téléphone : +33 1 23 45 67 89</li>
                <li>Courrier : LuxDrive SARL - DPO, 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">12. Ressources utiles</h2>
              <p className="mb-4">
                Pour en savoir plus sur les cookies et la protection de votre vie privée :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Commission Nationale de l'Informatique et des Libertés (CNIL) : www.cnil.fr</li>
                <li>Guide des cookies de la CNIL : www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser</li>
                <li>Your Online Choices (opt-out publicitaire) : www.youronlinechoices.eu</li>
                <li>Network Advertising Initiative : www.networkadvertising.org</li>
              </ul>
              
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

export default Cookies;