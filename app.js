const API_URL = "https://geo.ipify.org/api/";
const API_KEY = 'at_O15Quy542FYS0MAC14J4Hh9590UBa';
const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
const region = 'country,city?';
let version = 'v2';

const headers_option = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}

// HTML elements
const ipAddress = document.getElementById('ip');
const loc = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
// form elements
const enteredIP = document.getElementById("ip-input")
const btn = document.getElementById("btn")



getIPdetails = async function (ip) {

  if (ip == undefined) {
    var ipURL = `${CORS_URL}${API_URL}${version}/${region}apiKey=${API_KEY}`;
  } else {
    var ipURL = `${CORS_URL}${API_URL}${version}/${region}apiKey=${API_KEY}&ipAddress=${ip}`;

  }
  await fetch(ipURL, headers_option)
    .then((results) => results.json())
    .then(data => {
      console.log('DATAlat: ', data.location.lat);
      console.log('DATAlng: ', data.location.lng);
      enteredIP.value = data.ip;
      ipAddress.innerHTML = data.ip;
      loc.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      timezone.innerHTML = `UTC ${data.location.timezone}`;
      isp.innerHTML = data.isp;
      // Update marker on map
      updateMarker([data.location.lat, data.location.lng]);

    })
    .catch(error => {
      alert("Please enter a valid IP address");
      console.log(error)
    });
}

getIPdetails();

updateMarker = (update_marker = [-33.665, 18.993]) => {
  map.setView(update_marker, 10);
  L.marker(update_marker).addTo(map);
}

// adding map to HTML
const map = L.map("map").setView([51.505, -0.09], 10);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
map.zoomControl.remove();


// on doc load

document.addEventListener('load', updateMarker())

// on suubmit
btn.addEventListener('click', e => {
  e.preventDefault()
  if (enteredIP.value != '' && enteredIP.value != null) {
    getIPdetails(enteredIP.value)
    return
  }

})