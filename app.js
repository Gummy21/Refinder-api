const express = require("express"),
    cors = require("cors"),
    app = express()

const RecipeApi = require('./recipeapi')


const corsOptions = {
    origin: 'https://refinder-frontend.herokuapp.com/',
    optionsSuccessStatus: 200 
  }

app.use(cors())
app.use(express.json())

//Search by ingredients
app.get("/", function (req, res) {
    //Ingredients and number of recipes to be displayed from angular service
    const ingredient = req.query.ingredients,
          number = req.query.number,
          query = { ingredients: ingredient, number: number }

    const asyncApiCall = async () => {
        try {

            const response = await RecipeApi.getRecipesByIngre(query)
            const recipes = response['data'];
            if (Array.isArray(recipes) && recipes.length) {
                res.send(JSON.parse(recipes))
            }
            else {
                res.status(404).json({ error: "We couldn't find any recipes with those ingredients" });
                return
            }
        } catch (error) {
            res.status(404).json({ err: "Something went wrong", details: error['data'] });
            console.log(error)
        }

    }
    asyncApiCall()
});

//Search by name of a recipe
app.get("/search", function (req, res) {
    const main = req.query.main,
        number = req.query.number,
        diet = req.query.diet,
        intol = req.query.intol,
        exclude = req.query.exclude,
        query = { number: number, main: main, diet: diet, intol: intol, exclude: exclude };
    
    const asyncApiCall = async () => {
        try{
            const response = await RecipeApi.getRecipes(query)
            const recipes = response['data'];

            let test = recipes['results']
            if (Array.isArray(test) && test.length) {
                res.send(JSON.parse(recipes['results']))
            }
            else {
                res.status(404).json({ msg: "We couldn't find any recipes with those parameters" });
            }
        }
        catch (error) {
        res.status(404).json({ msg: "Something went wrong", details: error['data'] });
        console.log(error)
        }
    }
    asyncApiCall()
});

//Get instructions of recipe by id
app.get("/:id", function (req, res) {
    const query = { id: req.params.id }

    const asyncApiCall = async () => {
        try{
       
        const response = await RecipeApi.getRecipe(query)

        var recipes = JSON.parse(response['body']);
        console.log(recipes)
        res.send(recipes)
        } catch (error) {
            res.status(404).json({ msg: "Something went wrong", details: error['data'] });
            console.log(error)
        }
    }
    asyncApiCall()



});


//Server port
app.listen(5000, function () {
    console.log('Server has started on port 5000')
})