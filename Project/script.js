class Player {
    constructor(name, avatarSrc) {
        this.name = name;
        this.avatarSrc = avatarSrc;
    }
}
let currentPlayer;

const players = [];

const modal = document.getElementById("myModal");


function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    const name = document.getElementById("name").value;
    const selectedAvatar = document.querySelector(".avatars img.selected");

    if (name && selectedAvatar) {
        const newUser = new Player(name, selectedAvatar.src);
        players.push(newUser);
        console.log(players);
        modal.style.display = "none";

        const playerContainer = document.getElementById("playerContainer");
        playerContainer.innerHTML = `
            <img src="${selectedAvatar.src}" alt="Player avatar" class="avatar-circle ">
            <h1>${name}</h1>
        `;
    } else {
        alert("Please enter your name and choose an avatar.");
    }
}

function selectAvatar(src) {
    const avatars = document.querySelectorAll(".avatars img");
    avatars.forEach(avatar => {
        if (avatar.getAttribute("src") === src) {
            avatar.classList.add("selected");
        } else {
            avatar.classList.remove("selected");
        }
    });
}

window.onload = openModal;

const game = [
    { player: "Alice", score: 10 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Bob", score: 20 },
    { player: "Charlie", score: 15 },
    { player: "Dave", score: 5 },
];
const tbody = document.getElementById("scores");
for (let i = 0; i < game.length; i++) {
    const tr = document.createElement("tr");
    const tdPlayer = document.createElement("td");
    tdPlayer.innerText = game[i].player;
    tr.appendChild(tdPlayer);
    const tdScore = document.createElement("td");
    tdScore.innerText = game[i].score;
    tr.appendChild(tdScore);
    tbody.appendChild(tr);
}