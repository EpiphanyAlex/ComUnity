import { useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";

const Popup = ({ map, activeFeature }) => {
  const popupRef = useRef();
  const contentRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!map) return;

    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 20,
    });

    return () => {
      popupRef.current.remove();
    };
  }, [map]);

  // Delay `addTo(map)` until content has been rendered
  useLayoutEffect(() => {
    if (!activeFeature || !map) return;

    popupRef.current
      .setLngLat(activeFeature.geometry.coordinates)
      .setDOMContent(contentRef.current) // use DOM element instead of outerHTML
      .addTo(map);
  }, [activeFeature, map]);

  return (
    <>
      {createPortal(
        <div className="portal-content">
          <table>
            <tbody>
              {activeFeature?.properties.place && (
                <tr>
                  <td><strong>Name</strong></td>
                  <td>{activeFeature.properties.place}</td>
                </tr>
              )}
              {activeFeature?.properties.address && (
                <tr>
                  <td><strong>Address</strong></td>
                  <td>{activeFeature.properties.address}</td>
                </tr>
              )}
              {activeFeature?.properties.description && (
                <tr>
                  <td><strong>Description</strong></td>
                  <td>{activeFeature.properties.description}</td>
                </tr>
              )}
              {activeFeature?.properties.features && (
                <tr>
                  <td><strong>Features</strong></td>
                  <td>{activeFeature.properties.features}</td>
                </tr>
              )}
              {activeFeature?.properties.theme && (
                <tr>
                  <td><strong>Theme</strong></td>
                  <td>{activeFeature.properties.theme}</td>
                </tr>
              )}
              {activeFeature?.properties.sub_theme && (
                <tr>
                  <td><strong>Sub-theme</strong></td>
                  <td>{activeFeature.properties.sub_theme}</td>
                </tr>
              )}
              {activeFeature?.properties.time && (
                <tr>
                  <td><strong>Time</strong></td>
                  <td>{new Date(activeFeature.properties.time).toLocaleString()}</td>
                </tr>
              )}
              {activeFeature?.properties.mag && (
                <tr>
                  <td><strong>Magnitude</strong></td>
                  <td>{activeFeature.properties.mag}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Popup;
