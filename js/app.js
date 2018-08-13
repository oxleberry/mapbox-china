
$(document).ready(function() {

    L.mapbox.accessToken = 'secret_mapbox_key';

    var info = document.getElementById('popUp');
    var map = L.mapbox.map('map', 'mapbox.light')
        .setView([35.5, 113.5], 4);  // last number = bigger the number, the closer the zoom level.

    // Add markers to the map
    var myLayer = L.mapbox.featureLayer().addTo(map);
    myLayer.setGeoJSON(geoJson);

    // Fade out and hide Instructions
    setTimeout(function(){
        document.getElementById('instructions').setAttribute('class', 'opacity');
    }, 2000);
    setTimeout(function(){
        document.getElementById('instructions').setAttribute('class', 'hide');
    }, 6000);

    // Listen for individual marker clicks to populate the FEATURES div.
    myLayer.on('click',function(e) {

        // Force the popup closed
        e.layer.closePopup();

        // Hides old content
        $("#popUp").hide();

        // Grabs new content from geoJson_places file based on marker info
        var feature = e.layer.feature;
        var content = '<h2>' + feature.properties.title + '</h2>' +
                      '<h3>' + feature.properties.description + '</h3>' +
                      '<img src="' + feature.properties.image1 + '" />' +
                      '<img src="' + feature.properties.image2 + '" />';
        info.innerHTML = content;

        // Fades in the new content.
        $("#popUp").fadeIn(800);

        // Resets by scrolling the content back to the top of the page.
        resetToTop();

    }); //end of myLayer.on click event listener

    // Clear the contents of the FEATURES div when the map is clicked.
    map.on('click', intro);

    // At the start, loads the initial content for the FEATURES div.
    intro();

    // Initial default content.
    function intro() {
        info.innerHTML =
        `<div class='extra'>
            <h2>China, fun facts on amazing places to travels!</h2>
            <h3>Its modern face is dazzling, but China is no one-trick pony. The world's oldest continuous civilisation isn't all smoked glass and brushed aluminium and while you won't be tripping over artefacts – three decades of round-the-clock development and rash town planning have taken their toll – rich seams of antiquity await. Serve it all up according to taste: collapsing sections of the Great Wall, temple-topped mountains, villages that time forgot, languorous water towns, sublime Buddhist grottoes and ancient desert forts. Pack a well-made pair of travelling shoes and remember the words of Laotzu: 'a journey of a thousand miles begins with a single step'.</h3>
            <h3 class='markerText'>Click a marker on the map to see photos from each location</h3>
            <small>
               <a class='tutorial' href='https://www.mapbox.com/mapbox.js/example/v1.0.0/marker-tooltips-outside-map/'>Adapted from Mapbox GL JS tutorial</a>
            </small>
         </div>`;
        resetToTop();
    }

    // Resets by scrolling the content back to the top of the page.
    function resetToTop() {
        var topPosit = $("#popUp").position();
        $('html, body').animate({
            scrollTop: topPosit.top
        }, 800 );
        // console.log(topPosit);
    }

}); //End document.ready
