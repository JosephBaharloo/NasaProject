# 🗺️ Harita Entegrasyonu - Kullanım Kılavuzu

## ✅ Kurulum Tamamlandı!

Harita entegrasyonu başarıyla eklendi. İşte sahip olduğun özellikler:

## 🎯 Özellikler

### 1. **İnteraktif Harita (Leaflet + OpenStreetMap)**
- ✅ Haritaya tıklayarak konum seçimi
- ✅ Özel tema uyumlu marker (mor-pembe gradient)
- ✅ Ücretsiz - API key gerektirmiyor
- ✅ Glass-morphism tema ile entegre

### 2. **Konum Arama (Geocoding)**
- ✅ Adres/şehir/yer adı ile arama
- ✅ Otomatik tamamlama sonuçları
- ✅ Arama sonuçlarından seçim
- ✅ Dropdown ile sonuç gösterimi

### 3. **Mevcut Konumu Kullan**
- ✅ Tarayıcı geolocation API
- ✅ Tek tıkla konumunu al
- ✅ Otomatik reverse geocoding (koordinat → adres)

### 4. **Reverse Geocoding**
- ✅ Haritaya tıklayınca adres bilgisi al
- ✅ Koordinatları anlamlı adrese çevir

## 📁 Oluşturulan Dosyalar

```
src/
├── components/
│   ├── LocationMap.jsx          # Harita component'i
│   └── CreateEventModal.jsx     # Güncellenmiş modal (harita entegreli)
└── services/
    └── geocodingService.js      # Geocoding servisi (OOP)
```

## 🚀 Nasıl Kullanılır?

### Modal'ı Aç
```javascript
// EventsPage.jsx içinde
<CreateEventModal 
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onCreateEvent={handleCreateEvent}
/>
```

### Kullanıcı Deneyimi:

1. **Metin ile Ara:**
   - "Central Park" yaz
   - Enter'a bas veya Search butonuna tıkla
   - Sonuçlardan birini seç

2. **Haritadan Seç:**
   - Haritaya doğrudan tıkla
   - Marker konumu güncellenecek
   - Adres otomatik alınacak

3. **Mevcut Konumu Kullan:**
   - Navigation (🧭) butonuna tıkla
   - Tarayıcı izin isteyecek
   - Onaylayınca konumun otomatik seçilecek

## ⚙️ Yapılandırma Seçenekleri

### Farklı Harita Stilleri

**Dark Theme (Alternatif):**
```jsx
// LocationMap.jsx içinde TileLayer'ı değiştir
<TileLayer
    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    attribution='&copy; Stadia Maps'
/>
```

**Satellite View:**
```jsx
<TileLayer
    url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    subdomains={['mt0','mt1','mt2','mt3']}
/>
```

### Başlangıç Konumunu Değiştir

```jsx
// CreateEventModal.jsx içinde
const [mapPosition, setMapPosition] = useState([
    41.0082, 28.9784  // İstanbul koordinatları
]);
```

### Zoom Seviyesi

```jsx
<LocationMap
    zoom={10}  // 1-18 arası (1: dünya, 18: sokak seviyesi)
/>
```

## 🔧 Backend Entegrasyonu

### Weather API Bağlantısı

```javascript
// WeatherService.fetchWeatherForLocation() güncelle
static async fetchWeatherForLocation(lat, lng, date) {
    const response = await fetch(
        `YOUR_BACKEND_URL/weather?lat=${lat}&lng=${lng}&date=${date}`
    );
    return await response.json();
}
```

### Event Kaydetme

```javascript
// CreateEventModal.jsx - handleSubmit içinde
const response = await fetch('YOUR_BACKEND_URL/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: eventName,
        date: eventDate,
        location: {
            lat: coordinates.lat,
            lng: coordinates.lng,
            address: selectedLocation
        },
        weather: weatherData
    })
});
```

## 🎨 Özelleştirme

### Marker İkonunu Değiştir

```javascript
// LocationMap.jsx - customIcon
const customIcon = new L.Icon({
    iconUrl: 'path/to/your/icon.png',
    iconSize: [32, 42],
    iconAnchor: [16, 42]
});
```

### Tema Renklerini Ayarla

```css
/* index.css - Leaflet overrides */
.leaflet-container {
    background: rgba(0, 0, 0, 0.5); /* Değiştir */
}
```

## 🌍 Geocoding Servisi API

### Konum Ara
```javascript
const results = await GeocodingService.searchLocation('Paris');
// results = [{ lat, lng, displayName, name, address, ... }]
```

### Koordinat → Adres
```javascript
const location = await GeocodingService.reverseGeocode(48.8566, 2.3522);
// location = { lat, lng, displayName, address, name }
```

### Mevcut Konumu Al
```javascript
const currentLoc = await GeocodingService.getCurrentLocation();
// currentLoc = { lat, lng, displayName, address, name }
```

## 📊 Veri Yapısı

### Location Object
```javascript
{
    lat: 40.7128,
    lng: -74.0060,
    displayName: "Empire State Building, New York, NY, USA",
    name: "Empire State Building",
    address: "350 5th Ave, New York, NY, USA"
}
```

### Weather Object
```javascript
{
    temperature: 22,
    windSpeed: 15,
    chanceOfRain: 30,
    uvIndex: 7,
    humidity: 65,
    recommendation: "Perfect weather for outdoor activities!"
}
```

## 🐛 Troubleshooting

### Harita Görünmüyor
1. `npm install leaflet react-leaflet` çalıştırıldığından emin ol
2. Tarayıcı console'unda hata var mı kontrol et
3. `leaflet/dist/leaflet.css` import edildiğinden emin ol

### Marker İkonu Eksik
- CDN'den marker icon'lar yükleniyor
- İnternet bağlantını kontrol et
- Veya local icon dosyaları kullan

### Geocoding Çalışmıyor
- Nominatim API ücretsizdir ama rate limit vardır
- Çok fazla istek atma (1 saniyede 1 istek)
- Backend'e kendi geocoding servisi ekleyebilirsin

## 🚀 Production İpuçları

1. **Kendi Geocoding API'n kullan** (Google Maps, Mapbox, vs.)
2. **Harita cache'le** (sık kullanılan konumlar için)
3. **Rate limiting ekle** (API limitlerini aşmamak için)
4. **Error handling iyileştir** (kullanıcı dostu mesajlar)

## 📚 Kaynaklar

- [Leaflet Docs](https://leafletjs.com/reference.html)
- [React-Leaflet Docs](https://react-leaflet.js.org/)
- [Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/)
- [OpenStreetMap](https://www.openstreetmap.org/)

---

**Hazır! Artık tamamen çalışan bir harita entegrasyonuna sahipsin! 🎉**
