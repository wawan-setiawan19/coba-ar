// Koordinat tujuan: Ruang Prabu Siliwangi
const tujuan = {
    lat: -6.730179,
    lng: 108.554110,
  };
  
  const arrow = document.getElementById("arrow");
  
  const toRadians = (deg) => deg * (Math.PI / 180);
  const toDegrees = (rad) => rad * (180 / Math.PI);
  
  function getBearing(lat1, lon1, lat2, lon2) {
    const dLon = toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
    const x =
      Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
      Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
    let brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
  }
  
  function updateLocation(lat, lng, alt) {
    document.getElementById("lat").textContent = lat.toFixed(6);
    document.getElementById("lng").textContent = lng.toFixed(6);
    document.getElementById("alt").textContent = alt.toFixed(2);
  
    const bearing = getBearing(lat, lng, tujuan.lat, tujuan.lng);
    if (arrow) {
      arrow.setAttribute("rotation", `0 ${bearing} 0`);
    }
    console.log(`Bearing ke tujuan: ${bearing}`);
  }
  
  window.addEventListener("gps-camera-update-position", (e) => {
    const lat = e.detail.position.latitude;
    const lng = e.detail.position.longitude;
    const alt = e.detail.position.altitude || 0;
  
    updateLocation(lat, lng, alt);
  });
  