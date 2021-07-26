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
