function calculateBonus(ingrSpecific,ingrArray){  //get bonus values et names
	console.log("Bonus function recieved: " + ingrArray);
	var bonuses = new Array;
	var bonusTastiness = 1;
		if(ingrArray.indexOf("bread") === 0 && ingrArray.indexOf("bread",-1) === ingrArray.length - 1){ //bread bonus
				//if bread is first and bread is last
				bonuses += "Traditional bonus! (x1.25 Tastiness)<br>";
				bonusTastiness *= 1.25;
		};
        if(ingrSpecific.includes("Bacon") && ingrSpecific.includes("Fried Egg") && ingrSpecific.includes("Cheese")){ //contains BEC
            console.log(ingrArray.includes("Bacon" && "Fried Egg" && "Cheese"))
            bonuses += "Bacon, egg, and cheese! (x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4;  
        };
		if(ingrSpecific.includes("Bacon") && ingrSpecific.includes("Lettuce") && ingrSpecific.includes("Tomato")){ //contains BLT
            bonuses += "BLT BONUS! (x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4;  
        };
		if(ingrSpecific.includes("Peanut Butter") && ingrSpecific.includes("Jelly")){ //contains PB&J
            bonuses += "Classic Combo! (x1.25 Tastiness)<br>";
            bonusTastiness *= 1.25;  
        };
	return [bonuses,bonusTastiness]
}