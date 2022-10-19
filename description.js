const id = location.search.slice(4);
let container_descriptionP = document.getElementById("container_descriptionP")

const eventosDetalles = events.filter(function (event) {
  if (event._id === Number(id)) {
    return event;
  }
});

function eventosDescription(evento) {
  container_descriptionP.innerHTML += `
  <div class="container_description p-3 d-flex flex-wrap  gap-3"id="event${evento.id}">
  <section class="image_description">
    <img src="${evento.image}" alt="imgdescription" />
  </section>
  <section class="text_description d-flex flex-column justify-content-center align-items-center d-flex p-2 ">
    <h2> ${evento.name}</h2>
    <p> ${evento.description}</p>
    <p> Category: ${evento.category}</p>
    <p> Capacity ${evento.capacity}</p>
    <p> Date: ${evento.date}</p>

    <p> Price: $ ${evento.price}</p>
  </section>
  </div> 
  `;
}
eventosDetalles.forEach(eventosDescription);