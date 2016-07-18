function getGender(dictEntry){
  //this.gender = undefined;
    //clean up the parentheses if there are any
    dictEntry = dictEntry.replace(/\(/, '');
    dictEntry = dictEntry.replace(/\)/, '');
    //check to see if both masculine and feminine are given for common gender
      if(dictEntry.match(/m\/f$/i)){
        dictEntry = dictEntry.replace(/ m\/f$/i, '' );
        return 'C';
      }
      if(dictEntry.match(/c$/i)){
        dictEntry = dictEntry.replace(/ c$/i,'' );
        return 'C';
      }
      if(dictEntry.match(/m$/i)){
        dictEntry = dictEntry.replace(/ m$/i,'' );
        return 'M';
      }
      if(dictEntry.match(/f$/i)){
        dictEntry = dictEntry.replace(/ f$/i,'' );
        return 'F';
      }
      if(dictEntry.match(/n$/i)){
        dictEntry = dictEntry.replace(/ n$/i,'' );
        return 'N';
      }
}
