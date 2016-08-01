app.factory('nounUtilities', ['utilities',function(utilities){
  var nounUtilities = {};

  //pickNoun takes a string to check the type of a noun
  //any takes all nouns
  //if more than one type can be present accept an array of the desired types.
  var pickNoun = function(type){
    if (type === 'any') { return utilities.random(dictionary.nouns); }
    //  if it is an array of types one will be randomly selected here
    if (Array.isArray(type)){type = utilities.random(type);}
    return utilities.random(dictionary.nouns.filter( function(x){
      return x.types == type;
    }));
  };

 function NounCaseUse(nounCase, types, custom){
   this.noun = pickNoun(types);
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
    if(this.meaning.match(',')){
    console.log(this);}
    return this;
 }

 nounUtilities.subject = function(){
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

  nounUtilities.placeWhere = function(){
    return new NounCaseUse('ablative', ['place'], function(that){
      that.prep = ' in ';
      that.meaning = that.prep + that.meaning;
    });
  };

  nounUtilities.directObject = function(){
    return new NounCaseUse('accusative','any',function(that){
      if (that.ending === 'firstDict') {
        that.stem = '';
        that.ending = that.firstDict;
      }
    });
  };

  return nounUtilities;
}]);
