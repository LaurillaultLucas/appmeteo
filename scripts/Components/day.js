const dayOfTheWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


let day = new Date();
let options = {weekday: 'long'};
let today = day.toLocaleDateString('fr-FR', options);
// console.log(today, day);

today = today.charAt().toUpperCase() + today.slice(1);

//get the array of days from today then add the days from monday to today
let dayInOrder = dayOfTheWeek.slice(dayOfTheWeek.indexOf(today)).concat(dayOfTheWeek.slice(0, dayOfTheWeek.indexOf(today)));

//console.log(dayInOrder);

export default dayInOrder;