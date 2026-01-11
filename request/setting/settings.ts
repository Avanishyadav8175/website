// constants
import { DOMAIN } from "@/common/constants/domain";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type SettingDocument } from "@/common/types/documentation/settings/setting";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/setting";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<SettingDocument>(URL);

// exports
export const fetchSettings = ({ query }: { query?: Query<SettingDocument> }) =>
  fetchDocuments(query || {}, { ssr: true });
