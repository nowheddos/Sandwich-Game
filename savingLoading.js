function makeInvis() { // makes all unlockables invisible
    document.getElementById("recipeBookSection").className = "invisible";
    document.getElementById("craftingStation").className = "invisible";
    document.getElementById("logDiv").className = "invisible";
    document.getElementById("currentlyStats").className = "invisible";
    document.getElementById("shopSection").className = "invisible";
    document.getElementById("darkArts").className = "invisible";
    document.getElementById("Automation").className = "invisible";
    document.getElementById("prestige").className = "invisible";
    document.getElementById("shopStats").className = "invisible";
    document.getElementById("milestones").className = "invisible";
} //this is here because i am adumbass. 
function save() {
    var saveData = {
        sandwiches: sandwiches,
        money: money,
        sandwichTastiness: sandwichTastiness,
        sandwichCost: sandwichCost,
        selectedSandwich: selectedSandwich,
        ingredients: ingredients,
        recipeBook: recipeBook,
        autosaveEnabled: autosaveEnabled,
        gameStage: gameStage,
        ingredientBank: ingredientBank,
        maxIngredientSelection: maxIngredientSelection,
        sellRatio: sellRatio,
        profitsCost: profitsCost,
        profitsAmount: profitsAmount,
        sandwichPoints: sandwichPoints,
        SPS: SPS,
        ingredientsSacrificed: ingredientsSacrificed,
        machinery: machinery,
        timeSpeed: timeSpeed,
        moneyTotal: moneyTotal,
        botUpgrades: botUpgrades
    }; //saves everything to an object
    localStorage.setItem("saveData", JSON.stringify(saveData)); //sets the string in the local storage
    console.log("Game saved");
    var d = new Date(); //gets date & time
    document.getElementById("alertsBox").innerHTML = "Saved at " + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
};

function load() {
    var savegame = JSON.parse(localStorage.getItem("saveData")); //looks for save data object
    timeSpeed = savegame.timeSpeed;
    moneyTotal = savegame.moneyTotal;
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
    ingredientsSacrificed = savegame.ingredientsSacrificed;
    SPS = savegame.SPS;
    machinery = savegame.machinery;
    botUpgrades = savegame.botUpgrades; //extracts
    document.getElementById("timeGain").innerHTML = (0.00000025 * (moneyTotal * SPS) + 1).toFixed(3);
    document.getElementById("speedCost").innerHTML = "$" + (Math.pow(botUpgrades[0], 2.8) + 25).toFixed(2)
    document.getElementById("durCost").innerHTML = "$" + (Math.pow(botUpgrades[0], 2.5) + 25).toFixed(2)
    document.getElementById("sandwichMakerCost").innerHTML = "$" + (Math.pow(5.25, machinery.length) + 94.75).toFixed(2);
    document.getElementById('profitsCost').innerHTML = "$" + profitsCost.toFixed(2);
    document.getElementById('maxCost').innerHTML = "SP:" + Math.floor(Math.pow(maxIngredientSelection, 8));
    document.getElementById('SandwichPerSecond').innerHTML = SPS;
    document.getElementById('ingrCost').innerHTML = "$" + Math.abs(Math.pow(ingredients.length - 3, 2.3) - 1.365).toFixed(2)
    makeInvis()
    gameStageRender() //renders current game stage
    if (!autosaveEnabled) { document.getElementById("autosaveBox").outerHTML = '<input id="autosaveBox" type="checkbox" oninput="autosaveEnabled = !autosaveEnabled;">' }; //check if autosave is disabled, replace if it is
    document.getElementById("sandwichCount").innerHTML = sandwiches;
    document.getElementById("moneyCount").innerHTML = money.toFixed(2);
    refreshBook();
    updateRecipe(String(selectedSandwich), sandwichTastiness, sandwichCost);
    console.log("game loaded successfully, money: " + money);
    var d = new Date();
    document.getElementById("alertsBox").innerHTML = "Loaded at " + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
    refreshMachineryFull();
};
if (localStorage.getItem("saveData") !== null) { window.onload = load() } else {
    makeInvis();
    gameStageRender();
}
setIngredientSelect();
document.getElementById('maxCost').innerHTML = "SP:" + Math.floor(Math.pow(maxIngredientSelection, 8));