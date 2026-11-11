import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import type { FaqItem } from "../../types";
import { BtnDeleteFrequentlyAskedQuestions } from "../atoms/BtnDeleteFrequentlyAskedQuestions";
import { BtnEditFrequentlyAskedQuestions } from "../atoms/BtnEditFrequentlyAskedQuestions";

type OneItemFrequentlyAskedQuestionsProps = {
  data: FaqItem;
};

export function OneItemFrequentlyAskedQuestions({ data }: OneItemFrequentlyAskedQuestionsProps) {
  const { answer, question, isActive, status, createdAt, id } = data;
  const date = createdAt ? formatDateToDDMMYYYY(createdAt) : "";
  const isItemActive = typeof isActive === "boolean" ? isActive : status === "active";

  const statusInfo = isItemActive
    ? { label: "نشط", className: "text-green-500 bg-green-500/20" }
    : { label: "مخفي", className: "text-orange-500 bg-orange-500/20" };

  return (
    <div className="flex flex-col justify-between gap-3 border border-solid border-sidebar/50 dark:border-white/10 rounded-xl p-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="text-sidebar dark:text-white/90 font-medium">
              {question?.length > 20 ? `${question.slice(0, 20)}...` : question}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BtnEditFrequentlyAskedQuestions data={data} />
            <BtnDeleteFrequentlyAskedQuestions id={id} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-secondary-light">
            {answer?.length > 90 ? `${answer.slice(0, 90)}...` : answer}
          </p>
        </div>
      </div>
      <div className="border-t border-solid border-sidebar/50 dark:border-white/20 pt-3 flex justify-between items-center">
        <p className="text-xs text-secondary-light">{date}</p>
        <span className={`text-xs px-3 py-1 rounded-xl ${statusInfo.className}`}>
          {statusInfo.label}
        </span>
      </div>
    </div>
  );
}
