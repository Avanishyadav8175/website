"use client";

// constants
import { API_SEARCH_CONTENTS } from "@/common/apiHandlers/(frontend)/apiLinks";
import { XApiKey } from "@/common/constants/apiKey";

// utils
import { setLocalStorage } from "@/common/utils/storage/local";

// hooks
import { memo, useCallback, useEffect, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import SearchBoxNew from "./components/SearchBoxNew";
import SearchResultsNew from "./components/SearchResultsNew";

// types
import { SearchBarInitialContentsType } from "../../../../Header";

export type SearchContentsType = {
  name: string;
  slug: string;
  price: number;
  basePrice: number;
  image: string;
  rating: number;
  edible?: any[];
};

export function createKeywordRegex(keyword: string) {
  const escapedKeyword = keyword.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&");

  return new RegExp(escapedKeyword, "i");
}

function SearchContentUI({
  isFocused,
  searchResults,
  onChangeIsFocused
}: {
  isFocused: boolean;
  searchResults: SearchBarInitialContentsType | null;
  onChangeIsFocused: (isFocused: boolean) => void;
}) {
  // hooks
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // states
  const [keyword, setKeyword] = useState<string>("");
  const [hasFocused, setHasFocused] = useState<boolean>(false);
  const [contents, setContents] = useState<SearchContentsType[]>([]);
  const [results, setResults] = useState<number[]>([]);
  const [prevCityId, setPrevCityId] = useState<string | null>(
    selectedCity ? (selectedCity._id as string) : null
  );

  // event handlers
  const fetchCityWiseContentList = useCallback(() => {
    fetch(
      `${API_SEARCH_CONTENTS}?cityId=${selectedCity === null ? "null" : (selectedCity._id as string)}`,
      {
        cache: "default",
        headers: {
          "x-api-key": XApiKey
        }
      }
    )
      .then(async (res) => await res.json())
      .then((data) => {
        setContents(() => data.data);
        setPrevCityId(() =>
          selectedCity ? (selectedCity._id as string) : null
        );
      })
      .catch((err) => console.error(err));
  }, [selectedCity]);

  const handleSearch = useCallback(() => {
    if (keyword.length >= 2) {
      const regex = createKeywordRegex(keyword);
      const n = contents.length;

      let matchingResults = [];

      if (n === 0) return;

      for (let i = 0; i < n; i += 1) {
        const obj = contents[i];
        if (regex.test(obj.name)) matchingResults.push(i);
      }

      setResults(() => matchingResults);
    } else {
      setResults(() => []);
    }
  }, [contents, keyword]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (hasFocused) {
      // fetch contents from API here...
      fetchCityWiseContentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFocused]);

  useEffect(() => {
    if (
      hasFocused &&
      ((selectedCity !== null &&
        prevCityId !== null &&
        (selectedCity._id as string) !== prevCityId) ||
        (selectedCity !== null && prevCityId === null) ||
        (selectedCity === null && prevCityId !== null))
    ) {
      fetchCityWiseContentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  useEffect(() => {
    if (!hasFocused && isFocused) {
      setHasFocused(() => true);
    }
  }, [hasFocused, isFocused]);

  return (
    <>
      <SearchBoxNew
        keyword={keyword}
        onChangeKeyword={(updatedKeyword: string) => {
          setKeyword(() => updatedKeyword);
        }}
        onChangeIsFocused={(isFocused: boolean) => {
          onChangeIsFocused(isFocused);
        }}
        saveContentsToLS={() => {
          setLocalStorage({ key: "items", value: contents });
        }}
      />
      {isFocused && (
        <SearchResultsNew
          contents={contents}
          indices={results}
          aiTagsAndCategories={searchResults}
          collapse={() => {
            onChangeIsFocused(false);
            setKeyword(() => "");
          }}
        />
      )}
    </>
  );
}

export default memo(SearchContentUI);
