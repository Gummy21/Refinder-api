//Variables
const express = require("express"),
    cors = require("cors"),
    app = express()
//Api var
const RecipeApi = require('./recipeapi')

//Search by ingredients
app.get("/", function (req, res) {
    //Ingredients and number of recipes to be displayed from angular service
    var ingredient = req.query.ingredients;
    var number = req.query.number;
   
    const query = { ingredients: ingredient, number: number }

    const asyncApiCall = async () => {
        try {

            const response = await RecipeApi.getRecipesByIngre(query)
            var recipes = response['data'];
            if (Array.isArray(recipes) && recipes.length) {
                res.send(recipes)
            }
            else {
                res.status(404).json({ msg: "We couldn't find any recipes with those ingredients" });
            }
            recipes.forEach(function (recipe) {
                console.log(recipe['title'])
            });

        } catch (error) {
            const { response } = error;
            const { request, ...errorObject } = response;
            res.status(404).json({ msg: "Something went wrong", details: errorObject['data'] });
            console.log(errorObject)
        }

    }
    asyncApiCall()
});

//Search by name of a recipe
app.get("/search", function (req, res) {
    let main = req.query.main,
        number = req.query.number;
        diet = req.query.diet
        intol = req.query.intol,
        exclude = req.query.exclude;

    const query = { number: number, main: main, diet: diet, intol: intol, exclude: exclude }
    console.log(query)
    const asyncApiCall = async () => {
        const response = await RecipeApi.getRecipes(query)
        var recipes = response['data'];

        var test = recipes['results']
        if (Array.isArray(test) && test.length) {
            res.send(recipes['results'])
        }
        else {
            res.status(404).json({ msg: "We couldn't find any recipes with those parameters" });
        }
    }
    asyncApiCall()
});

//Get instructions of recipe by id
app.get("/:id", function (req, res) {
    let id = req.params.id;

    const query = { id: id }

    const asyncApiCall = async () => {
        const response = await RecipeApi.getRecipe(query)
        var recipes = response['data'];
        res.send(recipes)
    }
    asyncApiCall()



});


//Server port
app.listen(8887, function () {
    console.log('Server has started on port 8887')
})