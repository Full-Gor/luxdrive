import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PolitiqueConfidentialite: React.FC = () => {
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
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Politique de Confidentialité</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
              <p className="mb-4">
                LuxDrive s'engage à protéger la confidentialité et la sécurité des données personnelles de ses utilisateurs. 
                Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles 
                conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Responsable du traitement</h2>
              <p className="mb-4">
                Le responsable du traitement des données personnelles est :<br />
                <strong>LuxDrive SARL</strong><br />
                123 Avenue des Champs-Élysées, 75008 Paris, France<br />
                Email : dpo@luxdrive.com<br />
                Téléphone : +33 1 23 45 67 89
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Données collectées</h2>
              <p className="mb-4">
                Nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Données d'identification :</strong> nom, prénom, date de naissance, numéro de permis de conduire</li>
                <li><strong>Données de contact :</strong> adresse email, numéro de téléphone, adresse postale</li>
                <li><strong>Données de connexion :</strong> adresse IP, cookies, données de navigation</li>
                <li><strong>Données de paiement :</strong> informations bancaires (traitées par notre prestataire de paiement sécurisé)</li>
                <li><strong>Données de location :</strong> historique des réservations, préférences, évaluations</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Finalités du traitement</h2>
              <p className="mb-4">
                Vos données personnelles sont traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Gestion des comptes clients et authentification</li>
                <li>Traitement des réservations et contrats de location</li>
                <li>Facturation et gestion des paiements</li>
                <li>Service client et support technique</li>
                <li>Amélioration de nos services et personnalisation de l'expérience utilisateur</li>
                <li>Marketing direct et communication commerciale (avec votre consentement)</li>
                <li>Respect des obligations légales et réglementaires</li>
                <li>Prévention de la fraude et sécurité des transactions</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Base légale du traitement</h2>
              <p className="mb-4">
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Exécution du contrat :</strong> pour la gestion des réservations et la fourniture de nos services</li>
                <li><strong>Intérêt légitime :</strong> pour l'amélioration de nos services et la prévention de la fraude</li>
                <li><strong>Consentement :</strong> pour les communications marketing et l'utilisation de cookies non essentiels</li>
                <li><strong>Obligation légale :</strong> pour le respect des obligations comptables, fiscales et réglementaires</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Destinataires des données</h2>
              <p className="mb-4">
                Vos données personnelles peuvent être communiquées aux destinataires suivants :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personnel autorisé de LuxDrive dans le cadre de leurs fonctions</li>
                <li>Prestataires de services (paiement, hébergement, maintenance informatique)</li>
                <li>Partenaires commerciaux (assurances, assistance routière)</li>
                <li>Autorités compétentes en cas d'obligation légale</li>
                <li>Organismes de contrôle et d'audit</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Transferts de données hors UE</h2>
              <p className="mb-4">
                Certains de nos prestataires peuvent être situés en dehors de l'Union Européenne. 
                Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place pour protéger vos données, 
                notamment par la signature de clauses contractuelles types approuvées par la Commission européenne.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Durée de conservation</h2>
              <p className="mb-4">
                Nous conservons vos données personnelles pendant les durées suivantes :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Données de compte :</strong> pendant toute la durée de la relation contractuelle + 3 ans</li>
                <li><strong>Données de facturation :</strong> 10 ans conformément aux obligations comptables</li>
                <li><strong>Données de marketing :</strong> 3 ans à compter du dernier contact</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum pour les cookies</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Vos droits</h2>
              <p className="mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> restreindre le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement pour des raisons légitimes</li>
                <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Exercice de vos droits</h2>
              <p className="mb-4">
                Pour exercer vos droits, vous pouvez nous contacter :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Par email : dpo@luxdrive.com</li>
                <li>Par courrier : LuxDrive SARL - DPO, 123 Avenue des Champs-Élysées, 75008 Paris</li>
                <li>Via votre espace client en ligne</li>
              </ul>
              <p className="mb-4">
                Nous nous engageons à répondre à votre demande dans un délai d'un mois. 
                Une pièce d'identité pourra vous être demandée pour vérifier votre identité.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Sécurité des données</h2>
              <p className="mb-4">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Chiffrement des données sensibles</li>
                <li>Contrôle d'accès et authentification forte</li>
                <li>Sauvegarde régulière des données</li>
                <li>Formation du personnel à la protection des données</li>
                <li>Audits de sécurité réguliers</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">12. Réclamation</h2>
              <p className="mb-4">
                Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, 
                vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <p className="mb-4">
                CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07<br />
                Téléphone : +33 1 53 73 22 22<br />
                Site web : www.cnil.fr
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">13. Modifications</h2>
              <p className="mb-4">
                Cette politique de confidentialité peut être modifiée à tout moment. 
                Nous vous informerons de toute modification substantielle par email ou via notre site internet.
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

export default PolitiqueConfidentialite;