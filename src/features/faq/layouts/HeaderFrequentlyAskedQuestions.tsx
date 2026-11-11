import { CreateFrequentlyAskedQuestions } from "../components/organisms/CreateFrequentlyAskedQuestions";
import { SearchFrequentlyAskedQuestions } from "../components/organisms/SearchFrequentlyAskedQuestions";
import { TotalFrequentlyAskedQuestions } from "../components/organisms/TotalFrequentlyAskedQuestions";

export function HeaderFrequentlyAskedQuestions() {
  return (
    <div className="w-full grid md:grid-cols-11 grid-cols-1 gap-8">
      <SearchFrequentlyAskedQuestions />
      <div className="md:col-span-5 col-span-1 w-full flex md:flex-row flex-col gap-8">
        <TotalFrequentlyAskedQuestions />
        <CreateFrequentlyAskedQuestions />
      </div>
    </div>
  );
}
