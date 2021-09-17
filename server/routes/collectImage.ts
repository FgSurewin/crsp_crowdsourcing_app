import express from "express";
import { CollectImageController } from "../controllers/collectImage";
import { checkToken } from "../middlewares/user";
const route = express.Router();
const collectImageController = new CollectImageController();

route.post("/createImage", checkToken, collectImageController.createImage);
route.get(
  "/getImagesByPano/:panoId",
  checkToken,
  collectImageController.getImageByPano
);
route.get("/getOneById/:Id", checkToken, collectImageController.getImageById);
route.post("/toggle", checkToken, collectImageController.toggle);
route.post("/addLabelArea", checkToken, collectImageController.addLabelArea);
route.post(
  "/addMarkers",
  checkToken,
  collectImageController.addStreetViewMarkers
);

export default route;
