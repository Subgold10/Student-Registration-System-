const form = document.getElementById("student-form");
const recordsSection = document.getElementById("student-records");

// Initialize students array in localStorage
if (!localStorage.getItem("students")) {
  localStorage.setItem("students", JSON.stringify([]));
}

// Display existing records on page load
document.addEventListener("DOMContentLoaded", () => {
  const students = JSON.parse(localStorage.getItem("students"));
  displayRecords(students);
});

// Form submission

// Event Listener triggered when clicked
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("student-id").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // alert if some entry is not filled
  if (!name || !studentId || !email || !contact) {
    alert("Please fill in all fields.");
    return;
  }

  const student = { name, studentId, email, contact };
  const students = JSON.parse(localStorage.getItem("students"));
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  displayRecords(students);

  form.reset();
});

// Display records
function displayRecords(students) {
  recordsSection.innerHTML = "";
  students.forEach((student, index) => {
    const record = document.createElement("div");
    record.classList.add("record");
    record.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>ID:</strong> ${student.studentId}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Contact:</strong> ${student.contact}</p>
            <button onclick="editRecord(${index})">Edit</button>
            <button onclick="deleteRecord(${index})">Delete</button>
        `;
    recordsSection.appendChild(record);
  });
}

//Editing a record
function editRecord(index) {
  const students = JSON.parse(localStorage.getItem("students"));
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("student-id").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayRecords(students);
}

// Delete a record
function deleteRecord(index) {
  const students = JSON.parse(localStorage.getItem("students"));
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayRecords(students);
}
