const { enabled } = require("express/lib/application");

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(el => {

                let noviRed = `<tr>
                    <td>${el.id}</td>
                    <td>${el.name}</td>
                    <td>${el.email}</td>
                    <td>${el.role}</td>
                
                    </tr>
                        `;
                document.querySelector("#usrLst").innerHTML = document.querySelector("#usrLst").innerHTML + noviRed;

            });
        });
    document.getElementById('btnRole').addEventListener('click', e => {
        e.preventDefault();


        const data = {
            role: document.getElementById('role').value,
            email: document.getElementById('email').value,
            id :  document.getElementById('id').value
        };
        fetch('http://localhost:8000/admin/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
     
           .then(el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                  //  document.cookie = `token=;SameSite=Lax`;

                  window.location.href = 'users.html';
                    //document.querySelector("#usrLst").innerHTML = document.querySelector("#usrLst").innerHTML + noviRed;
                }
            });

      
            });

    document.getElementById('btnDelete').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            userId :  document.getElementById('id2').value
        };
        fetch('http://localhost:8000/admin/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
           .then(el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    window.location.href = 'users.html';
                }
            });
    });
         document.getElementById('turnBack').addEventListener('click', e => {
            document.cookie = `token=;SameSite=Lax`;
            window.location.href = 'home.html';
        });


}