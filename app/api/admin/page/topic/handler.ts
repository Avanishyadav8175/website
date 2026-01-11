// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type TopicDocument,
  type TopicModel
} from "@/common/types/documentation/pages/topic";
import connectDB from "@/db/mongoose/connection";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<TopicDocument, TopicModel>(MODELS.Topics);

// middlewares
const checkDuplicateOnAdd = async (newTopic: TopicDocument) => {
  const { category, name, slug } = newTopic;

  await connectDB();

  const existingTopic = await MODELS.Topics.findOne({
    category,
    name,
    slug
  });

  console.log(existingTopic);

  if (existingTopic) {
    return null;
  }

  return newTopic;
};

export const handleGetTopics = getDocuments();
export const handleGetTopic = getDocument();
export const handleAddTopics = addDocuments({
  requestDataMiddleware: checkDuplicateOnAdd
});
export const handleUpdateTopic = updateDocument();
export const handleDeleteTopic = deleteDocument();
