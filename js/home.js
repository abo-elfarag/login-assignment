

let logoutBtn = document.querySelector('.logout-btn')
let currentUser = {};
currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(logoutBtn);

document.getElementById("welcome").innerHTML = `Welcome ${currentUser.name}`

logoutBtn.addEventListener('click',function(){
    window.location.href = 'index.html';
})