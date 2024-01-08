const input = document.getElementById("api-in");
const submit = document.getElementById("submit");
const apiError = document.getElementById("error-api");
const reset = document.getElementById("reset");


var key;
async function getAPI(){
    key = await api.getKey();
    if(key == undefined){
        key = "";
    }
    input.value = key;
}

getAPI();

function validApi(keyapi){
    if(keyapi == "aaa"){
        return false;
    }
    else{
        return true;
    }
}

async function submitAPI(){
    key = input.value;
    input.value = "";
    var realapi = await api.validApi(key);
    if(realapi){
        api.setKey(key);
        apiError.style.display = "none";
        window.location.href = "main.html";
    }
    else{
        apiError.style.display = "flex";
    }
}
async function resetAPI(){
    api.setKey("");
    input.value = "";
}

document.addEventListener("keydown", (event) =>{
    if(event.key == "Enter"){
        submitAPI();
    }
});

reset.addEventListener("click", resetAPI);

submit.addEventListener("click", submitAPI);