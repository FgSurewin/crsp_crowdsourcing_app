import { Component } from "react";
import ReactDOM from "react-dom";
import { createOverlayElement } from "./utils/createCustomElement";
import { MarkerCreator } from "./utils/MarkerCreator";

export default class SingleMarker extends Component {
  /** Overlay instance. */
  overlay = null;

  /** Dom element reference to the content rendered in the overlay. */
  el = null;

  componentWillUnmount() {
    /** remove overlay from the map. */
    // this.overlay.onRemove();
    // delete this.overlay;
  }

  render() {
    try {
      const {
        googleMaps,
        children,
        container,
        position,
        pano,
        anchor,
        size,
        title,
        id,
        clickFunc,
      } = this.props;
      this.el = this.el || createOverlayElement();
      const PanoMarker = MarkerCreator(googleMaps);
      this.overlay =
        this.overlay ||
        new PanoMarker({
          content: this.el,
          container,
          position,
          pano,
          anchor,
          size,
          title,
          id,
          clickFunc,
        });

      if (!googleMaps) return null;
      return ReactDOM.createPortal(children, this.el);
    } catch (e) {
      console.log(e);
    }
  }
}
