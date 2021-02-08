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
    let inValidFields = {};
    for (const [key, value] of Object.entries(editedObject)) {
        if (value === '') {
          inValidFields[key] = true;
        }
        if (key === 'email'){
          if (!validateEmail(value)){
            inValidFields[key] = true;
          } 
        }
        if (key === 'cerdit_card_number' || key === 'total_price'){
          if (!validateNumber(value)){
            inValidFields[key] = true;
          } 
        }
      }
    return inValidFields;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


function validateNumber(str){
  return !isNaN(str);
}