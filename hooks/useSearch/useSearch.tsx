"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

// requests
import { fetchSearchData } from "@/request/search/searchData";

// utils
import {
  getLocalStorageSearchHistory,
  setLocalStorageSearchHistory
} from "./utils/localStorage";

// hooks
import { useRouter } from "next/navigation";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

type Search = {
  status: "initial" | "idle" | "pending";
  keyword: string;
  history: string[];
  trendingKeywords: TrendingSearchKeywordDocument[];
  showResults: boolean;
  contentCategoryResults: ContentCategoryDocument[];
  aiTagResults: AITagDocument[];
  contentResults: ContentDocument[];
  searchPageKeyword: string;
  searchPageContents: ContentDocument[];
  onSetTrendingKeywords: (
    trendingKeywords: TrendingSearchKeywordDocument[]
  ) => void;
  onLoadData: () => void;
  onChangeKeyword: (keyword: string) => void;
  onChangeShowResults: (showResults: boolean) => void;
  onShowSearchPage: (keyword?: string) => void;
};

type SearchMapData = {
  contentCategories: ContentCategoryDocument[];
  aiTags: AITagDocument[];
  contents: ContentDocument[];
};

// context
const Search = createContext<Search | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  // hooks
  const { push } = useRouter();

  // states
  const [status, setStatus] = useState<"initial" | "idle" | "pending">(
    "initial"
  );
  const [keyword, setKeyword] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [trendingKeywords, setTrendingKeywords] = useState<
    TrendingSearchKeywordDocument[]
  >([]);
  const [contentCategories, setContentCategories] = useState<
    ContentCategoryDocument[]
  >([]);
  const [aiTags, setAITags] = useState<AITagDocument[]>([]);
  const [contents, setContents] = useState<ContentDocument[]>([]);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [contentCategoryResults, setContentCategoryResults] = useState<
    ContentCategoryDocument[]
  >([]);
  const [aiTagResults, setAITagResults] = useState<AITagDocument[]>([]);
  const [contentResults, setContentResults] = useState<ContentDocument[]>([]);

  const [searchPageKeyword, setSearchPageKeyword] = useState<string>("");
  const [searchPageContents, setSearchPageContents] = useState<
    ContentDocument[]
  >([]);

  // utils
  const getSearchMap = () => {
    const map: Map<string, SearchMapData> = new Map();

    const addToMap = ({
      key,
      contentCategory,
      aiTag,
      content
    }: { key: string } & (
      | {
          contentCategory: ContentCategoryDocument;
          aiTag?: undefined;
          content?: undefined;
        }
      | {
          contentCategory?: undefined;
          aiTag: AITagDocument;
          content?: undefined;
        }
      | {
          contentCategory?: undefined;
          aiTag?: undefined;
          content: ContentDocument;
        }
    )) => {
      if (map.has(key)) {
        const { contentCategories, aiTags, contents } = map.get(
          key
        ) as SearchMapData;
        map.set(key, {
          contentCategories: [
            ...contentCategories,
            ...(contentCategory ? [contentCategory] : [])
          ],
          aiTags: [...aiTags, ...(aiTag ? [aiTag] : [])],
          contents: [...contents, ...(content ? [content] : [])]
        });
      } else {
        map.set(key, {
          contentCategories: contentCategory ? [contentCategory] : [],
          aiTags: aiTag ? [aiTag] : [],
          contents: content ? [content] : []
        });
      }
    };

    for (let contentCategory of contentCategories) {
      const name = contentCategory.name.trim().toLowerCase();
      const words = name.split(" ");

      for (let i = 2; i <= name.length; i++) {
        addToMap({ key: name.slice(0, i), contentCategory });
      }

      if (words.length > 1) {
        for (let i = 1; i < words.length; i++) {
          const word = words[i];

          for (let j = 2; j <= word.length; j++) {
            addToMap({ key: word.slice(0, j), contentCategory });
          }
        }
      }
    }

    for (let aiTag of aiTags) {
      const name = aiTag.name.trim().toLowerCase();
      const words = name.split(" ");

      for (let i = 2; i <= name.length; i++) {
        addToMap({ key: name.slice(0, i), aiTag });
      }

      if (words.length > 1) {
        for (let i = 1; i < words.length; i++) {
          const word = words[i];

          for (let j = 2; j <= word.length; j++) {
            addToMap({ key: word.slice(0, j), aiTag });
          }
        }
      }
    }

    for (let content of contents) {
      const name = content.name.trim().toLowerCase();
      const words = name.split(" ");

      for (let i = 2; i <= name.length; i++) {
        addToMap({ key: name.slice(0, i), content });
      }

      if (words.length > 1) {
        for (let i = 1; i < words.length; i++) {
          const word = words[i];

          for (let j = 2; j <= word.length; j++) {
            addToMap({ key: word.slice(0, j), content });
          }
        }
      }
    }

    return map;
  };

  // memoizes
  const searchMap: Map<string, SearchMapData> = useMemo(
    () => getSearchMap(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contents]
  );

  // event handlers
  const handleSetTrendingKeywords = (
    trendingKeywords: TrendingSearchKeywordDocument[]
  ) => {
    setTrendingKeywords(trendingKeywords);
  };

  const handleLoadData = () => {
    if (status === "initial") {
      setStatus("pending");

      fetchSearchData()
        .then(({ data }) => {
          if (data) {
            const { aiTags, categories, contents } = data;

            setAITags(aiTags as AITagDocument[]);
            setContentCategories(categories as ContentCategoryDocument[]);
            setContents(contents as ContentDocument[]);

            setStatus("idle");
          }
        })
        .catch((error) => {
          setStatus("initial");

          console.error({ error });
        });
    }
  };

  const handleChangeKeyword = (newKeyword: string) => {
    setShowResults(true);
    setKeyword(newKeyword);
  };

  const handleSearch = (newKeyword: string): void => {
    const filtered = searchMap.get(newKeyword.trim().toLowerCase());

    setContentCategoryResults(filtered ? filtered.contentCategories : []);
    setAITagResults(filtered ? filtered.aiTags : []);
    setContentResults(filtered ? filtered.contents : []);
  };

  const handleShowSearchPage = (newKeyword?: string) => {
    const currentKeyword = newKeyword || keyword;
    setSearchPageKeyword(currentKeyword);

    if (currentKeyword) {
      if (newKeyword) {
        setKeyword(newKeyword);
      }

      if (history.includes(currentKeyword)) {
        const prevIndex = history.findIndex(
          (historyKeyword) => historyKeyword === currentKeyword
        );

        setHistory([
          currentKeyword,
          ...history.slice(0, prevIndex),
          ...history.slice(prevIndex + 1)
        ]);
      } else if (history.length === 10) {
        setHistory([currentKeyword, ...history.slice(0, 9)]);
      } else {
        setHistory([currentKeyword, ...history]);
      }

      setSearchPageContents(
        searchMap.get(currentKeyword.trim().toLowerCase())?.contents || []
      );
      setShowResults(false);
      push("/search");
    }
  };

  // side effects
  useEffect(() => {
    setHistory(getLocalStorageSearchHistory() || []);
    handleLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "idle") {
      handleSearch(keyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, keyword]);

  useEffect(() => {
    if (status === "idle") {
      setLocalStorageSearchHistory(history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <Search.Provider
      value={{
        status,
        keyword,
        history,
        trendingKeywords,
        showResults,
        contentCategoryResults,
        aiTagResults,
        contentResults,
        searchPageKeyword,
        searchPageContents,
        onSetTrendingKeywords: handleSetTrendingKeywords,
        onLoadData: handleLoadData,
        onChangeKeyword: handleChangeKeyword,
        onChangeShowResults: setShowResults,
        onShowSearchPage: handleShowSearchPage
      }}
    >
      {children}
    </Search.Provider>
  );
}

export const useSearch = (): Search => {
  const search = useContext(Search);

  if (!search) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return search;
};
