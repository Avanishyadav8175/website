// libraries
import { Schema } from "mongoose";

// types
import { ContentBalloonColorDocument } from "@/common/types/documentation/nestedDocuments/contentBalloonColor";

// schemas
export const contentBalloonColorSchema =
  new Schema<ContentBalloonColorDocument>(
    {
      label: {
        type: Schema.Types.ObjectId,
        ref: "Label",
        required: true
      },
      groups: [
        {
          type: Schema.Types.ObjectId,
          ref: "BalloonColorGroup",
          required: true
        }
      ]
    },
    { timestamps: true }
  );
