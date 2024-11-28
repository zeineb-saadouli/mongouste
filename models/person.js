//models/contact.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Définir le schéma de la personne
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String], required: true }
  });
  
  // Créer le modèle Person
  const Person = mongoose.model('Person', personSchema);
  
  module.exports = Person;