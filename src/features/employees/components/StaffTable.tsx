import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  genderValue,
  headers,
  statusBadgeStyles,
  statusValue,
} from "../data/tableData";
import { StaffSkeleton } from "./StaffSkeleton";
import { StaffDetailsDialog } from "./StaffDetailsDialog";
import { UpdateStaffDialog } from "./UpdateStaffDialog";
import { DeleteStaffDialog } from "./DeleteStaffDialog";
import type { Gender, StaffItem, StaffStatus } from "../types/staff.types";

interface StaffTableProps {
  data: StaffItem[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function StaffTable({
  data,
  isLoading = false,
  emptyMessage = "لا يوجد موظفون متاحون حالياً",
}: StaffTableProps) {
  const [selectedStaffForView, setSelectedStaffForView] = useState<StaffItem | null>(null);
  const [selectedStaffForEdit, setSelectedStaffForEdit] = useState<StaffItem | null>(null);
  const [selectedStaffForDelete, setSelectedStaffForDelete] = useState<StaffItem | null>(null);

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenView = (staff: StaffItem) => {
    setSelectedStaffForView(staff);
    setViewDialogOpen(true);
  };

  const handleOpenEdit = (staff: StaffItem) => {
    setSelectedStaffForEdit(staff);
    setEditDialogOpen(true);
  };

  const handleOpenDelete = (staff: StaffItem) => {
    setSelectedStaffForDelete(staff);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="w-full rounded-2xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-popover-dark/30 overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-primary/50">
            <TableRow>
              {headers.map(({ label }, index) => (
                <TableHead
                  key={index}
                  className="p-3 py-4 text-center font-semibold text-sidebar dark:text-white/90 text-sm"
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <StaffSkeleton rows={6} />
          ) : data.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="p-8 text-center text-sidebar/70 dark:text-white/60 font-medium"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {data.map((staff) => {
                const initial =
                  staff.firstName && staff.firstName.length > 0
                    ? staff.firstName[0].toUpperCase()
                    : "M";

                return (
                  <TableRow
                    key={staff.id}
                    className="border-t border-sidebar/20 dark:border-white/10 transition-colors hover:bg-muted/30 dark:hover:bg-card-dark/40"
                  >
                    {/* Name & Avatar */}
                    <TableCell className="p-3 py-4 text-center">
                      <div className="flex items-center justify-center gap-2.5">
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {initial}
                        </div>
                        <span className="font-semibold text-sidebar dark:text-white text-sm">
                          {staff.firstName} {staff.lastName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Job Title */}
                    <TableCell className="p-3 py-4 text-center">
                      <span className="text-sidebar/80 dark:text-white/80 text-xs font-medium">
                        {staff.jobTitle || "—"}
                      </span>
                    </TableCell>

                    {/* Contact (Email / Phone) */}
                    <TableCell className="p-3 py-4 text-center">
                      <div className="flex flex-col items-center gap-0.5" dir="ltr">
                        <span className="text-sidebar/90 dark:text-white/90 text-xs truncate max-w-[180px]">
                          {staff.email || "—"}
                        </span>
                        {staff.phone && (
                          <span className="text-sidebar/60 dark:text-white/60 text-[11px]">
                            {staff.phone}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Gender */}
                    <TableCell className="p-3 py-4 text-center">
                      <span className="text-sidebar/80 dark:text-white/80 text-xs font-medium">
                        {(staff.gender && staff.gender in genderValue
                          ? genderValue[staff.gender as Gender]
                          : staff.gender) || "—"}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="p-3 py-4 text-center">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold border inline-block",
                          staff.status && staff.status in statusBadgeStyles
                            ? statusBadgeStyles[staff.status as StaffStatus]
                            : "bg-muted text-sidebar"
                        )}
                      >
                        {(staff.status && staff.status in statusValue
                          ? statusValue[staff.status as StaffStatus]
                          : staff.status) || "—"}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="p-3 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* View Details */}
                        <button
                          type="button"
                          onClick={() => handleOpenView(staff)}
                          className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer bg-primary/10 text-primary hover:bg-primary hover:text-white"
                          title="عرض تفاصيل الموظف"
                        >
                          <Eye className="size-4" />
                        </button>

                        {/* Edit Staff */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(staff)}
                          className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white"
                          title="تعديل بيانات الموظف"
                        >
                          <Pencil className="size-4" />
                        </button>

                        {/* Delete Staff */}
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(staff)}
                          className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                          title="حذف الموظف"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Action Dialogs */}
      <StaffDetailsDialog
        staff={selectedStaffForView}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <UpdateStaffDialog
        staff={selectedStaffForEdit}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      <DeleteStaffDialog
        staff={selectedStaffForDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
