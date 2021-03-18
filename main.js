var sandwiches = 0;
var gameStage = 0;
var autosaveEnabled = true;
var money = 5;
var sandwichTastiness = 1;
var sandwichCost = 1;
var selectedSandwich = "Breadwich";
var maxIngredientSelection = 4;
var recipeBook = new Array(["Breadwich", 1.05, 1.95,["Bread", "Bread", "Bread"]]);
var timeSpeed = 1.20;
//Ingrediets: name, tastiness, cost
var ingredients = [
["Bread", 1.25, 0.35],
["Cheese", 2, 0.50],
["Turkey", 1.5, 1],
["Tomato", 2, 0.50],
["Bacon",1,1.5],
["Fried Egg",3,0.2],
["Lettuce",2.83,1.4],
["Water",-10,0]
]
function makeSandwich(amnt){
	if(money >= sandwichCost){ //check if can afford sandwich
		money = money-sandwichCost;// take money
		sandwiches = sandwiches + amnt; //make sandwich
		document.getElementById("sandwichCount").innerHTML = sandwiches; //set html
		document.getElementById("moneyCount").innerHTML = money.toFixed(2);
	};
};
function refreshBook(){
var fullOptions = new Array;
	for(i=0;i<recipeBook.length;i++){ //re
		console.log(fullOptions);
		fullOptions += "<option value='" + i + "'>" + recipeBook[i][0] + "</option><br>"
}; document.getElementById("recipeBookSelection").innerHTML = fullOptions;
swapRecipeBook(0);
}
// form shit
function sanitizeHTML(text) { //sanitize text
	var element = document.createElement('div');
	element.innerText = text;
	return element.innerHTML;
  }
function setIngredientSelect(maxIngredients){ //makes ingredient selectors (the dropdown stuff)
	var optionsTag = "";
	for(i=0;i<ingredients.length;i++){ //gets the <options> for all ingredients, sets them into the variable optionsTag
		optionsTag = optionsTag + "<option value= '" + i + "'>" + ingredients[i][0] + "</option>\n"
	};

	for(i = 0; i < maxIngredients; i++){ //sets up the <select>
		document.getElementById("ingredientSelect").outerHTML = [
			"<select id='ingrSelect" + i + "'>" + optionsTag + "</select><br>" + "<span id='ingredientSelect'></span>"
		];
	};
};
setIngredientSelect(maxIngredientSelection); //temporary
let form = document.getElementById('sandwichForm'); // form
function handleForm(event) { event.preventDefault(); }  // prevent submit from reloading
form.addEventListener('submit', handleForm); // copied and pasted code lmao

form.onsubmit = function() { //when submit buton is pressed
		var recipeStats = new Array;
		var recipeTastiness = 1;
		var recipeCost = 0;
		var ingrListForBook = [];
		var bns  = new Array;
	for(i=0;i<maxIngredientSelection;i++){ //generate array of stats ex: [[Bread,1,1],[Turkey,1.5,1.5],[Cheese,2,3],[Bread,1,1]]
								//  array            selection          number  value
		recipeStats.push(ingredients[eval("form.ingrSelect" + i + ".value")]) //put stuff on end
	};
		for(i=0;i<recipeStats.length;i++){ //find tastiness & cost
			console.log(recipeStats + " I:" + i + "tastiness: " + recipeTastiness + "stats: " + recipeStats[i][1]);
			recipeTastiness*=recipeStats[i][1]
			recipeCost+=recipeStats[i][2]
			ingrListForBook.unshift(recipeStats[i][0])
		}
		//everything calculated, now it's setting time
		bns = calculateBonus(ingrListForBook);
		console.log(recipeTastiness)
		recipeTastiness = recipeTastiness * Number(bns[1]) //add bonus
		console.log(recipeTastiness)
		console.log(bns)
		console.log(bns[0])
		document.getElementById("bonusOutput").innerHTML = bns[0];
	recipeBook.unshift([form.sname.value, Number(recipeTastiness.toFixed(2)),Number(recipeCost.toFixed(2)), ingrListForBook]) //adds array to recipeBook
	console.log(recipeBook)
	updateRecipe(form.sname.value, recipeCost.toFixed(2),recipeTastiness.toFixed(2)); //updates values for html
	if(gameStage === 1){
		gameStage++
		gameStageRender();
	}
	refreshBook();
	// document.getElementById("newRecipe").innerHTML = "Sandwich Name: " + form.sname.value + "<br>tastiness: " + sandwichTastiness + "<br>cost: " + sandwichCost + "<br>sell value: " + document.getElementById('sandwichSV').innerHTML;
}; //MEATY SHITE RIGHT HERE
function updateRecipe(name,tastiness,cost){ //update stats
	sandwichTastiness = tastiness;
	sandwichCost = cost;
	selectedSandwich = name;
	document.getElementById("sandwichTastiness").innerHTML = Number(tastiness).toFixed(2);
	document.getElementById("sandwichCost").innerHTML = Number(cost).toFixed(2);
	document.getElementById("currentSandwich").innerHTML = sanitizeHTML(name);
	document.getElementById("sandwichSV").innerHTML = (sandwichCost * 8/7).toFixed(2);
	document.getElementById("peopleTick").innerHTML = Math.floor(Math.cbrt(sandwichTastiness));
	document.getElementById("secondTick").innerHTML = Number(5000/timeSpeed^sandwichTastiness).toFixed(2)/1000;
	sandwiches = 0;
}; //updateRecipe("Breadwich", 1.05, 1.95);
//saving & loading
function save(){
	var saveData = {
		sandwiches: sandwiches,
		money: money,
		sandwichTastiness: sandwichTastiness,
		sandwichCost: sandwichCost,
		selectedSandwich: selectedSandwich,
		ingredients: ingredients,
		recipeBook: recipeBook,
		autosaveEnabled: autosaveEnabled,
		gameStage:gameStage
	}; 
	localStorage.setItem("saveData",JSON.stringify(saveData));
	console.log("Game saved");
	var d = new Date();
	document.getElementById("alertsBox").innerHTML = "Saved at " + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
};
function load(){
	var savegame = JSON.parse(localStorage.getItem("saveData"));
	money = savegame.money;
	sandwiches = savegame.sandwiches;
	sandwichTastiness = savegame.sandwichTastiness;
	sandwichCost = savegame.sandwichCost;
	selectedSandwich = savegame.selectedSandwich;
	ingredients = savegame.ingredients;
	recipeBook = savegame.recipeBook; 
	autosaveEnabled = savegame.autosaveEnabled; 
	gameStage = savegame.gameStage;
	gameStageRender()
	if(!autosaveEnabled){document.getElementById("autosaveBox").outerHTML = '<input id="autosaveBox" type="checkbox" oninput="autosaveEnabled = !autosaveEnabled;">'}; //check if autosave is disabled, replace if it is
	console.log(recipeBook);
	console.log(savegame.recipeBook);
		document.getElementById("sandwichCount").innerHTML = sandwiches;
		document.getElementById("moneyCount").innerHTML = money.toFixed(2);
		refreshBook();
		updateRecipe(String(selectedSandwich),sandwichTastiness,sandwichCost);
		console.log("game loaded successfully, money: " + money);
	var d = new Date();
	document.getElementById("alertsBox").innerHTML = "Loaded at " + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
}; if(localStorage.getItem("saveData") !== null){window.onload = load()} else {gameStageRender();}
//recipe book shit
function swapRecipeBook(e){
	updateRecipe(recipeBook[e][0],recipeBook[e][1],recipeBook[e][2])
	document.getElementById("recipeOutput").innerHTML = sanitizeHTML(recipeBook[e][0]) + "<hr>" + recipeBook[e].slice(1,3).join('<br>') + "<br>Raw ingredients: " + recipeBook[e][3].join(', ' ) + "<br>Bonuses:<br><div class='rainbow-text'>" + calculateBonus(recipeBook[e][3])[0] + "</div>";
};
swapRecipeBook(0);
function gameStageRender() { //game unlocks
	document.getElementById("recipeBookSection").className = "column";
	document.getElementById("craftingStation").className = "column";
	document.getElementById("logDiv").className = "column";
	document.getElementById("currentlyStats").className = "column";
	console.log("running")
	switch(gameStage){
		case 2:
			milestone("$15.00")
			document.getElementById("recipeBookSection").className = "invisible";
			document.getElementById("alertsBox").innerHTML = "Would be nice to have $15 for a recipe book..";
			break;
		case 1:
			milestone("Create a sandwich")
			console.log("1")
			document.getElementById("recipeBookSection").className = "invisible";
			document.getElementById("logDiv").className = "invisible";
			break;
		case 0:
			milestone("$5.50")
			document.getElementById("recipeBookSection").className = "invisible";
			document.getElementById("craftingStation").className = "invisible";
			document.getElementById("logDiv").className = "invisible";
			document.getElementById("currentlyStats").className = "invisible";
			console.log("0")
	}
}
function milestone(txt){document.getElementById("unlock").innerHTML = txt;}
// loop
window.setInterval(function(){ //looping thing
			for(i=0;i<Math.floor(Math.cbrt(sandwichTastiness));i++){
				if(sandwiches > 0){
		    		sandwiches--
					money += +(sandwichCost * 8/7).toFixed(2); //money += a little higher than cost, multiplied by floortastiness because more people want it
				};
			};
			if(money>=5.5 && gameStage === 0 || money >= 15 && gameStage === 2){
				gameStage++;
				gameStageRender();
			}
	document.getElementById("sandwichCount").innerHTML = sandwiches;
	document.getElementById("moneyCount").innerHTML = money.toFixed(2);
}, 5000/timeSpeed^sandwichTastiness); //1000 = 1000ms = 1s

window.setInterval(function(){
	save();
}, 30000);