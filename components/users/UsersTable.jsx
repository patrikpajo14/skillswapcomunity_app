"use client";
import React from "react";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableResponsiveWrap,
} from "@/components/table";
import { useRouter } from "next/navigation";
import UsersTableRow from "./UsersTableRow";
import {useDeleteUser, useGetUsers} from "@/app/actions/GetUsers";

const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "customerName", label: "User name", align: "left" },
  { id: "role", label: "Role", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "date", label: "Created Date", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "", label: "Options", align: "right" },
];

export default function UsersTable() {
  const { push } = useRouter();

  const { data: users, isLoading } = useGetUsers();

  const { mutate: deleteUser } = useDeleteUser();

  const handleDeleteRow = (id) => {
    deleteUser(id);
  };

  return (
    <div className="card">
      <div className="p-4">
        <h2 className="text-[18px] font-bold">Users</h2>
      </div>
      <TableResponsiveWrap>
        <table className="min-w-[800px]">
          <TableHeadCustom headLabel={TABLE_HEAD} rowCount={users?.length} />

          <tbody>
            {!isLoading &&
              users?.map((row) => (
                <UsersTableRow
                  key={row.id}
                  row={row}
                  onDeleteRow={() => handleDeleteRow(row.id)}
                  // onEditRow={() => handleEditRow(row.id)}
                />
              ))}
            <TableEmptyRows
              emptyRows={
                !isLoading && users?.lenght > 0 ? 5 - users?.length : 0
              }
              height={!isLoading && users?.length < 5 ? 60 : 0}
            />
            <TableNoData
              isNotFound={users?.length < 1 || users === undefined}
              title={isLoading ? "Table is loading..." : "No data in table"}
            />
          </tbody>
        </table>
      </TableResponsiveWrap>
    </div>
  );
}
