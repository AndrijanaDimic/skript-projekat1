function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
           const lst = document.getElementById('usrLst');
          
            data.forEach( el => {

                let noviRed = `<tr>
                <td>${el.id}</td>
                <td>${el.name}</td>
                <td>${el.email}</td>
                <td><button type="button" onclick="obrisiRed(this)">X</button></td>
                 </tr>
                    `;
                //document.querySelector("#usrLst").innerHTML = document.querySelector("#usrLst").innerHTML +  noviRed;
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`;
            });
        });

 
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'loginAdmin.html';
    });
}