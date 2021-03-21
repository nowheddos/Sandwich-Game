// ingredient types: bread,meat,cheese,vegetable,sauce
// name tastiness cost
var ingredients = [
    ["White Bread", 1.15, 0.35,"bread"],
    ["American Cheese", 1.2, 0.50,"cheese"],
    ["Turkey", 1.6, 0.8,"meat"],
    ["Mustard", 1.6, 1,"sauce"],
    ["Lettuce",1.8,1,"vegetable"],
    ["Water", 1, 0,"sauce"]
]
//ingredients get better & rarer the farther on the list they are.
var ingredientBank = [
    ["Tomato", 2, 0.50,"vegetable"],
    ["Rye", 1.4, 1.7,"bread"],
    ["Bacon",1,1.5,"meat"],
    ["Ham",1.35,1.6,"meat"],
    ["Bagel",1,2.3,"bread"],
    ["Jelly",2,1,"sauce"],
    ["Peanut Butter",1,2.1,"sauce"],
    ["Fried Egg",1.8,2,"meat"], 
    ["Swiss Cheese",1.4,0.9,"cheese"],
    ["Mayo",1.6,2,"sauce"],
    ["Baguette",1.7,1.7,"bread"],
    ["Roast Beef",1.8,1.5,"meat"]
]
function getIngredient(ingrNumber){
    if(ingredientBank.length > 0){
        console.log(ingrNumber)
        ingredients.unshift(ingredientBank[Math.round(ingrNumber)]); //gets ingr from bank, puts into ingredients
        ingredientBank.splice(Math.round(ingrNumber), 1); //removes ingr from bank
        setIngredientSelect(); //refresh
    } else {
        document.getElementById("alertsBox").innerHTML = "No more ingredients to get."
    }
}