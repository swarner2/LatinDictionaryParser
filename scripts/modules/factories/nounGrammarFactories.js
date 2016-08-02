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

 function NounCaseUse(nounCase, types, custom, test, testNoun){
   this.noun = pickWord(types, 'nouns');
   if(test){this.noun = testNoun;}
   this.case = nounCase;
   this.number = utilities.random(['sg','pl']);
   this.meaning = utilities.random(this.noun.meaning.split(', '));
   this.meaning = this.number === 'sg' ? ' the ' + this.meaning + ' ' : ' the ' + this.meaning + 's ';
   this.gender = this.noun.gender;
   this.stem = this.noun.stem;
   this.declension = this.noun.declension;
   if(this.gender === 'C'){this.gender = utilities.random(['M','F']);}
   this.ending = grammar[this.case][this.number][this.declension + this.gender];
   var that = this;
    custom(that);
    return this;
 }

 subject = function(){
   return new NounCaseUse('nominative', ['person','animal'], function(that){
     if(that.number === 'sg'){
       that.stem = '';
       that.ending = that.noun.firstDict;
     }
     else {
       that.ending = grammar[that.case][that.number][that.declension + that.gender];
     }
  });
};

  placeWhere = function(){
    return new NounCaseUse('ablative', ['place'], function(that){
      that.prep = ' in ';
      that.meaning = that.prep + that.meaning;
    });
  };

  directObject = function(){
    return new NounCaseUse('accusative','any',function(that){
      if (that.ending === 'firstDict') {
        that.stem = '';
        that.ending = that.firstDict;
      }
    });
  };

function Verb(type, subjectNumber, tense , voice, person){
  this.verb = pickWord(type, 'verbs');
  if (person === undefined) { this.person = 'third';}
  else {this.person = person; }
  this.meaning = this.verb.meaning;
  //fix standard definition from "to verb" -> "verb"
    if (this.meaning.match('to ')) {
      this.meaning = this.meaning.replace('to ', '');
    }
  this.tense = tense;
  this.voice = voice;
  this.number = subjectNumber;
    //change meaning if plural
    if(this.number === 'pl'){
      this.meaning = this.meaning + "s ";
    }
  this.ending = grammar.verbs.personalEndings[this.tense][this.voice][this.person + "Person"  + this.number];
  this.connectingVowel = grammar.verbs.connectingVowels[this.tense][this.verb.conjugation];
  //stop int combination
    if (this.ending === 'nt' && this.connectingVowel === 'i') {
      switch (this.verb.conjugation) {
        case 'third':
            this.connectingVowel = 'u';
          break;
        case 'thirdIo':
        this.connectingVowel = 'iu';
          break;
        case 'fourth':
        this.connectingVowel = 'iu';
          break;
        default:
        console.log('Error, passed through stop int but did not change: ' + this.verb.dictionaryEntry);
      }
    }
    return this;
}

var newVerb = new Verb('t', utilities.random(['sg','pl']),'present', 'active');
console.log(newVerb);

nounUtilities.transitiveSentence = function(){
  this.subject = subject();
  this.verb = new Verb('t', utilities.random(['sg','pl']),'present', 'active');
  this.placeWhere = placeWhere();
  this.directObject = directObject();
  this.english = [this.subject, this.verb, this.directObject, this.placeWhere ];
  this.latin = [
    this.subject.stem,
    this.subject.ending + " " ,
    this.placeWhere.prep,
    this.placeWhere.stem,
    this.placeWhere.ending + " ",
    this.directObject.stem,
    this.directObject.ending + " ",
    this.verb.verb.presentStem,
    this.verb.connectingVowel,
    this.verb.ending
  ];
  usedWords = [];
  return this;
};
  return nounUtilities;
}]);
