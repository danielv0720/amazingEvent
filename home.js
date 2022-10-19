let containerMain = document.getElementById("container_main");
const categoriesSelected = [];
let eventsFound = []

function eventosTotales(evento) {
  containerMain.innerHTML += `
  <div class="card" style="width: 18rem">
  <img
    src="${evento.image}"
    class="card-img-top card_image p-2"
    alt="image1"/>
  <div class="card-body d-flex flex-column align-items-center">
    <h5 class="card-title r">${evento.name}</h5>
    <p class="card-text"> ${evento.description}</p>
    <div class="d-flex gap-3">
      <p>price $ ${evento.price}</p>
      <a href="./description.html?id=${evento._id}" class="btn btn-dark">Ver Mas</a>
    </div>
  </div>
  </div>
 `;
}

events.forEach(eventosTotales);


// -----------------------------------------------------------------------------------------------------//

let inputSearch = document.getElementById("js-search");

inputSearch.addEventListener("input", function (event) {
  let eventosFiltro = null
  console.log(eventsFound);

  if (eventsFound.length) {
    eventosFiltro = eventsFound.filter((evento) => {
      return evento.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  

  } else {
    eventosFiltro = events.filter((evento) => {
      return evento.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  containerMain.innerHTML = "";


  eventosFiltro.forEach(eventosTotales);
});


//--------------------------------------------------------------------------------------------//
let categorias = events.map(function (evento) {
  return evento.category;
});
categorias = new Set(categorias); // borrar duplicados

let inputcheckbox = document.getElementById("js-checkbox");

categorias.forEach(function (evento) { // imprimir cards
  inputcheckbox.innerHTML += `
  <div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="checkbox"
    id="inlineCheckbox1"
    value="${evento}"
  />
  <label class="form-check-label" for="inlineCheckbox1"
    >${evento}</label
  >
  </div>`;
});

inputcheckbox.addEventListener("click", (event) => {
  console.log(event);

  const checkboxValue = event.target.value; // obtener valor del check
  console.log(checkboxValue);

  if (checkboxValue) {
    const categoriesSelectedIndex = categoriesSelected.findIndex(// buscar indice
      (evento) => evento === checkboxValue
    );

    console.log(categoriesSelectedIndex);

    if (categoriesSelectedIndex !== -1) {
      categoriesSelected.splice(categoriesSelectedIndex, 1); // Para borrar un elemento del array 

      eventsFound = eventsFound.filter(e => e.category !== checkboxValue)// borrar eventos
      console.log(eventsFound);

    } else {
      categoriesSelected.push(checkboxValue);
    }
    eventsFound = []

    for (let i = 0; i < categoriesSelected.length; i++) {// validacion para
      for (let j = 0; j < events.length; j++) {
        if (categoriesSelected[i] === events[j].category) {
          eventsFound.push(events[j])
        }
      }
    }

    containerMain.innerHTML = "";

    if (eventsFound.length) {
      eventsFound.forEach(eventosTotales);
    } else {
      console.log(events);
      events.forEach(eventosTotales);
    }
  
    console.log(categoriesSelected);
  }

});
