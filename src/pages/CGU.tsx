import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CGU: React.FC = () => {
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
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Conditions Générales d'Utilisation</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Objet</h2>
              <p className="mb-4">
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation 
                du site internet www.luxdrive.com (ci-après "le Site") édité par LuxDrive SARL.
              </p>
              <p className="mb-4">
                L'utilisation du Site implique l'acceptation pleine et entière des présentes CGU. 
                Ces conditions peuvent être modifiées à tout moment par LuxDrive, les modifications prenant effet dès leur publication sur le Site.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Accès au site</h2>
              <p className="mb-4">
                Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. 
                Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) 
                sont à sa charge.
              </p>
              <p className="mb-4">
                LuxDrive met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au Site, 
                mais n'est tenu à aucune obligation d'y parvenir. LuxDrive ne peut être tenue responsable de tout dysfonctionnement 
                du réseau ou des serveurs ou de tout autre événement échappant au contrôle raisonnable.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Création de compte utilisateur</h2>
              <p className="mb-4">
                Pour accéder à certains services du Site, l'utilisateur doit créer un compte en fournissant des informations exactes et à jour. 
                L'utilisateur s'engage à :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fournir des informations vraies, exactes, à jour et complètes</li>
                <li>Maintenir et mettre à jour ces informations</li>
                <li>Préserver la confidentialité de ses identifiants de connexion</li>
                <li>Informer immédiatement LuxDrive de toute utilisation non autorisée de son compte</li>
                <li>Ne créer qu'un seul compte par personne physique</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Utilisation du site</h2>
              <p className="mb-4">
                L'utilisateur s'engage à utiliser le Site de manière loyale et conformément à sa destination. Il est notamment interdit :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>D'utiliser le Site à des fins illégales ou non autorisées</li>
                <li>De porter atteinte aux droits de propriété intellectuelle de LuxDrive ou de tiers</li>
                <li>De diffuser des contenus illicites, diffamatoires, injurieux ou contraires à l'ordre public</li>
                <li>De perturber le fonctionnement du Site ou d'en compromettre la sécurité</li>
                <li>D'utiliser des robots, scripts ou autres moyens automatisés pour accéder au Site</li>
                <li>De collecter des données personnelles d'autres utilisateurs</li>
                <li>De créer de faux comptes ou d'usurper l'identité d'autrui</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Contenu du site</h2>
              <p className="mb-4">
                LuxDrive s'efforce de fournir des informations aussi précises que possible sur le Site. 
                Cependant, elle ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
              </p>
              <p className="mb-4">
                Les informations présentes sur le Site sont données à titre indicatif et peuvent comporter des inexactitudes ou des omissions. 
                L'utilisateur doit vérifier l'exactitude des informations et signaler toute erreur à LuxDrive.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble des éléments du Site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) 
                sont protégés par les droits de propriété intellectuelle et appartiennent à LuxDrive ou à ses partenaires.
              </p>
              <p className="mb-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site, 
                quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de LuxDrive.
              </p>
              <p className="mb-4">
                L'utilisateur peut consulter et imprimer les pages du Site pour son usage personnel et privé, 
                à l'exclusion de toute utilisation commerciale.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Données personnelles</h2>
              <p className="mb-4">
                LuxDrive collecte et traite les données personnelles des utilisateurs conformément à sa politique de confidentialité 
                et au Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p className="mb-4">
                L'utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de ses données personnelles, 
                qu'il peut exercer en contactant LuxDrive à l'adresse dpo@luxdrive.com.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Cookies</h2>
              <p className="mb-4">
                Le Site utilise des cookies pour améliorer l'expérience utilisateur et analyser l'audience. 
                L'utilisateur peut configurer son navigateur pour refuser les cookies, mais cela peut affecter le fonctionnement du Site.
              </p>
              <p className="mb-4">
                Les cookies utilisés sont de trois types :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Cookies techniques :</strong> nécessaires au fonctionnement du Site</li>
                <li><strong>Cookies analytiques :</strong> pour mesurer l'audience et améliorer le Site</li>
                <li><strong>Cookies publicitaires :</strong> pour personnaliser les publicités (avec consentement)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Liens hypertextes</h2>
              <p className="mb-4">
                Le Site peut contenir des liens vers d'autres sites internet. LuxDrive n'exerce aucun contrôle sur ces sites 
                et décline toute responsabilité quant à leur contenu ou leur politique de confidentialité.
              </p>
              <p className="mb-4">
                La création de liens vers le Site est autorisée, sous réserve qu'ils ne portent pas atteinte à l'image de LuxDrive 
                et qu'ils respectent les droits de propriété intellectuelle.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Responsabilité</h2>
              <p className="mb-4">
                L'utilisateur utilise le Site sous sa seule responsabilité. LuxDrive ne peut être tenue responsable :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Des dommages directs ou indirects résultant de l'utilisation du Site</li>
                <li>Des interruptions temporaires d'accès au Site</li>
                <li>Des virus ou autres éléments nuisibles qui pourraient infecter l'équipement informatique de l'utilisateur</li>
                <li>De l'utilisation non conforme du Site par l'utilisateur</li>
                <li>Des contenus publiés par les utilisateurs</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Suspension et résiliation</h2>
              <p className="mb-4">
                LuxDrive se réserve le droit de suspendre ou de résilier l'accès au Site à tout utilisateur qui ne respecterait pas les présentes CGU, 
                sans préavis et sans indemnité.
              </p>
              <p className="mb-4">
                L'utilisateur peut à tout moment cesser d'utiliser le Site et demander la suppression de son compte 
                en contactant le service client de LuxDrive.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">12. Modification du site</h2>
              <p className="mb-4">
                LuxDrive se réserve le droit de modifier, suspendre ou interrompre tout ou partie du Site à tout moment, 
                sans préavis et sans que sa responsabilité puisse être engagée.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">13. Droit applicable et juridiction</h2>
              <p className="mb-4">
                Les présentes CGU sont régies par le droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. 
                À défaut, les tribunaux français seront seuls compétents.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">14. Contact</h2>
              <p className="mb-4">
                Pour toute question relative aux présentes CGU, l'utilisateur peut contacter LuxDrive :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Par email : contact@luxdrive.com</li>
                <li>Par téléphone : +33 1 23 45 67 89</li>
                <li>Par courrier : LuxDrive SARL, 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">15. Dispositions générales</h2>
              <p className="mb-4">
                Si une disposition des présentes CGU était déclarée nulle ou inapplicable, 
                les autres dispositions resteraient en vigueur. LuxDrive se réserve le droit de céder tout ou partie de ses droits et obligations.
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

export default CGU;