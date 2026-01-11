// libraries
import { Schema } from "mongoose";

// types
import { type BlogArticleSuggestionDocument } from "@/common/types/documentation/nestedDocuments/blogArticleSuggestion";

// schemas
export const blogArticleSuggestionSchema =
  new Schema<BlogArticleSuggestionDocument>(
    {
      latest: [
        {
          type: Schema.Types.ObjectId,
          ref: "BlogArticle",
          required: false
        }
      ],
      related: [
        {
          type: Schema.Types.ObjectId,
          ref: "BlogArticle",
          required: false
        }
      ]
    },
    { timestamps: true }
  );
