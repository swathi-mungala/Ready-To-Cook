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

//create cards for homepage -------------------------------------------------

  for (var i=1;i<=4;i++) {
      var cardCol = $('<div class="col-sm-12 col-md-6 col-lg-3 pb-2"></div>');
      var myPanel = $('<div class="card" style="width: 18rem;" id="'+i+'Panel"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">"Some quick example text to build on the card title and make up the bulk of the cards content."</p><a href="#" class="btn btn-secondary">Go to Recipe</a></div></div>');
      myPanel.appendTo(cardCol);
      cardCol.appendTo('#recipeCards');
  }




  //create cards on search click --------------------------------------------
  var createCards = function (){
    for (var i=1;i<=4;i++) {
        var cardCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
        var myPanel = $('<div class="card" style="width: 18rem;" id="'+i+'Panel"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">"Some quick example text to build on the card title and make up the bulk of the cards content."</p><a href="#" class="btn btn-secondary">Go to Recipe</a></div></div>');
        myPanel.appendTo(cardCol);
        cardCol.appendTo('#recipeCards');
    }
 };


$('#btnGen').click(function(){
    createCards($('#numPanels').val());
    return false;
});
