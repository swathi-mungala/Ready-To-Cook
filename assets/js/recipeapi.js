var queryAPI = "";

// build the query URL
queryAPI =
  "https://api.edamam.com/api/recipes/v2?type=public&q=chicken,pasta&app_id=3bf68971&app_key=0368b81109c39e303c8795c2f41416da";

// query the API
fetch(queryAPI)
  .then(function (response) {
    // if response code not 200 (OK) output error to log
    if (response.status != 200) {
      console.error(response.status + " returned from call to " + queryAPI);
    }
    return response.json();
  })
  .then(function (recipeData) {
    // log the first returned recipe
    console.log(recipeData.hits[0]);
  });
