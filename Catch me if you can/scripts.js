let uluru, map, marker, ws, nick
let players = []


function initMap() {

    uluru = {
        lat: 50.073, 
        lng: 20.029
    };

    map = new google.maps.Map(
      document.getElementById('root'), {
          zoom: 4, 
          center: uluru
        });

    marker = new google.maps.Marker({ 
        position: uluru, 
        map: map,
        icon: '1.png'
    });

    getPlayerLocalization()
    window.addEventListener( 'keydown', moveMarker )
    startWebSocket()
}

function moveMarker ( event ) {

    let lat = marker.getPosition().lat()
    let lng = marker.getPosition().lng()

    switch ( event.code ) {
        case 'ArrowUp':
            lat += 0.1
            break;
        case 'ArrowDown':
            lat -= 0.1
            break;
        case 'ArrowLeft':
            lng -= 0.1
            break;
        case 'ArrowRight':
            lng += 0.1
            break;
    }

    let position = {
        lat,
        lng
    }

    // let wsData = {
    //     lat: lat,
    //     lng: lng,
    //     id: nick
    // }

    map.setCenter( position )
    marker.setPosition( position )
    
    //ws.send(JSON.stringify(wsData))
}

function getPlayerLocalization(){
    navigator.geolocation.getCurrentPosition( localizationPermitted, localizationDenied )
}

function localizationPermitted( event ){

    currentPosition = {
        lat: event.coords.latitude,
        lng: event.coords.longitude
    };

    map.setCenter( currentPosition )
    marker.setPosition( currentPosition )

    document.querySelector('#localization').disabled = true;

    

}

function localizationDenied( event ){

    alert('Odmówiono lokalizacji. Domyślnie ustawiona lokalizacja to: Kraków. Jeśli chcesz podać poprawną lokalizację, kliknij przycisk OBECNA LOKALIZACJA')



}



function startWebSocket() {

    let url = 'ws://91.121.66.175:8010'

    ws = new WebSocket(url)
    // ws.addEventListener('open', onWSOpen)
    // ws.addEventListener('message', onWSMessage)

}

