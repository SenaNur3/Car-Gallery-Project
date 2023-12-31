const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1]; //2.card-body seçeriz
const clear = document.getElementById("clear-cars");

//Tüm Eventleri yükleme
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addCar);
  document.addEventListener("DOMContentLoaded", function () {
    let cars = storage.getCarsFromStorage();
    ui.loadAllCars(cars);
  });
  cardbody.addEventListener("click", deleteCar);
  clear.addEventListener("click", clearAllCars);
}

function addCar(e) {
  e.preventDefault();

  const title = titleElement.value;
  const price = priceElement.value;
  const url = urlElement.value;

  if (title === "" || price === "" || url === "") {
    ui.displayMessages("Tüm alanları doldurun..", "danger");
  } else {
    const newCar = new Car(title, price, url);
    ui.addCarToUI(newCar); // arayüze araç ekleme
    storage.addCarToStorage(newCar);
    ui.displayMessages("Araç başarıyla eklendi.", "success");
  }

  ui.clearInputs(titleElement, priceElement, urlElement);
}

function deleteCar(e) {
  if (e.target.id === "delete-car") {
    ui.deleteCarFormUI(e.target);
    //previousElementSibling child ulaşmak için
    storage.deleteCarFromStroge(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    ui.displayMessages("Silme işlemi başarıyla Gerçekleşti ", "success");
  }
}
function clearAllCars() {
  if(confirm("Tüm araçlar silineeck. Emin misiniz ?")){
    ui.clearAllCarsFromUI();
    stroge.clearAllCarsFromStroge();
  }
}
