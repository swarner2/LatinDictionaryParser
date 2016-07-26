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
    var meaning = utilities.random(subject.meaning.split(', '));
    subject.number = utilities.random(['sg', 'pl']);
    //Nominative Singular is always show in the firstDict
    if(subject.number === 'sg'){
      subject.stem = subject.firstDict;
      subject.ending = '';
      subject.meaning = 'the ' + meaning + ' verbs';
    }
    else {
      subject.meaning = 'the ' + meaning + 's verb';
      subject.ending = grammar.nominative[subject.number][subject.declension + subject.gender];
    }
    return subject;
  };

  nounUtilities.placeWhere = function (){
    var prep = ' in ';
    var place = nounUtilities.pickNoun('place');
    var meaning = utilities.random(place.meaning.split(', '));
    place.number = utilities.random(['sg', 'pl']);
    place.stem = prep + place.stem;
    place.ending = grammar.ablative[place.number][place.declension + place.gender];
    place.meaning = place.number === 'sg' ? prep + ' the ' + meaning : prep + ' the ' + meaning + 's';
    return place;
  };

  nounUtilities.directObject = function (){
    var directObject = nounUtilities.pickNoun('any');
    var meaning = utilities.random(directObject.meaning.split(', '));
    directObject.number = utilities.random(['sg', 'pl']);
    directObject.ending = grammar.accusative[directObject.number][directObject.declension + directObject.gender];
    if (directObject.ending === 'firstDict') {
      directObject.stem = directObject.firstDict;
      directObject.ending = '';
    }
    directObject.meaning = directObject.number === 'sg' ? ' the ' + meaning : ' the ' + meaning + 's';
    return directObject;
  };

  return nounUtilities;
}]);
