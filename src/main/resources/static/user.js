const userNavBar = document.getElementById('userNavBar');
const userTable = document.getElementById('userTable');

function getAuthUser() {
    fetch('http://localhost:8080/user/info')
        .then(response =>
        response.json())
        .then(user => {
            let role = rolesFromArray(user.roles);
            let info = '';

            info += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${role}</td> 
            </tr>`;
            userTable.innerHTML = info;
            userNavBar.innerHTML = `<b></b><span>${user.email}</span></b> 
                                            <span>with roles:</span>
                                            <span> ${role}</span>`;
        });
}

getAuthUser();

function rolesFromArray(roles) {
    let roleFrom = '';
    for (const role of roles) {
        roleFrom += role.roleName.toString().replace('ROLE_', '');
    }
    return roleFrom;
}

