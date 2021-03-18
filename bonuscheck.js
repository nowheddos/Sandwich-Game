function calculateBonus(ingrArray){  //get bonus values et names
	console.log(ingrArray);
	var bonuses = new Array;
	var bonusTastiness = 1;
		if(ingrArray.indexOf("Bread") === 0 && ingrArray.indexOf("Bread",-1) === ingrArray.length - 1){ //bread bonus
				//if bread is first and bread is last
				bonuses += "Traditional bonus! (x1.25 Tastiness)<br>";
				bonusTastiness *= 1.25;
		};
        if(ingrArray.includes("Bacon") && ingrArray.includes("Fried Egg") && ingrArray.includes("Cheese")){ //contains BEC
            console.log(ingrArray.includes("Bacon" && "Fried Egg" && "Cheese"))
            bonuses += "Bacon, egg, and cheese bonus! (x1.5 Tastiness)<br>";
            bonusTastiness *= 1.5;  
        };
	return [bonuses,bonusTastiness]
}