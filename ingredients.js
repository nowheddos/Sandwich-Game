var ingredients = [
    ["Bread", 1.15, 0.35],
    ["Cheese", 2, 0.50],
    ["Turkey", 1.5, 1],
    ["Lettuce",2.83,1.4]
]
var ingredientBank = [
    ["Bacon",1,1.5],
    ["Tomato", 2, 0.50],
    ["Fried Egg",3,0.2],
    ["Jelly",2.5,1],
    ["Peanut Butter",1,2.5]
]
function getIngredient(ingrNumber){
    ingredients.unshift(ingredientBank[Math.round(ingrNumber)]); //gets ingr from bank, puts into ingredients
    ingredientBank.splice(Math.round(ingrNumber), 1); //removes ingr from bank
    setIngredientSelect(); //refresh
}