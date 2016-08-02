app.factory('nounUtilities', ['utilities',function(utilities){
  var nounUtilities = {};

  //pickNoun takes a string to check the type of a noun
  //any takes all nouns
  //if more than one type can be present accept an array of the desired types.
  var usedWords = [];
  var pickNoun = function(type){
    var word;
    if (type === 'any') {
      word = utilities.random(dictionary.nouns);
    }
    //  if it is an array of types one will be randomly selected here
    else if (Array.isArray(type)){
      type = utilities.random(type);
      word = utilities.random(dictionary.nouns.filter( function(x){
        return x.types == type;
      }));
    }
    // if one type is given get it here
    else{
      word = utilities.random(dictionary.nouns.filter( function(x){
        return x.types == type;
      }));
    }
    //if the word is already used in usedWords make a newWord
    if(usedWords.indexOf(word) === -1){
      usedWords.push(word);
      return word;
    }
    else{
      return pickNoun(type);
    }
  };

 function NounCaseUse(nounCase, types, custom, test, testNoun){
   this.noun = pickNoun(types);
   if(test){this.noun = testNoun;}
   this.case = nounCase;
   this.number = utilities.random(['sg','pl']);
   this.meaning = utilities.random(this.noun.meaning.split(', '));
   this.meaning = this.number === 'sg' ? ' the ' + this.meaning : ' the ' + this.meaning + 's';
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
       that.meaning = that.meaning + ' verbs';
     }
     else {
       that.meaning = that.meaning + ' verb';
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

nounUtilities.transitiveSentence = function(){
  this.subject = subject();
  this.placeWhere = placeWhere();
  this.directObject = directObject();
  this.english = [this.subject, this.directObject, this.placeWhere ];
  this.latin = [
    this.subject.stem,
    this.subject.ending + " " ,
    this.placeWhere.prep,
    this.placeWhere.stem,
    this.placeWhere.ending + " ",
    this.directObject.stem,
    this.directObject.ending + " ",
  ];
  usedWords = [];
  return this;
};
  return nounUtilities;
}]);
