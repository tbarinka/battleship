import './style.css';

let div = document.createElement('div');
div.textContent = "test";
let bod = document.getElementById('body')
bod.appendChild(div);

console.log('I was logged from index.js!');
