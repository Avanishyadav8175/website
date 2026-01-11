// loaders
import SearchDataLoader from "@/hooks/useSearch/loader/SearchDataLoader";
import SettingDataLoader from "@/hooks/useSetting/loader/SettingDataLoader";

export default async function ContextDataLoaders() {
  return (
    <>
      <SettingDataLoader />
      <SearchDataLoader />
    </>
  );
}
