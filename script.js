document.addEventListener('DOMContentLoaded', fetchCars)

function fetchCars(){
    fetch('http://localhost:3000/cars')
    .then(res => res.json())   
    .then(carData => integrate(carData))
}

function integrate(carData){
    carData.forEach(car => {
        renderCarCard(car)
    })
}

let carContainer = document.querySelector('.car-container')

function renderCarCard(car){
    let card = document.createElement('div')
    card.className = 'card'
    let img = document.createElement('img')
    img.src = car.img
    img.className = 'car-img'
}

