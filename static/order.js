const { enabled } = require("express/lib/application");

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/admin/order', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(el => {
                let noviRed = `<tr>
                    <td>${el.id}</td>
                    <td>${el.price}</td>
                    <td>${el.discount}</td>
                    <td>${el.userId}</td>
                    </tr>
                        `;
                document.querySelector("#orderTable").innerHTML = document.querySelector("#orderTable").innerHTML + noviRed;

            });
        });
       
        document.getElementById('btnDelete').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                id :  document.getElementById('id').value
            };
            fetch('http://localhost:8000/admin/order', {
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
                        window.location.href = 'order.html';
                    
                    }
                });
        });
        
    document.getElementById('turnBack').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'home.html';
    });


}