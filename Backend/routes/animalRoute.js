// const express = require('express');

// const {
//   registerAnimal,
//   getAllAnimals,
//   getAnimalById,
//   deleteAnimalById,
//   getAnimalsByOutfitter,
//   addSubCategoryAnimals
// } = require('../controllers/animalController');

// // Create a new router instance
// const router = express.Router();

// // Register a new animal
// router.post('/registerAnimal', registerAnimal);

// // Get all animals
// router.get('/getAllAnimals', getAllAnimals);

// // Get a single animal by ID
// router.get('/getAnimal/:id', getAnimalById);

// // Update an animal by ID
// // router.put('/updateAnimal/:id', updateAnimalById);

// // Delete an animal by ID
// router.delete('/deleteAnimal/:id', deleteAnimalById);

// // Get animals by area
// // router.get('/getAnimalsByArea/:area', getAnimalsByArea);

// // GET animals by outfitter ID
// router.get('/:id', getAnimalsByOutfitter);

// // add SubCategory of animals
// router.post('/:animalId/subCategory', addSubCategoryAnimals)

// module.exports = router;


const express = require("express");
const router = express.Router();
const {addAnimal,getAnimal,addSpecies, getSpecieByAnimalId, deleteAnimals, deleteSpecies}=require('../controllers/animalController')

router.post('/addAnimal',addAnimal)
router.post('/addSpecies',addSpecies)
router.get('/getAnimal',getAnimal)
// router.get('/getAnimalSpecie',getSpeciesByAnimalId)
router.get('/getSpecie/:id',getSpecieByAnimalId)

router.delete('/deleteAnimals/:id',deleteAnimals)
router.delete('/deleteSpecies/:animalId/:id',deleteSpecies)

module.exports = router;
