// connection
import connectDB from "@/db/mongoose/connection";

// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type SubSubSubTopicDocument,
  type SubSubSubTopicModel
} from "@/common/types/documentation/pages/subSubSubTopic";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<SubSubSubTopicDocument, SubSubSubTopicModel>(MODELS.SubSubSubTopics);

// middlewares
const checkDuplicateOnAdd = async (newSubSubSubTopic: SubSubSubTopicDocument) => {
  const { category, topic, subTopic, subSubTopic, name, slug } = newSubSubSubTopic;

  await connectDB();

  const existingSubSubSubTopic = await MODELS.SubSubSubTopics.findOne({
    category,
    topic,
    name,
    subTopic,
    subSubTopic,
    slug
  });

  if (existingSubSubSubTopic) {
    return null;
  }

  return newSubSubSubTopic;
};

export const handleGetSubSubSubTopics = getDocuments();
export const handleGetSubSubSubTopic = getDocument();
export const handleAddSubSubSubTopics = addDocuments({
  requestDataMiddleware: checkDuplicateOnAdd
});
export const handleUpdateSubSubSubTopic = updateDocument();
export const handleDeleteSubSubSubTopic = deleteDocument();
