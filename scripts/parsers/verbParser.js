function Verb(definition, dictionaryEntry, type, chapter, section){

  this.chapter = chapter.replace(/(\s\s)*/g, '').trim();
  this.section = section;
  this.meaning = definition.replace(/(\s\s)*/g, '').trim();
  this.types = type.replace(/(\s\s)*/g, '').trim();
  this.deponent = false;
  this.dictionaryEntry = dictionaryEntry.replace(/(\s\s)*/g, '').trim();

  //dictionary entry parsing

  //check for 1st conjugation short-hand
  if(this.dictionaryEntry.match(', are, avi, atus')){
    //get stem from first
    var stem = this.dictionaryEntry.match(/^(\w*)(?=o,)/)[0];
    var array = this.dictionaryEntry.split(', ');
    this.dictionaryEntry = array.map(function(v,i,a){
      if(i === 0){
        return v;}
      else {
        return stem + v;
      }
    }).join(', ');
  }

  //capture special cases
  var findTrailingCase = new RegExp("(?:us\\s)(\\w\\w\\w)$");
  if (this.dictionaryEntry.match(findTrailingCase)) {
    //stop deponents
    if (this.dictionaryEntry.match(findTrailingCase)[1] === 'sum') {}
    else {
      this.directObject = this.dictionaryEntry.match(findTrailingCase)[1];
      this.dictionaryEntry = this.dictionaryEntry.replace(this.directObject, '').trim();
    }
  }


  var firstEnding = dictionaryEntry.match(/(eo,\s)|(io,\s)|(o,\s)|(eor,\s)|(ior,\s)|(or,\s)/i)[0].replace(", ", "");
  var secondEnding = dictionaryEntry.match(/(ere,\s)|(ire,\s)|(are,\s)|(ari,\s)|(eri,\s)|(i,\s)/i)[0].replace(", ", "");

  switch (firstEnding + " : " + secondEnding) {
    case 'o : are':
      this.conjugation = 'first';
      break;
    case 'eo : ere':
    this.conjugation = 'second';
      break;
    case 'eo : Ere':
    this.conjugation = 'second';
      break;
    case 'o : ere':
    this.conjugation = 'third';
      break;
    case 'io : ere':
    this.conjugation = 'thirdIo';
      break;
    case 'io : ire':
    this.conjugation = 'fourth';
      break;
    case 'or : ari':
    this.conjugation = 'first';
    this.deponent = true;
      break;
    case 'eor : eri':
    this.conjugation = 'second';
    this.deponent = true;
      break;
    case 'eor : Eri':
    this.conjugation = 'second';
    this.deponent = true;
      break;
    case 'or : i':
    this.conjugation = 'third';
    this.deponent = true;
      break;
    case 'ior : i':
    this.conjugation = 'thirdIo';
    this.deponent = true;
      break;
    case 'ior : iri':
    this.conjugation = 'fourth';
    this.deponent = true;
      break;
    default:
     console.log(this.dictionaryEntry + "is irregular or didn't pass through conjugation logic");
  }

  //present stem
  var findPresentStem = new RegExp('(?:,\\s)(\\w*)(?=' + secondEnding + ',)');
  this.presentStem = this.dictionaryEntry.match(findPresentStem)[1];
  //perfect stem
  if (this.deponent === false) {
    var findPerfectStem = new RegExp('(?:'+secondEnding+',\\s)(\\w*)(?=i,)');
    this.perfectStem = this.dictionaryEntry.match(findPerfectStem)[1];
  }
  else {
    this.perfectStem = '';
  }
  //participle stem
  if (this.deponent === false) {
    // findParticipleStem = new RegExp('(?:,\\s)(\\w*)(?=us$)');
    findParticipleStem = new RegExp('(?:,\\s)(\\w*)(?=us$)');
    this.participleStem = this.dictionaryEntry.match(findParticipleStem)[1];
  }
  else {
    findParticipleStem = new RegExp('(?:'+secondEnding+',\\s)(\\w*)(?=\\w\\w\\ssum)');
    this.participleStem = this.dictionaryEntry.match(findParticipleStem)[1];
  }

  function test(x){
  	if(x === undefined){
  		console.log('failed test: ' + this.dictionaryEntry);
  		self.meaning = 'something was not defined, check how you entered the data for this word to fix it';
  	}
  }
  test(this.presentStem);
  test(this.perfectStem);
  test(this.participleStem);
  test(this.meaning);
  test(this.conjugation);
  test(this.types);

}
