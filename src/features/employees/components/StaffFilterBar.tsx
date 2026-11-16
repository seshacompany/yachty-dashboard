import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Briefcase, FilterX, Mail, Plus, Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import type { StaffStatus } from "../types/staff.types";

export type FilterStatus = StaffStatus | "ALL";

interface StaffFilterBarProps {
  onAddNew: () => void;
  totalItems?: number;
}

export function StaffFilterBar({ onAddNew, totalItems }: StaffFilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentName = searchParams.get("staff_name") || "";
  const currentEmail = searchParams.get("email") || "";
  const currentJobTitle = searchParams.get("jobTitle") || "";
  const currentStatus = (searchParams.get("status") as FilterStatus) || "ALL";

  const [nameTerm, setNameTerm] = useState(currentName);
  const [emailTerm, setEmailTerm] = useState(currentEmail);
  const [jobTitleTerm, setJobTitleTerm] = useState(currentJobTitle);

  useEffect(() => {
    if (nameTerm.trim() === currentName.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = nameTerm.trim();
        if (trimmed) {
          next.set("staff_name", trimmed);
        } else {
          next.delete("staff_name");
        }
        next.set("page", "1");
        return next;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [nameTerm, currentName, setSearchParams]);

  useEffect(() => {
    if (emailTerm.trim() === currentEmail.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = emailTerm.trim();
        if (trimmed) {
          next.set("email", trimmed);
        } else {
          next.delete("email");
        }
        next.set("page", "1");
        return next;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [emailTerm, currentEmail, setSearchParams]);

  useEffect(() => {
    if (jobTitleTerm.trim() === currentJobTitle.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = jobTitleTerm.trim();
        if (trimmed) {
          next.set("jobTitle", trimmed);
        } else {
          next.delete("jobTitle");
        }
        next.set("page", "1");
        return next;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [jobTitleTerm, currentJobTitle, setSearchParams]);

  useEffect(() => {
    setNameTerm(currentName);
  }, [currentName]);

  useEffect(() => {
    setEmailTerm(currentEmail);
  }, [currentEmail]);

  useEffect(() => {
    setJobTitleTerm(currentJobTitle);
  }, [currentJobTitle]);

  const handleStatusChange = (val: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val && val !== "ALL") {
        next.set("status", val);
      } else {
        next.delete("status");
      }
      next.set("page", "1");
      return next;
    });
  };

  const handleResetFilters = () => {
    setNameTerm("");
    setEmailTerm("");
    setJobTitleTerm("");
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("staff_name");
      next.delete("email");
      next.delete("jobTitle");
      next.delete("status");
      next.set("page", "1");
      return next;
    });
  };

  const hasActiveFilters = Boolean(
    currentName ||
      currentEmail ||
      currentJobTitle ||
      (currentStatus && currentStatus !== "ALL"),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
          {/* Search by Name */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-sidebar/50 dark:text-white/50">
              <Search className="size-4" />
            </div>
            <Input
              type="text"
              value={nameTerm}
              onChange={(e) => setNameTerm(e.target.value)}
              placeholder="البحث بالاسم..."
              className="w-full rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark py-2.5 pl-4 pr-10 text-sm text-sidebar dark:text-white"
            />
          </div>

          {/* Search by Email */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-sidebar/50 dark:text-white/50">
              <Mail className="size-4" />
            </div>
            <Input
              type="text"
              value={emailTerm}
              onChange={(e) => setEmailTerm(e.target.value)}
              placeholder="البحث بالبريد الإلكتروني..."
              className="w-full rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark py-2.5 pl-4 pr-10 text-sm text-sidebar dark:text-white"
            />
          </div>

          {/* Search by Job Title */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-sidebar/50 dark:text-white/50">
              <Briefcase className="size-4" />
            </div>
            <Input
              type="text"
              value={jobTitleTerm}
              onChange={(e) => setJobTitleTerm(e.target.value)}
              placeholder="البحث بالمسمى الوظيفي..."
              className="w-full rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark py-2.5 pl-4 pr-10 text-sm text-sidebar dark:text-white"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <Select value={currentStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark text-sm">
                <SelectValue placeholder="حالة الحساب" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="ALL">جميع الحالات</SelectItem>
                <SelectItem value="approved">نشط (approved)</SelectItem>
                <SelectItem value="suspended">موقوف (suspended)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons: Reset, Total, Add New */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3 py-2 text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
              title="إعادة ضبط الفلاتر"
            >
              <FilterX className="size-3.5" />
              <span>إعادة ضبط</span>
            </Button>
          )}

          {totalItems !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3 py-2 text-xs text-sidebar/70 dark:text-white/70">
              <span>الإجمالي:</span>
              <span className="font-bold text-sidebar dark:text-white">
                {totalItems}
              </span>
            </div>
          )}

          <Button
            type="button"
            onClick={onAddNew}
            className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 cursor-pointer shadow-xs"
          >
            <Plus className="size-4" />
            <span>إضافة موظف</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
