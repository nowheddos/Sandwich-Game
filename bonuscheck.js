function checkIfIncludes(ingrArray, spec) {
    for (i = 0; i < ingrArray.length; i++) { //for length of check given
        if (!spec.includes(ingrArray[i])) { //if array includes [i] of given array
            return false;
        }
    }
    return true;
}

function calculateBonus(ingrSpecific, ingrArray) { //get bonus values et names
    console.log("Bonus function recieved: " + ingrArray + " specific: " + ingrSpecific);
    var bonuses = new Array;
    var bonusTastiness = 1;
    var reuseAmnt = 0;

    // sorry for this awful mess
    for (i = 0; ingrSpecific.length > i; i++) { //check for ingredient overlap
        if (ingrSpecific[i] === ingrSpecific[i + 1]) {
            reuseAmnt = i;
            bonusTastiness *= 0.35;
            console.log(bonusTastiness)
            console.log(reuseAmnt)
        }
    }
    if (!(reuseAmnt === 0)) { //found overlap, disable bonuses
        bonuses += "Ingredient Reuse Penalty (" + reuseAmnt + ")<br>(x" + Math.pow(0.35, reuseAmnt).toFixed(3) + " Tastiness)<br>";
        return [bonuses, bonusTastiness]
    }
    if (ingrArray.indexOf("bread") === 0 && ingrArray.indexOf("bread", -1) === ingrArray.length - 1) { //bread bonus
        //if bread is first and bread is last
        bonuses += "Traditional bonus!<br>(x1.3 Tastiness)<br>";
        bonusTastiness *= 1.4;
    } else if (ingrArray.indexOf("bread") === 0) {
        bonuses += "Open faced bonus!<br>(x1.07 Tastiness)<br>";
        bonusTastiness *= 1.07;
    } else {
        bonuses += "No bread wrap penalty.<br>(x0.35 Tastiness)<br>";
        bonusTastiness *= 0.35;
        return [bonuses, bonusTastiness]
    }
    if (checkIfIncludes(["Bacon | 8", "Fried Egg | 9"], ingrSpecific) && ingrArray.includes("cheese")) { //contains BEC
        //BEC
        bonuses += "Bacon, egg, and cheese!<br>(x1.4 Tastiness)<br>";
        bonusTastiness *= 1.4;
    };
    if (checkIfIncludes(["Bacon | 8"], ingrSpecific) && ingrArray.includes("tomato", "lettuce")) { //contains BLT
        //BLT
        bonuses += "BLT BONUS!<br>(x1.4 Tastiness)<br>";
        bonusTastiness *= 1.4;
    };
    if (checkIfIncludes(["Peanut Butter | 17", "Jelly | 16"], ingrSpecific)) { //contains PB&J
        //PB&J
        bonuses += "Classic Combo!<br>(x1.25 Tastiness)<br>";
        bonusTastiness *= 1.25;
    };
    if (checkIfIncludes(["meat", "mustard"], ingrArray)) { //mustard + meat
        bonuses += "Mustard synergy bonus!<br>(x1.12 Tastiness)<br>";
        bonusTastiness *= 1.12;
    }
    if (checkIfIncludes(["Roast Beef | 27"], ingrSpecific) && ingrArray.includes("tomato", "lettuce")) {
        bonuses += "Roast beef Sandwich bonus!<br>(x1.7 Tastiness)<br>";
        bonusTastiness *= 1.7;
    }
    if (checkIfIncludes(["Ham | 22"], ingrSpecific) && ingrArray.includes("tomato", "lettuce")) {
        bonuses += "Ham Sandwich bonus!<br>(x1.4 Tastiness)<br>";
        bonusTastiness *= 1.4;
    }
    if (checkIfIncludes(["Ham | 22", "Swiss Cheese | 12"], ingrSpecific) && ingrArray.includes("mayonnaise")) {
        bonuses += "Ham & swiss (+Mayo) bonus!<br>(x1.4 Tastiness)<br>";
        bonusTastiness *= 1.4;
    } else if (checkIfIncludes(["Ham | 22", "Swiss Cheese | 12"], ingrSpecific)) {
        bonuses += "Ham & swiss bonus!<br>(x1.2 Tastiness)<br>";
        bonusTastiness *= 1.2;
    }
    if (checkIfIncludes(["Roast Beef | 27", "Sauerkraut | 18", "Swiss Cheese | 12", "Rye | 7"], ingrSpecific)) {
        bonuses += "True reuben bonus!<br>(x1.95 Tastiness)<br>";
        bonusTastiness *= 1.95;
    } else if (checkIfIncludes(["Roast Beef | 27", "Sauerkraut | 18", "Swiss Cheese | 12"], ingrSpecific)) {
        bonuses += "Reuben bonus!<br>(x1.8 Tastiness)<br>";
        bonusTastiness *= 1.7;
    }
    if (checkIfIncludes(["Lamb | 39", "Pita Bread | 21"], ingrSpecific) || checkIfIncludes(["Lamb | 39", "Sourdough Pita | 38"], ingrSpecific)) {
        bonuses += "Gyro Bonus!<br>(x1.4 Tastiness)<br>";
        bonusTastiness *= 1.4;
    }
    if (checkIfIncludes(["meat", "cheese", "tomato", "lettuce"], ingrArray)) {
        bonuses += "Sub Bonus!<br>(x1.6 Tastiness)<br>";
        bonusTastiness *= 1.6;
    }
    if (checkIfIncludes(["meat", "cheese", "tomato", "lettuce"], ingrArray)) {
        bonuses += "Sub Bonus!<br>(x1.6 Tastiness)<br>";
        bonusTastiness *= 1.6;
    }
    if (checkIfIncludes(["cheese"], ingrArray) && checkIfIncludes(["Steak | 52", "Onions"], ingrSpecific)) {
        bonuses += "Cheese Steak Bonus!<br>(x1.8 Tastiness)<br>";
        bonusTastiness *= 1.8;
    }
    if (checkIfIncludes(["cheese"], ingrArray) && checkIfIncludes(["Baked Beans | 14", "Small Onions | 15"], ingrSpecific)) {
        bonuses += "Baked Bean Sandwich!<br>(x1.35 Tastiness)<br>";
        bonusTastiness *= 1.35;
    }
    if (checkIfIncludes(["Horseradish Sauce | 28", "Roast Beef | 27"], ingrSpecific) || checkIfIncludes(["Horseradish Sauce | 28", "Ham | 22"], ingrSpecific)) {
        bonuses += "Horseradish Bonus!<br>(x1.6 Tastiness)<br>";
        bonusTastiness *= 1.6;
    }
    return [bonuses, bonusTastiness]
}