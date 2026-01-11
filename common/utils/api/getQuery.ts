import {
  type PopulateSearchParamType,
  type PopulateType,
  type SearchParamsType
} from "@/common/types/apiTypes";

const getQuery = (searchParams: SearchParamsType, objectId?: string) => {
  const generatePopulate = (
    populateParam: PopulateSearchParamType
  ): PopulateType => {
    const populate: PopulateType = {
      path: populateParam.path,
      ...(populateParam?.select && populateParam.select?.length
        ? {
            select: [...populateParam.select]
          }
        : populateParam?.exclude && populateParam.exclude?.length
          ? {
              select: [...populateParam.exclude.map((exclude) => `-${exclude}`)]
            }
          : {}),
      ...(populateParam?.populate && populateParam.populate.length
        ? { populate: generatePopulates(populateParam.populate) }
        : {}),
      ...(populateParam.strict ? {} : { strictPopulate: false })
    };

    return populate;
  };

  const generatePopulates = (
    populateParams: PopulateSearchParamType[]
  ): PopulateType[] => {
    const populates: PopulateType[] = [];

    for (let populateParam of populateParams) {
      populates.push(generatePopulate(populateParam));
    }

    return populates;
  };

  const filter = {
    ...(searchParams?.ids && searchParams.ids?.length
      ? { _id: { $in: searchParams.ids } }
      : objectId
        ? { _id: objectId }
        : {}),
    ...(typeof searchParams?.active === "boolean"
      ? { isActive: searchParams.active }
      : {}),
    ...(typeof searchParams?.deleted === "boolean"
      ? { isDeleted: searchParams.deleted }
      : {}),
    ...(searchParams?.filterBy
      ? searchParams?.keyword
        ? searchParams.keyword === "true" || searchParams.keyword === "false"
          ? { [searchParams.filterBy]: searchParams.keyword === "true" }
          : {
              [searchParams.filterBy]: {
                $regex: new RegExp(searchParams.keyword || "", "i")
              }
            }
        : {}
      : {}),
    ...(!searchParams?.filterBy && searchParams?.keyword
      ? { $text: { $search: searchParams.keyword } }
      : {}),
    ...(searchParams?.fromDate || searchParams?.toDate
      ? {
          createdAt: {
            ...(searchParams?.fromDate
              ? { $gte: new Date(searchParams.fromDate) }
              : {}),
            ...(searchParams?.toDate
              ? { $lte: new Date(searchParams.toDate) }
              : {})
          }
        }
      : {})
  };

  const sort: { [key: string]: 1 | -1 } = {
    ...(searchParams?.sortBy
      ? { [searchParams.sortBy]: searchParams?.orderBy === "desc" ? -1 : 1 }
      : { createdAt: -1 })
  };

  const offset: number = searchParams?.offset || 0;
  const limit: number = searchParams?.limit || 0;

  const select: string[] | undefined = [
    ...(searchParams?.select && searchParams.select?.length
      ? [...searchParams.select]
      : []),
    ...((!searchParams?.select || !searchParams.select?.length) &&
    searchParams?.exclude &&
    searchParams.exclude?.length
      ? [...searchParams.exclude.map((exclude) => `-${exclude}`)]
      : [])
  ];

  const populate = [
    ...(searchParams?.populate && searchParams.populate.length
      ? generatePopulates(searchParams.populate)
      : [])
  ];

  return { filter, sort, offset, limit, select, populate };
};

export default getQuery;
