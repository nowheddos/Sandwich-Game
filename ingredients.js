// ingredient types: bread,meat,cheese,vegetable,sauce
var ingredients = [
    ["White Bread", 1.15, 0.35,"bread"],
    ["Rye", 1.4, 0.7,"bread"],
    ["American Cheese", 2, 0.50,"cheese"],
    ["Turkey", 1.5, 1,"meat"],
    ["Lettuce",2.83,1.4,"vegetable"]
]
//ingredients get better & rarer the farther on the list they are.
var ingredientBank = [
    ["Water",0.5,0.1,"sauce"],
    ["Bacon",1,1.5,"meat"],
    ["Tomato", 2, 0.50,"vegetable"],
    ["Jelly",2.5,1,"sauce"],
    ["Peanut Butter",1,2.5,"sauce"],
    ["Bagel",1,2.5,"bread"],
    ["Fried Egg",3,0.2,"meat"], //common ingredients
    ["mega super rare secret OP ingredient",100,100,"cheese"]
]
function getIngredient(ingrNumber){
    ingredients.unshift(ingredientBank[Math.round(ingrNumber)]); //gets ingr from bank, puts into ingredients
    ingredientBank.splice(Math.round(ingrNumber), 1); //removes ingr from bank
    setIngredientSelect(); //refresh
}