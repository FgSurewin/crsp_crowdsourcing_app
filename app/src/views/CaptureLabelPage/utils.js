import { v4 as uuidv4 } from "uuid";
import { calculatePointPov } from "./math";
export const typeConfig = [
  {
    type: "door",
    color: "#F97F51",
    subtype: ["Single", "Double", "Automatic", "Revolving", "Open"],
  },

  {
    type: "knob",
    color: "#9AECDB",
    subtype: ["vBar", "Pull", "Round", "hBar"],
  },

  {
    type: "ramp",
    color: "#EAB543",
  },

  {
    type: "stairs",
    color: "#D6A2E8",
  },
];
const WIDTH = 800;
const HEIGHT = 600;

/* ----------------------------- Database Format ---------------------------- */

const parseLabel = (label, image_size) => {
  const x = (label.box.left * WIDTH) / image_size[0];
  const y = (label.box.top * HEIGHT) / image_size[1];
  const width = (label.box.width * WIDTH) / image_size[0];
  const height = (label.box.height * HEIGHT) / image_size[1];
  const subtype = label.subtype ? label.subtype : undefined;
  return {
    x,
    y,
    width,
    height,
    type: label.label,
    id: label.label_id,
    subtype,
  };
};

export const labelsDecorator = (list, image_size) => {
  return list.map((item) => parseLabel(item, image_size));
};

const reverseLabel = (item, image_size) => {
  const left = (item.x * image_size[0]) / WIDTH;
  const top = (item.y * image_size[1]) / HEIGHT;
  const width = (item.width * image_size[0]) / WIDTH;
  const height = (item.height * image_size[1]) / HEIGHT;
  const subtype = item.subtype ? item.subtype : null;
  return {
    box: {
      left,
      top,
      width,
      height,
    },
    label_id: item.id,
    subtype,
    label: item.type,
  };
};

export const labelsReverser = (list, image_size = [3584, 2560]) => {
  return list.map((item) => reverseLabel(item, image_size));
};

export function generateImage({
  image_id,
  pano,
  location,
  imgSrc,
  imgSize,
  pov,
  labeled_area,
  panoMarkers,
}) {
  return {
    image_id,
    pano,
    lat: location.lat,
    lon: location.lng,
    url: imgSrc,
    image_size: imgSize,
    isLabeled: false,
    count: 0,
    labeled_area,
    panoMarkers,
    pov,
  };
}

/**
 * id:string,
 * pov:{heading, pitch},
 * title:string,
 * point:[number, number]
 */

/* -------------------------- Generate PanoMarkers -------------------------- */
function sizeConvert(label, labelImageSize, targetSize) {
  const { x, y } = label;
  const trueX = (x * targetSize[0]) / labelImageSize[0];
  const trueY = (y * targetSize[1]) / labelImageSize[1];
  return {
    x: trueX,
    y: trueY,
  };
}

export function generatePanoMarkersAtCenter(labels, pov, image_id, nickname) {
  return labels.map((item) => {
    const targetX = item.x + item.width / 2;
    const targetY = item.y + item.height / 2;
    const result = sizeConvert(
      { x: targetX, y: targetY },
      [800, 600],
      [640, 640]
    );
    const newPov = calculatePointPov(result.x, result.y, pov);
    return {
      id: uuidv4(),
      pov: newPov,
      title: item.type,
      subtype: item.subtype ? item.subtype : null,
      point: [0, 0],
      image_id,
      nickname,
    };
  });
}

export function generatePanoMarkers(labels, pov, image_id) {
  const streetViewMarkerCreator = new StreetViewMarkerCreator(
    [640, 640],
    [800, 600]
  );
  return labels.map((item) => {
    const [first, second] = streetViewMarkerCreator.generatePoint({
      // x: item.x + (item.width / 2) * 0.5,
      // y: item.y + (item.height / 2) * 0.3,
      x: item.x,
      y: item.y,
    });
    return {
      id: uuidv4(),
      pov,
      title: item.type,
      point: [first, second],
      image_id,
    };
  });
}

const NW = "NW";
const NE = "NE";
const SW = "SW";
const SE = "SE";

export class StreetViewMarkerCreator {
  // base: [number, number]
  constructor(base, labelImageSize) {
    this.base = base;
    this.labelImageSize = labelImageSize;
    this.zeroPoint = [base[0] / 2, base[1] / 2];
  }

  findRegion = (labelOrigin) => {
    const { x, y } = labelOrigin;
    let result = NW;
    if (x - this.zeroPoint[0] <= 0 && y - this.zeroPoint[1] <= 0) {
      result = NW;
    } else if (x - this.zeroPoint[0] > 0 && y - this.zeroPoint[1] <= 0) {
      result = NE;
    } else if (x - this.zeroPoint[0] <= 0 && y - this.zeroPoint[1] > 0) {
      result = SW;
    } else if (x - this.zeroPoint[0] > 0 && y - this.zeroPoint[1] > 0) {
      result = SE;
    }
    return result;
  };

  convertSize = (labelOrigin) => {
    const { x, y } = labelOrigin;
    const trueX = (x * this.base[0]) / this.labelImageSize[0];
    const trueY = (y * this.base[1]) / this.labelImageSize[1];
    return {
      x: trueX,
      y: trueY,
    };
  };

  generatePoint = (labelOrigin) => {
    const { x, y } = this.convertSize(labelOrigin);
    const region = this.findRegion(labelOrigin);
    let first = 0;
    let second = 0;
    switch (region) {
      case NW:
        first = Math.abs(x - this.zeroPoint[0]);
        second = Math.abs(y - this.zeroPoint[1]);
        break;
      case NE:
        first = -1 * (x - this.zeroPoint[0]);
        second = Math.abs(y - this.zeroPoint[1]);
        break;
      case SW:
        first = Math.abs(x - this.zeroPoint[0]);
        second = -1 * (y - this.zeroPoint[1]);
        break;
      case SE:
        first = -1 * (x - this.zeroPoint[0]);
        second = -1 * (y - this.zeroPoint[1]);
        break;
      default:
        return [first, second];
    }
    return [first, second];
  };
}
