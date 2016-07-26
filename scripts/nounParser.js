function Noun(meaning, dictEntry, types, chapter, section){
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
		console.log(self);
		self.meaning = 'something was not defined, check how you entered the data for this word to fix it';
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
	        dictEntry = dictEntry.replace(/\sm\/f$/i, '' );
	        return 'C';
	      }
	      if(dictEntry.match(/c$/i)){
	        dictEntry = dictEntry.replace(/\sc$/i,'' );

	        return 'C';
	      }
	      if(dictEntry.match(/m$/i)){
	        dictEntry = dictEntry.replace(/\sm$/i,'' );
	        return 'M';
	      }
	      if(dictEntry.match(/f$/i)){
	        dictEntry = dictEntry.replace(/\sf$/i,'' );
	        return 'F';
	      }
	      if(dictEntry.match(/n$/i)){
	        dictEntry = dictEntry.replace(/\sn$/i,'' );
	        return 'N';
	      }
	}
	function getDeclension(){

		//clean the data from extra spaces at the end
		dictEntry = dictEntry.trim();
		//check endings to get undefined genders and declensions
		if(dictEntry.match(/ei$/)){
			if(self.gender === undefined){self.gender = 'F';}
			return 'fifth';}
		if(dictEntry.match(/i$/)){
			//if the gender was not stated in the dictionary entry pull it from the default types of declensions
			if(self.gender === undefined){
				if(dictEntry.match(/um(?=,)/)){self.gender = 'N'; }
				else{ self.gender = 'M';}
			}
			return 'second';
		}
		if(dictEntry.match(/ae$/)){
			if(self.gender === undefined){
				self.gender = 'F';}
			return 'first';
		}
		if(dictEntry.match(/is$/)){return 'third';}
		if(dictEntry.match(/us$/i)){
			if(self.gender === undefined){self.gender = 'F';}
			return 'fourth';
		}
		if(dictEntry.match(/orum$/)){
			if (self.firstDict.match(/i$/)) {
				self.gender = 'M';
			}
			else{
				self.gender = 'N';
			}
			self.pluralOnly = true;
			return 'second';}
		if(dictEntry.match(/arum$/)){
			self.gender = 'F';
			self.pluralOnly = true;
			return 'first';}
		if(dictEntry.match(/um$/)){
			self.pluralOnly = true;
			return 'third';}
	}
	//note that you have to check if it is a pluralOnly word
	function getStem(){
		if(self.declension === 'second'){
			//check for words like puer, vir, ager, etc... that would form a stem as
			//its first dictionary entry
			if(dictEntry.match(/[a-z](?=,)/).join() === 'r') {
				return dictEntry.match(/[a-zA-Z]+(?=,)/).join();
			}
			if(self.pluralOnly){
				if (self.gender === 'M') {
					return dictEntry.match(/[a-zA-Z]+(?=i,)/i).join();
				}
				else{
					return dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();
				}
			}
			//note that there are a few second declension words that are Feminine
			else if(self.gender === 'M' || self.gender === 'F'){
				return dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
			else{
				return dictEntry.match(/[a-zA-Z]+(?=um,)/i).join();
			}
		}
		if(self.declension === 'first'){
			if (self.pluralOnly) {
				return dictEntry.match(/[a-zA-Z]+(?=ae,)/i).join();
			}
			return dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();
		}
		if(self.declension === 'fifth'){
			return dictEntry.match(/[a-zA-Z]+(?=es,)/i).join();
		}
		if(self.declension === 'fourth'){
			if(self.gender === "N"){
				return dictEntry.match(/[a-zA-Z]+(?=u,)/i).join();
			}
			else {
				return dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();
			}
		}
		if(self.declension === 'third'){
			//this is incase the stem repeats and so is shown in the firstDict
			if (dictEntry.match(/-is$/)) {
				return self.firstDict.match(/[a-zA-Z]+(?=is)/i).join();
			}
			if(self.pluralOnly){
				if(dictEntry.match(/\s[a-zA-Z]+(?=um)/i) === null){
					return self.firstDict.match(/[a-zA-Z]+(?=es)/i).join();
				}
				return dictEntry.match(/\s[a-zA-Z]+(?=um)/i).join();
			}
			//this is the standard place to get the stem, the second part of the dictEntry
			else {
				return dictEntry.match(/\s[a-zA-Z]+(?=is)/i).join();
			}
		}
	}
}
