// connection
import connectDB from "@/db/mongoose/connection";

// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type SubSubTopicDocument,
  type SubSubTopicModel
} from "@/common/types/documentation/pages/subSubTopic";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<SubSubTopicDocument, SubSubTopicModel>(MODELS.SubSubTopics);

// middlewares
const checkDuplicateOnAdd = async (newSubSubTopic: SubSubTopicDocument) => {
  const { category, topic, subTopic, name, slug } = newSubSubTopic;

  await connectDB();

  const existingSubSubTopic = await MODELS.SubSubTopics.findOne({
    category,
    topic,
    name,
    subTopic,
    slug
  });

  if (existingSubSubTopic) {
    return null;
  }

  return newSubSubTopic;
};

export const handleGetSubSubTopics = getDocuments();
export const handleGetSubSubTopic = getDocument();
export const handleAddSubSubTopics = addDocuments({
  requestDataMiddleware: checkDuplicateOnAdd
});
export const handleUpdateSubSubTopic = updateDocument();
export const handleDeleteSubSubTopic = deleteDocument();
