import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import type { TermItem } from "../../types";
import { BtnDeleteTermsConditions } from "../atoms/BtnDeleteTermsConditions";
import { BtnEditTermsConditions } from "../atoms/BtnEditTermsConditions";

type OneItemTermsConditionsProps = {
  data: TermItem;
};

export function OneItemTermsConditions({ data }: OneItemTermsConditionsProps) {
  const { title, content, question, answer, isActive, createdAt, id } = data;
  const itemTitle = title || question || "";
  const itemContent = content || answer || "";
  const date = createdAt ? formatDateToDDMMYYYY(createdAt) : "";
  const currentStatus = isActive
    ? {
        label: "نشط",
        className: "text-green-500 bg-green-500/20",
      }
    : {
        label: "مخفي",
        className: "text-orange-500 bg-orange-500/20",
      };

  return (
    <div className="w-full flex flex-col justify-between gap-3 border border-solid border-sidebar/40 dark:border-white/20 rounded-xl p-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="text-sidebar/90 dark:text-white/90 font-medium">
              {itemTitle || (itemContent.length > 10 ? `${itemContent.slice(0, 10)}...` : itemContent)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BtnEditTermsConditions data={data} />
            <BtnDeleteTermsConditions id={id} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-secondary-light">
            {itemContent.length > 90 ? `${itemContent.slice(0, 90)}...` : itemContent}
          </p>
        </div>
      </div>
      <div className="border-t border-solid border-sidebar/40 dark:border-white/20 pt-3 flex justify-between items-center">
        <p className="text-xs text-secondary-light">
          {date}
        </p>
        <span
          className={`text-xs px-3 py-1 rounded-xl ${currentStatus.className}`}
        >
          {currentStatus.label}
        </span>
      </div>
    </div>
  );
}
