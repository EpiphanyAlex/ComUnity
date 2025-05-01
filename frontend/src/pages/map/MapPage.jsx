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
import { fetchAndStore } from "../utils/fetch";

function MapPage() {
  async function loadEvents() {
    try {
      const data = await fetchAndStore("http://127.0.0.1:5000/events");
      console.log("Events Loaded:", data);
      const temp = getEventList();
      console.log("Fetch eventList", temp);
      setEvents(Array.isArray(temp) ? temp : []);
    } catch (error) {
      console.error("Failed to load events");
    }
  }

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
  const [proximity, setProximity] = useState(10.67); // initial value

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

  const [playgrounds, setPlaygrounds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/playgrounds")
      .then((res) => res.json())
      .then((data) => {
        console.log("Playground API data:", data);
        setPlaygrounds(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch playgrounds:", err);
        setPlaygrounds([]);
      });
  }, []);

  const [features, setFeatures] = useState([]);
  const [events, setEvents] = useState([]);
  // const [currentEvents, setCurrentEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const markerRefs = useRef([]);
  const popupRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("Latest");

  useEffect(() => {
    fetch("http://localhost:5000/api/features")
      .then((res) => res.json())
      .then((data) => {

        console.log("Mel features API data:", data);
        setFeatures(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch mel features:", err);
        setFeatures([]);
      });
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

    // Add built-in navigation buttons
    const geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true, // Is it continuous tracking?
      showUserLocation: true, // Whether to display the user's blue dot on the map
    });
    mapRef.current.addControl(geoLocate, "top-right");

    //Add zoom in and zoom out buttons
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // Do not display compass
      visualizePitch: false, // Do not display up and down arrows (pitch control)
    });
    mapRef.current.addControl(nav, "top-right");

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
  }, [getBboxAndFetch]);

  useEffect(() => {
    async function fetchData() {
      await loadEvents(); // Assume loadEvents is async fetch
      // const temp = getEventList();
      // console.log("Fetch eventList", temp);
      // setEvents(Array.isArray(temp) ? temp : []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    // 1. Clear old markers
    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = [];

    // 2. Add new markers based on the new eventList
    events.forEach((item) => {
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
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="popup-content">
            <strong>${item.title}</strong><br/>
            ${item.address}<br/>
            ${heartIconHTML}
          </div>
        `);

      const marker = new mapboxgl.Marker()
        .setLngLat([item.longitude, item.latitude])
        .setPopup(popup)
        .addTo(mapRef.current);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();

        // 1. Close old popup
        if (popupRef.current) {
          popupRef.current.remove();
        }

        // 2. Open new popup
        popup.setLngLat([item.longitude, item.latitude]).addTo(mapRef.current);

        // 3. Save current popup
        popupRef.current = popup;

        // 4. Add slight delay (to ensure popup DOM is inserted) then bind button events
        setTimeout(() => {
          const popupContent = document.querySelector(
            ".mapboxgl-popup-content"
          );
          if (!popupContent) return;

          const heartBtn = popupContent.querySelector(".heart-btn");
          if (heartBtn) {
            heartBtn.addEventListener("click", (e) => {
              e.stopPropagation();

              const id = parseInt(heartBtn.getAttribute("data-id"), 10);
              let saved = getSavedMarkers();
              const isAlreadySaved = saved.includes(id);

              if (isAlreadySaved) {
                saved = saved.filter((val) => val !== id);
              } else {
                saved = [...saved, id];
              }

              document.cookie = `savedMarkers=${encodeURIComponent(
                JSON.stringify(saved)
              )}; path=/; max-age=31536000`;

              const img = heartBtn.querySelector("img");
              img.src = saved.includes(id) ? heartFilled : heartOutline;

              console.log("Toggled save for id:", id);
            });
          }
        }, 50); // 50ms safety margin to ensure DOM is mounted
      });

      markerRefs.current.push(marker); // Store marker reference for future cleanup
    });
  }, [events]);

  const showFavorites = () => {
    const saved = getSavedMarkers(); // Get saved IDs from cookie/localStorage
    const favorites = events.filter((event) => saved.includes(event.id));
    setEvents(favorites);
  };

  const flyToFirst = () => {
    if (events[0] != null) {
      mapRef.current.flyTo({
        center: [events[0]?.longitude, events[0].latitude],
        zoom: 12,
      });
    }
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "all") {
      loadEvents(); // Reload all events
    } else if (tab === "favorites") {
      showFavorites(); // Filter existing events
    }
    flyToFirst();
  };

  const handleSearchKeyWord = () => {
    let filtered = [...events];

    if (searchKeyword.trim() !== "") {
      filtered = filtered.filter(
        (event) =>
          event?.title?.toLowerCase().includes(searchKeyword?.toLowerCase()) ||
          event?.description
            ?.toLowerCase()
            .includes(searchKeyword?.toLowerCase())
      );
    }

    if (orderBy === "Latest") {
      filtered = filtered.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    } else if (orderBy === "Oldest") {
      filtered = filtered.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
    // Can extend with other sorting methods in the future

    setEvents(filtered);
    flyToFirst();
  };

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
    <div className="event-page-container">
      <aside className="filter-column">
        <div className="filter-panel">
          <h3>
            <span
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => handleTabClick("all")}
            >
              All
            </span>
            <span
              className={`tab ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => handleTabClick("favorites")}
            >
              Favorites
            </span>
          </h3>

          {/* <div className="filter-group">
            <label>Show activities from</label>
            <div>
              <input type="radio" name="time" /> Anytime
            </div>
            <div>
              <input type="radio" name="time" /> Right Now
            </div>
            <div>
              <input type="radio" name="time" /> On a Specific Date
            </div>
          </div> */}

          <div className="filter-group">
            <label>Where to look?</label>
            {/* <div className="location-options">
              <span>Visible map area</span>
              <span role="img" aria-label="anchor">
                Anchor
              </span>{" "}
              Near me
            </div> */}
            <form onSubmit={handleSearch} className="search-bar-modern">
              <div className="search-bar-container">
                <div className="search-input-group">
                  <textarea
                    // type="textarea"
                    placeholder="Enter suburb or postcode"
                    value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                    onChange={handleInputChange}
                  />
                  {/* <button type="submit" className="icon-button">
                    <SearchIcon width="24" />
                  </button> */}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="autocomplete-list">
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        className="autocomplete-item"
                        onClick={() => {
                          const [lng, lat] = item.center;
                          mapRef.current.flyTo({
                            center: [lng, lat],
                            zoom: 14,
                          });

                          new mapboxgl.Marker()
                            .setLngLat([lng, lat])
                            .setPopup(
                              new mapboxgl.Popup().setText(item.place_name)
                            )
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
          </div>

          {/* <div className="filter-group">
            <label>Proximity {proximity.toFixed(2)}km</label>
            <input
              type="range"
              min="0"
              max="50"
              step="0.1"
              value={proximity}
              onChange={(e) => setProximity(parseFloat(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label>All categories</label>
            <select>
              <option>All</option>
            </select>
          </div> */}

          <div className="filter-group">
            <label>What are you looking for?</label>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Order by</label>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          <button className="search-btn" onClick={handleSearchKeyWord}>
            Search
          </button>
          <button
            className="reset-btn"
            onClick={() => {
              setQuery("");
              setProximity(10.87);
              setSearchKeyword("");
            }}
          >
            Reset Filters
          </button>
        </div>
      </aside>
      <div className="map-page">
        <div className="map-content">
          <div className="card-list">
            {events.map((item, index) => (
              <div
                key={index}
                className="custom-card"
                onClick={() => {
                  if (!mapRef.current) return;
                  // fly to clicked location
                  mapRef.current.flyTo({
                    center: [item.longitude, item.latitude],
                    zoom: 14,
                  });

                  // setTimeout(() => {
                  //   const heartBtn = document.querySelector(".heart-btn");
                  //   if (heartBtn) {
                  //     heartBtn.addEventListener("click", () => {
                  //       const id = parseInt(
                  //         heartBtn.getAttribute("data-id"),
                  //         10
                  //       );
                  //       let saved = getSavedMarkers();
                  //       const isAlreadySaved = saved.includes(id);

                  //       // Update saved list
                  //       if (isAlreadySaved) {
                  //         saved = saved.filter((val) => val !== id);
                  //       } else {
                  //         saved = [...saved, id];
                  //       }

                  //       // Save to cookie
                  //       document.cookie = `savedMarkers=${encodeURIComponent(
                  //         JSON.stringify(saved)
                  //       )}; path=/; max-age=31536000`;

                  //       // Update image
                  //       const img = heartBtn.querySelector("img");
                  //       img.src = saved.includes(id)
                  //         ? heartFilled
                  //         : heartOutline;
                  //     });
                  //   }
                  // }, 100);
                }}
              >
                {/* <img src={item.image} alt={item.title} className="card-image" /> */}
                <img
                  src={item.image || ImagePlace}
                  alt={item.title}
                  className="card-image"
                />
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
            {/* {mapRef.current &&
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
              })} */}
            {/* {mapRef.current &&
              events?.map((event) => {
                return (
                  <Marker
                    key={`event-${event.id}`}
                    map={mapRef.current}
                    feature={{
                      id: `event-${event.id}`,
                      geometry: {
                        coordinates: [event.longitude, event.latitude],
                      },
                      properties: {
                        mag: "event",
                        place: event.title,
                        description: event.description || "",
                        address: event.address || "",
                        date: event.date || "",
                      },
                    }}
                    isActive={activeFeature?.id === `event-${event.id}`}
                    onClick={handleMarkerClick}
                  />
                );
              })} */}

            {mapRef.current &&
              Array.isArray(playgrounds) &&
              playgrounds.map((pg) => (
                <Marker
                  key={`pg-${pg.id}`}
                  map={mapRef.current}
                  feature={{
                    id: `pg-${pg.id}`,
                    geometry: { coordinates: [pg.longitude, pg.latitude] },
                    properties: {
                      mag: "PG",
                      place: pg.name,
                      description: pg.description || "",
                      features: pg.features || "",
                      address: pg.address || "",
                    },
                  }}
                  isActive={activeFeature?.id === `pg-${pg.id}`}
                  onClick={handleMarkerClick}
                />
              ))}

            {mapRef.current &&
              features.map((ft) => (
                <Marker
                  key={`ft-${ft.id}`}
                  map={mapRef.current}
                  feature={{
                    id: `ft-${ft.id}`,
                    geometry: { coordinates: [ft.longitude, ft.latitude] },
                    properties: {
                      place: ft.feature_name,
                      theme: ft.theme,
                      sub_theme: ft.sub_theme,
                    },
                  }}
                  isActive={activeFeature?.id === `ft-${ft.id}`}
                  onClick={handleMarkerClick}
                />
              ))}

            {mapRef.current && (
              <Popup map={mapRef.current} activeFeature={activeFeature} />
            )}
          </div>
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

async function loadEvents() {
  try {
    const data = await fetchAndStore("http://localhost:5000/events");
    console.log("Events Loaded:", data);
  } catch (error) {
    console.error("Failed to load events");
  }
}

function getEventList() {
  try {
    const data = JSON.parse(localStorage.getItem("eventList"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default MapPage;