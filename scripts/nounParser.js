function Noun(meaning, dictEntry, types, chapter, section){
	console.log(dictEntry)
	var self = this;
	//clean up dictEntry
	dictEntry = dictEntry.replace(" ,", ",");
	this.firstDict = dictEntry.trim().match(/^[a-zA-Z]+(?=,)/).join();
	//Order Matters.  Gender must be in front of Declension to remove any of the info.
	//For words that don't have a declared gender those are dealt with under the declension section.
	this.gender = getGender();
	this.declension = getDeclension();
	this.stem = getStem();
	this.meaning = meaning.trim();
	this.types = types;
	this.chapter = chapter.trim();
	this.section = section;

function test(x){
	if(x === undefined){
		console.log(self);
	}
}
	test(this.firstDict);
	test(this.gender);
	test(this.declension);
	test(this.stem);

	//delcaired are taken from this. Obvious gender from endings are taken with declension
	function getGender(){
	  //this.gender = undefined;
	    //clean up the parentheses if there are any
	    dictEntry = dictEntry.replace(/\(/, '');
	    dictEntry = dictEntry.replace(/\)/, '');
			dictEntry = dictEntry.trim();
	    //check to see if both masculine and feminine are given for common gender
	      if(dictEntry.match(/m\/f$/i)){
	        dictEntry = dictEntry.replace(/ m\/f$/i, '' );
	        return 'C';
	      }
	      if(dictEntry.match(/c$/i)){
	        dictEntry = dictEntry.replace(/ c$/i,'' );
	        return 'C';
	      }
	      if(dictEntry.match(/m$/i)){
	        dictEntry = dictEntry.replace(/ m$/i,'' );
	        return 'M';
	      }
	      if(dictEntry.match(/f$/i)){
	        dictEntry = dictEntry.replace(/ f$/i,'' );
	        return 'F';
	      }
	      if(dictEntry.match(/n$/i)){
	        dictEntry = dictEntry.replace(/ n$/i,'' );
	        return 'N';
	      }
	}
	function getDeclension(){
		//clean the data from extra spaces at the end
		dictEntry = dictEntry.trim();
		//check endings to get undefined genders and declensions
		if(dictEntry.match(/ei$/)){
			if(self.gender === undefined){self.gender = 'F';}
			return '5th';}
		if(dictEntry.match(/i$/)){
			//if the gender was not stated in the dictionary entry pull it from the default types of declensions
			if(self.gender === undefined){
				if(dictEntry.match(/um(?=,)/)){self.gender = 'N'; }
				else{ self.gender = 'M';}
			}
			return '2nd';
		}
		if(dictEntry.match(/ae$/)){
			if(self.gender === undefined){
				self.gender = 'F';}
			return '1st';
		}
		if(dictEntry.match(/is$/)){return '3rd';}
		if(dictEntry.match(/us$/i)){
			if(self.gender === undefined){self.gender = 'F';}
			return '4th';
		}
		if(dictEntry.match(/orum$/)){
			if (self.firstDict.match(/i$/)) {
				self.gender = 'M';
			}
			else{
				self.gender = 'N';
			}
			self.pluralOnly = true;
			return '2nd';}
		if(dictEntry.match(/arum$/)){
			self.gender = 'F';
			self.pluralOnly = true;
			return '1st';}
		if(dictEntry.match(/um$/)){
			self.pluralOnly = true;
			return '3rd';}
	}
	//note that you have to check if it is a pluralOnly word
	function getStem(){
		if(self.declension === '2nd'){
			//check for words like puer, vir, ager, etc... that would form a stem as
			//its first dictionary entry
			if(dictEntry.match(/[a-z](?=,)/).join() === 'r') {
				return dictEntry.match(/[a-zA-Z]+(?=,)/);
			}
			//note that there are a few 2nd declension words that are Feminine
			else if(self.gender === 'M' || self.gender === 'F'){
				return dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
			else if(self.pluralOnly){
				return dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();
			}
			else{
				return dictEntry.match(/[a-zA-Z]+(?=um,)/i).join();
			}
		}
		if(self.declension === '1st'){
			if (self.pluralOnly) {
				return dictEntry.match(/[a-zA-Z]+(?=ae,)/i).join();
			}
			return dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();
		}
		if(self.declension === '5th'){
			return dictEntry.match(/[a-zA-Z]+(?=es,)/i).join();
		}
		if(self.declension === '4th'){
			if(self.gender === "N"){
				return dictEntry.match(/[a-zA-Z]+(?=u,)/i).join();
			}
			else {
				return dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
		}
		if(self.declension === '3rd'){
			if(self.pluralOnly){
				return dictEntry.match(/\s[a-zA-Z]+(?=um)/i).join();
			}
			return dictEntry.match(/\s[a-zA-Z]+(?=is)/i).join();
		}
	}
}
