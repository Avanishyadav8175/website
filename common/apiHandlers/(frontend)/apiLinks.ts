import { DOMAIN } from "@/common/constants/domain";
import { ContentsSortType } from "@/components/pages/(frontend)/CategoryList/static/types";

// CONTENT CATEGORIES +==================================
export const API_CATEGORIES_INITIAL_LOAD = (slug: string) =>
  `${DOMAIN}/api/frontend/v2/frontend/content-category/${slug}`;
export const API_CATEGORIES_MORE_PRODUCTS = ({
  categoryId,
  offset,
  sort,
  cityId
}: {
  categoryId: string;
  offset: number;
  sort: ContentsSortType;
  cityId?: string;
}) =>
  `${DOMAIN}/api/frontend/v2/frontend/content-category/more-products/${categoryId}?offset=${offset}${sort === "popularity" ? "" : `&sort=${sort}`}${cityId && cityId.length === 24 ? `&cityId=${cityId}` : ""}`;

// PAGE PAGE +==================================
export const API_PAGE_PAGE_INITIAL_LOAD = (
  category: string,
  page: string,
  cityId?: string
) =>
  `${DOMAIN}/api/frontend/v2/frontend/content-page/${category}/${page}${cityId ? (cityId.length === 24 ? `?cityId=${cityId}` : cityId.startsWith('"') && cityId.length === 26 ? `?cityId=${cityId.substring(1, 25)}` : "") : ""}`;
export const API_PAGE_PAGE_MORE_PRODUCTS = ({
  categoryId,
  topicId,
  offset,
  sort,
  cityId
}: {
  categoryId: string;
  topicId: string;
  offset: number;
  sort: ContentsSortType;
  cityId?: string;
}) =>
  `${DOMAIN}/api/frontend/v2/frontend/content-page/more-products/${categoryId}/${topicId}?offset=${offset}${sort === "popularity" ? "" : `&sort=${sort}`}${cityId && cityId.length === 24 ? `&cityId=${cityId}` : ""}`;

// PAGE SUBPAGE +==================================
export const API_PAGE_SUBPAGE_INITIAL_LOAD = (
  category: string,
  page: string,
  subpage: string,
  cityId?: string
) =>
  `${DOMAIN}/api/frontend/v2/frontend/content-subpage/${category}/${page}/${subpage}${cityId ? (cityId.length === 24 ? `?cityId=${cityId}` : cityId.startsWith('"') && cityId.length === 26 ? `?cityId=${cityId.substring(1, 25)}` : "") : ""}`;
export const API_PAGE_SUBPAGE_MORE_PRODUCTS = ({
  categoryId,
  topicId,
  subTopicId,
  offset,
  sort,
  cityId
}: {
  categoryId: string;
  topicId: string;
  subTopicId: string;
  offset: number;
  sort: ContentsSortType;
  cityId?: string;
}) =>
  `${DOMAIN}/api/frontend/v2/frontend/content-subpage/more-products/${categoryId}/${topicId}/${subTopicId}?offset=${offset}${sort === "popularity" ? "" : `&sort=${sort}`}${cityId && cityId.length === 24 ? `&cityId=${cityId}` : ""}`;

// SEARCH +==================================
export const API_SEARCH_INITIAL_LOAD = `${DOMAIN}/api/frontend/v2/frontend/search/initial-load`;
export const API_SEARCH_CONTENTS = `${DOMAIN}/api/frontend/v2/frontend/search/contents`;
