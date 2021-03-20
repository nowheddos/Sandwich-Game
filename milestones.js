function gameStageRender() { //game unlocks
	document.getElementById("recipeBookSection").className = "column";
	document.getElementById("craftingStation").className = "column";
	document.getElementById("logDiv").className = "column";
	document.getElementById("currentlyStats").className = "column";
    document.getElementById("shopSection").className = "column";
	document.getElementById("Research").className = "column";
	switch(gameStage){ //i am so terribly sorry for this piece of trash
        case 4:
            milestone("Game finished! Expect more later :)");
            document.getElementById("alertsBox").innerHTML = "Shop unlocked! I wonder what's next...";
			document.getElementById("Research").className = "invisible";
            break;
		case 3:
			milestone("$25.00")
			document.getElementById("alertsBox").innerHTML = "Reaching $25 would get you a shop. Or so they say.";
			document.getElementById("shopSection").className = "invisible";
			document.getElementById("Research").className = "invisible";
            console.log("3")
			break;
		case 2:
			milestone("$15.00")
			document.getElementById("recipeBookSection").className = "invisible";
			document.getElementById("alertsBox").innerHTML = "Would be nice to have $15 for a recipe book..";
			document.getElementById("shopSection").className = "invisible";
			document.getElementById("Research").className = "invisible";
            console.log("2")
			break;
		case 1:
			milestone("Create a sandwich")
			console.log("1")
			document.getElementById("recipeBookSection").className = "invisible";
			document.getElementById("logDiv").className = "invisible";
            document.getElementById("shopSection").className = "invisible";
			document.getElementById("Research").className = "invisible";
			break;
		case 0:
			milestone("$5.50")
			document.getElementById("recipeBookSection").className = "invisible";
			document.getElementById("craftingStation").className = "invisible";
			document.getElementById("logDiv").className = "invisible";
			document.getElementById("currentlyStats").className = "invisible";
            document.getElementById("shopSection").className = "invisible";
			document.getElementById("Research").className = "invisible";
			console.log("0")
	}
}
function milestone(txt){document.getElementById("unlock").innerHTML = txt;}