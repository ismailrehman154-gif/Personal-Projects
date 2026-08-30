// alert('works')
const x = 4;
const y = 10;



const addNum = (num1 = 1,num2 = 1) => {
    console.log(num1 + num2);
}

console.log(addNum(5,5))


//Constructive function
function Person(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
}

Person.prototype.getBirthYear = function(){
     return this.dob.getFullYear();
}

Person.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}` ;
}

//instantiate object
const person1 = new Person('john','doe' ,'20-12-2020')
const person2 = new Person('mary', 'smith', '3-6-1653')






    if (x === 10) {
    console.log('x is 10');
} else if ( x > 10) {
    console.log('x is greater than 10')
} else {
    console.log('x is less than 10')
}

















// const todos = [
//     {
//         id: 1,
//         text: 'do your HW',
//         isCompleted: true
//     },
//     {
//         id: 2,
//         text: 'Coffee chat',
//         isCompleted: true
//     },
//     {
//         id: 3,
//         text: 'Dentist',
//         isCompleted: false
//     },
// ];

// const todoJSON = JSON.stringify(todos);
// console.log(todoJSON);

// for(let i = 0; i < todos.length; i++) {
//     console.log(`For loop Number: ${i}`);
// }

// for(let todo of todos){
//     console.log(todo);
// }
// // forEach, map, filter
// const  forEach(function(todo){

// })

// const map(function(todo){
    
// })
// for loops
// for(let i = 0; i < 10; i++) {
//     console.log(`For loop Number: ${i}`);
// }
// //while
// let i = 0;
// while(i < 10) {
//     console.log(`While loop Number: ${i}`);
//     i++;
// }

