document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(data => console.log(data))
})