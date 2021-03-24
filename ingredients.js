// ingredient types: bread,meat,cheese,vegetable,sauce
// name tastiness cost
var ingredients = [
    ["White Bread", 1.15, 0.35,"bread"],
    ["American Cheese", 1.2, 0.50,"cheese"],
    ["Turkey", 1.4, 0.8,"meat"],
    ["Homemade Mustard", 1.2, 1,"mustard"],
    ["Discount Lettuce",1.35,1,"lettuce"],
    ["Water", 1, 0,"sauce"]
]
//ingredients get better & rarer the farther on the list they are.
// name tastiness cost type
var ingredientBank = [
    ["Cherry Tomato", 1, 0.50,"tomato"],
    ["Rye", 1.2, 1.3,"bread"],
    ["Bacon",1.3,1.5,"meat"],
    ["Ham",1.35,1.65,"meat"],
    ["Butter Lettuce",1.4,1.5,"lettuce"],
    ["Swiss Cheese",1.4,1.6,"cheese"],
    ["Bagel",1.3,1.85,"bread"],
    ["Jelly",1.45,1.7,"sauce"],
    ["Peanut Butter",1.5,1.7,"sauce"],
    ["Sauerkraut",1.45,1.85,"vegetable"],
    ["Yellow Mustard",1.5,1.85,"mustard"],
    ["Romaine Lettuce",1.55,1.6,"lettuce"],
    ["Pita Bread",1.575,1.65,"bread"],
    ["Fried Egg",1.6,1.7,"meat"], 
    ["Tomatoes on the Vine",1.55,1.75,"tomato"],
    ["Mayo",1.6,1.75,"sauce"],
    ["Avocado",1.65,1.8,"vegetable"],
    ["Baguette",1.75,1.7,"bread"],
    ["Roast Beef",1.8,1.6,"meat"],
    ["Iceberg Lettuce",1.9,1.7,"lettuce"],
        ["Sourdough Bread",1.85,1.75,"bread"],
    ["Chicken Salad",1.8,1.8,"meat"], 
    ["Provolone",1.85,2,"cheese"],
    ["Beefsteak Tomato",1.9,1.85,"tomato"],
    ["Dijon Mustard",2,1.95,"mustard"],
    ["Deli Chicken",2.2,1.65,"meat"],
    ["Dill Pickle",2.1,2.15,"vegetable"],
    ["Sourdough Pita",1.15,2.2,"bread"],
    ["Lamb",2.15,2.2,"meat"],
]
var ingredientsSacrificed = new Array;
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