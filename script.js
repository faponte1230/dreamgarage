let carContainer = document.querySelector('.car-container')

document.addEventListener('DOMContentLoaded', fetchCars)

    //fetches car obj from API
function fetchCars(){
    fetch('http://localhost:3000/cars')
    .then(resp => resp.json())   
    .then(carsData => carsData.forEach(carObj => renderCarCard(carObj)))    
}

    function renderCarCard(car){

        let card = document.createElement('div')
        card.className = 'card'
    
        let vehicle = document.createElement('div')
        vehicle.textContent = car.name

        const img = document.createElement('img')
        img.src = car.imgUrl
        img.className = 'car-img'
        
        let voteCounter = document.createElement('div')
        let counter = 0 

        voteCounter.textContent = counter


        let votebtn = document.createElement('button')
        votebtn.textContent = 'vote'
        votebtn.className = 'votecounter'
        votebtn.addEventListener('click', () => {
         counter += 1
         voteCounter.textContent = counter
         
        })


        let btn = document.createElement('button')
        btn.textContent = 'TOW AWAY'
        btn.className = 'delete'
        btn.addEventListener('click' , () => {
            fetch(`http://localhost:3000/cars/${car.id}` , {
                method: 'DELETE' ,
        })
            card.remove()})
        

        card.append(vehicle,img,voteCounter,votebtn,btn)
        carContainer.appendChild(card)
        
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
e.preventDefault()
let newCar = {
    'name': e.target.name.value ,
    'imgUrl': e.target.image.value
}
sendNewCarToServer(newCar)

form.reset()
}

