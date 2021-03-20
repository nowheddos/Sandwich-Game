// just saying, I know this is awful shit garbage etc, but I have NO idea how to fix it.

function gameStageRender() { //game unlocks
	switch(gameStage){ //i am so terribly sorry for this piece of trash
		case 0:
			milestone("$5.50")
			console.log("0")
			break;
		case 4:
            milestone("Game finished! Expect more later :)");
            document.getElementById("alertsBox").innerHTML = "Shop unlocked! I wonder what's next...";
			document.getElementById("shopSection").className = "column";
		case 3:
			milestone("$25.00")
			document.getElementById("alertsBox").innerHTML = "Reaching $25 would get you a shop. Or so they say.";
			document.getElementById("recipeBookSection").className = "column";
			console.log("3")
		case 2:
			milestone("$15.00")
			document.getElementById("logDiv").className = "column";
			document.getElementById("alertsBox").innerHTML = "Would be nice to have $15 for a recipe book..";
			document.getElementById("craftingStation").className = "column";
			console.log("2")
		case 1:
			milestone("Create a sandwich")
			console.log("1")
			document.getElementById("currentlyStats").className = "column";

	}
}
function milestone(txt){document.getElementById("unlock").innerHTML = txt;}