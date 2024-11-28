require('dotenv').config();// chargement des variable d'environement avec dotenv
const mongoose = require("mongoose"); //Chargement de Mongoose pour interagir avec MongoDB
const Person = require('./models/person'); //Chargement du modèle contact
mongoose.connect(process.env.MONGO_URI,{ //Connexion à MongoDB avec Mongoose
   
})
.then(()=>{ // Gestion des promesses avec .then() et .catch() 
    console.log('connected to mongo db');
})
.catch((err)=>{
    console.error('error connecting to mongo db', err);
})
const createAndSavePerson = async () => {
    const person = new Person({
      name: "saadouli zeineb",
      age: 32,
      favoriteFoods: ["Sandwich", "Spaghetti"],
    });
  
    try {
      const savedPerson = await person.save();
      console.log("Multiple contacts saved:", savedPerson);
    } catch (err) {
      console.error("Error saving person:", err);
    }
  };
 
//create many people
const createManyPersons = async () => {
  const arrayOfPeople = [
    { name: "Nesrine BenTayeb", age: 26, favoriteFoods: ["Sushi", "Salad"] },
    {
      name: "Omar Barhoumi",
      age: 21,
      favoriteFoods: ["Couscous", "Crepes"],
    },
    { name: "Sameh Karoui", age: 21, favoriteFoods: ["Steak", "Pasta"] },
  ];

  try {
    const persons = await Person.create(arrayOfPeople);
    console.log("Multiple people created:", persons);
  } catch (err) {
    console.error("Error saving mutiple persons:", err);
  }
};
const findPersonsByName = async (name) => {
    try {
      const person = await Person.find({ fullName: name });
      console.log("Person found:", person);
    } catch (err) {
      console.error("Error Person not found:", err);
    }
  };
  // find some one by his favorite food
 const FindOneByFavoritefood = async (food)=>{
 try{
    const person = await Person.find({ favoriteFoods: food });
    console.log("Person found:", person);
    }catch (err){
        console.error("Error Person not found:", err);
    }
 }
 // find some one by his id
 const FindOneByID = async (ID)=>{
    try{
       const person = await Person.find({ id: ID });
       console.log("Person found:", person);
       }catch (err){
           console.error("Error Person not found:", err);
       }
    }
    // find someone by his id ,edit an object  and save it  
    const findEditThenSave = async (personId) => {
        try {
          const person = await Person.findById(personId);
          person.favoriteFoods.push('Hamburger');
          const updatedPerson = await person.save();
          console.log('Person updated:', updatedPerson);
        } catch (err) {
          console.error('Error updating person:', err);
        }
      };
      // find someone by his name an update it 
      const findOneAndUpdate = async (personName,newage) =>{
        try {
          const updatedPerson = await Person.findOneAndUpdate(
            { name: personName },
            { age: newage },
            { new: true }
          );
          console.log('Person updated:', updatedPerson);
        } catch (err) {
          console.error('Error updating person by name:', err);
        }
      };
      // find someone by his id an d remove it
      const deletePersonById = async (personId) =>{
        try {
          const deletedPerson = await Person.findByIdAndDelete(personId);
          console.log('Person deleted:', deletedPerson);
        } catch (err) {
          console.error('Error deleted person by id:', err);
        }
      };
      // find someone who likes burritos , limit the numbers of result to 2 , don't show the age, sort the result
      const chainSearch= async (food) =>{
  try {
    const people = await Person.find({ favoriteFoods: food })
      .sort({ name: 1 }) // Tri par nom
      .limit(2)          // Limite à 2 résultats
      .select('-age')    // Exclut le champ `age`
      .exec();
    console.log('People matching query:', people);
  } catch (err) {
    console.error('Error with chained search:', err);
  }
}
//createAndSavePerson();
//createManyPersons ();
//findPersonsByName('Sameh Karoui');
//FindOneByFavoritefood('Steak');
//FindOneByID('67473f67a21f9d51140efdf4');
//findEditThenSave('67473f67a21f9d51140efdf4');
//findOneAndUpdate('Sameh Karoui', 27);
//deletePersonById('67473f67a21f9d51140efdf4');
chainSearch("Burritos");