const got = require("got");
require('dotenv').config();

module.exports = {
    getRecipesByIngre: (query) => got({
        method:"GET",
        url : process.env.BASE_URL + `/recipes/findByIngredients`,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY
        },
        searchParams: {
            "ingredients": query.ingredients,
            "number": query.number
        }
    }),

    getRecipes: (query) => got ({
        method:"GET",
        url: process.env.BASE_URL + `/recipes/search`,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY
        },
        searchParams: {
            "query": query.main,
            "number": query.number,
            "diet": query.diet,
            "intolerances": query.intol,
            "excludeIngredients": query.exclude,
            "instructionsRequired": true

        }
    }),
    getRecipe: (query) => got ({
        method:"GET",
        url: process.env.BASE_URL + `/recipes/informationBulk`,
        searchParams:{
            "ids": `${query.id}`
        },
        headers: {
            "content-type":"application/x-www-form-urlencoded",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY
        }
    })
}