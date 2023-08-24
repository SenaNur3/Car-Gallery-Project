const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");

//Tüm Eventleri yükleme 

eventListeners();

function eventListeners(){
   form.addEventListener("submit",addCar);
   document.addEventListener("DOMContentLoaded",function(){
    let cars = storage.getCarsFromStorage();
    ui.loadAllCars(cars)
   })
}

function addCar(e) {
   e.preventDefault();

   const title = titleElement.value;
   const price = priceElement.value;
   const url = urlElement.value;

   if (title === "" || price === "" || url === "") {
       ui.displayMessages("Tüm alanları doldurun..","danger");
   } else {
       const newCar = new Car(title, price, url);
       ui.addCarToUI(newCar); // arayüze araç ekleme

       storage.addCarToStorage(newCar);

       ui.displayMessages("Araç başarıyla eklendi.","success");
   }
   ui.clearInputs(titleElement, priceElement, urlElement);
}