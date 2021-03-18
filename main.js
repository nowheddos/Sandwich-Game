var sandwiches = 0;
var money = 5;
var sandwichTastiness = 1;
var sandwichCost = 1;
var selectedSandwich = "Breadwich";
var maxIngredientSelection = 3;
var recipieBook = new Array;
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

// form shit

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
	for(i=0;i<maxIngredientSelection;i++){ //generate array of stats ex: [[Bread,1,1],[Turkey,1.5,1.5],[Cheese,2,3],[Bread,1,1]]
								//  array            selection          number  value
		recipeStats.push(ingredients[eval("form.ingrSelect" + i + ".value")]) //put stuff on end
	};
		for(i=0;i<recipeStats.length;i++){ //find tastiness & cost
			recipeTastiness*=recipeStats[i][1]
			recipeCost+=recipeStats[i][2]
		}
	updateRecipe(form.sname.value, recipeCost.toFixed(2),recipeTastiness.toFixed(2));
	document.getElementById("newRecipe").innerHTML = "Sandwich Name: " + form.sname.value + "<br>tastiness: " + sandwichTastiness + "<br>cost: " + sandwichCost + "<br>sell value: " + document.getElementById('sandwichSV').innerHTML;
};

function updateRecipe(name,tastiness,cost){ //update stats
	sandwichTastiness = tastiness;
	sandwichCost = cost;
	selectedSandwich = name;
	document.getElementById("sandwichTastiness").innerHTML = tastiness;
	document.getElementById("sandwichCost").innerHTML = cost;
	document.getElementById("currentSandwich").innerHTML = name;
	document.getElementById("sandwichSV").innerHTML = (sandwichCost * 8/7).toFixed(2);
	document.getElementById("peopleTick").innerHTML = Math.floor(sandwichTastiness).toFixed(2);
	document.getElementById("secondTick").innerHTML = +((2500/sandwichTastiness)/1000).toFixed(2);
	sandwiches = 0;
}; updateRecipe("Breadwich", 1.05, 1.95);

window.setInterval(function(){ //looping thing
			for(i=0;i<Math.floor(sandwichTastiness);i++){
				if(sandwiches > 0){
		    		sandwiches--
					money += +(sandwichCost * 8/7).toFixed(2); //money += a little higher than cost, multiplied by floortastiness because more people want it
				};
			};
	document.getElementById("sandwichCount").innerHTML = sandwiches;
	document.getElementById("moneyCount").innerHTML = money.toFixed(2);
}, 2500/sandwichTastiness); //1000 = 1000ms = 1s