const SERVER_URL = 'http://127.0.0.1:8000/';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// async function listCategory() {
//     let response = await fetch(`${SERVER_URL}/blog/category`);
//     let data = await response.json();
//     return data
// }

async function postCategory(category) {
    let token = getCookie('access_token')

  
    console.log(category)
    let response = await fetch(`${SERVER_URL}/blog/category`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    let data = await response.json();
    return data
    
}

async function Submitcategory(){

    let category = {
        name: document.getElementById('category').value

    }
    let result = await postCategory(category);
    
}