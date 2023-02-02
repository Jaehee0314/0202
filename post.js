const SERVER_URL = 'http://127.0.0.1:8000';

function getCookie(name) { // Cookie 가져오기
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
//Cookie의 access_token 값이 내가 누구인지 알려줌

async function postArticle(article) {
    let token = getCookie('access_token') // access_token 가져오기
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: article, // formdata 라서 json 함수 필요 없음
        headers: {
            'Authorization': `Bearer ${token}` // accss_token을 가져왔으면 header 부분에 명시,
            // 인증정보 : ~~
        }
    })
    let data = await response.json();
    console.log('test2')
    console.log(response.status)
    return data
}

async function submitArticle() {
    let form = document.getElementById('form') //form data 가져와서
    let formData = new FormData(form); //formdata 형태로 만들어서
    let result = await postArticle(formData); // postArticle에 넣어줌
    console.log(result);
}

async function getCategory(){
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = await response.json();
    return data

}

async function insertCategory(){
    let data = await getCategory();
    let category = document.getElementById('category');
    data.forEach((element) => {
        category.insertAdjacentHTML('afterBegin', `
            <option value="${element.id}">${element.name}</option>
        `);
    })
}

insertCategory();

async function selectArticle(){

}