"use client";

// components
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";
import { useEffect, useState } from "react";
import { API_SEARCH_CONTENTS } from "@/common/apiHandlers/(frontend)/apiLinks";
import { useLocation } from "@/hooks/useLocation/useLocation";
import { CityDocument } from "@/common/types/documentation/presets/city";
import { SearchContentsType } from "./SearchContentUI";

function createKeywordRegex(keyword: string) {
  const escapedKeyword = keyword.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&");

  return new RegExp(escapedKeyword, "i");
}

export default function SearchContents({
  searchResults
}: {
  searchResults: { aiTags: string[]; categories: string[][] } | null;
}) {
  // const { selectedCity } = useLocation();
  const selectedCity = ((): CityDocument | null => null)();

  const [keyword, setKeyword] = useState<string>("");
  const [hasFocused, setHasFocused] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [contents, setContents] = useState<SearchContentsType[]>([]);
  const [results, setResults] = useState<number[]>([]);
  const [prevCityId, setPrevCityId] = useState<string | null>(
    selectedCity ? (selectedCity._id as string) : null
  );

  const fetchCityWiseContentList = () => {
    fetch(`${API_SEARCH_CONTENTS}?cityId=${selectedCity}`, {
      cache: "force-cache"
    })
      .then(async (res) => await res.json())
      .then((data) => {
        setContents((prev) => data.data);
        setPrevCityId((prev) =>
          selectedCity ? (selectedCity._id as string) : null
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (keyword.length >= 2) {
      const regex = createKeywordRegex(keyword);
      // const n = results.length > 0 ? results.length : contents.length;
      const n = contents.length;

      let matchingResults = [];

      if (n === 0) return;

      for (let i = 0; i < n; i += 1) {
        // const obj = results.length > 0 ? contents[results[i]] : contents[i];
        const obj = contents[i];
        if (regex.test(obj.name)) matchingResults.push(i);
      }

      setResults((prev) => matchingResults);
    } else setResults((prev) => []);
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
    if (!hasFocused && isFocused) setHasFocused((prev) => true);
  }, [hasFocused, isFocused]);

  return (
    <section
      className={`z-[999] absolute max-sm:hidden sm:w-[350px] -translate-x-[calc(50%_-_28px)] outline-none text-charcoal-3/90 backdrop-blur-md bg-ivory/80 rounded-xl w-fit py-2.5 px-4 text-base border border-charcoal-3/10 shadow-sm transition-all duration-300`}
    >
      <SearchBox
        keyword={keyword}
        onChangeKeyword={(updatedKeyword: string) =>
          setKeyword((prev) => updatedKeyword)
        }
        isFocused={(isFocused: boolean) => setIsFocused((prev) => isFocused)}
      />
      {isFocused && (
        <SearchResults
          contents={contents}
          indices={results}
          aiTagsAndCategories={searchResults}
          collapse={() => {
            setIsFocused((prev) => false);
            setKeyword((prev) => "");
          }}
        />
      )}
    </section>
  );
}
