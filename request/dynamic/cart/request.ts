// constants
// import { DOMAIN } from "@/common/constants/domain";
const DOMAIN = "";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/dynamic/cart";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocument, addDocuments, updateDocument } =
  getRequest<CartDocument>(URL);

// exports
export const fetchCart = ({
  cartId,
  query
}: {
  cartId: string;
  query?: Query<CartDocument>;
}) => fetchDocument(cartId, query || {}, { ssr: true });

export const addCart = ({ data }: { data: Partial<CartDocument> }) =>
  addDocuments(data, { ssr: true });

export const updateCart = ({
  cartId,
  query,
  data
}: {
  cartId: string;
  query?: Query<CartDocument>;
  data: Partial<CartDocument>;
}) => updateDocument(cartId, query || {}, data, { ssr: true });
