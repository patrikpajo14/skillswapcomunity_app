import { useState } from "react";
import Button from "@/components/Button";
import ConfirmDialog from "../ConfirmDialog";
import IconButton from "../IconButton";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import clsx from "clsx";
import { useUpdateUserStatus } from "@/app/actions/GetUsers";
import SelectActivated from "./SelectActivated";

export default function UsersTableRow({ row, onDeleteRow, onEditRow }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { mutate: updateStatus } = useUpdateUserStatus();

  const formatedDate = format(parseISO(row?.createdAt), "dd.MM.yyyy");

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleChangeStatus = (activated) => {
    updateStatus({ id: row.id, activated: activated });
    setToggleDropdown(false);
  };

  return (
    <>
      <tr>
        <td align="left">{row.id}</td>

        <td align="left" style={{ minWidth: "160px" }}>
          {row.name}
        </td>

        <td align="left" style={{ minWidth: "120px" }}>
          {row?.role === 0 ? "User" : "Admin"}
        </td>

        <td align="left" style={{ minWidth: "140px" }}>
          {row?.email}
        </td>

        <td align="left" style={{ minWidth: "120px" }}>
          {formatedDate}
        </td>

        <td align="left" style={{ minWidth: "100px", position: "relative" }}>
          <label
            onClick={() => {
              setToggleDropdown(!toggleDropdown);
            }}
            className={clsx(
              `px-3 py-1 rounded-lg text-[12px] font-bold capitalize cursor-pointer`,
              row?.activated === 1 && "bg-green-200 text-green-600",
              row?.activated === 0 && "bg-red-200 text-red-600"
            )}
          >
            {row?.activated === 1 ? "Activated" : "Disabled"}
          </label>

          {toggleDropdown && <SelectActivated onClick={handleChangeStatus} />}
        </td>

        <td align="right" style={{ minWidth: "140px" }}>
          <IconButton
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            <Image
              src="/assets/icons/ico_delete.svg"
              alt="delete"
              width={20}
              height={20}
            />
          </IconButton>

          <ConfirmDialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            title="Izbriši"
            content="Jeste li sigurni da želite obrisati?"
            action={
              <Button variant="contained" color="error" onClick={onDeleteRow}>
                Izbriši
              </Button>
            }
          />
        </td>
      </tr>
    </>
  );
}
