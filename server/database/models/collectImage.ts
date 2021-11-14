import mongoose, { Document, Schema } from "mongoose";

export interface CollectBoxInterface {
  top: number;
  left: number;
  weight: number;
  height: number;
}

export interface CollectLabelInterface extends Document {
  label_id: string;
  box: CollectBoxInterface;
  label: string;
  create_at?: string;
  score?: number;
  subtype?: string;
  labeledBy: string;
}

export interface PovInterface {
  heading: number;
  pitch: number;
  zoom: number;
}

export interface PanoMarkerInterface extends Document {
  id: string;
  pov: PovInterface;
  title: string;
  point: number[];
  image_id: string;
  label_id: string;
  subtype: string;
  nickname: string;
}

export interface ModifierInterface extends Document {
  name: string;
  labels: CollectLabelInterface[];
  createdAt?: string;
  updatedAt?: String;
}

export interface CollectImageInterface extends Document {
  image_id: string;
  pano: string;
  lat: number;
  lon: number;
  url: string;
  image_size: number[];
  isLabeled: boolean;
  count: number;
  labeled_area: CollectLabelInterface[];
  user_one?: CollectLabelInterface[];
  user_two?: CollectLabelInterface[];
  user_three?: CollectLabelInterface[];
  panoMarkers: PanoMarkerInterface[];
  pov: PovInterface;
  creator: string;
  modifiers: ModifierInterface[];
}

const ModifierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    labels: {
      type: [
        {
          label_id: String,
          box: {
            left: Number,
            top: Number,
            width: Number,
            height: Number,
          },
          label: String,
          subtype: { type: String, required: false },
          labeledBy: String,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const CollectImageModel = new Schema(
  {
    image_id: {
      type: String,
      required: true,
    },
    pano: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    image_size: {
      type: [Number],
      required: true,
    },
    isLabeled: {
      type: Boolean,
      required: true,
    },
    count: {
      type: Number,
      require: true,
    },
    labeled_area: {
      type: [
        {
          label_id: String,
          box: {
            left: Number,
            top: Number,
            width: Number,
            height: Number,
          },
          label: String,
          subtype: { type: String, required: false },
          labeledBy: String,
        },
      ],
      required: true,
    },
    pov: {
      type: {
        heading: Number,
        pitch: Number,
        zoom: Number,
      },
      required: true,
    },
    panoMarkers: {
      type: [
        {
          id: String,
          pov: {
            heading: Number,
            pitch: Number,
            zoom: Number,
          },
          title: String,
          point: [Number],
          image_id: String,
          label_id: String,
          subtype: String,
          nickname: String,
        },
      ],
      required: true,
    },
    creator: {
      type: String,
      require: true,
    },
    modifiers: {
      type: [ModifierSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CollectImageInterface>(
  "CollectImage",
  CollectImageModel,
  "collect_panorama"
);
