const axios = require("axios");
require('dotenv').config();

module.exports = {
    getRecipesByIngre: (query) => axios({
        method:"GET",
        url : process.env.BASE_URL + `/recipes/findByIngredients`,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY
        },
        params: {
            "ingredients": query.ingredients,
            "number": query.number
        }
    }),

    getRecipes: (query) => axios ({
        method:"GET",
        url: process.env.BASE_URL + `/recipes/search`,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY
        },
        params: {
            "query": query.main,
            "number": query.number,
            "diet": query.diet,
            "intolerances": query.intol,
            "excludeIngredients": query.exclude,
            "instructionsRequired": true

        }
    }),
    getRecipe: (query) => axios ({
        method:"GET",
        url: process.env.BASE_URL + `/recipes/${query.id}/information`,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY
        }
    })
}