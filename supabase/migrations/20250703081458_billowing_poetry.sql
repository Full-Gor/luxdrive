/*
  # Mise à jour des images des voitures avec de meilleures photos
  
  1. Correction des images
    - Tesla Model S : nouvelle image Tesla appropriée
    - Tesla Model 3 : image Tesla Model 3 correcte
    - Porsche Taycan : image Porsche électrique
    - Mercedes S-Class : image Mercedes de luxe appropriée
    - Autres véhicules : vérification et amélioration
*/

-- Mise à jour des images des voitures avec de meilleures photos Pexels
UPDATE cars SET image_url = 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Model S' AND brand = 'Tesla';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Model 3' AND brand = 'Tesla';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Taycan' AND brand = 'Porsche';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'S-Class' AND brand = 'Mercedes-Benz';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = '7 Series' AND brand = 'BMW';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'A8' AND brand = 'Audi';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'i8' AND brand = 'BMW';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'Continental GT' AND brand = 'Bentley';

UPDATE cars SET image_url = 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
WHERE name = 'E-Class' AND brand = 'Mercedes-Benz';

-- Vérification des mises à jour
SELECT name, brand, image_url FROM cars ORDER BY brand, name;