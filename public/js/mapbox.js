/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibGFsaXRvZ3VhcGl0byIsImEiOiJjazBjdWRzd2MwMTd3M25tbXVwbTRsaHkwIn0.RKMg0UlxRUfBktpOCRGjag';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lalitoguapito/ck2xoia7907ez1cmlbqyyxpyd',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //Add marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}`)
      .addTo(map);

    bounds.extend(loc.coordinates, {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    });
    map.fitBounds(bounds);
  });
};
