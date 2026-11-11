import { useState } from "react";
import { StaffFilterBar } from "../components/StaffFilterBar";
import { CreateStaffDialog } from "../components/CreateStaffDialog";

interface HeaderEmployeesProps {
  totalItems?: number;
}

export function HeaderEmployees({ totalItems }: HeaderEmployeesProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4">
      <StaffFilterBar
        onAddNew={() => setCreateDialogOpen(true)}
        totalItems={totalItems}
      />

      <CreateStaffDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
