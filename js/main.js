
const register = document.getElementById("register");
const login = document.getElementById("login");
const container = document.getElementById("container");
let inputName = document.getElementById("inputName");
let inputEmail = document.getElementById("inputEmail");
let inputPassword = document.getElementById("inputPassword");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let signIn = document.getElementById("signIn");
let signUp = document.getElementById("signUp");
let emptyInput = document.getElementById("emptyInput");
let usersList = [];
let currentUser = {};
console.log()

// Check if there are existing users in localStorage
if(localStorage.getItem("users") != null){
    usersList = JSON.parse(localStorage.getItem("users"));
}
// toggle between sign up and sign in
register.addEventListener("click",function(){
    container.classList.add("active");
})
login.addEventListener("click",function(){
    container.classList.remove("active");
})
// Event listeners for registration a new user 
signUp.addEventListener('click',function(){
    // Check the all input is not empty
    if(inputName.value == "" || inputEmail.value == "" || inputPassword.value == ""){
        document.getElementById('emptyInput').innerHTML = 'All inputs is required';
    }
    var isValidName = validUserName();
    var isValidEmail = validEmail();
    var isValidPassword = validPassword();
    // Check data from user and Validate user name , email and password
    if (isValidName && isValidEmail && isValidPassword && isNameRegistered() === true && isEmailRegistered() === true) {
        // Create a new user object
        var newUser = {
            name: inputName.value.trim(),
            email: inputEmail.value,
            password: inputPassword.value
        };
        // Add the new user to the array
        usersList.push(newUser);
        localStorage.setItem("users", JSON.stringify(usersList));
        console.log();
        // Clear input fields
        inputName.value = '';
        inputEmail.value = '';
        inputPassword.value = '';
        // Display success message
        document.getElementById('success').innerHTML = `successfully : ${newUser.name}`;
    }else{
        // Display specific error messages for each field
        if(!isValidName){
            document.getElementById('invalidName').innerHTML = 'Should user name 3-100 letter';
        }
        if(!isValidEmail){
            document.getElementById('invalidEmail').innerHTML = 'enter correct email';
        }
        if(!isValidPassword){
            document.getElementById('invalidPassword').innerHTML = 'Should password include at least 8 number , at least a capital letter and small letter and mark';
        }
        if(isNameRegistered() == false){
            document.getElementById('invalidName').innerHTML = 'this user name is already registered';
            inputName.classList.add('invalid-input');
        }
        if(isEmailRegistered() == false){
            document.getElementById('invalidEmail').innerHTML = 'this Email is already registered';
            inputEmail.classList.add('invalid-input');
        }
    }
})
// Functions to validate regex the name , email and password
function validUserName(){
    var regex = /^[a-zA-Z0-9]{3,100}$/;
    return regex.test(inputName.value.trim());
}
function validEmail(){
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(inputEmail.value);
}
function validPassword(){
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(inputPassword.value);
}
// Functions to fiend if user already registered
function isNameRegistered(){
    var nameReg = usersList.find(user => user.name == inputName.value);
    if(nameReg === undefined){
        return true;
    }else{
        return false;
    }
}
function isEmailRegistered(){
    var emailReg = usersList.find(user => user.email == inputEmail.value);
    if(emailReg === undefined){
        return true;
    }else{
        return false;
    }
}
// Event listeners for when user arrives to valid regex for name
inputName.addEventListener('input',function(){
    if(validUserName() == true) {
        inputName.classList.add('is-valid');
        inputName.classList.remove('is-invalid');
        document.getElementById('invalidName').innerHTML = '';
    }else {
        inputName.classList.remove('is-valid');
    }
})
// Event listeners for when user leave input and the regex still an wrong for name
inputName.addEventListener('blur',function(){
    console.log()
    if(!validUserName() == true) {
        inputName.classList.add('is-invalid');
        document.getElementById('invalidName').innerHTML = 'Should user name 3-100 letter';
    }
})
// Event listeners for when user arrives to valid regex for email
inputEmail.addEventListener('input',function(){
    if(validEmail() == true) {
        inputEmail.classList.add('is-valid');
        inputEmail.classList.remove('is-invalid');
        document.getElementById('invalidEmail').innerHTML = '';
    }else {
        inputEmail.classList.remove('is-valid');
    }
})
// Event listeners for when user leave input and the regex still an wrong for email
inputEmail.addEventListener('blur',function(){
    if(!validEmail() == true) {
        inputEmail.classList.add('is-invalid');
        document.getElementById('invalidEmail').innerHTML = 'enter correct email';
    }
})
// Event listeners for when user arrives to valid regex for password
inputPassword.addEventListener('input',function(){
    if(validPassword() == true) {
        inputPassword.classList.add('is-valid');
        inputPassword.classList.remove('is-invalid');
        document.getElementById('invalidPassword').innerHTML = '';
    }else {
        inputPassword.classList.remove('is-valid');
    }
})
// Event listeners for when user leave input and the regex still an wrong for password
inputPassword.addEventListener('blur',function(){
    if(!validPassword() == true) {
        inputPassword.classList.add('is-invalid');
        document.getElementById('invalidPassword').innerHTML = 'Should password include at least 8 number , at least a capital letter and small letter and mark';
    }
})
// Event listeners for user login
signIn.addEventListener('click',function(){
    // chick if email and password correct
    var user = usersList.find(user => user.email === loginEmail.value && user.password === loginPassword.value);
    if(user != undefined){
        // storage the object of user to use that in home page
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log(currentUser);
        // clear input
        loginEmail.value = '';
        loginPassword.value = '';
        // move the user to home page
        window.location.replace('home.html');
    }else{
        document.getElementById('invalidSignIN').innerHTML = 'the Email or password is incorrect';
    }
})






