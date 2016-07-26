app.factory('utilities', function(){
  var utilities = {};
  
  //random takes an array and gives back a random value of that array
  utilities.random = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  };



  return utilities;
});
