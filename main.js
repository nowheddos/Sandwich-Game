var sandwiches = 0;
var autosaveEnabled = true;
var money = 5;
var sandwichTastiness = 1;
var sandwichCost = 1;
var selectedSandwich = "Breadwich";
var maxIngredientSelection = 3;
var recipeBook = new Array(["Breadwich", 1.05, 1.95,["Bread", "Bread", "Bread"]]);
//Ingrediets: name, tastiness, cost
var ingredients = [
["Bread", 1.25, 0.35],
["Cheese", 2, 0.50],
["Turkey", 1.5, 1],
["Tomato", 2, 0.50],
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
		var bns = calculateBonus(ingrListForBook);
		recipeTastiness *= bns[1] //add bonus
	recipeBook.unshift([form.sname.value, Number(recipeCost.toFixed(2)),Number(recipeTastiness.toFixed(2)), ingrListForBook]) //adds array to recipeBook
	updateRecipe(form.sname.value, recipeCost.toFixed(2),recipeTastiness.toFixed(2)); //updates values for html
		refreshBook();
	// document.getElementById("newRecipe").innerHTML = "Sandwich Name: " + form.sname.value + "<br>tastiness: " + sandwichTastiness + "<br>cost: " + sandwichCost + "<br>sell value: " + document.getElementById('sandwichSV').innerHTML;
}; //MEATY SHITE RIGHT HERE
function updateRecipe(name,tastiness,cost){ //update stats
	sandwichTastiness = tastiness;
	sandwichCost = cost;
	selectedSandwich = name;
	document.getElementById("sandwichTastiness").innerHTML = tastiness;
	document.getElementById("sandwichCost").innerHTML = cost;
	document.getElementById("currentSandwich").innerHTML = sanitizeHTML(name);
	document.getElementById("sandwichSV").innerHTML = (sandwichCost * 8/7).toFixed(2);
	document.getElementById("peopleTick").innerHTML = Math.floor(sandwichTastiness);
	document.getElementById("secondTick").innerHTML = +((2500/(sandwichTastiness/3))/1000).toFixed(2);
	sandwiches = 0;
}; updateRecipe("Breadwich", 1.05, 1.95);
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
		autosaveEnabled: autosaveEnabled
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
}; if(localStorage.getItem("saveData") !== null){window.onload = load();};
//recipe book shit
function swapRecipeBook(e){
	updateRecipe(recipeBook[e][0],recipeBook[e][1],recipeBook[e][2])
	document.getElementById("recipeOutput").innerHTML = sanitizeHTML(recipeBook[e][0]) + "<hr>" + recipeBook[e].slice(1,3).join('<br>') + "<br>Raw ingredients: " + recipeBook[e][3].join(', ');
};
swapRecipeBook(0);

// loop
function calculateBonus(ingrArray){ 
	console.log(ingrArray);
	var bonuses = new Array;
	var bonusTastiness = 1;
		if(ingrArray.indexOf("Bread") === 0 && ingrArray.indexOf("Bread",-1) === ingrArray.length - 1){
				//if bread is first and bread is last
				bonuses += "Bread bonus! (x1.5 Tastiness)";
				bonusTastiness *= 1.5;
		}
	return [bonuses,bonusTastiness]
}
window.setInterval(function(){ //looping thing
			for(i=0;i<Math.floor(sandwichTastiness);i++){
				if(sandwiches > 0){
		    		sandwiches--
					money += +(sandwichCost * 8/7).toFixed(2); //money += a little higher than cost, multiplied by floortastiness because more people want it
				};
			};
	document.getElementById("sandwichCount").innerHTML = sandwiches;
	document.getElementById("moneyCount").innerHTML = money.toFixed(2);
}, 2500/(sandwichTastiness/3)); //1000 = 1000ms = 1s

window.setInterval(function(){
	save();
}, 30000);