let name = prompt(`What is your name?`);
let firstCharacter = name.slice(0,1);
let upperCase = firstCharacter.toUpperCase();
let restOfname = name.slice(1,name.length);
restOfname = restOfname.toLowerCase();
let fullName = upperCase+restOfname;
alert(`Hello ` + fullName);
