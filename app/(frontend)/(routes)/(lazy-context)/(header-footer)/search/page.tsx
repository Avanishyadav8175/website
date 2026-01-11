import { Suspense } from "react";
import SearchPage from "./search-page";

export const dynamic = "force-dynamic";


export default function Page() {
  // return <></>;
  return (
    <Suspense fallback={<div>Search loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
