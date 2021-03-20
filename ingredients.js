// ingredient types: bread,meat,cheese,vegetable,sauce
var ingredients = [
    ["White Bread", 1.15, 0.35,"bread"],
    ["Rye", 1.1, 1.7,"bread"],
    ["American Cheese", 2, 0.50,"cheese"],
    ["Turkey", 1.5, 1,"meat"],
    ["Lettuce",2.83,1.4,"vegetable"],
    ["Water", 1, 0,"sauce"]
]
//ingredients get better & rarer the farther on the list they are.
var ingredientBank = [
    ["Tomato", 2, 0.50,"vegetable"],
    ["Bacon",1,1.5,"meat"],
    ["Bagel",1,2.5,"bread"],
    ["Jelly",2.5,1,"sauce"],
    ["Peanut Butter",1,2.5,"sauce"],
    ["Fried Egg",3,2.8,"meat"] //common ingredients
]
function getIngredient(ingrNumber){
    if(!(ingredientBank === [])){
        console.log(ingrNumber)
        ingredients.unshift(ingredientBank[Math.round(ingrNumber)]); //gets ingr from bank, puts into ingredients
        ingredientBank.splice(Math.round(ingrNumber), 1); //removes ingr from bank
        setIngredientSelect(); //refresh
    } else {
        document.getElementById("alertsBox").innerHTML = "No more ingredients to get."
    }
}