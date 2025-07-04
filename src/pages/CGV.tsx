import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CGV: React.FC = () => {
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
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Conditions Générales de Vente</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Objet et champ d'application</h2>
              <p className="mb-4">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre LuxDrive SARL, 
                société de location de véhicules de luxe, et ses clients dans le cadre de la location de véhicules.
              </p>
              <p className="mb-4">
                Toute commande implique l'acceptation sans réserve des présentes CGV qui prévalent sur toutes autres conditions générales ou particulières 
                non expressément agréées par LuxDrive. Ces conditions sont susceptibles d'être modifiées à tout moment.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Conditions de location</h2>
              <p className="mb-4">
                Pour louer un véhicule chez LuxDrive, le locataire doit remplir les conditions suivantes :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Être âgé d'au moins 25 ans (21 ans pour certains véhicules avec supplément jeune conducteur)</li>
                <li>Être titulaire d'un permis de conduire valide depuis au moins 3 ans</li>
                <li>Présenter une pièce d'identité en cours de validité</li>
                <li>Disposer d'une carte de crédit à son nom avec provision suffisante</li>
                <li>Fournir un justificatif de domicile de moins de 3 mois</li>
                <li>Accepter les conditions d'assurance proposées</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Réservation et confirmation</h2>
              <p className="mb-4">
                La réservation peut être effectuée en ligne, par téléphone ou en agence. 
                Elle devient ferme et définitive après confirmation écrite de LuxDrive et versement des arrhes demandées.
              </p>
              <p className="mb-4">
                Un acompte de 30% du montant total de la location est exigé lors de la réservation. 
                Le solde est payable au moment de la prise en charge du véhicule.
              </p>
              <p className="mb-4">
                LuxDrive se réserve le droit de refuser toute location sans avoir à justifier sa décision.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Tarifs et paiement</h2>
              <p className="mb-4">
                Les tarifs sont exprimés en euros TTC et comprennent :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>La location du véhicule pour la durée convenue</li>
                <li>L'assurance responsabilité civile obligatoire</li>
                <li>L'assistance 24h/24 et 7j/7</li>
                <li>L'entretien et les réparations mécaniques</li>
              </ul>
              <p className="mb-4">
                Les tarifs ne comprennent pas : le carburant, les péages, les contraventions, 
                les options supplémentaires (GPS, siège enfant, etc.), les frais de nettoyage en cas de restitution sale.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Dépôt de garantie</h2>
              <p className="mb-4">
                Un dépôt de garantie est exigé lors de la prise en charge du véhicule. 
                Le montant varie selon le type de véhicule loué :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Véhicules de catégorie Standard : 1 500 €</li>
                <li>Véhicules de catégorie Premium : 2 500 €</li>
                <li>Véhicules de catégorie Luxe : 5 000 €</li>
                <li>Véhicules de catégorie Prestige : 10 000 €</li>
              </ul>
              <p className="mb-4">
                Ce dépôt est bloqué sur la carte de crédit du locataire et libéré dans les 7 jours ouvrés suivant la restitution du véhicule, 
                déduction faite des éventuels frais.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Prise en charge et restitution</h2>
              <p className="mb-4">
                La prise en charge du véhicule s'effectue aux heures d'ouverture de l'agence ou selon les modalités convenues. 
                Un état des lieux contradictoire est établi en présence du locataire.
              </p>
              <p className="mb-4">
                Le véhicule doit être restitué à la date, l'heure et au lieu convenus, dans l'état où il a été remis, 
                avec le même niveau de carburant. Tout retard doit être signalé et autorisé par LuxDrive.
              </p>
              <p className="mb-4">
                En cas de retard non autorisé, des pénalités seront appliquées : 50 € par heure de retard pour les 2 premières heures, 
                puis facturation d'une journée supplémentaire au-delà.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Utilisation du véhicule</h2>
              <p className="mb-4">
                Le locataire s'engage à :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Utiliser le véhicule conformément à sa destination et aux règles de circulation</li>
                <li>Respecter les limitations de vitesse et le code de la route</li>
                <li>Ne pas conduire sous l'emprise d'alcool, de stupéfiants ou de médicaments</li>
                <li>Ne pas utiliser le véhicule pour des courses, compétitions ou épreuves</li>
                <li>Ne pas transporter de marchandises dangereuses ou illicites</li>
                <li>Ne pas sous-louer ou prêter le véhicule à un tiers</li>
                <li>Maintenir le véhicule en bon état de propreté</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Assurance et responsabilité</h2>
              <p className="mb-4">
                Tous nos véhicules sont assurés en responsabilité civile, vol, incendie et dommages tous accidents. 
                L'assurance comprend une franchise dont le montant varie selon le véhicule loué.
              </p>
              <p className="mb-4">
                Le locataire reste responsable :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Du montant de la franchise en cas de sinistre</li>
                <li>Des dommages causés par négligence ou mauvaise utilisation</li>
                <li>Des contraventions et amendes encourues pendant la location</li>
                <li>De la perte ou du vol des clés, papiers et accessoires</li>
                <li>Des dommages aux pneumatiques, jantes et parties basses du véhicule</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Kilométrage</h2>
              <p className="mb-4">
                Selon la formule choisie :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Kilométrage limité :</strong> 150 km/jour inclus, puis 0,50 € par km supplémentaire</li>
                <li><strong>Kilométrage illimité :</strong> aucune restriction de kilométrage</li>
              </ul>
              <p className="mb-4">
                Le kilométrage est relevé au départ et au retour du véhicule. 
                Toute tentative de falsification du compteur entraînera des poursuites judiciaires.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Annulation et modification</h2>
              <p className="mb-4">
                <strong>Annulation par le client :</strong>
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Plus de 48h avant la prise en charge : remboursement intégral</li>
                <li>Entre 24h et 48h : retenue de 50% des arrhes</li>
                <li>Moins de 24h : retenue de 100% des arrhes</li>
              </ul>
              <p className="mb-4">
                <strong>Modification de réservation :</strong> possible sous réserve de disponibilité, 
                sans frais si effectuée plus de 24h avant la prise en charge.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Force majeure</h2>
              <p className="mb-4">
                LuxDrive ne pourra être tenue responsable de l'inexécution de ses obligations en cas de force majeure, 
                notamment en cas de grève, d'intempéries exceptionnelles, de catastrophe naturelle, 
                d'épidémie ou de décision gouvernementale.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">12. Protection des données</h2>
              <p className="mb-4">
                Les données personnelles collectées sont nécessaires à la gestion de la location et sont traitées 
                conformément à notre politique de confidentialité et au RGPD. 
                Elles peuvent être transmises à nos partenaires (assureurs, autorités) dans le cadre de nos obligations légales.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">13. Droit applicable et juridiction</h2>
              <p className="mb-4">
                Les présentes CGV sont soumises au droit français. 
                En cas de litige, les parties s'efforceront de trouver une solution amiable. 
                À défaut, les tribunaux de Paris seront seuls compétents.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">14. Contact</h2>
              <p className="mb-4">
                Pour toute question relative aux présentes CGV :<br />
                LuxDrive SARL<br />
                123 Avenue des Champs-Élysées, 75008 Paris<br />
                Téléphone : +33 1 23 45 67 89<br />
                Email : contact@luxdrive.com
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

export default CGV;