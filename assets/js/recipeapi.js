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

//array for home page cards
let homeRecipes = [
  {
    "title": "Chicken dishes",
    "Picture": "./assets/images/grilledChicken.png",
    "description": "a quick mid week meal or the star of the show for a Sunday Roast - get inspired by chicken.",
    "api": "apiQuery"
  },
  {
    "title": "Pancakes",
    "Picture": "./assets/images/pancakes.png",
    "description": "Get set for Shrove Tuesday on 13 Feb",
    "api": "apiQuery"
  },
  {
    "title": "Chinese food",
    "Picture": "./assets/images/chineseFood.png",
    "description": "Get creative with Chinese flavours",
    "api": "apiQuery"
  },
  { 
    "title": "Pasta Dishes",
    "Picture": "./assets/images/pastaSalad.png",
    "description": "Too busy to spend long cooking? It will be ready in no time with our pasta dishes.",
    "api": "apiQuery"
  },
  {
    "title": "Eggs Eggs Eggs",
    "Picture": "./assets/images/souffle.png",
    "description": "Get more creative than scrambled with our excellent egg ideas",
    "api": "apiQuery"
  },
  {
    "title": "Sunday Roast",
    "Picture": "./assets/images/sundayRoast.png",
    "description": "What better reason to get everyone together than for a mouth watering Sunday Roast",
    "api": "apiQuery"
  },
  {
    "title": "Soups",
    "Picture": "./assets/images/soups.png",
    "description": "Hearty and warming winter soup ideas",
    "api": "apiQuery"
  }
    ]





//create cards for homepage -------------------------------------------------

var cardCol;

for (var i=1;i<=4;i++) {
  cardCol = $('<div class="col-sm-12 col-md-6 col-lg-3 pb-2"></div>');
  var myPanel = $('<div class="card" style="width: 18rem;" id="'+i+'Panel"><img src='+homeRecipes[i].Picture+' class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+homeRecipes[i].title+'</h5><p class="card-text">'+ homeRecipes[i].description +'</p><a href="#" class="btn btn-secondary">Go to Recipe</a></div></div>');
  myPanel.appendTo(cardCol);
  cardCol.appendTo('#recipeCards');
}




//create cards on search click --------------------------------------------
var createCards = function (){
for (var i=1;i<=4;i++) {
    cardCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
    var myPanel = $('<div class="card" style="width: 18rem;" id="'+i+'Panel"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">"Some quick example text to build on the card title and make up the bulk of the cards content."</p><a href="#" class="btn btn-secondary">Go to Recipe</a></div></div>');
    myPanel.appendTo(cardCol);
    cardCol.appendTo('#recipeCards');
}
};


$('#btnGen').click(function(){
  $("#recipeCards").empty();
createCards($('#numPanels').val());
return false;
});
