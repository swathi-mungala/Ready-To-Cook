var queryAPI = "";
var apiQueryText = ""; // q=
var apiQueryDietaryNeeds = ""; // diet=   health=
var apiQueryCuisine = ""; // cuisineType=
var apiQueryCalories = ""; // calories=
var apiMealType = ""; // mealType=
const apiAppId = "3bf68971";
const apiAppKey = "0368b81109c39e303c8795c2f41416da";
var recipesArray = [];

// build and query the recipes API
function getRecipes(fndArr) {
  // query the API
  return fetch(fndArr).then(function (response) {
    // if response code not 200 (OK) output error to log
    if (response.status != 200) {
      console.error(response.status + " returned from call to " + queryAPI);
    }
    return response.json();
  });
}

//array for home page cards
let homeRecipes = [
  {
    title: "Chicken dishes",
    Picture: "./assets/images/grilledChicken.png",
    description:
      "a quick mid week meal or the star of the show for a Sunday Roast - get inspired by chicken.",
    api: "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da",
  },
  {
    title: "Pancakes",
    Picture: "./assets/images/pancakes.png",
    description: "Get set for Shrove Tuesday on 13 Feb",
    api: "https://api.edamam.com/api/recipes/v2?type=public&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da&dishType=Pancake",
  },
  {
    title: "Chinese food",
    Picture: "./assets/images/chineseFood.png",
    description: "Get creative with Chinese flavours",
    api: "https://api.edamam.com/api/recipes/v2?type=public&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da&cuisineType=Chinese",
  },
  {
    title: "Pasta Dishes",
    Picture: "./assets/images/pastaSalad.png",
    description:
      "Too busy to spend long cooking? It will be ready in no time with our pasta dishes.",
    api: "https://api.edamam.com/api/recipes/v2?type=public&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da&dishType=Pasta",
  },
  {
    title: "Eggs Eggs Eggs",
    Picture: "./assets/images/souffle.png",
    description:
      "Get more creative than scrambled with our excellent egg ideas",
    api: "https://api.edamam.com/api/recipes/v2?type=public&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da&dishType=Egg",
  },
  {
    title: "Sunday Roast",
    Picture: "./assets/images/sundayRoast.png",
    description:
      "What better reason to get everyone together than for a mouth watering Sunday Roast",
    api: "https://api.edamam.com/api/recipes/v2?type=public&q=sunday%20roast&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da",
  },
  {
    title: "Soups",
    Picture: "./assets/images/soups.png",
    description: "Hearty and warming winter soup ideas",
    api: "https://api.edamam.com/api/recipes/v2?type=public&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da&dishType=Soup",
  },
];

//create cards for homepage -------------------------------------------------
var cardCol;

for (var i = 1; i <= 4; i++) {
  cardCol = $('<div class="col-sm-12 col-md-6 col-lg-3 pb-2"></div>');
  var myPanel = $(
    '<div class="card" style="width: 18rem;" id="' +
      i +
      'Panel"><img src=' +
      homeRecipes[i].Picture +
      ' class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">' +
      homeRecipes[i].title +
      '</h5><p class="card-text">' +
      homeRecipes[i].description +
      '</p><a href="#" class="btn btn-secondary homeBtn" name="' +
      homeRecipes[i].title +
      '">Go to Recipe</a></div></div>'
  );
  myPanel.appendTo(cardCol);
  cardCol.appendTo("#recipeCards");
}

//create cards on search click --------------------------------------------
function createCards() {
  for (let i = 0; i < recipesArray.length; i++) {
    const recipe = recipesArray[i].recipe;
    console.log(recipe);

    // get ingredients as ul
    var ingCount = recipe.ingredientLines.length;
    var ingList = "";
    if (ingCount > 4) {
      ingList = "Ingredients (4 of " + ingCount + ")";
    } else {
      ingList = "Ingredients (" + ingCount + ")";
    }

    for (let j = 0; j < ingCount; j++) {
      if (j > 3) {
        break;
      }
      const ingredients = recipe.ingredientLines[j];
      ingList += "<ul>" + ingredients + "</ul>";
    }

    cardCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
    var myPanel = $(
      '<div class="card" style="width: 18rem;" id="' +
        i +
        'Panel"><img src="' +
        recipe.image +
        '" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">' +
        recipe.label +
        '</h5><p class="card-text">' +
        ingList +
        '</p><a target=_blank href="' +
        recipe.url +
        '" class="btn btn-secondary">Go to Recipe</a></div></div>'
    );
    myPanel.appendTo(cardCol);
    cardCol.appendTo("#recipeCards");
  }
}

$("#btnGen").click(function (event) {
  event.preventDefault();
  // build API query
  var qryArr =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    document.getElementById("search-text").value +
    "&app_id=" +
    apiAppId +
    "&app_key=" +
    apiAppKey;
  $("#recipeCards").empty();
  getRecipes(qryArr).then((data) => {
    recipesArray = data.hits;
    createCards();
  });
});

$(document).on("click", ".homeBtn", function (event) {
  event.preventDefault();
  var fndHomeArr = homeRecipes.find(
    ({ title }) => title === $(this).attr("name")
  );
  $("#recipeCards").empty();
  getRecipes(fndHomeArr.api).then((data) => {
    recipesArray = data.hits;
    createCards();
  });
});
