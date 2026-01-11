// connection
import connectDB from "@/db/mongoose/connection";

// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type SubTopicDocument,
  type SubTopicModel
} from "@/common/types/documentation/pages/subTopic";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<SubTopicDocument, SubTopicModel>(MODELS.SubTopics);

// middlewares
const checkDuplicateOnAdd = async (newSubTopic: SubTopicDocument) => {
  const { category, topic, name, slug } = newSubTopic;

  await connectDB();

  const existingSubTopic = await MODELS.SubTopics.findOne({
    category,
    topic,
    name,
    slug
  });

  if (existingSubTopic) {
    return null;
  }

  return newSubTopic;
};

export const handleGetSubTopics = getDocuments();
export const handleGetSubTopic = getDocument();
export const handleAddSubTopics = addDocuments({
  requestDataMiddleware: checkDuplicateOnAdd
});
export const handleUpdateSubTopic = updateDocument();
export const handleDeleteSubTopic = deleteDocument();
