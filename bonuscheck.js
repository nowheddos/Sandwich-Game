function calculateBonus(ingrArray){  //get bonus values et names
	console.log(ingrArray);
	var bonuses = new Array;
	var bonusTastiness = 1;
		if(ingrArray.indexOf("Bread") === 0 && ingrArray.indexOf("Bread",-1) === ingrArray.length - 1){
				//if bread is first and bread is last
				bonuses += "Traditional bonus! (x1.25 Tastiness)";
				bonusTastiness *= 1.25;
		}
	return [bonuses,bonusTastiness]
}