let applications = JSON.parse(localStorage.getItem("applications")) || [];

const form = document.getElementById("appForm");
const appList = document.getElementById("appList");
const editIndexInput = document.getElementById("editIndex");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const application = {
        company: company.value,
        role: role.value,
        stage: stage.value,
        result: result.value,
        date: date.value
    };

    const editIndex = editIndexInput.value;

    if (editIndex === "") {
        // CREATE
        applications.push(application);
    } else {
        // UPDATE
        applications[editIndex] = application;
        editIndexInput.value = "";
    }

    localStorage.setItem("applications", JSON.stringify(applications));
    form.reset();
    renderApplications();
});

function renderApplications() {
    appList.innerHTML = "";

    applications.forEach((app, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.role}</td>
            <td>${app.stage}</td>
            <td>${app.result}</td>
            <td>${app.date}</td>
            <td>
                <button onclick="editApplication(${index})">Edit</button>
                <button onclick="deleteApplication(${index})">Delete</button>
            </td>
        `;

        appList.appendChild(row);
    });

    updateSummary();
}

// READ happens during render from localStorage

function editApplication(index) {
    const app = applications[index];

    company.value = app.company;
    role.value = app.role;
    stage.value = app.stage;
    result.value = app.result;
    date.value = app.date;

    editIndexInput.value = index;
}

function deleteApplication(index) {
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    renderApplications();
}

function updateSummary() {
    document.getElementById("total").innerText = applications.length;

    document.getElementById("interviews").innerText =
        applications.filter(app => app.stage === "Interview").length;

    document.getElementById("offers").innerText =
        applications.filter(app => app.stage === "Offer").length;

    document.getElementById("rejections").innerText =
        applications.filter(app => app.result === "Rejected").length;
}

renderApplications();
