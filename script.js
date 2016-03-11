var app = {}

app.movieKey = '7ed55abed8d31e4bacc4242918e1a105';
app.yummlyKey = '2f92e8c91f7c254f08a56235cca51714'
app.yummlyId = '80b8918e'
app.lcboKey = 'MDo3OGE1ZWQzMC1jNjI1LTExZTUtYmNmMS1hZjE0MTAxNjNlYmE6NzltU093akNqYTM4Q282MzlnU3RQeUI5Q3p4YmJjRVNKaFRa';

app.findGenre = function(){
  app.moviePromise();
}

app.moviePromise = function(){
  app.movieData = $.ajax({
    url: 'http://api.themoviedb.org/3/genre/' + app.genreId + '/movies',
    dataType: 'jsonp',
    type: 'GET',
    data: {
      api_key: app.movieKey,
      page: Math.floor(Math.random() * 50) + 1 ,
      genre: {
        id: app.genreId,
        include_adult: false
        },//end genre
    },//end data
  });//end ajax
}

app.findMeal = function(){

  var selectedEffort = $("div.selected").last()
  app.mealSearch=$("input.meal").val().toLowerCase();
  app.effortLevel = ($(selectedEffort).data("time"));


    if (app.effortLevel != "0") {
       app.mealPromise();
    } else {
      app.mealData = {
        name: "Order a pizza topped with " + app.mealSearch,
        images: {
          0: {
            hostedMediumUrl: "http://www.smartcanucks.ca/wp-content/uploads/2009/08/pizzabox_en1.gif"
          }
        },
        source: {
          sourceRecipeUrl: "http://www.pizzapizza.ca"
        },
      }
      app.getData();
    }
};//end function


app.mealPromise = function(){
  //console.log("enter meal promise");
  ///app.mealData = 
  $.ajax({
      url: 'http://api.yummly.com/v1/api/recipes',
      dataType: 'json',
      type: 'GET',
      data: {
        _app_id: app.yummlyId,
        _app_key: app.yummlyKey,
        q: app.mealSearch,
        requirePictures: true,
        allowedCourse: "Main Dishes",
        maxTotalTimeInSeconds: app.effortLevel,
        maxResult: 200
      },
      success: function(meals){
        if (app.effortLevel === 0) {
        var meal = app.mealData;
        } else {
          if (meals.matches.length === 0) {
            $(".mealError").show();
            $(".results").hide();
          } else {
          meal = meals.matches[Math.floor(Math.random()*meals.matches.length)]
          app.recipeId = meal.id;
          app.recipeDataPromise();
              
          }
 
        }
      }
  })
  
}

app.recipeDataPromise = function(){
  app.recipeData = $.ajax({
    url: 'http://api.yummly.com/v1/api/recipe/' + app.recipeId ,
    dataType: 'json',
    type: 'GET',
    data: {
      _app_id: app.yummlyId,
      _app_key: app.yummlyKey
    },
  })
  .done(function(){
    app.getData();
  })
}


app.findDrink = function(){

    app.drunkLevel = $("i.drunkSelected").last().data("drink");

    if ($(".highDrunk").hasClass("drunkSelected")) {
      app.drinkSearch = "spirits";
      app.drinkPromise();
    } else if ($(".medDrunk").hasClass("drunkSelected")) {
      app.drinkSearch = "wine";
      app.drinkPromise();
    } else if ($(".lowDrunk").hasClass("drunkSelected")) {
      app.drinkSearch = "beer";
      console.log(app.drinkSearch);
      app.drinkPromise();
    } else if ($(".noDrunk").hasClass("drunkSelected")) {
        app.drinkData = {
          producer_name: "",
          varietal:"How about some sparkling water",
          secondary_category: "",
          image_thumb_url: "http://i584.photobucket.com/albums/ss281/Dariclacar/Bar/perrier.png"
        };

    }; // end else if
};


app.drinkPromise = function(){
  app.drinkData = $.ajax ({
    url: 'https://lcboapi.com/products/',
    dataType: 'json',
    type: 'GET',
    data: {
      access_key: app.lcboKey,
      q: app.drinkSearch,
      per_page: '100'
      },
  });//end ajax
}

app.getData = function(){
  $.when(app.recipeData, app.movieData, app.drinkData)
  .then(function(recipe, movies, drinks){

    if (app.effortLevel === 0) {
    var recipe = app.mealData;
    } else {
    var recipe = recipe[0]
    }

    var movie = movies[0].results[Math.floor(Math.random()*movies[0].results.length)];

    if (app.drunkLevel === 0) {
    var drink = app.drinkData;
    } else {
    drink = drinks[0].result[Math.floor(Math.random()*drinks[0].result.length)];
    }
   app.displayResults(movie, recipe, drink);
    }) // end done function
    
  .fail(function(error){
  $(".ajaxError").show();
  }); //end fail function
}


app.findData = function() {
  $(".results").show();
  $("#floatingCirclesG").show();
  $(".retry").hide();

  app.findGenre();

  app.findMeal();

  app.findDrink();
};//end function
    




var genre = [
    {
      "id": 28,
      "name": "action"
    },
    {
      "id": 12,
      "name": "adventure"
    },
    {
      "id": 16,
      "name": "animation"
    },
    {
      "id": 35,
      "name": "comedy"
    },
    {
      "id": 80,
      "name": "crime"
    },
    {
      "id": 99,
      "name": "documentary"
    },
    {
      "id": 18,
      "name": "drama"
    },
    {
      "id": 10751,
      "name": "family"
    },
    {
      "id": 14,
      "name": "fantasy"
    },
    {
      "id": 10769,
      "name": "foreign"
    },
    {
      "id": 36,
      "name": "history"
    },
    {
      "id": 27,
      "name": "horror"
    },
    {
      "id": 10402,
      "name": "music"
    },
    {
      "id": 9648,
      "name": "mystery"
    },
    {
      "id": 10749,
      "name": "romance"
    },
    {
      "id": 878,
      "name": "science fiction"
    },
    {
      "id": 10770,
      "name": "tv movie"
    },
    {
      "id": 53,
      "name": "thriller"
    },
    {
      "id": 10752,
      "name": "war"
    },
    {
      "id": 37,
      "name": "western"
    }
  ];

app.close = function(){
  $(".close").on("click", function(e){
    e.preventDefault();
    $("div.resultsContainer").html('');
    $(".results").fadeOut();
  })

  $(".ajaxErrClose, .mealErrClose").on("click", function(e){
    e.preventDefault();
    $(".error2").fadeOut();
  });
}
    

app.displayResults = function(movie, recipe, drink){
  // console.log("made it to display"); 
  $("div.resultsContainer").html('');
  var appSugg = `
    <h1>Your date night includes: </h1>
    <div class="result movieSugg">
      <h2>Movie: ${movie.title}</h2>
      <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="result mealSugg">
      <h2>Dinner: ${recipe.name}</h2>
      <p><a href="${recipe.source.sourceRecipeUrl}" target="_blank">Get the recipe</a><p>
      <img src="${recipe.images[0].hostedMediumUrl}">
    </div>
    <div class="result drinkSugg">
      <h2>Drink: ${drink.producer_name} - ${drink.varietal} - ${drink.secondary_category}</h2>
      <img src="${drink.image_thumb_url}">
    </div>
  `;
  $(".resultsContainer").prepend(appSugg).fadeIn;
  $("#floatingCirclesG").hide();
  $(".retry").show();
}


app.selectEffort = function() {
  $(".noEffort, .lowEffort, .medEffort, .highEffort")
    .on("click", function(){
      if ($(this).hasClass("selected") && ($(this).hasClass("highlight"))) {
        $(".effort").not(".highlight").removeClass("selected");
      }
      $(this).addClass("selected").prevAll().addClass("selected");
    })
    .on("mouseenter", function(){
      $(this).addClass("highlight").prevAll().addClass("highlight");
    })
    .on("mouseleave", function(){
      $(this).removeClass("highlight").prevAll().removeClass("highlight");
    })

    $(".noDrunk, .lowDrunk, .medDrunk, .highDrunk")
    .on("click", function(){
      if ($(this).hasClass("drunkSelected") && ($(this).hasClass("drunkHighlight"))) {
        $(".drunk").not(".drunkHighlight").removeClass("drunkSelected");
      }
      $(this).addClass("drunkSelected").prevAll().addClass("drunkSelected");
    })
    .on("mouseenter", function(){
      $(this).addClass("drunkHighlight").prevAll().addClass("drunkHighlight");
    })
    .on("mouseleave", function(){
      $(this).removeClass("drunkHighlight").prevAll().removeClass("drunkHighlight");
    });
}

app.submitData = function(){
	$("form").on("submit", function(e){
    e.preventDefault();

    $("html, body").animate({ scrollTop: 0 }, "slow");

    app.genreSearch=$(".genre").val().toLowerCase();

    for (i=0; i<genre.length; i++) {
      if (app.genreSearch === genre[i].name) {
        app.genreId = genre[i].id;
        $(".genreError").hide();
        break;
      } else {
        app.genreId = 0;
        $(".genreError").show();
      }//end inner else
    };//end for loop
    
    if ($(".effort").hasClass("selected")) {
      $(".mealEffortError").hide();
    } else {
      $(".mealEffortError").show();
    } 

    if ($(".drunk").hasClass("drunkSelected")) {
      $(".drunkError").hide();
    } else {
      $(".drunkError").show();
    }

    if ( (app.genreId === 0) ||($(".mealEffortError").is(":visible")) ||  ($(".drunkError").is(":visible"))){
      return;
    }
  
    app.findData();
  
  });  
  
}

app.resetData = function(){
  $('button[type="reset"]').on("click", function(){
    $("input").html('');
    $(".error").hide();
    if ($("div.effort").hasClass("selected")) {
      $("div.effort").removeClass("selected");
    }
   if($(".drunk").hasClass("drunkSelected")) {
      $(".drunk").removeClass("drunkSelected");
   }
  });
}

app.retry = function() {
  $(".retry").on("click", function(e){
    e.preventDefault();
    $(".resultsContainer").html('');
    $("#floatingCirclesG").show();
    $("a.retry").hide();
    $("form").submit();
  });
}


app.init = function(){
  app.selectEffort()
  app.close();
  app.submitData();
  app.resetData();
  app.retry();
}

$(function() { // begin document ready
  app.init();
}); // end document ready

