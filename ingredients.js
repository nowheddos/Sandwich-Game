var ingredients = [
    ["Bread", 1.15, 0.35],
    ["Cheese", 2, 0.50],
    ["Bacon",1,1.5],
    ["Jelly",2.66,3.15]
]
var ingredientBank = [
    ["Turkey", 1.5, 1],
    ["Tomato", 2, 0.50],
    ["Fried Egg",3,0.2],
    ["Lettuce",2.83,1.4],
    ["Peanut Butter",3.87,2.7]
]
function getIngredient(ingrNumber){
    ingredients.unshift(ingredientBank[Math.round(ingrNumber)]); //gets ingr from bank, puts into ingredients
    ingredientBank.splice(Math.round(ingrNumber), 1); //removes ingr from bank
    setIngredientSelect(); //refresh
}