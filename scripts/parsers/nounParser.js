function Noun(meaning, dictionaryEntry, types, chapter, section){
	var self = this;
	//clean up dictionaryEntry
	dictionaryEntry = dictionaryEntry.replace(" ,", ",");
	this.dictionaryEntry = dictionaryEntry;
	this.firstDict = dictionaryEntry.trim().match(/^[a-zA-Z]+(?=,)/).join();
	//Order Matters.  Gender must be in front of Declension to remove any of the info.
	//For words that don't have a declared gender those are dealt with under the declension section.
	this.gender = getGender();
	this.declension = getDeclension();
	this.stem = getStem();
	this.meaning = getMeanings();
	this.types = types.map(function(x){return x.trim();});
	this.chapter = chapter.trim();
	this.section = section;
	this.ending = '';

//so endings don't show up in the helper tool
	Object.defineProperty(this, 'ending', {
  enumerable: false,
	});

function test(x){
	if(x === undefined){
		console.log('failed test: ' + self);
		self.meaning = 'something was not defined, check how you entered the data for this word to fix it';
	}
	if(x.match(/\(/)){console.log('failed test: ' + self);}
}
	test(this.firstDict);
	test(this.gender);
	test(this.declension);
	test(this.stem);
	test(this.meaning);


	function getMeanings(){
		//clean input
	 	meaning = meaning.replace(/\([\w\s]*\)/i, "");
		meaning = meaning.replace(';', ',');
		return meaning.trim();
	}
	//delcaired are taken from this. Obvious gender from endings are taken with declension
	function getGender(){
	  //this.gender = undefined;
	    //clean up the parentheses if there are any
	    dictionaryEntry = dictionaryEntry.replace(/\(/, '');
	    dictionaryEntry = dictionaryEntry.replace(/\)/, '');
			dictionaryEntry = dictionaryEntry.trim();
	    //check to see if both masculine and feminine are given for common gender
	      if(dictionaryEntry.match(/m\/f$/i)){
	        dictionaryEntry = dictionaryEntry.replace(/\sm\/f$/i, '' );
	        return 'C';
	      }
	      if(dictionaryEntry.match(/c$/i)){
	        dictionaryEntry = dictionaryEntry.replace(/\sc$/i,'' );

	        return 'C';
	      }
	      if(dictionaryEntry.match(/m$/i)){
	        dictionaryEntry = dictionaryEntry.replace(/\sm$/i,'' );
	        return 'M';
	      }
	      if(dictionaryEntry.match(/f$/i)){
	        dictionaryEntry = dictionaryEntry.replace(/\sf$/i,'' );
	        return 'F';
	      }
	      if(dictionaryEntry.match(/n$/i)){
	        dictionaryEntry = dictionaryEntry.replace(/\sn$/i,'' );
	        return 'N';
	      }
	}
	function getDeclension(){

		//clean the data from extra spaces at the end
		dictionaryEntry = dictionaryEntry.trim();
		//check endings to get undefined genders and declensions
		if(dictionaryEntry.match(/ei$/)){
			if(self.gender === undefined){self.gender = 'F';}
			return 'fifth';}
		if(dictionaryEntry.match(/i$/)){
			//if the gender was not stated in the dictionary entry pull it from the default types of declensions
			if(self.gender === undefined){
				if(dictionaryEntry.match(/um(?=,)/)){self.gender = 'N'; }
				else{ self.gender = 'M';}
			}
			return 'second';
		}
		if(dictionaryEntry.match(/ae$/)){
			if(self.gender === undefined){
				self.gender = 'F';}
			return 'first';
		}
		if(dictionaryEntry.match(/is$/)){return 'third';}
		if(dictionaryEntry.match(/us$/i)){
			if(self.gender === undefined){self.gender = 'F';}
			return 'fourth';
		}
		if(dictionaryEntry.match(/orum$/)){
			if (self.firstDict.match(/i$/)) {
				self.gender = 'M';
			}
			else{
				self.gender = 'N';
			}
			self.pluralOnly = true;
			return 'second';}
		if(dictionaryEntry.match(/arum$/)){
			self.gender = 'F';
			self.pluralOnly = true;
			return 'first';}
		if(dictionaryEntry.match(/um$/)){
			self.pluralOnly = true;
			return 'third';}
	}
	//note that you have to check if it is a pluralOnly word
	function getStem(){
		if(self.declension === 'second'){
			//check for words like puer, vir, ager, etc... that would form a stem as
			//its first dictionary entry
			if(dictionaryEntry.match(/[a-z](?=,)/).join() === 'r') {
				return dictionaryEntry.match(/[a-zA-Z]+(?=,)/).join();
			}
			if(self.pluralOnly){
				if (self.gender === 'M') {
					return dictionaryEntry.match(/[a-zA-Z]+(?=i,)/i).join();
				}
				else{
					return dictionaryEntry.match(/[a-zA-Z]+(?=a,)/i).join();
				}
			}
			//note that there are a few second declension words that are Feminine
			else if(self.gender === 'M' || self.gender === 'F'){
				return dictionaryEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
			else{
				return dictionaryEntry.match(/[a-zA-Z]+(?=um,)/i).join();
			}
		}
		if(self.declension === 'first'){
			if (self.pluralOnly) {
				return dictionaryEntry.match(/[a-zA-Z]+(?=ae,)/i).join();
			}
			return dictionaryEntry.match(/[a-zA-Z]+(?=a,)/i).join();
		}
		if(self.declension === 'fifth'){
			return dictionaryEntry.match(/[a-zA-Z]+(?=es,)/i).join();
		}
		if(self.declension === 'fourth'){
			if(self.gender === "N"){
				return dictionaryEntry.match(/[a-zA-Z]+(?=u,)/i).join();
			}
			else {
				return dictionaryEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
		}
		if(self.declension === 'third'){
			//this is incase the stem repeats and so is shown in the firstDict
			if (dictionaryEntry.match(/-is$/)) {
				return self.firstDict.match(/[a-zA-Z]+(?=is)/i).join();
			}
			if(self.pluralOnly){
				if(dictionaryEntry.match(/\s[a-zA-Z]+(?=um)/i) === null){
					return self.firstDict.match(/[a-zA-Z]+(?=es)/i).join();
				}
				return dictionaryEntry.match(/\s[a-zA-Z]+(?=um)/i).join();
			}
			//this is the standard place to get the stem, the second part of the dictionaryEntry
			else {
				return dictionaryEntry.match(/\s[a-zA-Z]+(?=is)/i).join();
			}
		}
	}
}
