import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import type { reviewItemType } from "../../types";
import { BtnDeleteReview } from "../atoms/BtnDeleteReview";
import { BtnEditReview } from "../atoms/BtnEditReview";
import RatingDisplay from "../molecules/RatingDisplay";

type OneItemReviewProps = {
  data: reviewItemType;
};

export function OneItemReview({ data }: OneItemReviewProps) {
  const {
    name = "",
    position = "",
    description = "",
    stars = 5,
    status = "active",
    createdAt = "",
    id = "",
    image = "",
  } = data || {};
  const date = createdAt ? formatDateToDDMMYYYY(createdAt) : "";
  const statusMap = {
    pending: {
      label: "تحت المراجعة",
      className: "text-yellow-500 bg-yellow-500/20",
    },
    active: {
      label: "نشط",
      className: "text-green-500 bg-green-500/20",
    },
    inactive: {
      label: "غير نشط",
      className: "text-orange-500 bg-orange-500/20",
    },
    suspended: {
      label: "معلق",
      className: "text-blue-500 bg-blue-500/20",
    },
    deleted: {
      label: "محذوف",
      className: "text-red-500 bg-red-500/20",
    },
    PENDING: {
      label: "معلق",
      className: "text-yellow-500 bg-yellow-500/20",
    },
    PUBLISHED: {
      label: "منشور",
      className: "text-green-500 bg-green-500/20",
    },
    REJECTED: {
      label: "مرفوض",
      className: "text-red-500 bg-red-500/20",
    },
  };

  const currentStatus =
    (status && statusMap[status as keyof typeof statusMap]) || statusMap.active;

  return (
    <div className="flex flex-col justify-between gap-3 border border-solid border-sidebar/40 dark:border-white/20 rounded-xl p-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/20 rounded-full w-12 h-12 flex justify-center items-center">
              <img
                src={image}
                alt={name}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sidebar/90 dark:text-white/90">{name}</p>
              <p className="text-sm text-secondary-light">{position}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BtnEditReview data={data} />
            <BtnDeleteReview id={id} />
          </div>
        </div>
        <RatingDisplay value={Number(stars) || 5} />
        <p className="text-sm text-secondary-light">
          {description && description.length > 60
            ? description.slice(0, 60) + "..."
            : description}
        </p>
      </div>
      <div className="border-t border-solid border-sidebar/40 dark:border-white/20 pt-3 flex justify-between items-center">
        <p className="text-xs text-secondary-light">{date}</p>
        <span
          className={`text-xs px-3 py-1 rounded-xl ${currentStatus.className}`}
        >
          {currentStatus.label}
        </span>
      </div>
    </div>
  );
}
