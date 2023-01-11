document.addEventListener('DOMContentLoaded', fetchCars)

    //fetches car obj from API
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
        
        let btn = document.createElement('button')
        btn.textContent = 'TOW AWAY'
        btn.className = 'delete'
        btn.addEventListener('click' , () => {
            fetch(`http://localhost:3000/cars/${car.id}` , {
                method: 'DELETE' ,
        })
            card.remove()})
        
        card.append(vehicle,img,btn)
        carContainer.appendChild(card)
        
    })
    }

    // use post method to send new cars submitted to the server
function sendNewCarToServer(newCar){
    fetch('http://localhost:3000/cars',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newCar)
    })
    .then(resp => resp.json())
    .then(car => renderCarCard(car))
    }
    

// form listener
let form = document.querySelector('form')
form.addEventListener('submit', createNewCar)


// updates server with new obj
function createNewCar(e){
let newCar = {
    'name': e.target.name.value ,
    'imgUrl': e.target.image.value
}
sendNewCarToServer(newCar)

form.reset()
}

