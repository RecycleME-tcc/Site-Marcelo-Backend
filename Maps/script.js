const APIKEY = "SUA_CHAVE_AQUI";
(g => {
    var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => {
        await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a)
    })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
})
    ({ key: APIKEY, v: "weekly" });

/**
    * @license
    * Copyright 2019 Google LLC. All Rights Reserved.
    * SPDX-License-Identifier: Apache-2.0
    */
let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -23.443935, lng: -46.923111 },
        zoom: 15,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });

    directionsRenderer.setMap();
}
initMap();

async function generateRoute() {
    var routesOrigin = document.getElementById("origin").value;
    var routesDestination = document.getElementById("destination").value;

    directionsService.route({
        origin: routesOrigin,
        destination: routesDestination,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: false,
        avoidHighways: false,
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.METRIC,
        drivingOptions: {
            departureTime: new Date(),
            trafficModel: "pessimistic"
        }
    },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                console.log("Erro ao gerar rotas " + status);

            }
        })
}
