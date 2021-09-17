export function MarkerCreator(googleMaps) {
  return class extends googleMaps.OverlayView {
    constructor(opts) {
      super(opts);
      this.container_ = opts.container;

      this.povToPixel_ = !!window.chrome
        ? this.povToPixel3d
        : this.povToPixel2d;

      this.anchor_ = opts.anchor || new googleMaps.Point(16, 16);

      this.className_ = opts.className || null;

      this.clickable_ = opts.clickable || true;

      this.icon_ = opts.icon || null;

      this.id_ = opts.id || null;

      //! Important
      /* --------------------------------- My Code -------------------------------- */
      this.marker_ = opts.content;
      // It used to restrict the onAdd function
      this.first_ = true;
      this.isClick_ = false;
      this.clickFunc_ = opts.clickFunc;
      /* --------------------------------- My Code -------------------------------- */

      this.pano_ = null;

      this.pollId_ = -1;

      this.position_ = opts.position || { heading: 0, pitch: 0 };

      this.povListener_ = null;

      this.zoomListener_ = null;

      this.size_ = opts.size || new googleMaps.Size(32, 32);

      this.title_ = opts.title || "";

      this.visible_ = typeof opts.visible === "boolean" ? opts.visible : true;

      this.zIndex_ = opts.zIndex || 1;

      this.setPano(opts.pano || null, opts.container);
    }

    onAdd = () => {
      if (!this.first_) {
        // Sometimes the maps API does trigger onAdd correctly. We have to prevent
        // duplicate execution of the following code by checking if the marker node
        // has already been created.
        return;
      }
      this.first_ = false;

      // Basic style attributes for every marker
      this.marker_.style.width = this.size_.width + "px";
      this.marker_.style.height = this.size_.height + "px";
      this.marker_.style.display = this.visible_ ? "block" : "none";
      this.marker_.style.zIndex = this.zIndex_;

      // Set other css attributes based on the given parameters
      if (this.id_) {
        this.marker_.id = this.id_;
      }
      if (this.className_) {
        this.marker_.className = this.className_;
      }
      if (this.title_) {
        this.marker_.title = this.title_;
      }
      if (this.icon_) {
        this.marker_.style.backgroundImage = "url(" + this.icon_ + ")";
      }

      // If neither icon, class nor id is specified, assign the basic google maps
      // marker image to the marker (otherwise it will be invisble)
      //   if (!(this.id_ || this.className_ || this.icon_)) {
      //     this.marker_.style.backgroundImage =
      //       "url(https://www.google.com/intl/en_us/" +
      //       "mapfiles/ms/micons/red-dot.png)";
      //   }

      this.getPanes().overlayMouseTarget.appendChild(this.marker_);

      // Attach to some global events
      window.addEventListener("resize", this.draw.bind(this));
      this.povListener_ = googleMaps.event.addListener(
        this.getMap(),
        "pov_changed",
        this.draw.bind(this)
      );
      this.zoomListener_ = googleMaps.event.addListener(
        this.getMap(),
        "zoom_changed",
        this.draw.bind(this)
      );

      var eventName = "click";

      // Make clicks possible
      if (window.PointerEvent) {
        eventName = "pointerdown";
      } else if (window.MSPointerEvent) {
        eventName = "MSPointerDown";
      }

      this.marker_.addEventListener(eventName, this.onClick.bind(this), false);

      this.draw();

      // Fire 'add' event once the marker has been created.
      googleMaps.event.trigger(this, "add", this.marker_);
    };

    draw = () => {
      if (!this.pano_) {
        return;
      }
      var offset = this.povToPixel_(
        this.position_,
        this.pano_.getPov(),
        typeof this.pano_.getZoom() !== "undefined" ? this.pano_.getZoom() : 1,
        this.container_
      );

      if (offset !== null) {
        this.marker_.style.left = offset.left - this.anchor_.x + "px";
        this.marker_.style.top = offset.top - this.anchor_.y + "px";
      } else {
        // If offset is null, the marker is "behind" the camera,
        // therefore we position the marker outside of the viewport
        this.marker_.style.left = -(9999 + this.size_.width) + "px";
        this.marker_.style.top = "0";
      }

      // Determine whether to display the content menu
      if (this.marker_.children[0] && this.marker_.children[0].children[0]) {
        this.marker_.children[0].children[0].style.display = this.isClick_
          ? "block"
          : "none";
      }
    };

    onClick = (event) => {
      if (this.clickable_) {
        googleMaps.event.trigger(this, "click");
      }

      // don't let the event bubble up
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      // Determine whether to display the content menu
      this.isClick_ = !this.isClick_;
      if (this.marker_.children[0] && this.marker_.children[0].children[0]) {
        this.marker_.children[0].children[0].style.display = this.isClick_
          ? "block"
          : "none";
      }
      this.clickFunc_();
    };

    onRemove = () => {
      if (!this.marker_) {
        // Similar to onAdd, we have to prevent duplicate onRemoves as well.
        return;
      }

      googleMaps.event.removeListener(this.povListener_);
      googleMaps.event.removeListener(this.zoomListener_);
      this.marker_.parentNode.removeChild(this.marker_);
      this.marker_ = null;

      // Fire 'remove' event once the marker has been destroyed.
      googleMaps.event.trigger(this, "remove");
    };

    setPano = (pano, container) => {
      // In contrast to regular OverlayViews, we are disallowing the usage on
      // regular maps
      if (!!pano && !(pano instanceof googleMaps.StreetViewPanorama)) {
        // throw "PanoMarker only works inside a StreetViewPanorama.";
        return;
      }

      // Remove the marker if it previously was on a panorama
      if (!!this.pano_) {
        this.onRemove();
      }

      // Call method from superclass
      this.setMap(pano);
      this.pano_ = pano;
      this.container_ = container;

      // Fire the onAdd Event manually as soon as the pano is ready
      if (!!pano) {
        var promiseFn = function (resolve) {
          // Poll for panes to become available
          var pollCallback = function () {
            if (!!this.getPanes()) {
              window.clearInterval(this.pollId_);
              this.onAdd();
              if (resolve) {
                resolve(this);
              }
            }
          };

          this.pollId_ = window.setInterval(pollCallback.bind(this), 10);
        };

        // Best case, the promiseFn can be wrapped in a Promise so the consumer knows when the pano is set
        // Otherwise just call the function immediately
        if (typeof Promise !== "undefined") {
          return new Promise(promiseFn.bind(this));
        } else {
          promiseFn.call(this);
        }
      }
    };

    get3dFov = (zoom) => {
      return zoom <= 2
        ? 126.5 - zoom * 36.75 // linear descent
        : 195.93 / Math.pow(1.92, zoom); // parameters determined experimentally
    };

    povToPixel3d = (targetPov, currentPov, zoom, viewport) => {
      // Gather required variables and convert to radians where necessary
      var width = viewport.offsetWidth;
      var height = viewport.offsetHeight;
      var target = {
        left: width / 2,
        top: height / 2,
      };

      var DEG_TO_RAD = Math.PI / 180.0;
      var fov = this.get3dFov(zoom) * DEG_TO_RAD;
      var h0 = currentPov.heading * DEG_TO_RAD;
      var p0 = currentPov.pitch * DEG_TO_RAD;
      var h = targetPov.heading * DEG_TO_RAD;
      var p = targetPov.pitch * DEG_TO_RAD;

      // f = focal length = distance of current POV to image plane
      var f = width / 2 / Math.tan(fov / 2);

      // our coordinate system: camera at (0,0,0), heading = pitch = 0 at (0,f,0)
      // calculate 3d coordinates of viewport center and target
      var cos_p = Math.cos(p);
      var sin_p = Math.sin(p);

      var cos_h = Math.cos(h);
      var sin_h = Math.sin(h);

      var x = f * cos_p * sin_h;
      var y = f * cos_p * cos_h;
      var z = f * sin_p;

      var cos_p0 = Math.cos(p0);
      var sin_p0 = Math.sin(p0);

      var cos_h0 = Math.cos(h0);
      var sin_h0 = Math.sin(h0);

      var x0 = f * cos_p0 * sin_h0;
      var y0 = f * cos_p0 * cos_h0;
      var z0 = f * sin_p0;

      var nDotD = x0 * x + y0 * y + z0 * z;
      var nDotC = x0 * x0 + y0 * y0 + z0 * z0;

      // nDotD == |targetVec| * |currentVec| * cos(theta)
      // nDotC == |currentVec| * |currentVec| * 1
      // Note: |currentVec| == |targetVec| == f

      // Sanity check: the vectors shouldn't be perpendicular because the line
      // from camera through target would never intersect with the image plane
      if (Math.abs(nDotD) < 1e-6) {
        return null;
      }

      // t is the scale to use for the target vector such that its end
      // touches the image plane. It's equal to 1/cos(theta) ==
      //     (distance from camera to image plane through target) /
      //     (distance from camera to target == f)
      var t = nDotC / nDotD;

      // Sanity check: it doesn't make sense to scale the vector in a negative
      // direction. In fact, it should even be t >= 1.0 since the image plane
      // is always outside the pano sphere (except at the viewport center)
      if (t < 0.0) {
        return null;
      }

      // (tx, ty, tz) are the coordinates of the intersection point between a
      // line through camera and target with the image plane
      var tx = t * x;
      var ty = t * y;
      var tz = t * z;

      // u and v are the basis vectors for the image plane
      var vx = -sin_p0 * sin_h0;
      var vy = -sin_p0 * cos_h0;
      var vz = cos_p0;

      var ux = cos_h0;
      var uy = -sin_h0;
      var uz = 0;

      // normalize horiz. basis vector to obtain orthonormal basis
      var ul = Math.sqrt(ux * ux + uy * uy + uz * uz);
      ux /= ul;
      uy /= ul;
      uz /= ul;

      // project the intersection point t onto the basis to obtain offsets in
      // terms of actual pixels in the viewport
      var du = tx * ux + ty * uy + tz * uz;
      var dv = tx * vx + ty * vy + tz * vz;

      // use the calculated pixel offsets
      target.left += du;
      target.top -= dv;
      return target;
    };

    povToPixel2d = (targetPov, currentPov, zoom, viewport) => {
      // Gather required variables
      var width = viewport.offsetWidth;
      var height = viewport.offsetHeight;
      var target = {
        left: width / 2,
        top: height / 2,
      };

      // In the 2D environment, the FOV follows the documented curve.
      var hfov = 180 / Math.pow(2, zoom);
      var vfov = hfov * (height / width);
      var dh = this.wrapHeading(targetPov.heading - currentPov.heading);
      var dv = targetPov.pitch - currentPov.pitch;

      target.left += (dh / hfov) * width;
      target.top -= (dv / vfov) * height;
      return target;
    };

    wrapHeading = (heading) => {
      // We shift to the range [0,360) because of the way JS behaves for modulos of
      // negative numbers.
      heading = (heading + 180) % 360;

      // Determine if we have to wrap around
      if (heading < 0) {
        heading += 360;
      }

      return heading - 180;
    };
  };
}
