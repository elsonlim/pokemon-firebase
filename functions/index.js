const functions = require('firebase-functions');
const pokemonData = require("./pokemon.data.js");
const cors = require('cors')({ origin: true });
const express = require('express');
const recipeScraper = require("recipe-scraper");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();
app.use(express.json());
app.use(cors);

app.get('/pokemonData', (req, res) => {
  res.json(pokemonData);
});

app.get('/recipe', async (req, res, next) => {
  console.log(req.query.url)
  try {
    const recipe = await recipeScraper(req.query.url);
    if (!recipe) {
      return res.sendStatus(404);
    }
    return res.json(recipe);
  } catch (error) {
    return next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

exports.app = functions.https.onRequest(app);
// app.listen(3000, () => console.log("port 3000"));
