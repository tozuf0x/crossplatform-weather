const sidebarContent = document.querySelector(".sidebar-content");
const cityName = document.getElementById("city-name");
const cityIn = document.getElementById("city-in");
const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const cityTemp = document.getElementById("city-temp");
const errorMessage = document.getElementById("error-message");
const cityImage = document.getElementById("city-pic");
const cityDescription = document.getElementById("city-desc");

const cities = [];

async function addElementToSidebar() {
    if(await api.getData(cityIn.value) != false){
        errorMessage.style.display = "none";
        const newElement = document.createElement("div");
        newElement.className = "sidebar-item";
        newElement.textContent = cityIn.value;
        cityIn.value = "";
        sidebarContent.appendChild(newElement);

        newElement.addEventListener("click", async () =>{
            cities.forEach((element) =>{
                element.style.backgroundColor = "#00bbff";
            });
            newElement.style.backgroundColor = "#0044ff";
            cityName.textContent = newElement.textContent;
            const cityData = await api.getData(newElement.textContent);
            if(cityData != false){
                cityTemp.textContent = cityData.main.temp + "°C / " + (cityData.main.temp * 1.8 + 32)+ "°F";
                cityImage.src = `http://openweathermap.org/img/w/${cityData.weather[0].icon}.png`;
                cityDescription.textContent = cityData.weather[0].description;
            }
            else{
                cityTemp.textContent = "Error";
            }
        });

        cities.push(newElement);
    }
    else{
        cityIn.value = "";
        errorMessage.style.display = "flex";
    }
}
async function removeElementFromSidebar() {
    if(cities.length != 0){
        var removed = cities.pop();
        removed.remove();
    }
}


document.addEventListener("keydown", (event) =>{
    if(event.key == "Enter"){
        addElementToSidebar();
    }
    else if(event.key == "Backspace"){
        removeElementFromSidebar();
    }
});
addButton.addEventListener("click", addElementToSidebar);
removeButton.addEventListener("click", removeElementFromSidebar);