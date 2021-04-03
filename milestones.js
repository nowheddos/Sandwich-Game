// suprisingly not as horrible looking as it used to be

function gameStageRender() { //game unlocks
    var alreadyOutput = true;
    switch (gameStage) {
        case 0:
            document.getElementById("milestones").className = "column";
            document.getElementById("shopStats").className = "column";
            milestone("$5.50")
            console.log("0")
            break;
        case 7:
            if (alreadyOutput) {
                milestone("Prestige once.");
                document.getElementById("alertsBox").innerHTML = "They said to never mess with the old gods of Sandwiches. But how could you resist?";
                alreadyOutput = !alreadyOutput
            }
            document.getElementById("prestige").className = "column";
        case 6:
            if (alreadyOutput) {
                milestone("$300.00");
                document.getElementById("alertsBox").innerHTML = "Ah, the age of sandwich automation!";
                alreadyOutput = !alreadyOutput
            }
            document.getElementById("Automation").className = "column";
            autoMakerLoop()
        case 5:
            if (alreadyOutput) {
                milestone("$150.00");
                document.getElementById("alertsBox").innerHTML = "Hmmm... What you can use excess ingredients for....?";
                alreadyOutput = !alreadyOutput
            }
            document.getElementById("darkArts").className = "column";
        case 4:
            if (alreadyOutput) {
                milestone("$35.00");
                document.getElementById("alertsBox").innerHTML = "Shop unlocked! The higher the ingredient number, the better the value!";
                alreadyOutput = !alreadyOutput
            }
            document.getElementById("shopSection").className = "column";
        case 3:
            if (alreadyOutput) {
                milestone("$25.00")
                document.getElementById("alertsBox").innerHTML = "Reaching $25 would get you a shop. Or so they say.";
                alreadyOutput = !alreadyOutput
            }
            document.getElementById("recipeBookSection").className = "column";
            console.log("3")
        case 2:
            if (alreadyOutput) {
                milestone("$15.00")
                document.getElementById("alertsBox").innerHTML = "Would be nice to have $15 for a recipe book..";
                alreadyOutput = !alreadyOutput
            }
            document.getElementById("logDiv").className = "column";
            console.log("2")
        case 1:
            if (alreadyOutput) { milestone("Create a sandwich") }
            console.log("1")
            document.getElementById("currentlyStats").className = "column";
            document.getElementById("craftingStation").className = "column";
            document.getElementById("milestones").className = "column";
            document.getElementById("shopStats").className = "column";

    }
}

function milestone(txt) { document.getElementById("unlock").innerHTML = txt; }