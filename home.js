let containerMain = document.getElementById("container_main");
const categoriesSelected = [];
let eventsFound = [];
let events = []
let inputSearchValue = '';

async function fetchApi() {
  try {
    let res = await fetch("https://mh-amazing.herokuapp.com/amazing");
    let data = await res.json();
    events = data.events;
    events.forEach(imprimirEventosTotales);
    let categorias = events.map(function (evento) {
      return evento.category;
    });
    
    categorias = new Set(categorias);
    categorias.forEach(imprimirCategorias);

    return events;
  } catch (error) {
    console.log("hubo error");
  }
}
fetchApi();

function imprimirEventosTotales(evento) {
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
      <a href="./description.html?id=${evento.id}" class="btn btn-dark">Ver Mas</a>
    </div>
  </div>
  </div>
 `;
}

// -----------------------------------------------------------------------------------------------------//

let inputSearch = document.getElementById("js-search");

inputSearch.addEventListener("input", function (event) {
  let eventosFiltro = null;
  inputSearchValue = event.target.value
  console.log(eventsFound);

  if (eventsFound.length) {
    eventosFiltro = buscarEventos(eventsFound) 
    
  } else {
    eventosFiltro = buscarEventos(events) 
  }

  containerMain.innerHTML = "";

  eventosFiltro.forEach(imprimirEventosTotales);
});

//--------------------------------------------------------------------------------------------//
let inputcheckbox = document.getElementById("js-checkbox");

function imprimirCategorias(evento) {
  // imprimir cards
  inputcheckbox.innerHTML += `
  <div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="checkbox"
    id="${evento}"
    value="${evento}"
  />
  <label class="form-check-label" for=${evento}
    >${evento}</label
  >
  </div>`;
}

inputcheckbox.addEventListener("click", (event) => {
  console.log(event);

  const checkboxValue = event.target.value; // obtener valor del check
  console.log(checkboxValue);

  if (checkboxValue) {
    const categoriesSelectedIndex = categoriesSelected.findIndex(
      // buscar indice
      (event) => event === checkboxValue
    );

    console.log(categoriesSelectedIndex);

    if (categoriesSelectedIndex !== -1) {
      eliminarCategoria(categoriesSelectedIndex, checkboxValue)
    } else {
      agregarCategoria(checkboxValue)
    }
    eventsFound = [];

    if (categoriesSelected.length) {
      fitrarEventosConCategoriasSelecciondas()
    }

    containerMain.innerHTML = "";

    if (eventsFound.length) {
      imprimirEventosConBusquedas(eventsFound)
    } else {
      console.log(events);
      imprimirEventosConBusquedas(events)
    }

    console.log(categoriesSelected);
  }
});

// Filtra los eventos cuando haya alguna categoria (check) seleccionada
function fitrarEventosConCategoriasSelecciondas() {
  for (let i = 0; i < categoriesSelected.length; i++) {
    for (let j = 0; j < events.length; j++) {
      if (categoriesSelected[i] === events[j].category) {
        eventsFound.push(events[j]);
      }
    }
  }
}

// Imprime los eventos y si contiene alguna busqueda en el buscador (inputSearch) aplica esa busqueda dentro esos eventos
function imprimirEventosConBusquedas(events) {
  if (inputSearchValue) {
    const eventsFoundByinputSearchValue = buscarEventos(events)
    eventsFoundByinputSearchValue.forEach(imprimirEventosTotales);
  } else {
    events.forEach(imprimirEventosTotales);
  }
}

// Busca los eventos en el buscador (inputSearch)
function buscarEventos(events) {
  const result = events.filter((evento) => {
    return evento.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase());
  });

  return result;
}

// Guarda en memoria la categoria seleccionada
function agregarCategoria(checkboxValue) {
  categoriesSelected.push(checkboxValue);
}

// Elimina en memoria la categoria seleccionada
function eliminarCategoria(categoriesSelectedIndex, checkboxValue) {
  categoriesSelected.splice(categoriesSelectedIndex, 1);

  eventsFound = eventsFound.filter((e) => e.category !== checkboxValue);
  console.log(eventsFound);
}

