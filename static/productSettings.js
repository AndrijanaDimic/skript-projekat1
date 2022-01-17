const { enabled } = require("express/lib/application");

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/admin/product', {
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
                    <td>${el.price}</td>
                    <td>${el.description}</td>
                    <td>${el.productTypeId}</td>
                    </tr>
                        `;
                document.querySelector("#productTable").innerHTML = document.querySelector("#productTable").innerHTML + noviRed;

            });
        });
        document.getElementById('btnDelete').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                id :  document.getElementById('id').value
            };
            fetch('http://localhost:8000/admin/product', {
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
                       window.location.href = 'product.html';
                        //document.querySelector("#productTable").innerHTML = document.querySelector("#productTable").innerHTML + noviRed;
                    }
                });
        });

        document.getElementById('btnChange').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                name: document.getElementById('name2').value,
                price: document.getElementById('price2').value,
                description: document.getElementById('description2').value,
                id: document.getElementById('id2').value
            };
    
            fetch('http://localhost:8000/admin/product', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.msg) {
                        alert(el.msg);
                    } else {
                        document.cookie = `token=;SameSite=Lax`;
                        window.location.href = 'product.html';
                       
                    }
                });
        });  
     
     document.getElementById('btnPost').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            productTypeId: document.getElementById('productTypeId').value
        };

        fetch('http://localhost:8000/admin/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    let noviRed = `<tr>
                    <td>${el.id}</id>
                    <td>${el.name}</td>
                    <td>${el.price}</td>
                    <td>${el.description}</td>
                    <td>${el.productTypeId}</td>
                    
                    </tr>
                        `;
                document.querySelector("#productTable").innerHTML = document.querySelector("#productTable").innerHTML + noviRed;
                   
                }
            });
    }); 

    document.getElementById('turnBack').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'home.html';
    });

}