import { CreateReview } from "../components/organisms/CreateReview";
import { SearchReviews } from "../components/organisms/SearchReviews";
import { TotalReviews } from "../components/organisms/TotalReviews";

export function HeaderReviews() {
  return (
    <div className="w-full grid md:grid-cols-11 grid-cols-1 gap-8">
      <SearchReviews />
      <div className="md:col-span-5 col-span-1 w-full flex md:flex-row flex-col gap-8">
        <TotalReviews />
        <CreateReview />
      </div>
    </div>
  );
}
