export function idGen(){
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    let id = '';
    id = id + getRandomInt(0,10) + getRandomInt(0,10) + getRandomInt(0,10) + '-' + getRandomInt(0,10) + getRandomInt(0,10) + '-' + getRandomInt(0,10) + getRandomInt(0,10) + getRandomInt(0,10) + getRandomInt(0,10) 
    return id;
  }

export function inputValidation(editedObject){
    let valid = true;
    for (const [key, value] of Object.entries(editedObject)) {
        if (value === '' || !key) {valid = false}
      }
    return valid;
}