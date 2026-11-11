import type { Employee } from "../../types";
import { AuthorizationManagementEmployee } from "./AuthorizationManagementEmployee";
import { DetailsOneEmployee } from "./DetailsOneEmployee";
import { EditEmployee } from "./EditEmployee";

type ActionsEmployeeProps = {
  row: Employee,
};

export function ActionsEmployee({ row }: ActionsEmployeeProps) {
  return (
    <div className="flex gap-2 justify-center">
      <AuthorizationManagementEmployee row={row} />
      <DetailsOneEmployee row={row} />
      <EditEmployee row={row} />
    </div>
  );
}
