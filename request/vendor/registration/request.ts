// constants
import { DOMAIN } from "@/common/constants/domain";
import { VENDOR_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/action/vendor-request";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { addDocuments } = getRequest<VendorRequestDocument>(URL);

// exports
export const addVendorRequest = addDocuments;
