function checkIfIncludes(ingrArray,spec){
	for(i=0;i<ingrArray.length;i++){ //for length of check given
			if(!spec.includes(ingrArray[i])){ //if array includes [i] of given array
				return false;
			}
	}
	return true;
}
function calculateBonus(ingrSpecific,ingrArray){  //get bonus values et names
	console.log("Bonus function recieved: " + ingrArray + " specific: " + ingrSpecific);
	var bonuses = new Array;
	var bonusTastiness = 1;
	var reuseAmnt = 0;
		for(i=0;ingrSpecific.length>i;i++){ //check for ingredient overlap
			if(ingrSpecific[i]===ingrSpecific[i+1]){
				reuseAmnt=i;
				bonusTastiness *= 0.35;
				console.log(bonusTastiness)
				console.log(reuseAmnt)
			}
		}
		if(!(reuseAmnt === 0)){ //found overlap, disable bonuses
			bonuses += "Ingredient Reuse Penalty (" + reuseAmnt + ")<br>(x" + Math.pow(0.35,reuseAmnt).toFixed(3) + " Tastiness)<br>";
			return [bonuses,bonusTastiness]
		}
		if(ingrArray.indexOf("bread") === 0 && ingrArray.indexOf("bread",-1) === ingrArray.length - 1){ //bread bonus
				//if bread is first and bread is last
				bonuses += "Traditional bonus!<br>(x1.3 Tastiness)<br>";
				bonusTastiness *= 1.4;
		} else if(ingrArray.indexOf("bread") === 0){
			bonuses += "Open faced bonus!<br>(x1.07 Tastiness)<br>";
			bonusTastiness *= 1.07;
		} else {
			bonuses += "No bread wrap penalty.<br>(x0.35 Tastiness)<br>";
			bonusTastiness *= 0.35;
			return [bonuses,bonusTastiness]
		}
        if(checkIfIncludes(["Bacon","Fried Egg"],ingrSpecific) && ingrArray.includes("cheese")){ //contains BEC
            	//BEC
            bonuses += "Bacon, egg, and cheese!<br>(x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4;  
        };
		if(checkIfIncludes(["Bacon"],ingrSpecific) && ingrArray.includes("tomato","lettuce")){ //contains BLT
				//BLT
			bonuses += "BLT BONUS!<br>(x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4;  
        };
		if(checkIfIncludes(["Peanut Butter","Jelly"],ingrSpecific)){ //contains PB&J
				//PB&J
			bonuses += "Classic Combo!<br>(x1.25 Tastiness)<br>";
            bonusTastiness *= 1.25;  
        };
		if(checkIfIncludes(["meat", "mustard"],ingrArray)) { //mustard + meat
			bonuses += "Mustard synergy bonus!<br>(x1.12 Tastiness)<br>";
            bonusTastiness *= 1.12; 
		}
		if(checkIfIncludes(["Roast Beef"],ingrSpecific) && ingrArray.includes("tomato","lettuce")){
			bonuses += "Roast beef Sandwich bonus!<br>(x1.7 Tastiness)<br>";
            bonusTastiness *= 1.7; 
		}
		if(checkIfIncludes(["Ham"],ingrSpecific) && ingrArray.includes("tomato","lettuce")){
			bonuses += "Ham Sandwich bonus!<br>(x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4; 
		}
		if(checkIfIncludes(["Ham","Swiss Cheese","Mayo"],ingrSpecific)){
			bonuses += "Ham & swiss (+Mayo) bonus!<br>(x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4; 
		} else if(checkIfIncludes(["Ham","Swiss Cheese"],ingrSpecific)){
			bonuses += "Ham & swiss bonus!<br>(x1.2 Tastiness)<br>";
            bonusTastiness *= 1.2; 
		}
		if(checkIfIncludes(["Roast Beef","Sauerkraut","Swiss Cheese","Rye"],ingrSpecific)){
			bonuses += "True reuben bonus!<br>(x1.95 Tastiness)<br>";
            bonusTastiness *= 1.95; 
		} else if(checkIfIncludes(["Roast Beef","Sauerkraut","Swiss Cheese"],ingrSpecific)){
			bonuses += "Reuben bonus!<br>(x1.8 Tastiness)<br>";
            bonusTastiness *= 1.7; 
		}
	return [bonuses,bonusTastiness]
}