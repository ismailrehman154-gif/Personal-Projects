// alert('works')
const todos = [
    {
        id: 1,
        text: 'do your HW',
        isCompleted: true
    },
    {
        id: 2,
        text: 'Coffee chat',
        isCompleted: true
    },
    {
        id: 3,
        text: 'Dentist',
        isCompleted: false
    },
];

const todoJSON = JSON.stringify(todos);
console.log(todoJSON);

// for loops
for(let i = 0; i < 10; i++) {
    console.log(`For loop Number: ${i}`);
}
//while
let i = 0;
while(i < 10) {
    console.log(`While loop Number: ${i}`);
    i++;
}