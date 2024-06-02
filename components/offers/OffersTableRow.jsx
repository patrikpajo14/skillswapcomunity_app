import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ConfirmDialog from "../ConfirmDialog";
import IconButton from "../IconButton";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { SelectStatus } from ".";
import { useUpdateOfferStatus } from "@/app/actions/GetOffers";
import clsx from "clsx";

export default function OffersTableRow({
  row,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { mutate: updateStatus } = useUpdateOfferStatus();

  const formatedDate = format(parseISO(row.create_date), "dd.MM.yyyy");

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleChangeStatus = (status) => {
    updateStatus({ id: row.id, status: status });
    setToggleDropdown(false);
  };

  return (
    <>
      <tr>
        <td align="left">{row.id}</td>

        <td align="left" style={{ minWidth: "160px" }}>
          {row.customer_name}
        </td>

        <td align="left" style={{ minWidth: "120px" }}>
          {formatedDate}
        </td>

        <td align="left" style={{ minWidth: "140px" }}>
          {row.customer_address}, {row?.place?.place_name}
        </td>

        <td align="left" style={{ minWidth: "100px", position: "relative" }}>
          <label
            onClick={() => {
              setToggleDropdown(!toggleDropdown);
            }}
            className={clsx(
              `px-3 py-1 rounded-lg text-[12px] font-bold capitalize cursor-pointer`,
              row.status === "pending" && "bg-gray-200 text-gray-600",
              row.status === "done" && "bg-green-200 text-green-600",
              row.status === "rejected" && "bg-red-200 text-red-600"
            )}
          >
            {row.status}
          </label>

          {toggleDropdown && <SelectStatus onClick={handleChangeStatus} />}
        </td>

        <td align="left" style={{ minWidth: "100px" }}>
          {row.total} €
        </td>

        <td align="right" style={{ minWidth: "140px" }}>
          {row.status !== "done" && (
            <IconButton onClick={onEditRow}>
              <Image
                src="/assets/icons/ico_edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </IconButton>
          )}
          <IconButton onClick={onViewRow}>
            <Image
              src="/assets/icons/ico_eye.svg"
              alt="view"
              width={20}
              height={20}
            />
          </IconButton>
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
