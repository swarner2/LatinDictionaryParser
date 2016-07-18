function Noun(meaning, dictEntry, types, chapter, section){
	this.firstDict = dictEntry.trim().match(/^[a-zA-Z]+(?=,)/).join();
	//Order Matters.  Gender must be in front of Declension to remove any of the info.
	//For words that don't have a declared gender those are dealt with under the declension section.
	this.gender = getGender(dictEntry);
	this.declension = undefined;
		if(dictEntry.match(/i$/)){
			this.declension = '2nd';
			if(this.gender === undefined){
				if(dictEntry.match(/um(?=,)/)){this.gender = 'N'; }
				else{ this.gender = 'M';}
			}
		}
		if(dictEntry.match(/ae$/)){this.declension = '1st';}
				if(this.gender === undefined){this.gender = 'F';}

		if(dictEntry.match(/is$/)){this.declension = '3rd';}
		if(dictEntry.match(/ei$/)){this.declension = '5th';}
		if(dictEntry.match(/us$/)){this.declension = '4th';}
	this.stem = undefined;
		if(this.declension == '2nd'){
			if(dictEntry.match(/[a-z](?=,)/).join() == 'r') {
				this.stem = dictEntry.match(/[a-zA-Z]+(?=,)/);
			}
			else if(this.gender == 'M'){
				this.stem = dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
			else{ this.stem = dictEntry.match(/[a-zA-Z]+(?=um,)/i).join();}
		}
		if(this.declension == '1st'){this.stem = dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();}
	this.meaning = meaning;
	this.types = types;
	this.chapter = chapter;
	this.section = section;
}
