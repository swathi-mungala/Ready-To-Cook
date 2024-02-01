var queryAPI = "";
var apiQueryText = "halloumi"; // q=
var apiQueryDietaryNeeds = ""; // diet=   health=
var apiQueryCuisine = ""; // cuisineType=
var apiQueryCalories = ""; // calories=
var apiMealType = ""; // mealType=
var apiAppId = "3bf68971";
var apiAppKey = "0368b81109c39e303c8795c2f41416da";

// build and query the recipes API
function getRecipes() {
  // get search text from screen field
  // apiQueryText = document.getElementById("search-text");
  
  // get dietary needs from screen field
  // apiQueryDietaryNeeds = document.getElementById("dietary-needs");
  
  // get cuisine type from screen field
  // apiQueryCuisine = document.getElementById("cuisine-type");

  // get calories from screen field
  // apiQueryCalories = document.getElementById("calories");

  // get meal type from screen field
  // apiMealType = document.getElementById("meal-type");

  // build API query
  queryAPI =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    apiQueryText +
    "&app_id=" +
    apiAppId +
    "&app_key=" +
    apiAppKey;

    // + "&dietary-needs=" + apiQueryDietaryNeeds
    // + "&cuisineType=" + apiQueryCuisine
    // + "&calories=" + apiQueryCalories
    // + "&mealType="+ apiMealType


  console.log(queryAPI);

  // query the API
  fetch(queryAPI)
    .then(function (response) {
      // if response code not 200 (OK) output error to log
      if (response.status != 200) {
        console.error(response.status + " returned from call to " + queryAPI);
      }
      return response.json();
    })
    .then(displayRecipe);
}

// display Recipes
function displayRecipe(recipeData) {
  // Pull array of recipes from the data
  var recipesArr = recipeData.hits;

  // iterate through array of all return recipes
  for (let i = 0; i < recipesArr.length; i++) {
    const recipeDetails = recipesArr[i].recipe;

    // here we need to "build the cards" to display the recipes in the returned data

    // output recipe information
    console.log(recipeDetails.label);
  }
}

getRecipes();