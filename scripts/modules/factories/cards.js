app.factory("cards", function(){
  cards = {};

  //takes an array of arraysOfWords
  cards.getCards = function(arrayOfWords){
    var data = arrayOfWords;
    var words = [];
      data.forEach(function(array){
        array.forEach(function(word){
          words.push(word);
        });
      });
    return words;
  };
  return cards;
});
