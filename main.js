var sandwiches = 0;
var gameStage = 0;
var autosaveEnabled = true;
var money = 5;
var sandwichTastiness = 1;
var sandwichCost = 1;
var selectedSandwich = "Breadwich";
var maxIngredientSelection = 4;
var recipeBook = new Array(["Breadwich", 1.05, 1.95,["White Bread", "White Bread", "White Bread"],["bread","bread","bread"]]);
var timeSpeed = 1.20;
var sellRatio = 8/7;
var profitsCost = 10;
var profitsAmount = 1;
var sandwichPoints = 0;
var SPS = 0;
//Ingrediets: name, tastiness, cost
function makeSandwich(amnt){
	if(money >= sandwichCost){ //check if can afford sandwich
		money = money-sandwichCost;// take money
		sandwiches = sandwiches + amnt; //make sandwich
		document.getElementById("sandwichCount").innerHTML = sandwiches; //set html
		document.getElementById("moneyCount").innerHTML = money.toFixed(2);
	};
};
function getRandomInt(max,rareness) {
	return Math.floor(Math.pow(Math.random(), rareness) * Math.floor(max));
  } //random number

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
function setIngredientSelect(){ //makes ingredient selectors (the dropdown stuff)
	var optionsTag = new Array;
	document.getElementById("opt").innerHTML = '<span id="ingredientSelect"></span>'
	for(i=0;i<ingredients.length;i++){ //gets the <options> for all ingredients, sets them into the variable optionsTag
		optionsTag.push("<option value='" + i + "'>" + ingredients[i][0] + "</option>\n")
		console.table(optionsTag)
	};
	console.log(optionsTag)
	for(i = 0; i < maxIngredientSelection; i++){ //sets up the <select>
		document.getElementById("ingredientSelect").outerHTML = [
			"<select id='ingrSelect" + i + "'>" + optionsTag + "</select><br>" + "<span id='ingredientSelect'></span>"
		];
	};
	const altar = optionsTag.reverse();
	altar.shift()
	document.getElementById("altarSelect").innerHTML = altar;
}
//temporary
//1 week later: it was not temporary.
let form = document.getElementById('sandwichForm'); // form
function handleForm(event) { event.preventDefault(); }  // prevent submit from reloading
form.addEventListener('submit', handleForm); // copied and pasted code lmao

form.onsubmit = function() { //when submit buton is pressed
	if(form.sname.value)
		var recipeStats = new Array;
		var recipeTastiness = 1;
		var recipeCost = 0;
		var ingrListForBook = new Array;
		var bns  = new Array;
		var rawTypes = new Array;
	for(i=0;i<maxIngredientSelection;i++){ //generate array of stats ex: [[Bread,1,1],[Turkey,1.5,1.5],[Cheese,2,3],[Bread,1,1]]
								//  array            selection          number  value
		recipeStats.push(ingredients[eval("form.ingrSelect" + i + ".value")]) //put stuff on end
	};
		for(i=0;i<recipeStats.length;i++){ //find tastiness & cost
			recipeTastiness*=recipeStats[i][1]
			recipeCost+=recipeStats[i][2]
			ingrListForBook.unshift(recipeStats[i][0])
			rawTypes.unshift(recipeStats[i][3])
		}
		console.table(recipeStats);
		//everything calculated, now it's setting time
		bns = calculateBonus(ingrListForBook,rawTypes);
		console.log(recipeTastiness)
		recipeTastiness = recipeTastiness * Number(bns[1]) //add bonus
		console.log(recipeTastiness)
		console.log(bns)
		console.log(bns[0])
		document.getElementById("bonusOutput").innerHTML = bns[0];
	recipeBook.unshift([form.sname.value, Number(recipeTastiness.toFixed(2)),Number(recipeCost.toFixed(2)), ingrListForBook, rawTypes]) //adds array to recipeBook
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
	money += sandwiches * sandwichCost;
	sandwiches = 0;
	sandwichTastiness = tastiness;
	sandwichCost = cost;
	selectedSandwich = name;
	document.getElementById("sandwichCost").innerHTML = Number(cost).toFixed(2);
	document.getElementById("currentSandwich").innerHTML = sanitizeHTML(name);
	document.getElementById("sandwichSV").innerHTML = (sandwichCost * sellRatio + 0.1).toFixed(2);
	document.getElementById("peopleTick").innerHTML = Math.ceil(Math.cbrt(sandwichTastiness*1.5));
	document.getElementById("secondTick").innerHTML = (Number(5000/Math.pow(timeSpeed,sandwichTastiness/5))/1000).toFixed(1);
	document.getElementById("sandwichCount").innerHTML = sandwiches;
	document.getElementById("moneyCount").innerHTML = money.toFixed(2);
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
		gameStage:gameStage,
		ingredientBank:ingredientBank,
		maxIngredientSelection:maxIngredientSelection,
		sellRatio:sellRatio,
		profitsCost:profitsCost,
		profitsAmount:profitsAmount,
		sandwichPoints:sandwichPoints,
		SPS:SPS
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
	ingredientBank = savegame.ingredientBank;
	maxIngredientSelection = savegame.maxIngredientSelection;
	sellRatio = savegame.sellRatio;
	profitsCost = savegame.profitsCost;
	profitsAmount = savegame.profitsAmount;
	sandwichPoints = savegame.sandwichPoints;
	SPS = savegame.SPS;
	document.getElementById('profitsCost').innerHTML = "$" + profitsCost.toFixed(2);
	document.getElementById('maxCost').innerHTML = "SP:" + Math.floor(Math.pow(maxIngredientSelection,7));
	document.getElementById('SandwichPerSecond').innerHTML = SPS;
	document.getElementById('ingrCost').innerHTML = "$" + Math.abs(Math.pow(ingredients.length-2,1.6)-1.365).toFixed(2)
	makeInvis()
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
}; if(localStorage.getItem("saveData") !== null){window.onload = load()} else {makeInvis();gameStageRender();}
setIngredientSelect(); 
//recipe book shit
function swapRecipeBook(e){
	updateRecipe(recipeBook[e][0],recipeBook[e][1],recipeBook[e][2])
	//outputs recipe into a table
	if(calculateBonus(recipeBook[e][3],recipeBook[e][4])[0].length === 0){
		document.getElementById("recipeOutput").innerHTML = "<i>\"" + sanitizeHTML(recipeBook[e][0]) + `
		\"</i> recipe breakdown:<hr>
		<table
			<tr>
				<td width='20px'>Tastiness:</td>
				<td>` + recipeBook[e][1] + `</td>
			</tr>
			<tr>
				<td>Cost:</td>
				<td>$` + Number(recipeBook[e][2]).toFixed(2) + `</td>
			</tr>
			<tr>
				<td>Sell value: </td>
				<td id='sellValue'>$` + Number(recipeBook[e][2] * sellRatio + 0.1).toFixed(2) + `</td>
			</tr>
			<tr>
				<td rowspan='` + Number(recipeBook[e][3].length+1) + `'>Raw ingredients:</td>
				<tr><td>` + recipeBook[e][3].reverse().join('</td></tr>\n<tr><td>') + `</td>
			</tr>
		</table>`;
	} else {
	document.getElementById("recipeOutput").innerHTML = "<i>\"" + sanitizeHTML(recipeBook[e][0]) + "\"</i> recipe breakdown:<br><table><tr><td width='20px'>Tastiness:</td>\n<td>" + recipeBook[e][1] + "</td></tr>\n<tr><td>Cost:</td>\n<td>$" + Number(recipeBook[e][2]).toFixed(2) + "</td></tr>\n<tr><td>Sell value: </td><td id='sellValue'>$" + Number(recipeBook[e][2] * sellRatio + 0.1).toFixed(2) + "</td>\n</tr>\n<tr><td rowspan='" + Number(recipeBook[e][3].length+1) + "'>Raw ingredients:</td>\n<tr><td>" + recipeBook[e][3].reverse().join('</td></tr>\n<tr><td>') + "</td></tr><tr><td class='rainbow-text'>Bonuses:</td><td class='rainbow-text'>" + calculateBonus(recipeBook[e][3],recipeBook[e][4])[0] + "</td></tr></table>";
	}
};
swapRecipeBook(0);
					//shop shit		
function buyProfits(){   //cost of this profits
    if(money >= profitsCost){  
        sellRatio *= 1.07				                  //increases profits
    	money -= profitsCost;                     		     //removes cash spent
		profitsCost = +(Math.pow(profitsCost,1.17)).toFixed(2);
		document.getElementById('sandwichSV').innerHTML = (sandwichCost * sellRatio + 0.1).toFixed(2);
		document.getElementById('sellValue').innerHTML = "$" + (sandwichCost * sellRatio + 0.1).toFixed(2); //sell area in table array
        document.getElementById('moneyCount').innerHTML = money.toFixed(2); 
		document.getElementById('profitsCost').innerHTML = "$" + profitsCost.toFixed(2); //how much to increase  profits
    } else {document.getElementById("alertsBox").innerHTML = "Not enough! Need $" + profitsCost.toFixed(2) + ", you only have $" + money.toFixed(2) + ".";}
};

function buyIngredient(rns,price){
    if(money>=price && ingredientBank.length > 0){
        money -= price;
		getIngredient(getRandomInt(ingredientBank.length,rns))
		document.getElementById('ingrCost').innerHTML = "$" + Math.abs(Math.pow(ingredients.length-2,1.6)-1.365).toFixed(2)
        document.getElementById("moneyCount").innerHTML =  money.toFixed(2);
    } else if(ingredientBank.length === 0){
		document.getElementById("alertsBox").innerHTML = "No more ingredients to get.";
	} else {
		document.getElementById("alertsBox").innerHTML = "Not enough! Need $" + price.toFixed(2) + ", you only have $" + money.toFixed(2) + ".";
	}
}
//function updateCraftPreview(){

//} do later :)

// loop
function calculateSandwichPoints(bam){ //calculates amnt of Sandwich points/second for ingredient sacrificed
	return Math.floor(ingredients[bam][1]*ingredients[bam][2]*50)
};
function sacrifice(val) {
	if(ingredients.length>4){
		SPS += calculateSandwichPoints(val);
		ingredients.splice(val,1);
		setIngredientSelect()
		document.getElementById('SandwichPerSecond').innerHTML = SPS;
		document.getElementById('ingrCost').innerHTML = "$" + Math.abs(Math.pow(ingredients.length-2,1.6)-1.365).toFixed(2)
	} else {
		document.getElementById("alertsBox").innerHTML = "I don't think you should Sacrifice with an ingredient count that low...";
	}
}
function buyMax(){
	if(sandwichPoints>=Math.floor(Math.pow(maxIngredientSelection,7))){
        sandwichPoints -= Math.floor(Math.pow(maxIngredientSelection,7));
		maxIngredientSelection++;
		document.getElementById('maxCost').innerHTML = "SP:" + Math.floor(Math.pow(maxIngredientSelection,7));
        document.getElementById("SandwichPointCount").innerHTML =  sandwichPoints;
		setIngredientSelect()
    } else {
		document.getElementById("alertsBox").innerHTML = "Not enough! Need SP:" + Math.floor(Math.pow(maxIngredientSelection,7)) + ", you only have SP:" + sandwichPoints + ".";
	}
}
document.getElementById('maxCost').innerHTML = "SP:" + Math.floor(Math.pow(maxIngredientSelection,7));
document.getElementById('hypotheticalSandwichPerSecond').innerHTML = calculateSandwichPoints(altarSelect.value)
window.setInterval(function(){ //looping thing
			for(i=0;i<Math.ceil(Math.cbrt(sandwichTastiness*1.5));i++){
				if(sandwiches > 0){
		    		sandwiches--
					money += +(sandwichCost * sellRatio + 0.1).toFixed(2); //money += a little higher than cost, multiplied by floortastiness because more people want it
				};
			};
			if(money>=5.5 && gameStage === 0 || money >= 15 && gameStage === 2 || money >= 25 && gameStage === 3 || money >= 35 && gameStage === 4){
				gameStage++;
				gameStageRender();
			}
	document.getElementById("sandwichCount").innerHTML = sandwiches;
	document.getElementById("moneyCount").innerHTML = money.toFixed(2);
}, Number(5000/(Math.pow(timeSpeed,sandwichTastiness/5)))); //1000 = 1000ms = 1s
window.setInterval(function(){
	sandwichPoints += SPS;
	document.getElementById('SandwichPointCount').innerHTML = sandwichPoints
}, 1000);
window.setInterval(function(){
	save();
}, 30000);