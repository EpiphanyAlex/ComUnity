import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../css/MapPage.css"; // import custom styles
import mapboxgl from "mapbox-gl";
import Marker from "./Marker";
import Popup from "./Popup";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import "mapbox-gl/dist/mapbox-gl.css";
import { ReactComponent as CardItemIcon } from "../../res/ic_card_list_marker.svg";
import { ReactComponent as SearchIcon } from "../../res/ic_search.svg";
import ImagePlace from "../../res/image_event_place.png";
import heartOutline from "../../res/heart-outline.png";
import heartFilled from "../../res/heart-filled.png";

function MapPage() {
  const [mockData] = useState([
    {
      id: 1,
      image: "https://source.unsplash.com/200x200/?tennis",
      type: "Sport",
      title: "Let's Play Tennis",
      address: "85 South Cres, Northcote VIC 3070",
      date: "14/04/2025",
      time: "14:30 - 16:00",
      lat: -37.768,
      lng: 145.008,
    },
    {
      id: 2,
      image: "https://source.unsplash.com/200x200/?yoga",
      type: "Wellness",
      title: "Sunrise Yoga",
      address: "10 Bay St, Brighton VIC 3186",
      date: "15/04/2025",
      time: "07:00 - 08:00",
      lat: -37.917,
      lng: 144.993,
    },
  ]);

  const melbourneBounds = [
    [144.55, -38.25], // Southwest corner
    [145.45, -37.4], // Northeast corner
  ];

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mapRef = useRef();
  const mapContainerRef = useRef();
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2V2ZW5vdm8iLCJhIjoiY205NTUxdDNvMGxwNDJrcHVoeG55azJlNSJ9.E93az5seGZrsK12mDDnjpQ";
  const geocodingClient = mbxGeocoding({ accessToken: mapboxgl.accessToken });
  const [query, setQuery] = useState("");
  const [earthquakeData, setEarthquakeData] = useState();
  const [activeFeature, setActiveFeature] = useState();
  const markerRef = useRef(null); // to store the current marker

  const getBboxAndFetch = useCallback(async () => {
    const bounds = mapRef.current.getBounds();
    try {
      const data = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-01-30&minlatitude=${bounds._sw.lat}&maxlatitude=${bounds._ne.lat}&minlongitude=${bounds._sw.lng}&maxlongitude=${bounds._ne.lng}`
      ).then((d) => d.json());

      setEarthquakeData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const defaultLocation = [145.119, -37.928]; // Clayton, VIC

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: defaultLocation,
      // center: [144.9631, -37.8136],
      // center: [116.14815, -1.99628],
      zoom: 12,
      // maxBounds: melbourneBounds, // restrict to Melbourne
    });

    mapRef.current.on("load", () => {
      getBboxAndFetch();
    });

    mapRef.current.on("moveend", () => {
      getBboxAndFetch();
    });

    // Try get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [
            position.coords.longitude,
            position.coords.latitude,
          ];

          mapRef.current.flyTo({
            center: userCoords,
            zoom: 14,
          });

          new mapboxgl.Marker({ color: "blue" })
            .setLngLat(userCoords)
            .setPopup(new mapboxgl.Popup().setText("You are here"))
            .addTo(mapRef.current);
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      console.warn("Geolocation not supported");
    }

    return () => {
      mapRef.current.remove();
    };
  }, []);

  console.log(earthquakeData);
  const handleMarkerClick = (feature) => {
    setActiveFeature(feature);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: `${query}, Australia`,
          limit: 1,
        })
        .send();

      const match = response.body.features[0];
      if (match && mapRef.current) {
        const [lng, lat] = match.center;
        mapRef.current.flyTo({ center: [lng, lat], zoom: 12 });
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Search failed");
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: `${value}, Australia`,
          autocomplete: true,
          limit: 5,
        })
        .send();

      const results = response.body.features;
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Autocomplete failed:", error);
      setSuggestions([]);
    }
  };

  return (
    <div className="map-page">
      <form onSubmit={handleSearch} className="search-bar-modern">
        <div className="search-bar-container">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Enter suburb or postcode"
              value={query}
              // onChange={(e) => setQuery(e.target.value)}
              onChange={handleInputChange}
            />
            <button type="submit" className="icon-button">
              <SearchIcon width="24" />
            </button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="autocomplete-list">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="autocomplete-item"
                  onClick={() => {
                    const [lng, lat] = item.center;
                    mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });

                    new mapboxgl.Marker()
                      .setLngLat([lng, lat])
                      .setPopup(new mapboxgl.Popup().setText(item.place_name))
                      .addTo(mapRef.current);

                    setQuery(item.place_name);
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                >
                  {item.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {/* <div id="map-container" ref={mapContainerRef} /> */}
      <div className="map-content">
        <div className="card-list">
          {mockData.map((item, index) => (
            <div
              key={index}
              className="custom-card"
              onClick={() => {
                if (!mapRef.current) return;
                const isSaved = getSavedMarkers().includes(item.id);
                const heartIconHTML = `
                <button class="heart-btn" data-id="${item.id}" 
                style="background:none;border:none;cursor:pointer;outline:none;">
                  <img 
                    src="${isSaved ? heartFilled : heartOutline}" 
                    alt="Save" 
                    width="24" 
                    height="24"
                  />
                </button>
              `;
                // fly to clicked location
                mapRef.current.flyTo({
                  center: [item.lng, item.lat],
                  zoom: 14,
                });

                // remove previous marker if any
                if (markerRef.current) {
                  markerRef.current.remove();
                }

                // add marker and popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                    <div class="popup-content">
                      <strong>${item.title}</strong><br/>
                      ${item.address}<br/>
                      ${heartIconHTML}
                    </div>
                  `);

                const marker = new mapboxgl.Marker()
                  .setLngLat([item.lng, item.lat])
                  .setPopup(popup)
                  .addTo(mapRef.current);

                markerRef.current = marker;
                popup.addTo(mapRef.current);

                setTimeout(() => {
                  const heartBtn = document.querySelector(".heart-btn");
                  if (heartBtn) {
                    heartBtn.addEventListener("click", () => {
                      const id = parseInt(heartBtn.getAttribute("data-id"), 10);
                      let saved = getSavedMarkers();
                      const isAlreadySaved = saved.includes(id);

                      // Update saved list
                      if (isAlreadySaved) {
                        saved = saved.filter((val) => val !== id);
                      } else {
                        saved = [...saved, id];
                      }

                      // Save to cookie
                      document.cookie = `savedMarkers=${encodeURIComponent(
                        JSON.stringify(saved)
                      )}; path=/; max-age=31536000`;

                      // Update image
                      const img = heartBtn.querySelector("img");
                      img.src = saved.includes(id) ? heartFilled : heartOutline;
                    });
                  }
                }, 100);
              }}
            >
              {/* <img src={item.image} alt={item.title} className="card-image" /> */}
              <img src={ImagePlace} alt={item.title} className="card-image" />
              <div className="card-content">
                <div className="card-header">
                  <div>
                    <p className="card-type">{item.type}</p>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-address">{item.address}</p>
                  </div>
                  <div className="card-icon">
                    <CardItemIcon width="40px" />
                  </div>
                </div>
                <div className="card-footer">
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="map-content">
          <div
            ref={mapContainerRef}
            id="map-container"
            className="map-container"
          />
          {mapRef.current &&
            earthquakeData &&
            earthquakeData.features?.map((feature) => {
              return (
                <Marker
                  key={feature.id}
                  map={mapRef.current}
                  feature={feature}
                  isActive={activeFeature?.id === feature.id}
                  onClick={handleMarkerClick}
                />
              );
            })}
          {mapRef.current && (
            <Popup map={mapRef.current} activeFeature={activeFeature} />
          )}
        </div>
      </div>
    </div>
  );
}

function getSavedMarkers() {
  const saved = document.cookie
    .split("; ")
    .find((row) => row.startsWith("savedMarkers="));
  return saved ? JSON.parse(decodeURIComponent(saved.split("=")[1])) : [];
}

function saveMarkerToCookie(id) {
  const saved = getSavedMarkers();
  if (!saved.includes(id)) {
    const updated = [...saved, id];
    document.cookie = `savedMarkers=${encodeURIComponent(
      JSON.stringify(updated)
    )}; path=/; max-age=31536000`;
  }
}

export default MapPage;
