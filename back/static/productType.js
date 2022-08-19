
function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/admin/productType', {
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
                    <td>${el.productCategoryId}</td>
                    </tr>
                        `;
                document.querySelector("#productTable").innerHTML = document.querySelector("#productTable").innerHTML + noviRed;

            });
        });
        document.getElementById('btnPost').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                name: document.getElementById('name').value,
                productCategoryId: document.getElementById('id').value
            };
    
            fetch('http://localhost:8000/admin/productType', {
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
                        <td>${el.productCategoryId}</td>
                        </tr>
                            `;
                    document.querySelector("#productTable").innerHTML = document.querySelector("#productTable").innerHTML + noviRed;
                       
                    }
                });
        }); 
        
        document.getElementById('btnDelete').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                id :  document.getElementById('id').value
            };
            fetch('http://localhost:8000/admin/productType', {
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
                        window.location.href = 'productType.html';
                        //document.querySelector("#productTable").innerHTML = document.querySelector("#productTable").innerHTML + noviRed;
                    }
                });
        });

        document.getElementById('btnChange').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                name: document.getElementById('name2').value,
                id: document.getElementById('id2').value
            };
    
            fetch('http://localhost:8000/admin/productType', {
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
                        window.location.href = 'productType.html';
                       
                    }
                });
        });  
    
document.getElementById('turnBack').addEventListener('click', e => {
    document.cookie = `token=;SameSite=Lax`;
    window.location.href = 'home.html';
});

}