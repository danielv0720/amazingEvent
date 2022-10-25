async function getDatos() {
  let res = await fetch("https://mh-amazing.herokuapp.com/amazing");
  let data = await res.json();
  let events = data.events;


  let res1 = await fetch("https://mh-amazing.herokuapp.com/amazing?time=past");
  let data1 = await res1.json();
  let pastEvents = data1.events;
  

  let respon = await fetch(
    "https://mh-amazing.herokuapp.com/amazing?time=upcoming"
  );
  let data2 = await respon.json();
  let upcomingEvents = data2.events;


// -----------------UPCOMING EVENTS-----------------

  // filtro categorias de eventos futuros
  let categoriesEventsUpcoming = upcomingEvents.map(event => event.category);
  let categoriesEventsFilterUpcoming = [...new Set(categoriesEventsUpcoming)];
  console.log(categoriesEventsFilterUpcoming);
  // recorro el array de eventos futuros con map y le agrego dos nuevas propiedades a cada evento, percentage y ganancia estimada.
    upcomingEvents.map((everyEvent) => {
    let estimate = everyEvent.estimate;
    let capacity = everyEvent.capacity;

    let percentageAssistEst = ((estimate / capacity) * 100).toFixed();
    everyEvent.percentage = percentageAssistEst;

    let gananciaEstimate = (everyEvent.price * everyEvent.estimate)
    everyEvent.ganancia = gananciaEstimate
    // console.log(gananciaEstimate);
  });
  

  // MAP + FILTER para obtener un array con los eventos de cada categoria. Se utiliza el map porque tengo que transformar el array de categorias en un array con los eventos de CADA CATEGORIA
  let arrayEventsUpcoming = categoriesEventsFilterUpcoming.map(cadaCategoria =>{
    const res = upcomingEvents.filter(cadaEvento => cadaEvento.category === cadaCategoria)
    const revenue = sumarGanancias(res)
    const percentage = sumarPorcentajes(res)

    let arrayFiltradoUpcoming = {
      category: cadaCategoria,
      revenue,
      percentage: percentage
    }

    return arrayFiltradoUpcoming
  
  })
  console.log(arrayEventsUpcoming);
  tabletwo(arrayEventsUpcoming, "upcomingEventsTable")



  
  // -----------------PAST EVENTS -----------------

  // recorro el array de eventos pasados con map y le agrego dos nuevas propiedades a cada evento, percentage y gananciaReal.
  pastEvents.map((everyEvent) => {
      let assistance = everyEvent.assistance;
      let capacity = everyEvent.capacity;

      let percentage = ((assistance / capacity) * 100).toFixed();
      everyEvent.percentage = percentage;

      let gananciaReal = (everyEvent.price * everyEvent.assistance)
      everyEvent.ganancia = gananciaReal
  });
  console.log(pastEvents);
    
  // filtro categorias de eventos pasados

  let categoriesEventsPast = pastEvents.map(event => event.category);
  let categoriesEventsFilterPast = [...new Set (categoriesEventsPast)]
  console.log(categoriesEventsFilterPast);

  // MAP + FILTER para obtener un array con los eventos de cada categoria. Se utiliza el map porque tengo que transformar el array de categorias en un array con los eventos de CADA CATEGORIA
  let arrayEventsPast = categoriesEventsFilterPast.map(cadaCategoria =>{
    const res = pastEvents.filter(cadaEvento => cadaEvento.category === cadaCategoria)
    console.log(res);
    const revenue = sumarGanancias(res)
    const percentage = sumarPorcentajes(res)

    let arrayFiltradoPast = {
      category: cadaCategoria,
      revenue,
      percentage: percentage
    }

    return arrayFiltradoPast
  })
  tabletwo(arrayEventsPast, "pastEventsTable")


  
    // -----------------PRIMER TABLA -----------------
  // Creo la variable ordenadoPorAsistencia que va a recorrer el array de eventos pasados con sort y este va a ordenar de menor a mayor los eventos segun su asistencia.
  let ordenadoPorAsistencia =[...pastEvents].sort((evento1,evento2) => evento1.assistance - evento2.assistance)
  console.log(ordenadoPorAsistencia);

  // Creo la variable ordenadoPorCapacidad que va a recorrer el array de eventos pasados con sort y este va a ordenar de menor a mayor los eventos segun su capacidad.
  let ordenadoPorCapacidad = [...pastEvents].sort((evento1,evento2)=> evento1.capacity-evento2.capacity)
  console.log(ordenadoPorCapacidad);

  table1(ordenadoPorAsistencia, ordenadoPorCapacidad);
  
}


getDatos();

function table1(arrayAsistencia, arrayCapacidad) {
  console.log(arrayAsistencia);
  let tableOne = `
  <tr>
    <td >Event with the highest percentage of attendance</td>
    <td >Event with the lowest percentage of attendance</td>
    <td >Event with larger capacity</td>
  </tr>

  <tr>
    <td>${arrayAsistencia[arrayAsistencia.length-1].name}:  ${arrayAsistencia[arrayAsistencia.length-1].percentage}%  </td>
    <td>${arrayAsistencia[0].name}: ${arrayAsistencia[0].percentage}% </td>
    <td>${arrayCapacidad[arrayCapacidad.length-1].name}: ${arrayCapacidad[arrayCapacidad.length-1].capacity} </td>
  </tr>`;

  document.getElementById("tableOne").innerHTML = tableOne;
}


function tabletwo(eventsPast, table) {
  let tabletwo = ` 
  <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of estimated attendance</td>
  </tr>
  `
  eventsPast.forEach(eventPast => {
    tabletwo+=`  <tr>
    <td>${eventPast.category}</td>
    <td>${eventPast.revenue}</td>
    <td>${eventPast.percentage}%</td>
  </tr>`
  });
  


  document.getElementById(table).innerHTML = tabletwo;
}

function sumarGanancias(events) {
  let sum = 0
  for (const event of events) {
    sum+= Number(event.ganancia)
  }

  return sum
}

function sumarPorcentajes(events) {
  let sum = 0
  for (const event of events) {
    sum+= Number(event.percentage)
  }

  let res = Math.ceil(sum / events.length)
  return res
}