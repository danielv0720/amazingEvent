async function getEvent(){
  
    let id = location.search.slice(4);
    let res = await fetch (`https://mh-amazing.herokuapp.com/amazing/${id}`)
    let data = await res.json()
    let events = [data.event]
    console.log(events);
    events.forEach(eventosDescription);
  }

  getEvent()
  
  




let container_descriptionP = document.getElementById("container_descriptionP")




function eventosDescription(evento) {
  container_descriptionP.innerHTML += `
  <div class="container_description p-3 d-flex flex-wrap  gap-3"id="event${evento.id}">
  <section class="image_description">
    <img src="${evento.image}" alt="imgdescription" />
  </section>
  <section class="text_description d-flex flex-column justify-content-center align-items-center d-flex p-3 ">
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
