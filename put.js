const SERVER_URL = 'http://127.0.0.1:8000/';


function getCookie(name) { // Cookie 가져오기
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
//Cookie의 access_token 값이 내가 누구인지 알려줌

async function getArticle() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function postArticle(article) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: JSON.stringify(article),
        headers:{
            'Content-type':'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    let data = await response.json();
    return data
}

async function deleteArticle(id) {
    let token = getCookie('access_token') 
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${token}`,
      }
    });
    console.log('test3')
    // 요청이 성공했을때만 해당 글을 삭제 -> 새로고침하지 않아도 삭제된게 보여짐
    if (response.status === 204) {
        let post = document.getElementById(id);
        post.remove();
    }
}

async function updateArticle(article, id) {

  

    let token = getCookie('access_token')

    let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
      method: 'PUT',
      body: JSON.stringify(article),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    });
    let data = await response.json();
    return data
}

async function submitArticle() {
    let article = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,

    }
    // let result = await updateArticle(article);
    let result = await updateArticle(article);
    console.log(result);
}

async function insertArticle(){
    let data = await getArticle();
    data.forEach((element) => {
        document.body.insertAdjacentHTML('afterBegin', `
        <div id='${element.id}'>
            <h1>${element.title}</h1>
            <p>${element.content}</p>
            <button onclick='deleteArticle(${element.id})'>삭제하기</button>
        </div>
        `);
    })
}
insertArticle()