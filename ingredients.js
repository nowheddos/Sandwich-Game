// ingredient types: bread,meat,cheese,vegetable,sauce
// name tastiness cost
var ingredients = [
        ["White Bread | 1", 1.15, 0.35, "bread"],
        ["American Cheese | 2", 1.2, 0.50, "cheese"],
        ["Turkey | 3", 1.4, 0.8, "meat"],
        ["Homemade Mustard | 4", 1.2, 1, "mustard"],
        ["Discount Lettuce | 5", 1.35, 1, "lettuce"],
        ["Water | 0", 1, 0, "sauce"]
    ]
    //ingredients get better & rarer the farther on the list they are.
    // name tastiness cost type
var ingredientBank = [
    ["Old Tomato", 1, 0.50, "tomato"],
    ["Rye", 1.2, 1.3, "bread"],
    ["Bacon", 1.3, 1.5, "meat"],
    ["Fried Egg", 1.35, 1.65, "meat"],
    ["Homemade Mayo", 1.325, 1.7, "mayonnaise"],
    ["Butter Lettuce", 1.4, 1.5, "lettuce"],
    ["Swiss Cheese", 1.4, 1.6, "cheese"],
    ["English Muffin", 1.3, 1.85, "bread"],
    ["Baked Beans", 1.35, 1.9, "vegetable"],
    ["Small Onions", 1.4, 1.65, "vegetable"],
    ["Jelly", 1.45, 1.7, "sauce"],
    ["Peanut Butter", 1.5, 1.7, "sauce"],
    ["Sauerkraut", 1.45, 1.85, "vegetable"],
    ["Yellow Mustard", 1.5, 1.85, "mustard"],
    ["Romaine Lettuce", 1.55, 1.6, "lettuce"],
    ["Pita Bread", 1.575, 1.65, "bread"],
    ["Ham", 1.6, 1.7, "meat"],
    ["Tomatoes on the Vine", 1.55, 1.75, "tomato"],
    ["Clearance Mayo", 1.6, 1.75, "mayonnaise"],
    ["Avocado", 1.65, 1.8, "vegetable"],
    ["Baguette", 1.75, 1.7, "bread"],
    ["Roast Beef", 1.8, 1.6, "meat"],
    ["Horseradish Sauce", 1.85, 1.6, "sauce"],
    ["Iceberg Lettuce", 1.9, 1.7, "lettuce"],
    ["Sourdough Bread", 1.85, 1.75, "bread"],
    ["Chicken Salad", 1.8, 1.8, "meat"],
    ["Provolone", 1.85, 2, "cheese"],
    ["Deli Mayo", 1.875, 1.9, "mayonnaise"],
    ["Tasty Beefsteak Tomato", 1.9, 1.85, "tomato"],
    ["Dijon Mustard", 2, 1.95, "mustard"],
    ["Deli Chicken", 2.2, 1.65, "meat"],
    ["Dill Pickle", 2.1, 2.15, "vegetable"],
    ["Sourdough Pita", 1.15, 2.2, "bread"],
    ["Lamb", 2.15, 2.2, "meat"],
    ["Quality Mayo", 2.175, 2.15, "mayonnaise"],
    ["Local Lettuce", 2.2, 2.25, "lettuce"],
    ["GMO-Tomato", 2.25, 2.2, "tomato"],
    ["Brioche", 2.4, 2.35, "bread"],
    ["Eggplant", 2.4, 2.38, "vegetable"],
    ["Quality Ketchup", 2.45, 2.55, "sauce"],
    ["Parmesan Cheese", 2.4, 2.35, "cheese"],
    ["Soymilk Mayo", 2.4, 2.4, "mayonnaise"],
    ["Homegrown Lettuce", 2.45, 2.55, "lettuce"],
    ["Genespliced Tomato", 2.5, 2.45, "tomato"],
    ["Deli Ham", 2.45, 2.6, "meat"],
    ["Farmer's Market Onions", 2.55, 2.5, "vegetable"],
    ["Steak", 2.3, 2.2, "meat"],
    ["High Quality Roll", 2.6, 2.55, "bread"],
]
for (i = 6; i < ingredientBank.length + 6; i++) {
    ingredientBank[i - 6][0] = ingredientBank[i - 6][0] + " | " + i
}
var ingredientsSacrificed = new Array;

function getIngredient(ingrNumber) {
    if (ingredientBank.length > 0) {
        console.log(ingrNumber)
        ingredients.unshift(ingredientBank[Math.round(ingrNumber)]); //gets ingr from bank, puts into ingredients
        ingredientBank.splice(Math.round(ingrNumber), 1); //removes ingr from bank
        setIngredientSelect(); //refresh
    } else {
        document.getElementById("alertsBox").innerHTML = "No more ingredients to get."
    }
}
document.getElementById('hypotheticalSandwichPerSecond').innerHTML = calculateSandwichPoints(altarSelect.value)
    // used to cause problems, fixed here
function calculateSandwichPoints(bam) { //calculates amnt of Sandwich points/second for ingredient sacrificed
    return Math.floor(ingredients[bam][1] * ingredients[bam][2] * 50)
};