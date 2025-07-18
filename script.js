// Koordinat tujuan: Ruang Prabu Siliwangi
const tujuan = {
    lat: -6.730179,
    lng: 108.554110
  };
  
  const arrow = document.getElementById("arrow");
  
  // Fungsi bantu bearing
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
    document.getElementById("alt").textContent = alt.toFixed(6);
  
    const bearing = getBearing(lat, lng, tujuan.lat, tujuan.lng);
    arrow.setAttribute("rotation", `0 ${bearing} 0`);
    console.log(`Bearing ke tujuan: ${bearing}`);
  }
  
  window.addEventListener("load", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const alt = pos.coords.altitude || 0; // Ambil ketinggian jika tersedia
          updateLocation(lat, lng, alt);
        },
        (err) => {
          console.error("Gagal mendapatkan lokasi:", err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    } else {
      alert("Geolocation tidak didukung browser ini.");
    }
  });
  