let currentUser = null;


function signInUser() {

    const email = document.getElementById("floatingInput").value;
    const password = document.getElementById("floatingPassword").value;


    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        currentUser = user;
        const modal = new bootstrap.Modal(document.getElementById("secondModal"));
        modal.hide();

        document.getElementById("floatingInput").value = "";
        document.getElementById("floatingPassword").value = "";


        document.getElementById("welcomeMessage").innerText = `Welcome, ${user.name}!`;
        document.getElementById("welcomeMessage").style.display = "block";
        document.getElementById("signInBtn").style.display = "none";
        document.getElementById("signUpBtn").style.display = "none";
    } else {

        alert("Invalid email or password. Please try again.");
    }
    document.getElementById("signOutBtn").style.display = "inline-block";
    document.getElementById("scoreBtn").style.display = "inline-block";

}

function signOutUser() {
    document.getElementById("welcomeMessage").style.display = "none";
    document.getElementById("signOutBtn").style.display = "none";
    document.getElementById("scoreBtn").style.display = "none";
    document.getElementById("signInBtn").style.display = "inline-block";
    document.getElementById("signUpBtn").style.display = "inline-block";
}

function showScoreHistory() {
    if (!currentUser) {
        alert("Please sign in to view your score history.");
        return;
    }

    const scoreTable = document.createElement("table");
    scoreTable.classList.add("table");

    const tableHeader = `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
    `;
    scoreTable.innerHTML = tableHeader;

    const tableBody = document.createElement("tbody");
    currentUser.scoreHistory.forEach((score, index) => {
        const row = document.createElement("tr");
        const numberCell = document.createElement("td");
        const scoreCell = document.createElement("td");

        numberCell.innerText = index + 1;
        scoreCell.innerText = score;

        row.appendChild(numberCell);
        row.appendChild(scoreCell);
        tableBody.appendChild(row);
    });

    scoreTable.appendChild(tableBody);

    const container = document.getElementById("scoreHistoryContainer");
    container.innerHTML = "";
    container.appendChild(scoreTable);

    const scoreHistoryModal = new bootstrap.Modal(document.getElementById("scoreHistoryModal"));
    scoreHistoryModal.show();
}