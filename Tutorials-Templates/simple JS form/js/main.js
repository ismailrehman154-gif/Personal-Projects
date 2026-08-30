const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    if(nameInput.value === '' || emailInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'please enter all fields';

    setTimeout(() => {
        msg.classList.remove('error');
        msg.innerHTML = '';
    }, 3000);
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
        
        userList.appendChild(li);

        //clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
}



// const ul = document.querySelector('.items');

// ul.remove();
// ul.lastElementChild.remove()
// ul.firstElementChild.textContent = 'Hello'
// ul.children[1].innerText = 'brad';
// ul.lastElementChild.innerHTML = '<h1>Hello</h1>'
// const btn = document.querySelector('.btn')
// const items = document.querySelectorAll('.item');

// items.forEach((item) => console.log(item));

// //SIngle elemnt selectors
// console.log(document.getElementById('my-form'));
// console.log(document.querySelector('h1'));
// //multiple element selectors
// console.log(document.querySelectorAll('.item'));
// console.log(getElementByClassName('item'))
// console.log(getElementByTagName('li'))
// const btn = document.querySelector('.btn');

// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.querySelector('#my-form').style.background = '#ccc';
//     document.querySelector('body').classList.add('bg=dark');
//     document.querySelector('.items')
//     .lastElementChild.innerHTML = "<h1>hello</h1>"
// });