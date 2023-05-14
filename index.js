const form = document.querySelector("#user-form");
const table = document.querySelector("#user-table");
const UserData = document.querySelector("#user-data");
const NameInput = document.querySelector("#name");
const EmailInput = document.querySelector("#email");
const PasswordInput = document.querySelector("#password");
const dobInput = document.querySelector("#dob");
const termsCheckbox = document.querySelector("#terms");

// Load data from web storage
const loadData = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.Name}</td>
      <td>${user.Email}</td>
      <td>${user.Password}</td>
      <td>${user.Dob}</td>
      <td>${user.Terms ? "Yes" : "No"}</td>
    `;
    UserData.appendChild(row);
  });
};

// Save data to web storage
const saveData = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Add a new user to the table and storage
const addUser = (user) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.terms ? "Yes" : "No"}</td>
  `;
  UserData.appendChild(row);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  saveData(users);
};

// Form submission listener
const submitListener = (event) => {
  event.preventDefault();

  const Name = NameInput.value.trim();
  const Email = EmailInput.value.trim();
  const Password = PasswordInput.value.trim();
  const Dob = dobInput.value;
  const Terms = termsCheckbox.checked;

  // Additional validation for date of birth
  const dobDate = new Date(dob);
  const dobYear = dobDate.getFullYear();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const age = currentYear - dobYear;
  if (age <= 18 || age >= 55) {
    alert("Please enter a valid date of birth between ages 18 and 55.");
    return;
  }

  // Add user to table and storage
  const user = { Name, Email, Password, Dob, Terms };
  addUser(user);

  // Reset form
  form.reset();
  NameInput.focus();
};

// Load data from storage when page is loaded
window.addEventListener("load", () => {
  loadData();
});
