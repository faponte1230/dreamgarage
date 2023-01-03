document.addEventListener('DOMContentLoaded', fetchCars)

function fetchCars(){
    fetch('http://localhost:3000/cars')
    .then(resp => resp.json())   
    .then(carsData => renderCarCard(carsData))    
}

    function renderCarCard(carsData){
    carsData.forEach(car => {
        let carContainer = document.querySelector('.car-container')    
        let card = document.createElement('div')
        card.className = 'card'
        let vehicle = document.createElement('div')
        vehicle.textContent = car.name 
        const img = document.createElement('img')
        img.src = car.imgUrl
        img.className = 'car-img'
        const btn = document.createElement('button')
        btn.textContent = 'TOW AWAY'
        btn.className = 'delete'
        btn.addEventListener('click' , () =>card.remove())
        card.append(vehicle, img, btn)
        carContainer.appendChild(card)
        sendUpdateToServer(car)
    })
    }

    
    
// PATCH method used to send new car to the server
function sendUpdateToServer(car){
    fetch(`http://localhost:3000/cars/${car.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application.json'
        },
        body:JSON.stringify(car)
    })
}

// form listener
let form = document.querySelector('form')
form.addEventListener('submit', createNewCar)

function createNewCar(e){
e.preventDefault()
let newCar = {
    'name': e.target.name.value,
    'imgUrl': e.target.imgUrl
}
submitNewCarToDb(newCar)

form.reset()
}

// use post method to send new cars submitted  to the DB
function submitNewCarToDb(newCar){
fetch('http://localhost:3000/cars',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify(newCar)
})
.then(resp => resp.json())
.then(car => renderCarCard($$$$))
}