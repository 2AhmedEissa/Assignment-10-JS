// Login Inputs
var loginEmail = document.getElementById("loginEmail");
var loginPass = document.getElementById("loginPass");
//Sign up Inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPass = document.getElementById("signupPass");

var usersStorage = []
//========================================Sign up=================================================
if (localStorage.getItem("users") == null) {
    usersStorage = []
} else {
    usersStorage = JSON.parse(localStorage.getItem("users"))
}


function issignupExist() {

    if (signupName.value == "" || signupEmail.value == "" || signupPass.value == "") {
        return false
    } else {
        return true
    }
}


function isEmailExist(email) {
    for (var i = 0; i < usersStorage.length; i++) {
        if (usersStorage[i].email.toLowerCase() === email.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function signUp() {
    if (!issignupExist()) {
        document.getElementById("signupresult").innerHTML = '<span class="text-danger m-3"> Please insert credentials! </span>';
        return false;
    }

    var newUser = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPass.value
    };

    if (isEmailExist(newUser.email)) {
        document.getElementById("signupresult").innerHTML = '<span class="text-danger m-3"> Email already exists! </span>';
        return false;
    }

    usersStorage.push(newUser);
    localStorage.setItem('users', JSON.stringify(usersStorage));
    document.getElementById('signupresult').innerHTML = '<span class="text-success m-3"> Thanks for signing up! </span>';
    signupName.value = "";
    signupEmail.value = "";
    signupPass.value = "";

    setTimeout(function tosignin() {
        window.location.href = "/Assignment10 JS/sign-in.html";
    }, 2000);


    return true;
}

//===================================Log in==============================================

function isloginExist() {

    if (loginPass.value == "" || loginEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (!isloginExist()) {
        document.getElementById("loginResult").innerHTML = '<span class="text-danger m-3">Please insert credentials!</span>';
        return false;
    }

    var enteredEmail = loginEmail.value;
    var enteredPassword = loginPass.value;

    var foundUser = usersStorage.find(function (user) {
        return user.email.toLowerCase() === enteredEmail.toLowerCase() &&
            user.password === enteredPassword;
    });

    if (foundUser) {

        localStorage.setItem('username', foundUser.name);


        document.getElementById("loginResult").innerHTML = '<span class="text-success m-3">Welcome, ' + foundUser.name + '!</span>';

        setTimeout(function () {
            window.location.href = "./home.html";
        }, 2000);
        return true;
    } else {
        document.getElementById("loginResult").innerHTML = '<span class="text-danger m-3">Incorrect email or password!</span>';
        return false;
    }
}

function logout() {

    localStorage.removeItem('username');


    window.location.href = "./sign-in.html";
}


var storedUsername = localStorage.getItem('username');
if (storedUsername) {
    document.getElementById('userName').innerText = ' Welcome ' + storedUsername;
}

