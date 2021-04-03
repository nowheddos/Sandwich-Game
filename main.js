var sandwiches = 0;
var gameStage = 0;
var autosaveEnabled = true;
var money = 5;
var moneyTotal = 5;
var sandwichTastiness = 1;
var sandwichCost = 1;
var selectedSandwich = "Water Sandwich";
var maxIngredientSelection = 4;
var recipeBook = new Array(["Water Sandwich", 1.85, 2.45, ["White Bread", "Water", "White Bread"],
    ["bread", "sauce", "bread"]
]);
var timeSpeed = 1.30;
var sellRatio = 8 / 7;
var profitsCost = 10;
var profitsAmount = 1;
var sandwichPoints = 0;
var SPS = 0;
var machinery = [
    [100, 100]
];
var toggleMachinery = false;
var startLoop;
var botUpgrades = [1, 1, false];
//Ingrediets: name, tastiness, cost
if (navigator.userAgent.match(/Mobile/)) {
    var tmp = document.getElementById('Automation').outerHTML;
    document.getElementById('Automation').outerHTML = ''
    document.getElementById('automationMobile').outerHTML = tmp;
} else {
    document.getElementById('automationMobile').outerHTML = '';
} //fixes css on mobile devices
function makeSandwich(amnt) {
    console.log(amnt)
    if (money >= sandwichCost * amnt) { //check if can afford sandwich
        money = money - sandwichCost * amnt; // take money
        sandwiches = sandwiches + amnt; //make sandwich
        document.getElementById("sandwichCount").innerHTML = sandwiches; //set html
        document.getElementById("moneyCount").innerHTML = money.toFixed(2);
    } else { console.log("Can't afford!") }
};

function getRandomInt(max, rareness) {
    return Math.floor(Math.pow(Math.random(), rareness) * Math.floor(max));
} //random number

function refreshBook() {
    var fullOptions = new Array;
    for (i = 0; i < recipeBook.length; i++) { //re
        console.log(fullOptions);
        fullOptions += "<option value='" + i + "'>" + recipeBook[i][0] + "</option><br>"
    };
    document.getElementById("recipeBookSelection").innerHTML = fullOptions;
    swapRecipeBook(0);
}
// form shit
function sanitizeHTML(text) { //sanitize text
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

function setIngredientSelect() { //makes ingredient selectors (the dropdown stuff)
    var optionsTag = new Array;
    document.getElementById("opt").innerHTML = '<span id="ingredientSelect"></span>'
    for (i = 0; i < ingredients.length; i++) { //gets the <options> for all ingredients, sets them into the variable optionsTag
        optionsTag.push("<option value='" + i + "'>" + ingredients[i][0] + "</option>\n")
    };
    console.log(optionsTag)
    for (i = 0; i < maxIngredientSelection; i++) { //sets up the <select>
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
//2 weeks later: it was not temporary.
let form = document.getElementById('sandwichForm'); // form
function handleForm(event) { event.preventDefault(); } // prevent submit from reloading
form.addEventListener('submit', handleForm); // copied and pasted code lmao

form.onsubmit = function() { //when submit buton is pressed
    if (form.sname.value)
        var recipeStats = new Array;
    var recipeTastiness = 1;
    var recipeCost = 0;
    var ingrListForBook = new Array;
    var bns = new Array;
    var rawTypes = new Array;
    for (i = 0; i < maxIngredientSelection; i++) { //generate array of stats ex: [[Bread,1,1],[Turkey,1.5,1.5],[Cheese,2,3],[Bread,1,1]]
        //  array            selection          number  value
        recipeStats.push(ingredients[eval("form.ingrSelect" + i + ".value")]) //put stuff on end
    };
    for (i = 0; i < recipeStats.length; i++) { //find tastiness & cost
        recipeTastiness *= recipeStats[i][1]
        recipeCost += recipeStats[i][2]
        ingrListForBook.unshift(recipeStats[i][0])
        rawTypes.unshift(recipeStats[i][3])
    }
    console.table(recipeStats);
    //everything calculated, now it's setting time
    bns = calculateBonus(ingrListForBook, rawTypes);
    console.log(recipeTastiness)
    recipeTastiness = recipeTastiness * Number(bns[1]) //add bonus
    console.log(recipeTastiness)
    console.log(bns)
    console.log(bns[0])
    document.getElementById("bonusOutput").innerHTML = bns[0];
    recipeBook.unshift([form.sname.value, Number(recipeTastiness.toFixed(2)), Number(recipeCost.toFixed(2)), ingrListForBook, rawTypes]) //adds array to recipeBook
    console.log(recipeBook)
    updateRecipe(form.sname.value, recipeCost.toFixed(2), recipeTastiness.toFixed(2)); //updates values for html
    if (gameStage === 1) {
        gameStage++
        gameStageRender();
    }
    refreshBook();
    // document.getElementById("newRecipe").innerHTML = "Sandwich Name: " + form.sname.value + "<br>tastiness: " + sandwichTastiness + "<br>cost: " + sandwichCost + "<br>sell value: " + document.getElementById('sandwichSV').innerHTML;
}; //MEATY SHITE RIGHT HERE
function updateRecipe(name, tastiness, cost) { //update stats
    money += sandwiches * sandwichCost;
    sandwiches = 0;
    sandwichTastiness = tastiness;
    sandwichCost = cost;
    selectedSandwich = name;
    document.getElementById("sandwichCost").innerHTML = Number(cost).toFixed(2);
    document.getElementById("currentSandwich").innerHTML = sanitizeHTML(name);
    document.getElementById("sandwichSV").innerHTML = (sandwichCost * sellRatio + 0.1).toFixed(2);
    document.getElementById("peopleTick").innerHTML = Math.ceil(Math.cbrt(sandwichTastiness * 1.5));
    document.getElementById("secondTick").innerHTML = (Number(5000 / Math.pow(timeSpeed, sandwichTastiness / 5)) / 1000).toFixed(1);
    document.getElementById("sandwichCount").innerHTML = sandwiches;
    document.getElementById("moneyCount").innerHTML = money.toFixed(2);
}; //updateRecipe("Water Sandwich", 1.05, 1.95);
//saving & loading

//recipe book shit
function swapRecipeBook(e) {
    updateRecipe(recipeBook[e][0], recipeBook[e][1], recipeBook[e][2])
        //outputs recipe into a table
    if (calculateBonus(recipeBook[e][3], recipeBook[e][4])[0].length === 0) {
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
				<td rowspan='` + Number(recipeBook[e][3].length + 1) + `'>Raw ingredients:</td>
				<tr><td>` + recipeBook[e][3].reverse().join('</td></tr>\n<tr><td>') + `</td>
			</tr>
		</table>`;
    } else {
        document.getElementById("recipeOutput").innerHTML = "<i>\"" + sanitizeHTML(recipeBook[e][0]) + "\"</i> recipe breakdown:<br><table><tr><td width='20px'>Tastiness:</td>\n<td>" + recipeBook[e][1] + "</td></tr>\n<tr><td>Cost:</td>\n<td>$" + Number(recipeBook[e][2]).toFixed(2) + "</td></tr>\n<tr><td>Sell value: </td><td id='sellValue'>$" + Number(recipeBook[e][2] * sellRatio + 0.1).toFixed(2) + "</td>\n</tr>\n<tr><td rowspan='" + Number(recipeBook[e][3].length + 1) + "'>Raw ingredients:</td>\n<tr><td>" + recipeBook[e][3].reverse().join('</td></tr>\n<tr><td>') + "</td></tr><tr><td class='rainbow-text'>Bonuses:</td><td class='rainbow-text'>" + calculateBonus(recipeBook[e][3], recipeBook[e][4])[0] + "</td></tr></table>";
    }
};
swapRecipeBook(0);
//shop shit		
function buyProfits() { //cost of this profits
    if (money >= profitsCost) {
        sellRatio *= 1.05 //increases profits
        money -= profitsCost; //removes cash spent
        profitsCost = +(Math.pow(profitsCost, 1.17)).toFixed(2);
        document.getElementById('sandwichSV').innerHTML = (sandwichCost * sellRatio + 0.1).toFixed(2);
        document.getElementById('sellValue').innerHTML = "$" + (sandwichCost * sellRatio + 0.1).toFixed(2); //sell area in table array
        document.getElementById('moneyCount').innerHTML = money.toFixed(2);
        document.getElementById('profitsCost').innerHTML = "$" + profitsCost.toFixed(2); //how much to increase  profits
    } else { document.getElementById("alertsBox").innerHTML = "Not enough! Need $" + profitsCost.toFixed(2) + ", you only have $" + money.toFixed(2) + "."; }
};

function buyIngredient(rns, price) {
    if (money >= price && ingredientBank.length > 0) {
        money -= price;
        getIngredient(getRandomInt(ingredientBank.length, rns))
        document.getElementById('ingrCost').innerHTML = "$" + Math.abs(Math.pow(ingredients.length - 3, 2.3) - 1.365).toFixed(2)
        document.getElementById("moneyCount").innerHTML = money.toFixed(2);
    } else if (ingredientBank.length === 0) {
        document.getElementById("alertsBox").innerHTML = "No more ingredients to get.";
    } else {
        document.getElementById("alertsBox").innerHTML = "Not enough! Need $" + price.toFixed(2) + ", you only have $" + money.toFixed(2) + ".";
    }
}
//function updateCraftPreview(){
//} do later :)
// loop

function sacrifice(val) {
    document.getElementById('hypotheticalSandwichPerSecond').innerHTML = calculateSandwichPoints(altarSelect.value)
    if (ingredients.length > 4) {
        SPS += calculateSandwichPoints(val);
        ingredientsSacrificed = ingredientsSacrificed.concat(ingredients.splice(val, 1));
        setIngredientSelect()
        document.getElementById('SandwichPerSecond').innerHTML = SPS;
        document.getElementById('ingrCost').innerHTML = "$" + Math.abs(Math.pow(ingredients.length - 3, 2.3) - 1.365).toFixed(2)
    } else {
        document.getElementById("alertsBox").innerHTML = "I don't think you should Sacrifice with an ingredient count that low...";
    }
}

function buyMax() {
    if (sandwichPoints >= Math.floor(Math.pow(maxIngredientSelection, 8))) {
        sandwichPoints -= Math.floor(Math.pow(maxIngredientSelection, 8));
        maxIngredientSelection++;
        document.getElementById('maxCost').innerHTML = "SP:" + Math.floor(Math.pow(maxIngredientSelection, 8));
        document.getElementById("SandwichPointCount").innerHTML = sandwichPoints;
        setIngredientSelect()
    } else {
        document.getElementById("alertsBox").innerHTML = "Not enough! Need SP:" + Math.floor(Math.pow(maxIngredientSelection, 8)) + ", you only have SP:" + sandwichPoints + ".";
    }
}

function refreshMachineryFull() {
    document.getElementById("automakerList").innerHTML = `
	<tr>
		<td>Name</td>
		<td>Durability</td>
		<td colspan="2">Charge</td>
	</tr>` //machinery reset
    for (i = 0; machinery.length > i; i++) {
        document.getElementById("automakerList").innerHTML += `
		<tr>
			<td style="font-size:70%">Automaker ` + Number(i + 1) + `</td>
			<td style="padding:0"><div id="durability` + i + `"style="font-size:80%;text-align: center;height:100%;width:` + machinery[i][0] + `%;background: rgb(0, 212, 0);">` + machinery[i][0].toFixed(1) + `%</div></td>
			<td style="padding:0;width:45%"><div id="charge` + i + `" style="font-size:80%;text-align: center;height:100%;width:` + machinery[i][1] + `%;background: rgb(0, 212, 0);">` + machinery[i][1].toFixed(1) + `%</div></td>
			<td style="padding:0"><button onclick="recharge(` + i + `)" class="button">Charge<br>SP:5000</button></td>
		</tr>`
    }
}

function refreshMachinery() { //refreshes values for machinery in that tab
    for (i = 0; machinery.length > i; i++) {
        if (machinery[i][0] <= 0) {
            machinery.splice(i, 1);
            document.getElementById("sandwichMakerCost").innerHTML = "$" + (Math.pow(5.25, machinery.length) + 94.75).toFixed(2);
            refreshMachineryFull();
            continue;
        }
        document.getElementById("durability" + i).style.width = machinery[i][0] + "%";
        document.getElementById("durability" + i).innerHTML = machinery[i][0].toFixed(2) + "%";
        document.getElementById("charge" + i).style.width = machinery[i][1] + "%";
        document.getElementById("charge" + i).innerHTML = machinery[i][1].toFixed(2) + "%";
    }
}

function buyAutomation() {
    if (money >= Math.pow(5.25, machinery.length) + 94.75) {
        money -= Math.pow(5.25, machinery.length) + 94.75;
        refreshMachinery()
        machinery.push([100, 100]);
        document.getElementById("sandwichMakerCost").innerHTML = "$" + (Math.pow(5.25, machinery.length) + 94.75).toFixed(2);
        document.getElementById("moneyCount").innerHTML = money.toFixed(2);
        refreshMachineryFull()
    } else {
        document.getElementById("alertsBox").innerHTML = "Not enough! Need $" + (Math.pow(5.25, machinery.length) + 94.75).toFixed(2) + ", you only have $" + money.toFixed(2) + ".";
    }
}

function upgradeBots(val) {
    switch (val) {
        case 0:
            if (money >= Math.pow(botUpgrades[0], 2.8) + 25) {
                money -= Math.pow(botUpgrades[0], 2.8) + 25
                botUpgrades[0] += 1.08
                document.getElementById("speedCost").innerHTML = "$" + (Math.pow(botUpgrades[0], 2.8) + 25).toFixed(2)
            }
            break;
        case 1:
            if (money >= Math.pow(botUpgrades[1], 2.5) + 25) {
                money -= Math.pow(botUpgrades[1], 2.5) + 25
                botUpgrades[1] += 1.08
                document.getElementById("durCost").innerHTML = "$" + (Math.pow(botUpgrades[0], 2.5) + 25).toFixed(2)
            }
        case 2:
            if (money >= 60) {
                money -= 60;
                botUpgrades[2] = true;
                document.getElementById("machineryButton").disabled = true;
            }
            break;
    }
}

function autoMakerLoop() {
    if (toggleMachinery) {
        if (money >= machinery.length * sandwichCost) {
            var unchargedAmount = 0;
            for (i = 0; machinery.length > i; i++) {
                if (machinery[i][1] <= 0) {
                    unchargedAmount++
                } else {
                    machinery[i][0] -= 0.15 / botUpgrades[1];
                    machinery[i][1] -= 0.5;
                    if (machinery[i][1] <= 0) { machinery[i][1] = 0 }
                }
            }
            refreshMachinery()
            makeSandwich(Number(machinery.length - unchargedAmount))
        }
        clearTimeout(startLoop)
        startLoop = setTimeout(function() { autoMakerLoop(); }, 3000 / (timeSpeed * botUpgrades[0]));
    }
}

function recharge(machineToCharge) {
    if (sandwichPoints >= 5000) {
        sandwichPoints -= 5000;
        machinery[machineToCharge][1] = 100;
        refreshMachinery();
    } else {
        document.getElementById("alertsBox").innerHTML = "Can't afford recharge!"
    }
}

function loop() { //looping thing
    for (i = 0; i < Math.ceil(Math.cbrt(sandwichTastiness * 1.5)); i++) {
        if (sandwiches > 0) {
            sandwiches--
            money += +(sandwichCost * sellRatio + 0.1).toFixed(2); //money += a little higher than cost, multiplied by floortastiness because more people want it
            moneyTotal += +(sandwichCost * sellRatio + 0.1).toFixed(2);
        };
    };
    switch (gameStage) { //checks if reached gamestage goal, while this may seem clunky its better than checking each and every money value every time
        case 0:
            if (money >= 5.5) {
                gameStage++;
                gameStageRender();
            }
            break;
        case 2:
            if (money >= 15) {
                gameStage++;
                gameStageRender();
            }
            break;
        case 3:
            if (money >= 25) {
                gameStage++;
                gameStageRender();
            }
            break;
        case 4:
            if (money >= 35) {
                gameStage++;
                gameStageRender();
            }
            break;
        case 5:
            if (money >= 150) {
                gameStage++;
                gameStageRender();
            }
            break;
        case 6:
            if (money >= 300) {
                gameStage++;
                gameStageRender();
            }
            break;
    }
    document.getElementById("timeGain").innerHTML = (0.00000025 * (moneyTotal * SPS) + 1).toFixed(3);
    if (.00000025 * (moneyTotal * SPS) + 1 >= 1.3) {
        document.getElementById("prestigeButton").disabled = false;
        document.getElementById("alertsBox").innerHTML = "It's time.";
    }
    document.getElementById("sandwichCount").innerHTML = sandwiches;
    document.getElementById("moneyCount").innerHTML = money.toFixed(2);
    setTimeout(function() { loop(); }, Number(5000 / Math.pow(timeSpeed, sandwichTastiness / 5)))
}; //1000 = 1000ms = 1s
function prestige() {
    moneyTotal = 5;
    money = 5;
    sandwiches = 0;
    SPS = 0;
    sandwichPoints = 0;
    autosaveEnabled = true;
    sandwichTastiness = 1;
    sandwichCost = 1;
    selectedSandwich = "Water Sandwich";
    maxIngredientSelection = 4;
    recipeBook = new Array(["Water Sandwich", 1.85, 2.45, ["White Bread", "Water", "White Bread"],
        ["bread", "sauce", "bread"]
    ]);
    timeSpeed = 1.30;
    sellRatio = 8 / 7;
    profitsCost = 10;
    profitsAmount = 1;
    machinery = [
        [100, 100]
    ];
    botUpgrades = [1, 1, false];
    ingredientBank = ingredientBank.concat(ingredients.concat(ingredientsSacrificed))
    ingredientsSacrificed = []
    ingredients = [
            ["White Bread", 1.15, 0.35, "bread"],
            ["American Cheese", 1.2, 0.50, "cheese"],
            ["Turkey", 1.4, 0.8, "meat"],
            ["Homemade Mustard", 1.2, 1, "mustard"],
            ["Discount Lettuce", 1.35, 1, "lettuce"],
            ["Water", 1, 0, "sauce"]
        ] //reset EVERYTHING!!!!!!!!!!!!
    timeSpeed *= 0.00000025 * (moneyTotal * SPS) + 1;
    // time speed added
    makeInvis(); //make sreen invios
    setTimeout(function() {
        save();
        load();
    }, 500); //wait 500ms
}
setTimeout(function() { loop(); }, Number(5000 / Math.pow(timeSpeed, sandwichTastiness / 5)))

function SPloop() {
    sandwichPoints += SPS;
    document.getElementById('SandwichPointCount').innerHTML = sandwichPoints
    setTimeout(function() { SPloop(); }, 2700 / timeSpeed)
};
SPloop()
window.setInterval(function() {
    save();
}, 30000);