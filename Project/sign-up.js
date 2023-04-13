const users = [];

class User {
    constructor(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.score = 0;
        this.scoreHistory = [];
    }
}

function createUser() {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    if (!email || !name || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const newUser = new User(email, name, password);

    users.push(newUser);

    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("password").value = "";

    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.hide();

    console.log(users);
}