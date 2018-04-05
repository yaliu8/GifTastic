var food = ["tacos", "pasta", "sandwich", "burger", "baguette", "pizza", "burrito", "sushi"];

$("#find-foods").on("click", function(event) {
      
event.preventDefault();

var baguette = $("#food-input").val();

$("#food-input").val("");
food.push(baguette.trim());
renderButtons();
});

function renderButtons() {
    $("#foodButtons").empty();
    	for (i=0; i<food.length; i++){
    		$("#foodButtons").append("<button class='add-foods btn btn-primary' style='margin:10px;'>"+food[i]+"</button>");
    }
}

$(document).on("click", ".add-foods", getfoodInfoFromAPI);

function getfoodInfoFromAPI(){
    var foodInfo = "";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=edqxQ8eHWlSfw3S6LlsK85zTjq5VikCP&limit=10&q="+ this.textContent;
      	$.ajax({
        	url: queryURL,
        	method:'GET'}).done(function(response){displayfoodInfo(response);})
}

renderButtons();

var myID = 0;
function displayfoodInfo(response){
    $("#food-view").empty();
    var imageArray = response.data;
    var myHTML = "";
    for (i = 0; i < imageArray.length; i++) {
    var rating = imageArray[i].rating;
    if(rating == "g" || rating == "pg13"){
    myHTML += "<div class='col-md-3 gif'><p>Rating: "+rating+"</p><p><img animatedSrc = '"+imageArray[i].images.fixed_height_small.url+"' stillSrc = '"+imageArray[i].images.fixed_height_small_still.url+"'src='"+imageArray[i].images.fixed_height_small_still.url+"'></p></div>";
    }
}

$("#food-view").append(myHTML);
}

$(document.body).on("click", "img", function() {
    var isAnimated = $(this).attr("isAnimated");
    if(isAnimated==null || isAnimated=='' ){
    isAnimated =  "false";
}

if(isAnimated=="true"){
    $(this).attr("src",  $(this).attr("stillSrc"));
    $(this).attr("isAnimated", "false");

} else {
    $(this).attr("src",  $(this).attr("animatedSrc"));
    $(this).attr("isAnimated", "true");
}
});
