//createUser--------------------------------------------------------
let addUser = document.forms['addUser'];
createUser();

function createUser() {
    addUser.addEventListener('submit', evnt => {
        evnt.preventDefault();

        let userRole = [];
        console.log(addUser.roles)
        for (let i = 0; i < addUser.roles.length; i++) {
            if (addUser.roles.options[i].selected) {
                userRole.push({
                    id: addUser.roles.options[i].value,
                    roleName: 'ROLE_' + addUser.roles.options[i].text
                })
            }
        }
        fetch('http://localhost:8080/admin/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addUser.name.value,
                surname: addUser.surname.value,
                age: addUser.age.value,
                email: addUser.email.value,
                password: addUser.password.value,
                roles: userRole
            })
        }).then(() => {
            addUser.reset();
            getAllUsers();
            $('#home-tab').click();
        })
    });
}

function rolesOfUser() {
    let selectAdd = document.getElementById('newRoles')
    // selectAdd.innerHTML = '';
    fetch('http://localhost:8080/admin/roles')
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let variable = document.createElement('option');
                variable.value = role.id;
                variable.text = role.roleName.toString().replace('ROLE_', '');
                selectAdd.appendChild(variable);
            })
        })
        .catch(error => console.error(error));
}

window.addEventListener('load', rolesOfUser);

//updating------------------------------------------------------------
let editForm = document.forms['editForm'];

editUser();

async function editModal(id) {
    const modalEdit = new bootstrap.Modal(document.querySelector('#editModal'));
    await openModal(editForm, modalEdit, id);
    rolesOfEditUser();
}

function editUser() {
    editForm.addEventListener('submit', evnt => {
        evnt.preventDefault();

        let editRoles = [];
        for (let i = 0; i < editForm.roles.options.length; i++) {
            if (editForm.roles.options[i].selected()) {
                editRoles.push({
                    id: editForm.roles.options[i].value,
                    name: 'ROLE_' + editForm.roles.options[i].text
                });
            }
        }
        fetch('http://localhost:8080/admin/update/' + editForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                name: editForm.name.value,
                surname: editForm.surname.value,
                age: editForm.age.value,
                email: editForm.email.value,
                password: editForm.password.value,
                roles: editRoles
            })
        }).then(() => {
            $('#editClose').click();
            getAllUsers()
        });
    });
}

function rolesOfEditUser() {
    let selectEdit = document.getElementById('editRoles')
    selectEdit.innerHTML = '';
    fetch('http://localhost:8080/admin/roles')
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let variable = document.createElement('option');
                variable.value = role.id;
                variable.text = role.roleName.toString().replace('ROLE_', '');
                selectEdit.appendChild(variable);
            })
        })
        .catch(error => console.error(error));
}

window.addEventListener('load', rolesOfEditUser);

//deleteUser----------------------------------------------------------
let deleteForm = document.forms['deleteForm'];

deleteUser();

async function deleteModal(id) {
    const modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    await openModal(deleteForm, modalDelete, id);
    rolesOfDeleteUser();
}

function deleteUser() {
    deleteForm.addEventListener('submit', evnt => {
        evnt.preventDefault();
        fetch('http://localhost:8080/admin/delete/' + deleteForm.id.value, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(() => {
            $('#deleteClose').click();
            getAllUsers();
        });
    });
}

function rolesOfDeleteUser() {
    let selectDelete = document.getElementById('deleteRoles')
    selectDelete.innerHTML = '';
    fetch('http://localhost:8080/admin/roles')
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let variable = document.createElement('option');
                variable.value = role.id;
                variable.text = role.roleName.toString().replace('ROLE_', '');
                selectDelete.appendChild(variable);
            })
        })
        .catch(error => console.error(error));
}

window.addEventListener('load', rolesOfDeleteUser);

//AllUsers===============================================================


function getAllUsers() {
    fetch('http://localhost:8080/admin/users')
        .then(response => {
            response.json()
                .then(function (users) {
                    let dataOfUsers = '';
                    let rolesString = '';

                    const tableUsers = document.getElementById('usersTable');

                    for (let user of users) {

                        rolesString = rolesFromArray(user.roles);

                        dataOfUsers += `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>              
                        <td>${user.surname}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${rolesString}</td>


                        <td>
                          <button type="button"
                          class="btn btn-info"
                          data-bs-toogle="modal"
                          data-bs-target="#editModal"
                          onclick="editModal(${user.id})">
                                Edit
                            </button>
                        </td>


                        <td>
                            <button type="button" 
                            class="btn btn-danger" 
                            data-toggle="modal" 
                            data-target="#deleteModal" 
                            onclick="deleteModal(${user.id})">
                                Delete
                            </button>
                        </td>
                    </tr>`;
                    }
                    tableUsers.innerHTML = dataOfUsers;
                })
        })
}

getAllUsers();

function rolesFromArray(roles) {
    let roleFrom = '';
    for (const role of roles) {
        roleFrom += role.roleName.toString().replace('ROLE_', ' ');
    }
    return roleFrom;
}

//AdminPage===================================================================
const adminNavBar = document.getElementById('adminNavBar');
const infoTable = document.getElementById('infoTable');

getAuthAdmin();

function getAuthAdmin() {
    fetch('http://localhost:8080/admin/adminInfo')
        .then(res => res.json())
        .then(admin => {
            let role = rolesFromArray(admin.roles);
            let info = '';
            info += `
                        <tr>
                            <td>${admin.id}</td>
                            <td>${admin.name}</td>
                            <td>${admin.surname}</td>
                            <td>${admin.age}</td>
                            <td>${admin.email}</td>
                            <td>${role}</td>
                        </tr>`;
            infoTable.innerHTML = info;
            adminNavBar.innerHTML = `<b><span>${admin.email}</span></b>
                                                <span>with roles: </span>
                                                <span>${role}</span>`;
        });
}

async function getUserById(id) {
    let response = await fetch('http://localhost:8080/admin/users' + id);
    return await response.json();
}

async function openModal(form, modal, id) {
    modal.show();
    let user = await getUserById(id);
    form.id.value = user.id;
    form.name.value = user.name;
    form.surname.value = user.surname;
    form.age.value = user.age;
    form.email.value = user.email;
    form.password.value = user.password;
    form.roles.value = user.roles;
}

