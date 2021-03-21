function checkIfIncludes(ingrArray,spec){
	for(i=0;i<ingrArray.length;i++){ //for length of check given
		console.log(ingrArray[i])
		if(!spec.includes(ingrArray[i])){ //if array includes [i] of given array
			return false;
		}
	}
	return true;
}
function calculateBonus(ingrSpecific,ingrArray){  //get bonus values et names
	console.log("Bonus function recieved: " + ingrArray + " & ");
	var bonuses = new Array;
	var bonusTastiness = 1;
		if(checkIfIncludes(["bread","meat","cheese","vegetable","sauce"],ingrArray)){
				//contains all ingredient types
				bonuses += "Each and every type!<br>(x1.65 Tastiness)<br>";
				bonusTastiness *= 1.65;
		}
		if(ingrArray.indexOf("bread") === 0 && ingrArray.indexOf("bread",-1) === ingrArray.length - 1){ //bread bonus
				//if bread is first and bread is last
				bonuses += "Traditional bonus!<br>(x1.3 Tastiness)<br>";
				bonusTastiness *= 1.4;
		} else if(ingrArray.indexOf("bread") === 0){
			bonuses += "Open faced bonus!<br>(x1.07 Tastiness)<br>";
			bonusTastiness *= 1.07;
		} else {
			bonuses += "No bread wrap penalty.<br>(x0.6 Tastiness)<br>";
			bonusTastiness *= 0.6;
		}
        if(checkIfIncludes(["Bacon","Fried Egg"],ingrSpecific) && ingrArray.includes("cheese")){ //contains BEC
            	//BEC
            bonuses += "Bacon, egg,and cheese!<br>(x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4;  
        };
		if(checkIfIncludes(["Bacon","Lettuce","Tomato"],ingrSpecific)){ //contains BLT
				//BLT
			bonuses += "BLT BONUS!<br>(x1.4 Tastiness)<br>";
            bonusTastiness *= 1.4;  
        };
		if(checkIfIncludes(["Peanut Butter","Jelly"],ingrSpecific)){ //contains PB&J
				//PB&J
			bonuses += "Classic Combo!<br>(x1.25 Tastiness)<br>";
            bonusTastiness *= 1.25;  
        };
		if(ingrSpecific.includes("Mustard") && ingrArray.includes("meat")) { //mustard + meat
			bonuses += "Mustard synergy bonus!<br>(x1.12 Tastiness)<br>";
            bonusTastiness *= 1.12; 
		}
		if(checkIfIncludes(["Roast Beef","Tomato","Lettuce"],ingrSpecific)){
			bonuses += "Roast beef Sandwich bonus!<br>(x1.7 Tastiness)<br>";
            bonusTastiness *= 1.7; 
		}
		if(checkIfIncludes(["Ham","Tomato","Lettuce"],ingrSpecific)){
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
	return [bonuses,bonusTastiness]
}