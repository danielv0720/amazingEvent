let containerMainPast = document.getElementById("container_main_past");

const categoriesSelected = [];
let eventsFound = []

let eventosPasados = events.filter(function(evento){
  if(currentDate > evento.date){
    return evento
      }
})

//let eventosPasados =events.filter(everyEvent => currenDate > evento.date)
function eventosPasados2(evento){
  containerMainPast.innerHTML += `
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
     `
}
eventosPasados.forEach(eventosPasados2)
//---------------------------------------------------------------------------------------
let inputSearch = document.getElementById("js-search");

inputSearch.addEventListener("input", function (event) {
  let eventosFiltro = null
  console.log(eventsFound);
  if (eventsFound.length) {

    eventosFiltro = eventsFound.filter((evento) => {
      return evento.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  

  } else {
    eventosFiltro = eventosPasados.filter((evento) => {
      return evento.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  containerMainPast.innerHTML = "";

  eventosFiltro.forEach(eventosPasados2);
});

let categorias = eventosPasados.map(function (evento) {
  return evento.category;
});
categorias = new Set(categorias);

let inputcheckbox = document.getElementById("js-checkbox");

categorias.forEach(function (evento) {
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

  const checkboxValue = event.target.value;
  console.log(checkboxValue);

  if (checkboxValue) {
    const categoriesSelectedIndex = categoriesSelected.findIndex(
      (c) => c === checkboxValue
    );

    console.log(categoriesSelectedIndex);

    if (categoriesSelectedIndex !== -1) {
      categoriesSelected.splice(categoriesSelectedIndex, 1);
      eventsFound = eventsFound.filter(e => e.category !== checkboxValue)
      console.log(eventsFound);

    } else {
      categoriesSelected.push(checkboxValue);
    }
    eventsFound = []

    for (let i = 0; i < categoriesSelected.length; i++) {
      for (let j = 0; j < eventosPasados.length; j++) {
        if (categoriesSelected[i] === eventosPasados[j].category) {
          eventsFound.push(eventosPasados[j])
        }
      }
    }

    containerMainPast.innerHTML = "";

    if (eventsFound.length) {
      eventsFound.forEach(eventosPasados2);
    } else {
      console.log(events);
      eventosPasados.forEach(eventosPasados2);
    }
  
    console.log(categoriesSelected);
  }

});


