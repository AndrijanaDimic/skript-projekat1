function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

   
    window.location.replace("http://localhost:8000/users.html");
    window.onunload = function() { debugger; }
 
    });

    document.getElementById('btn1').addEventListener('click', e => {
        e.preventDefault();

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

   
    window.location.replace("http://localhost:8000/category.html");
    window.onunload = function() { debugger; }
 
    });

    
    document.getElementById('btn2').addEventListener('click', e => {
        e.preventDefault();

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

   
    window.location.replace("http://localhost:8000/product.html");
    window.onunload = function() { debugger; }
 
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'loginAdmin.html';
    });

    document.getElementById('btn3').addEventListener('click', e => {
        e.preventDefault();

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    window.location.replace("http://localhost:8000/productType.html");
    window.onunload = function() { debugger; }
 
    });

    document.getElementById('btn4').addEventListener('click', e => {
        e.preventDefault();

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    window.location.replace("http://localhost:8000/order.html");
    window.onunload = function() { debugger; }
 
    });


}