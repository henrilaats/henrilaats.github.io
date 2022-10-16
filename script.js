(function () {
  "use strict";

  //clock
  document.addEventListener("DOMContentLoaded", function () {
    let c = document.getElementById("clock");
    setInterval(updateClock, 1000);

    function updateClock() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();

      let t = "";
      if (h > 12) {
        h = parseInt(h) - 12;
        t = "pm";
      } else {
        if (h < 10) {
          h = "0" + h;
        }
        t = "am";
      }

      if (h < 10) {
        h = "0" + h;
      }

      if (m < 10) {
        m = "0" + m;
      }

      if (s < 10) {
        s = "0" + s;
      }

      c.innerHTML = h + ":" + m + ":" + s + " " + t;
    }
  });

  // forms
  document.getElementById("form").addEventListener("submit", estimateDelivery);

  let e = document.getElementById("delivery");
  e.innerHTML = "0,00 &euro;";

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  function estimateDelivery(event) {
    event.preventDefault();
    let total = 0.0;

    let linn = document.getElementById("linn");
    let present = document.getElementById("v1");
    let contact = document.getElementById("v2");

    let automaat = document.getElementById("automaat");
    let kuller = document.getElementById("kuller");
    let pood = document.getElementById("pood");

    let eesnimi = document.getElementById("fname");
    let perenimi = document.getElementById("lname");


    if (eesnimi.value === "" || containsNumbers(eesnimi.value)) {
      alert("Palun sisestage eesnimi korrektselt");
      eesnimi.focus();
      return;
    }
    
    if (perenimi.value === "" || containsNumbers(perenimi.value)) {
      alert("Palun sisestage perenimi korrektselt");
      perenimi.focus();
      return;
    }

    if (present.checked) {
      total = total + 5;
    }
    if (contact.checked) {
      total = total + 1;
    }

    if (automaat.checked) {
      total = total + 2;
    }else if (kuller.checked) {
      total = total + 10;
    }else if (pood.checked) {
      total = total
    }else {
      alert("Palun valige tarneviis");
      return;
    }
    

    if (linn.value === "") {
      e.innerHTML = "0.00 €";
      alert("Palun valige linn nimekirjast");
      linn.focus();
      return;
    } else {
      if (linn.value === "tln") {
        e.innerHTML = total + ".00 €";
      } else if (linn.value === "trt") {
        total = total + 2.5;
        e.innerHTML = total + "0 €";
      } else if (linn.value === "nrv") {
        total = total + 2.5;
        e.innerHTML = total + "0 €";
      } else if (linn.value === "prn") {
        total = total + 3;
        e.innerHTML = total + ".00 €";
      }
    }

    console.log("Tarne hind on arvutatud");
  }
})();

// map
let mapAPIKey =
  "AnVYmpp_zhXoxzVXIeu_QZrL53xewLs_4t8vIJXeKgrRIYeUAX1jHtfS1m5h08jx";

let map, infobox;

function GetMap() {
  "use strict";

  let centerPoint = new Microsoft.Maps.Location(58.1036945, 26.871485);
  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: centerPoint,
    zoom: 8,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    disablePanning: false,
  });


  infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false
  });
  infobox.setMap(map);

  let kuperjanov = new Microsoft.Maps.Location(57.826349, 27.023050);
  let pushpin2 = new Microsoft.Maps.Pushpin(kuperjanov)
  pushpin2.metadata = {
    title: "Kuperjanovi jalaväepataljon",
    description: "Kuperjanovi jalaväepataljon on Eesti kaitseväe Maaväe pataljonisuurune jalaväe suunitlusega väeosa asukohaga Võrus."
  };

  let delta = new Microsoft.Maps.Location(58.38104, 26.71992);
  let pushpin = new Microsoft.Maps.Pushpin(delta);
  pushpin.metadata = {
    title: "Tartu Ülikool",
    description: "Tartu Ülikool on vanim ja suurim Eestis tegutsev ülikool ning ühtlasi Baltimaade ainus ülikool, mis kuulub 1,2% maailma parimate sekka.",
    //subTitle: 'Hea koht',
    //text: 'UT'
  };

  Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
  Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
  
  map.entities.push(pushpin);
  map.entities.push(pushpin2);
  
}

function pushpinClicked(e) {

  if (e.target.metadata) {
      infobox.setOptions({
          location: e.target.getLocation(),
          title: e.target.metadata.title,
          description: e.target.metadata.description,
          visible: true
      });
  }
}
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=AnVYmpp_zhXoxzVXIeu_QZrL53xewLs_4t8vIJXeKgrRIYeUAX1jHtfS1m5h08jx
