const SERVER_URL = 'http://127.0.0.1:8000'

async function postImage(formData){
    let response = await fetch (`${SERVER_URL}/blog/image`, {
        method:'POST',
        body: formData
    })
    let data = await response.json();
    return data
}

async function submitImage(){
    let form =  document.getElementById('form');
    let imageFormData =new FormData(form);
    let result = await postImage(imageFormData);
    console.log(result);
}
