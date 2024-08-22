const createError = require("../middleware/error");
const createSuccess = require("../middleware/success");

// Animal model
const animal = require('../models/animalModel');

const addAnimal = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.send('name is required')
    }
    else {
      const newAnimal = new animal({
        name
      })

      await newAnimal.save();
      return next(createSuccess(200, "Animal Added"));
    }
  } catch (error) {
    return next(createError(500, "Error Adding Animal"));
  }
}

const addSpecies = async (req, res, next) => {
  try {
    const { animalId, specieName, specieImage, description } = req.body;

    const animals = await animal.findById(animalId);
    if (!animal) {
      return res.status(404).send('Animal not found');
    }
    animals.subcategories.push({
      specieName,
      specieImage: [specieImage],
      description
    });
    await animals.save();
      return next(createSuccess(200, "Animal Subcategory Added"));
  } catch (error) {
    return next(createError(500, "Error adding Subcategory"));
  }
};


// const getSpeciesByAnimalId = async (req, res, next) => {
//   try {
//     const { animalId } = req.params;
//     const Animal = await animal.findById(animalId);
//     if (!Animal) {
//       return res.status(404).send('Animal not found');
//     }
//     res.json({
//       data: Animal.subcategories,
//       message: 'Species retrieved successfully',
//       status: 200
//     });
//   } catch (error) {
//     return next(createError(500, 'Error retrieving species'));
//   }
// };


const getAnimal = async (req, res, next) => {
  try {
    const animals = await animal.find();
    res.json({
      data: animals,
      massage: "get all",
      status: 200
    })
  } catch (error) {
    res.send("error")
  }
}

const getSpecieByAnimalId = async (req, res) => {
  try {
    const { id } = req.params;
    const animals = await animal.findById(id);
    const species = animals.subcategories.map(specie => ({
      specieName: specie.specieName,
      specieImage: specie.specieImage,
      specieID:specie._id
    }));
    res.json({
      data: species,
      massage: "get all",
      status: 200
    })
  } catch (error) {
    res.send("error")
  }
}

const deleteAnimals=async(req,res)=>{
  try{
    const {id}=req.params;
    const result=await animal.findByIdAndDelete(id);
    res.send({massage:"Deleted successfully...!"})
  }catch(error){
    res.send({msg:error.massage})
  }
}

const deleteSpecies=async(req,res)=>{
  try{
    const { animalId, id } = req.params;
    const result = await animal.findById(animalId);
    if (!result) {
      return res.status(404).send({ message: "Animal not found" });
    }
    const speciesIndex = result.subcategories.findIndex(
      (species) => species._id.toString() === id
    );

    if (speciesIndex === -1) {
      return res.status(404).send({ message: "Species not found" });
    }
    result.subcategories.splice(speciesIndex, 1);
    await result.save();

    res.send({ message: "Species deleted successfully" });
  }catch(error){
    res.send({massage:error.massage})
  }
}

module.exports = {
  addAnimal,
  getAnimal,
  addSpecies,
  getSpecieByAnimalId,
  deleteAnimals,
  deleteSpecies
}
