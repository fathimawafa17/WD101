const date_of_birth_2 = document.getElementById("dob");
const date_of_today = new Date().toISOString().slice(4, 10);

const year = new Date().getFullYear();

date_of_birth_2.min = `${year - 55}${date_of_today}`;
date_of_birth_2.max = `${year - 18}${date_of_today}`;

let entries_of_users = [];
let condition = true;

function submitListener(event) {
  event.preventDefault();
  document.getElementById("show_the_data").innerHTML = "";
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let acceptTerms = document.getElementById("tick_mark").checked;

  let entries = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };
  if (condition) {
    let users = [];
    users = JSON.parse(localStorage.getItem("user-entries")) || [];
    for (let i = 0; i < users.length; i++) {
      entries_of_users.push(users[i]);
    }
    condition = false;
  }
  entries_of_users.push(entries);
  localStorage.setItem("user-entries", JSON.stringify(entries_of_users));
  show_the_data();
}
function show_the_data() {
  let users = JSON.parse(localStorage.getItem("user-entries")) || [];
  for (let i = 0; i < users.length; i++) {
    let res = `<tr>
    <td class="py-3 px-2">${users[i].name}</td>
    <td class="py-3 px-2">${users[i].email}</td>
    <td class="py-3 px-2">${users[i].password}</td>
    <td class="py-3 px-2">${users[i].dob}</td>
    <td class="py-3 px-2">${users[i].acceptTerms}</td>
  </tr>`;
    document.getElementById("show_the_data").innerHTML += res;
  }
}
show_the_data();
