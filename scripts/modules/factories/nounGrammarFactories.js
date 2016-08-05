app.factory('nounUtilities', ['utilities',function(utilities){
  var nounUtilities = {};

  //pickWord takes a string to check the type of a noun
  //any takes all nouns
  //if more than one type can be present accept an array of the desired types.
  var usedWords = [];
  var pickWord = function(type, partOfSpeech){
    var word;
    if (type === 'any') {
      word = utilities.random(dictionary[partOfSpeech]);
    }
    //  if it is an array of types one will be randomly selected here
    else if (Array.isArray(type)){
      type = utilities.random(type);
      word = utilities.random(dictionary[partOfSpeech].filter( function(x){
        return x.types == type;
      }));
    }

    // if one type is given get it here
    else{
      word = utilities.random(dictionary[partOfSpeech].filter( function(x){
        return x.types == type;
      }));
    }
    //if the word is already used in usedWords make a newWord
    if(usedWords.indexOf(word) === -1){
      usedWords.push(word);
      return word;
    }
    else{
      return pickWord(type, partOfSpeech);
    }
  };

  function getNounEnglish(that){
    var englishExceptions = {
      'fish' : 'fish ',
      'ox' : 'oxen ',
      'wolf' : 'wolves ',
      'sheep' : 'sheep ',
      'wife' : 'wives ',
      'joy' : 'joys',
      'valley' : 'valleys',
      'children' : 'children',
    };
    if (that.ending.number === 'sg') {
      that.stem.english =  ' the ' + that.stem.english + ' ';
    }
    else if (that.stem.english in englishExceptions) {
      that.stem.english = englishExceptions[that.stem.english];
    }
    else if (that.stem.english.match(/y$/)) {
      that.stem.english = ' the ' + that.stem.english.replace('y', 'ies ');
    }
    else if (that.stem.english.match(/s$/)) {
      that.stem.english = ' the ' + that.stem.english.replace(/s$/, 'ses ');
    }
    else if (that.stem.english.match(/man$/)  && that.stem.english !== 'human') {
      that.stem.english = ' the ' + that.stem.english.replace('man', 'men ');
    }

    else{
      that.stem.english = ' the ' + that.stem.english + 's ';
    }
  }

 function NounCaseUse(nounCase, types, custom){
   this.noun = pickWord(types, 'nouns');

   this.ending = {
     case : nounCase,
     number : utilities.random(['sg','pl']),
   };
   this.stem = {
     english : utilities.random(this.noun.meaning.split(', ')),
     gender : this.noun.gender,
     declension : this.noun.declension,
     latin : this.noun.stem,
   };

   if(this.stem.gender === 'C'){this.stem.gender = utilities.random(['M','F']);}
   this.ending.latin = grammar[this.ending.case][this.ending.number][this.stem.declension + this.stem.gender] + " ";

   var that = this;
   getNounEnglish(that);
   custom(that);

  //catch if ending is 'firstDict'
  if (this.ending.latin === 'firstDict ') {
    this.stem.latin = '';
    this.ending.latin = this.noun.firstDict + " ";
  }

    return this;
 }

 subject = function(){
   return new NounCaseUse('nominative', ['person','animal'], function(that){
     if(that.noun.declension === 'second' && that.noun.firstDict.match(/r$/)){
       that.ending.latin = 'firstDict ';
     }
   });
};

  placeWhere = function(){
    return new NounCaseUse('ablative', ['place'], function(that){
      that.prep = 'in ';
      that.stem.latin = that.prep + that.stem.latin;
      that.stem.english = that.prep + that.stem.english;
    });
  };

  directObject = function(){
    return new NounCaseUse('accusative','any',function(){});
  };

function Verb(type, subjectNumber, tense , voice, person){
  this.verb = pickWord(type, 'verbs');
  this.stem = {
    english : this.verb.meaning,
    tense : tense,
    latin : this.verb.presentStem,
  };
  this.ending = {
    person : person,
    number : subjectNumber,
    voice : voice,

  };
  //set person to third if not given
  if (person === undefined) { this.ending.person = 'third';}

  //pick one of the englishs but clean it first
  if (this.stem.english.match(/;|:|\//)) {
    this.stem.english = this.stem.english.replace(/;|:|\//g, ',');
  }
  this.stem.english = utilities.random(this.stem.english.split(', '));

  //fix standard english from "to verb" -> "verb"
  if (this.stem.english.match('to ')) {
    this.stem.english = this.stem.english.replace('to ', '');
  }

  //change english if plural
  if(this.ending.number === 'sg'){
    //check if compound verb in english
    if (this.stem.english.match(' ')) {
      this.stem.english = this.stem.english.replace(' ', 's ');
    }
    else {
      this.stem.english = this.stem.english + "s ";
    }
  }
  //get ending
  this.ending.personalEnding = grammar.verbs.personalEndings[this.stem.tense][this.ending.voice][this.ending.person + "Person"  + this.ending.number];

  //get connecting vowel
  this.ending.connectingVowel = grammar.verbs.connectingVowels[this.stem.tense][this.verb.conjugation];

  //stop int combination
  if (this.ending.personalEnding === 'nt' && this.ending.connectingVowel === 'i') {
    switch (this.verb.conjugation) {
      case 'third':
          this.ending.connectingVowel = 'u';
        break;
      case 'thirdIo':
      this.ending.connectingVowel = 'iu';
        break;
      case 'fourth':
      this.ending.connectingVowel = 'iu';
        break;
      default:
      console.log('Error, passed through stop int but did not change: ' + this.verb.dictionaryEntry);
    }
  }

  this.ending.latin = this.ending.connectingVowel + this.ending.personalEnding;
  return this;
}

var newVerb = new Verb('t', utilities.random(['sg','pl']),'present', 'active');

nounUtilities.transitiveSentence = function(){
  this.subject = subject();
  this.verb = new Verb('t', this.subject.ending.number ,'present', 'active');
  this.placeWhere = placeWhere();
  this.directObject = directObject();
  this.english = [this.subject, this.verb, this.directObject, this.placeWhere ];
  this.latin = [
    this.subject.stem, this.subject.ending,
    this.placeWhere.stem, this.placeWhere.ending,
    this.directObject.stem, this.directObject.ending,
    this.verb.stem, this.verb.ending,
  ];

  // this.latin = [
  //   this.subject.stem,
  //   this.subject.ending + " " ,
  //   this.placeWhere.prep,
  //   this.placeWhere.stem,
  //   this.placeWhere.ending + " ",
  //   this.directObject.stem,
  //   this.directObject.ending + " ",
  //   this.verb.verb.presentStem,
  //   this.verb.connectingVowel,
  //   this.verb.ending
  // ];
  usedWords = [];
  return this;
};
  return nounUtilities;
}]);
