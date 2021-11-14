import { ModifierInterface } from "./../database/models/collectImage";
import { AppContext, ImageField } from "../types";
import CollectImageModel, {
  CollectImageInterface,
  CollectLabelInterface,
  PanoMarkerInterface,
} from "../database/models/collectImage";

export class CollectImageService {
  async createImage(ctx: AppContext, body: CollectImageInterface) {
    const { res } = ctx;
    const newImage = body;
    try {
      const result = await CollectImageModel.create(newImage);
      res.json({
        code: 0,
        message: "Create Image Successfully!",
        data: result,
      });
    } catch (e) {
      const error = new Error(`${e}`);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }

  //   async getAllImages(ctx: AppContext): Promise<void> {
  //     const { res } = ctx;
  //     try {
  //       const result: ImageInterface[] = await ImageModel.find();
  //       res.json({
  //         code: 0,
  //         message: "Get all images",
  //         data: result,
  //       });
  //     } catch (e) {
  //       const error = new Error(e);
  //       res.json({
  //         code: 5000,
  //         message: error.message,
  //       });
  //     }
  //   }
  async getImageByPano(ctx: AppContext, panoId: string): Promise<void> {
    const { res } = ctx;
    try {
      const result: CollectImageInterface[] = await CollectImageModel.find({
        pano: panoId,
      });
      if (result.length > 0) {
        res.json({
          code: 0,
          message: "Get images by panorama id",
          data: result,
        });
      } else {
        res.json({
          code: 5000,
          message: "Result is NULL",
          data: null,
        });
      }
    } catch (e) {
      const error = new Error(`${e}`);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }
  async getImageById(ctx: AppContext, id: string): Promise<void> {
    const { res } = ctx;
    try {
      const result: CollectImageInterface | null =
        await CollectImageModel.findOne({
          _id: id,
        });
      if (result) {
        await this.trigger(true, result._id);
        res.json({
          code: 0,
          message: "Get one image by _id",
          data: result,
        });
      } else {
        res.json({
          code: 2000,
          message: "Result is NULL",
          data: result,
        });
      }
    } catch (e) {
      const error = new Error(`${e}`);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }
  //   async getRandomImageList(ctx: AppContext): Promise<void> {
  //     const { res } = ctx;
  //     try {
  //       const collections: ImageInterface[] = await ImageModel.find({
  //         isLabeled: false,
  //         count: { $lt: 3 },
  //       });
  //       if (collections.length === 0) {
  //         res.json({
  //           code: 2000,
  //           message: "All images has been labeled!",
  //           data: null,
  //         });
  //       } else {
  //         const random = Math.floor(Math.random() * collections.length);
  //         const pano: string = collections[random].pano;
  //         const result: ImageInterface[] = await ImageModel.find({ pano });
  //         res.json({
  //           code: 0,
  //           message: "Get images randomly",
  //           data: result,
  //         });
  //       }
  //     } catch (e) {
  //       const error = new Error(e);
  //       res.json({
  //         code: 5000,
  //         message: error.message,
  //       });
  //     }
  //   }
  async trigger(labeled: boolean, id: string): Promise<boolean> {
    let result: boolean = false;
    try {
      await CollectImageModel.updateOne({ _id: id }, { isLabeled: labeled });
      result = true;
    } catch (e) {
      const error = new Error(`${e}`);
    }
    return result;
  }
  async toggle(ctx: AppContext, labeled: boolean, id: string): Promise<void> {
    const { res } = ctx;
    const result: boolean = await this.trigger(labeled, id);
    if (result) {
      res.json({
        code: 0,
        message: "Toggle Successfully",
      });
    } else {
      res.json({
        code: 5000,
        message: "Toggle Failed - Invalid ID",
      });
    }
  }

  /**
   *
   * @param ctx
   * @param id image id
   *
   * Date: 11/12/2021
   * This function is used to add review count when somebody confirm the image.
   */
  async addCount(ctx: AppContext, id: string): Promise<void> {
    const { res } = ctx;
    try {
      const result = await CollectImageModel.findOne({
        _id: id,
      });
      if (result) {
        const { ok } = await CollectImageModel.updateOne(
          { _id: id },
          { count: result.count + 1 }
        );
        if (ok === 1) {
          res.json({
            code: 0,
            message: "Add count successfully",
            data: result,
          });
        } else {
          res.json({
            code: 4000,
            message: "Field to add count",
          });
        }
      } else {
        res.json({
          code: 2000,
          message: "Result is NULL",
          data: result,
        });
      }
    } catch (e) {
      const error = new Error(`${e}`);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }

  async addModifier(ctx: AppContext, id: string, modifier: ModifierInterface) {
    const { res } = ctx;
    try {
      const result = await CollectImageModel.findOne({
        _id: id,
      });
      if (result) {
        const { ok } = await CollectImageModel.updateOne(
          { _id: id },
          {
            labeled_area: modifier.labels,
            modifiers: [...result.modifiers, modifier],
          }
        );
        if (ok === 1) {
          res.json({
            code: 0,
            message: "Add modifier successfully",
            data: result,
          });
        } else {
          res.json({
            code: 4000,
            message: "Field to add modifier",
          });
        }
      } else {
        res.json({
          code: 2000,
          message: "Result is NULL",
          data: result,
        });
      }
    } catch (e) {
      const error = new Error(`${e}`);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }

  async addStreetViewMarkers(
    ctx: AppContext,
    markers: PanoMarkerInterface[],
    id: string
  ): Promise<void> {
    const { res } = ctx;
    try {
      const { ok } = await CollectImageModel.updateOne(
        { _id: id },
        { panoMarkers: markers }
      );
      const result = await CollectImageModel.findOne({ _id: id });
      if (ok === 1) {
        res.json({
          code: 0,
          message: "Add markers Successfully",
          data: result,
        });
      } else {
        res.json({
          code: 4000,
          message: "Don't allow to add markers",
        });
      }
    } catch (e) {
      const error = new Error(`${e}`);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }
}
