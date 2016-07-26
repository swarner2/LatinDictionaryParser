app.factory('nounUtilities', ['utilities',function(utilities){
  var nounUtilities = {};

  //pickNoun takes a string to check the type of a noun
  //any takes all nouns
  nounUtilities.pickNoun = function(type){
    if (type === 'any') { return utilities.random(dictionary.nouns); }
    return utilities.random(dictionary.nouns.filter( function(x){
      return x.types == type;
    }));
  };

  nounUtilities.subject = function (){
    var subject = nounUtilities.pickNoun('person');
    subject.number = utilities.random(['sg', 'pl']);
    if(subject.number === 'sg'){
      subject.stem = subject.firstDict;
      subject.ending = '';
      subject.meaning = 'the ' + subject.meaning + ' verbs';
    }
    else {
      subject.meaning = 'the ' + subject.meaning + 's verb';
      subject.ending = grammar.nominative[subject.number][subject.declension + subject.gender];
    }
    return subject;
  };

  nounUtilities.placeWhere = function (){
    var prep = ' in';
    var place = nounUtilities.pickNoun('place');
    place.number = utilities.random(['sg', 'pl']);
    place.stem = 'in ' + place.stem;
    place.ending = grammar.ablative[place.number][place.declension + place.gender];
    place.meaning = place.number === 'sg' ? prep + ' the ' + place.meaning : prep + ' the ' + place.meaning + 's';
    return place;
  };

  nounUtilities.directObject = function (){
    var directObject = nounUtilities.pickNoun('any');
    directObject.number = utilities.random(['sg', 'pl']);
    directObject.ending = grammar.accusative[directObject.number][directObject.declension + directObject.gender];
    if (directObject.ending === 'firstDict') {
      directObject.stem = directObject.firstDict;
      directObject.ending = '';
    }
    directObject.meaning = directObject.number === 'sg' ? ' the ' + directObject.meaning : ' the ' + directObject.meaning + 's';
    return directObject;
  };

  return nounUtilities;
}]);
