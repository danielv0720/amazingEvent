let container_main = document.getElementById('container_main')

function filtroEventos(array){

  let eventos =[]

  for(let i = 0; i < events.length; i++){
    eventos.push(array[i])
  }
  return eventos
}

 const eventosTotales = filtroEventos(events)
 
 function imprimirEventos(evento,elemento){
  elemento.innerHTML += `
  <div class="card" style="width: 18rem">
  <img
    src="${evento.image}"
    class="card-img-top card_image p-2"
    alt="image1"
  />
  <div class="card-body d-flex flex-column align-items-center">
    <h5 class="card-title r">${evento.name}</h5>
    <p class="card-text"> ${evento.description}
    </p>
    <div class="d-flex gap-3">
      <p>price $ ${evento.price}</p>
      <a href="#" class="btn btn-dark">Ver Mas</a>
    </div>
  </div>
  </div>
 `
 }

 for (let evento of eventosTotales){
  imprimirEventos(evento,container_main)
 }





















