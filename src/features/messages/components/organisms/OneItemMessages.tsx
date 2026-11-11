import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import type { TicketItem } from "../../types";
import { BtnDeleteMessages } from "../atoms/BtnDeleteMessages";
import { BtnDetailsMessages } from "../atoms/BtnDetailsMessages";

type OneItemMessagesProps = {
  data: TicketItem;
};

export function OneItemMessages({ data }: OneItemMessagesProps) {
  const {
    userName,
    name,
    message,
    content,
    userEmail,
    email,
    subject,
    status,
    createdAt,
    id,
  } = data;
  const displayName = userName || name || "";
  const displayEmail = userEmail || email || "";
  const displayContent = message || content || "";
  const date = createdAt ? formatDateToDDMMYYYY(createdAt) : "";

  const statusInfo =
    status === "CLOSED" || status === "RESOLVED"
      ? { label: "مغلقة", className: "text-green-500 bg-green-500/20" }
      : { label: "مفتوحة", className: "text-yellow-500 bg-yellow-500/20" };

  return (
    <div className="flex flex-col justify-between gap-3 border border-solid border-sidebar/30 dark:border-white/20 rounded-xl p-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-3 items-center w-full min-w-0">
            <div className="bg-primary/20 rounded-full w-12 h-12 flex justify-center items-center shrink-0">
              <p>{displayName[0] || "?"}</p>
            </div>
            <div className="min-w-0">
              <p className="break-all text-sidebar dark:text-white font-medium">
                {displayName}
              </p>
              <p className="text-sm text-secondary-light break-all truncate">
                {displayEmail}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BtnDetailsMessages data={data} />
            <BtnDeleteMessages id={id} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-sidebar/80 dark:text-white/80 font-medium">
            {subject}
          </p>
          <p className="text-sm text-secondary-light line-clamp-2">
            {displayContent}
          </p>
        </div>
      </div>
      <div className="border-t border-solid border-sidebar/30 dark:border-white/20 pt-3 flex justify-between items-center">
        <p className="text-xs text-secondary-light">{date}</p>
        <span className={`text-xs px-3 py-1 rounded-xl ${statusInfo.className}`}>
          {statusInfo.label}
        </span>
      </div>
    </div>
  );
}
