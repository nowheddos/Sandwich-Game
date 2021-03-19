// ingredient types: bread,meat,cheese,vegetable,sauce
var ingredients = [
    ["White Bread", 1.15, 0.35,"bread"],
    ["Rye", 1.4, 0.7,"bread"],
    ["American Cheese", 2, 0.50,"cheese"],
    ["Turkey", 1.5, 1,"meat"],
    ["Lettuce",2.83,1.4,"vegetable"]
]
var ingredientBank = [
    ["Bacon",1,1.5,"meat"],
    ["Tomato", 2, 0.50,"vegetable"],
    ["Fried Egg",3,0.2,"meat"],
    ["Jelly",2.5,1,"sauce"],
    ["Peanut Butter",1,2.5,"sauce"],
    ["Bagel",1,2.5,"bread"]
]
function getIngredient(ingrNumber){
    ingredients.unshift(ingredientBank[Math.round(ingrNumber)]); //gets ingr from bank, puts into ingredients
    ingredientBank.splice(Math.round(ingrNumber), 1); //removes ingr from bank
    setIngredientSelect(); //refresh
}