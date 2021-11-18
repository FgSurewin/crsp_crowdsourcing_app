import CollectImageModel, {
  CollectImageInterface,
} from "./../database/models/collectImage";
import { Request, Response, NextFunction } from "express";
import { CollectImageService } from "../services/collectImage";
import {
  CollectImageBody,
  CollectStreetViewMarkers,
  ImageParams,
} from "../types";
import { getField } from "../utils/image";

const collectImageService = new CollectImageService();
export class CollectImageController {
  async createImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: CollectImageInterface = req.body;
    await collectImageService.createImage({ req, res, next }, body);
  }

  //   async getAllImages(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ): Promise<void> {
  //     await imageService.getAllImages({ req, res, next });
  //   }
  async getImageByPano(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { panoId }: ImageParams = req.params;
    if (panoId)
      await collectImageService.getImageByPano({ req, res, next }, panoId);
    else
      res.json({
        code: 6000,
        message: "params is invalid.",
      });
  }
  async getImageById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { Id }: ImageParams = req.params;
    if (Id) await collectImageService.getImageById({ req, res, next }, Id);
    else
      res.json({
        code: 6000,
        message: "params is invalid.",
      });
  }
  // async getRandomImageList(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   await imageService.getRandomImageList({ req, res, next });
  // }
  async toggle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { labeled, id }: CollectImageBody = req.body;
    if (id) {
      await collectImageService.toggle({ req, res, next }, labeled!, id);
    } else
      res.json({
        code: 6000,
        message: "Post body is invalid.",
      });
  }

  async addCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id }: CollectImageBody = req.body;
    if (id) {
      await collectImageService.addCount({ req, res, next }, id);
    } else
      res.json({
        code: 6000,
        message: "Post body is invalid.",
      });
  }
  async clearCount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id }: CollectImageBody = req.body;
    if (id) {
      await collectImageService.clearCount({ req, res, next }, id);
    } else
      res.json({
        code: 6000,
        message: "Post body is invalid.",
      });
  }

  async addModifier(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id, modifier }: CollectImageBody = req.body;
    if (id && modifier) {
      await collectImageService.addModifier({ req, res, next }, id, modifier);
    } else
      res.json({
        code: 6000,
        message: "Post body is invalid.",
      });
  }

  async addStreetViewMarkers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { markers, id }: CollectStreetViewMarkers = req.body;
    const result: CollectImageInterface | null =
      await CollectImageModel.findById({
        _id: id,
      });
    if (result) {
      await collectImageService.addStreetViewMarkers(
        { req, res, next },
        markers,
        id!
      );
    } else {
      res.json({
        code: "6000",
        message: "Image ID is invalid.",
      });
    }
  }
}
