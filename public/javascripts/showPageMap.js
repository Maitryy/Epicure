//const hotel = require("../../models/hotel");

  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: hotel.geometry.coordinates,
  //hotel.geometry.coordinates,
  //[77, 28], // starting position [lng, lat]
  zoom:6 // starting zoom
  });

  new mapboxgl.Marker()
.setLngLat(hotel.geometry.coordinates)
.setPopup(
  new mapboxgl.Popup({offset:25})
    .setHTML(
    `<h4>${hotel.name}</h4><p>${hotel.city}</p>`
  )
)
.addTo(map);
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  })
  );

  map.addControl(new mapboxgl.NavigationControl());