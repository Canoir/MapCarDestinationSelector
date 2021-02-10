const m_r = [];
let start;
let lister = 0,
  counter = 0;
window.onload = () => {
  const app = map();
  app.map.on("click", (e) => {
    if (counter % 2 == 0)
      m_r.push({
        start: { name: addMarker(app, e.latlng), latlng: e.latlng },
        end: null,
        route: null,
        block: false,
      });
    else {
      m_r[lister++].end = { name: addMarker(app, e.latlng), latlng: e.latlng };
      m_r[lister - 1].route = {
        name: addRoute(app, m_r[lister - 1].start.latlng, e.latlng),
      };
    }
    counter++;
  });
};

function addMarker(app, latlng) {
  const name = Math.random().toString();
  const index = counter % 2 == 0 ? lister : lister - 1;
  app.addMarker({
    name: name,
    latlng: latlng,
    icon: app.icons.red,
    pan: false,
    draggable: false,
    history: false,
    popup: false,
    on: {
      click: () => {
        alert(index);
        const data = m_r[index];
        app.removeMarker({
          name: data.start.name,
        });
        if (data.end) {
          app.removeMarker({
            name: data.end.name,
          });
          app.removePolyline({
            name: data.route.name,
          });
        }
        m_r[index].block = true;
      },
    },
  });
  return name;
}
function addRoute(app, sLatlng, eLatlng) {
  const name = Math.random().toString();
  app.addPolyline({
    name: name,
    coordinates: [
      [sLatlng.lat, sLatlng.lng],
      [eLatlng.lat, eLatlng.lng],
    ],
    popup: false,
  });
  return name;
}
function map() {
  const app = new Mapp({
    element: "#app",
    presets: {
      latlng: {
        lat: 34.305752,
        lng: 48.812057,
      },
      zoom: 12,
    },
    apiKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI5NmY3MmY4Y2Q1NzZjOTA4YjQ5M2U5MmY3NDdkYjY1MmI1YzkwNTExNmM0MTJjYTAxNzJkYzlmZjBiZmZmZThhOTI1MWQ3YTVkNGZkNzQyIn0.eyJhdWQiOiI5OTAyIiwianRpIjoiMjk2ZjcyZjhjZDU3NmM5MDhiNDkzZTkyZjc0N2RiNjUyYjVjOTA1MTE2YzQxMmNhMDE3MmRjOWZmMGJmZmZlOGE5MjUxZDdhNWQ0ZmQ3NDIiLCJpYXQiOjE1OTM1NzY4ODcsIm5iZiI6MTU5MzU3Njg4NywiZXhwIjoxNTk2MTY4ODg3LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.AlBrHOFgLNL2GG6OTXBoT6wy0LS7sDgbr5kmoOexGisLssaMXz6ikoFZcVJyTb5-aTxs92vGWul8cDz60zEfd10lwfVOsFyPXHlNaswYwHuqA1fRtAlKCEIl-WogR1Xeea_5BTX9Mtq1W3nbE222Cee2At457XcjwmAcNyTSZ_XQ5M7oxDbM38mo00UgTsH-1Z5fjLBSKSkuBKhy6ClyZ9Tg6XOWy-gBX204Ux69AFIBoyjDS7NNWqVM8jTzGvPfT1p27pocGDIVoQo7L3MqnKI5rGTMjthJAuLOFrDw8oDukB2N6SEeMP-maF88gf_MSteHHD0tnq6p7VNz5AraKA",
  });
  app.addLayers();
  return app;
}
