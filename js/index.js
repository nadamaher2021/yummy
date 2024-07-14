///  <reference types="../@types/jquery"/>


//open navbar
function openNav() {
    $(".side-navbar").animate({
        left: 0
    }, 500)


    $("#mainIcon").removeClass("fa-align-justify");
    $("#mainIcon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeNav() {
    let boxWidth = $(".side-navbar .links").outerWidth()
    $(".side-navbar").animate({
        left: -boxWidth
    }, 500)

    $("#mainIcon").addClass("fa-align-justify");
    $("#mainIcon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeNav()
$(".side-navbar #mainIcon").click(() => {
    if ($(".side-navbar").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

//searchData by name////////////////////////////////////////////////////////////////////////////////////////////

let nameInput = document.getElementById("nameInput");

nameInput.addEventListener("keyup", function(){
    getSearchData(nameInput.value);
})


var searchList = []

async function getSearchData(x){
    $(".inner-loading-screen").fadeIn(300)
      var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
    var apiData = await apiResponse.json() ;
    searchList = apiData ;

    document.getElementById("inputsBox").style.display = "block"
    document.getElementById("box").innerHTML = '' ;


    $("#navbar").animate({left:-boxWidth},500); 
    $("#mainIcon").removeClass("fa-xmark").addClass("fa-list-ul");  
   
    $(".inner-loading-screen").fadeOut(300)

    displaySearchData();
}

function displaySearchData(){
    let cartona = ''
    for(var i = 0 ; i < searchList.meals.length ; i++){
        cartona += `  <div class="col-md-3">
        <div class="meal">
            <img class="w-100" src="${searchList.meals[i].strMealThumb}" alt="meal photo">
            <div class="bg-light bg-opacity-75 p-3 fw-bold layer"><p class="fs-4">${searchList.meals[i].strMeal}</p></div>
        </div>
    </div>`
    }
    document.getElementById("box").innerHTML = cartona ;   
}
///////////////////////////////////////////////////////
let letterInput = document.getElementById("letterInput");

letterInput.addEventListener("keyup" , function(){
    getsearchLetter(letterInput.value);
})

var searchList2 = []

async function getsearchLetter(y){
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${y}`);
    var apiData = await apiResponse.json() ;
    searchList2 = apiData ;

    document.getElementById("box").innerHTML = '' ;

    displaysearchLetter();
}

function displaysearchLetter(){
    let cartona = ''
    for(var i = 0 ; i < searchList2.meals.length ; i++){
        cartona += `  <div class="col-md-3">
        <div class="meal">
            <img class="w-100" src="${searchList2.meals[i].strMealThumb}" alt="meal photo">
            <div class="bg-light bg-opacity-75 p-3 fw-bold layer"><p class="fs-4">${searchList2.meals[i].strMeal}</p></div>
        </div>
    </div>`
    }
    document.getElementById("box").innerHTML = cartona ;   
}



//display meals///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var container = []; 

async function getHomeData(){
  $(".inner-loading-screen").fadeIn(300)
    var apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")  ;
    var apiData = await apiResponse.json() ;

    displayHomeData(apiData)
    $(".inner-loading-screen").fadeOut(300)
}
getHomeData();

function displayHomeData(container){
    let cartona = ''
    for(var i = 0 ; i < container.meals.length ; i++){
        cartona += `  <div class="col-md-3">
        <div class="meal">
            <img class="w-100" src="${container.meals[i].strMealThumb}" alt="meal photo">
            <div onclick="getMealData(${container.meals[i].idMeal})" class="bg-light bg-opacity-75 p-3 fw-bold layer"><h2 class="fs-4">${container.meals[i].strMeal}</h2></div>
        </div>
    </div>`
    }
    document.getElementById("box").innerHTML = cartona ;
    document.getElementById("inputsBox").style.display = "none"
}
async function filterByCatego(catego){  
  $(".inner-loading-screen").fadeIn(300)
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catego}`);
    var apiData = await apiResponse.json();

    displayHomeData(apiData);  
    $(".inner-loading-screen").fadeOut(300)
    
}


//get category//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var category = [];

async function getCategoData(){
  $(".inner-loading-screen").fadeIn(300)
    var apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")  ;
    var apiData = await apiResponse.json() ;
    category = apiData ;

    displayCategoData();
    $(".inner-loading-screen").fadeOut(300)
}

function displayCategoData(){
    let cartona = ''
    for(var i = 0 ; i < category.categories.length ; i++){
        cartona += `  <div class="col-md-3">
        <div class="mealTwo">
            <img class="w-100" src="${category.categories[i].strCategoryThumb}" alt="meal photo">
            <div onclick="filterByCatego('${category.categories[i].strCategory}')" class="text-center bg-light bg-opacity-75 p-4 pt-2 layerTwo">
            <p class="fw-bolder fs-4 pb-0 mb-1">${category.categories[i].strCategory}</p>
            <p class="desc pt-0 mt-0">${category.categories[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`
    }

    document.getElementById("box").innerHTML = cartona ;
    document.getElementById("inputsBox").style.display = "none"

    closeNav()
    $("#mainIcon").removeClass("fa-xmark").addClass("fa-list-ul");   
}

//get area////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function filterByArea(area){  

    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    var apiData = await apiResponse.json();

    displayHomeData(apiData); 
  
}

let area = [];

async function getAreaData(){
  $(".inner-loading-screen").fadeIn(300)
    var apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")  ;
    var apiData = await apiResponse.json() ;
    area = apiData ;

    displayAreaData();
    $(".inner-loading-screen").fadeOut(300)
}

function displayAreaData(){
    let cartona = ''
    for(var i = 0 ; i < area.meals.length ; i++){
        cartona += `<div class="col-md-3 country">
        <div onclick="filterByArea('${area.meals[i].strArea}')" class="text-center text-white bg-dark bg-opacity-75 p-3 pb-0 rounded-4">
            <i class="fa-solid fa-map-location-dot fs-2" style="color: #ffffff;"></i>
            <p class="fs-3 pb-2 fw-bold">${area.meals[i].strArea}</p>
        </div>
    </div>`
    }

    document.getElementById("box").innerHTML = cartona ;
    document.getElementById("inputsBox").style.display = "none"
    closeNav()
    $("#mainIcon").removeClass("fa-xmark").addClass("fa-list-ul");   
}
//get ingredients///////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function filterByIngred(ingred){  
  $(".inner-loading-screen").fadeIn(300)
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`);
    var apiData = await apiResponse.json();

    displayHomeData(apiData); 
    $(".inner-loading-screen").fadeOut(300)
}

var ingredients = [];

async function getIngredData(){
  $(".inner-loading-screen").fadeIn(300)
    var apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")  ;
    var apiData = await apiResponse.json() ;
    ingredients = apiData ;

    displayIngredData();
    $(".inner-loading-screen").fadeOut(300)
}

function displayIngredData(){
    let cartona = ''
    for(var i = 0 ; i < 20 ; i++){
        cartona += `  <div class="col-md-3">
        <div onclick="filterByIngred('${ingredients.meals[i].strIngredient}')"  class="ingred text-center text-white bg-dark bg-opacity-75 p-3 overflow-hidden rounded-4">
            <img class="ingredImage pb-2" src="https://www.themealdb.com/images/ingredients/${ingredients.meals[i].strIngredient}-Small.png">
            <h3 class="pb-2 fs-5">${ingredients.meals[i].strIngredient}</h3>
            <p>${ingredients.meals[i].strDescription}</p>
        </div>
    </div>`
    }

    document.getElementById("box").innerHTML = cartona ;
    document.getElementById("inputsBox").style.display = "none"

    closeNav()
    $("#mainIcon").removeClass("fa-xmark").addClass("fa-list-ul");   
}
//get meal details///////////////////////////////////////////////////////////////////////

var details = [];

async function getMealData(id){
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)  ;
    var apiData = await apiResponse.json() ;
    details = apiData ;

    displayMealData()
}

function displayMealData(){
    let cartona = ''
    for(var i = 0 ; i < 1 ; i++){

        cartona += ` <div class=" row openBox text-white pt-4 pb-3 ">

        <div class="col-md-4">
            <img src="${details.meals[i].strMealThumb}" class="w-100 ">
            <p class="fs-3 fw-bold">${details.meals[i].strMeal}</p>
        </div>

        <div class="col-md-8">
                     <div class="instr h-50 mb-2">  <h2 class="text-white">Instructions</h2>
            <p>${details.meals[i].strInstructions}</p>  </div>
           <div>
            <h3><span>Area</span> : ${details.meals[i].strArea}</h3>
            <h3><span>Category</span> : ${details.meals[i].strCategory}</h3>
            <h3>Recipes :</h3>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure1} ${details.meals[i].strIngredient1}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure2} ${details.meals[i].strIngredient2}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure3} ${details.meals[i].strIngredient3}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure4} ${details.meals[i].strIngredient4}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure5} ${details.meals[i].strIngredient5}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure6} ${details.meals[i].strIngredient6}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure7} ${details.meals[i].strIngredient7}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure8} ${details.meals[i].strIngredient8}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure9} ${details.meals[i].strIngredient9}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure10} ${details.meals[i].strIngredient10}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure11} ${details.meals[i].strIngredient11}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure12} ${details.meals[i].strIngredient12}</span>
            <span class="mySpan btn bg-info-subtle mt-2 mb-2">${details.meals[i].strMeasure13} ${details.meals[i].strIngredient13}</span>
            <h3 class="mt-2">Tags :</h3>
            <h3 class="mySpan btn bg-info mt-2 mb-2">${details.meals[i].strTags}<h3/>
            <a class="btn btn-success" href="${details.meals[i].strYoutube}"target="_blank">Source</a>
            <a class="btn btn-danger" href="${details.meals[i].strSource}"target="_blank">Youtube</a>
            </div>
           
        </div>
</div>
    </div>`
    }

    document.getElementById("box").innerHTML = cartona ;

    closeNav()
    $("#mainIcon").removeClass("fa-xmark").addClass("fa-list-ul"); 
}
//get contact////////////////////////////////////////////////////////////////////////////
function showContactPage(){

    var temp = `<div id="contact" class="pe-0 pt-5">
    <form class="row g-4 p-4 pt-5 justify-content-center justify-content-around">
    <div class="col-md-6">
      <input type="text" class="form-control" placeholder="Enter your name">
    </div>
    <div class="col-md-6">
      <input type="email" class="form-control" placeholder="Enter your email">
    </div>
    <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Enter your phone">
    </div>
    <div class="col-md-6">
        <input type="number" class="form-control" placeholder="Enter your age">
    </div>
    <div class="col-md-6">
        <input type="password" class="form-control" placeholder="Enter your password">
    </div>
    <div class="col-md-6">
        <input type="password" class="form-control" placeholder="re-password">
    </div>
    <div class="text-center">
        <button type="button" class="btn btn-light">Submit</button>
    </div>
    </form></div>`

    document.getElementById("box").innerHTML = temp ;
    document.getElementById("inputsBox").style.display = "none" ;


    closeNav()
    $("#mainIcon").removeClass("fa-xmark").addClass("fa-list-ul"); 
}