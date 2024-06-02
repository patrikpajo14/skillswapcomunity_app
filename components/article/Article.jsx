"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import ConfirmDialog from "@/components/ConfirmDialog";

const Article = ({
  openDrawer,
  article,
  readOnly,
  setEdit,
  onSelect,
  onDelete,
  offerItem = false,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleEdit = () => {
    openDrawer();
    onSelect(article);
    setEdit(true);
  };

  const handleDelete = () => {
    setOpenConfirm(false);
    onDelete();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <div className="flex flex-col w-[100%] shadow-main rounded-[10px] mb-[15px] md:flex-row">
        <div className="w-[100%] md:w-[175px] border-b-gray-200 md:border-r-gray-200 border-b-[1px] md:border-b-[0] md:border-r-[1px] p-[15px] md:p-[20px]">
          <Image
            src={"/assets/images/window.png"}
            width="75"
            height="117"
            alt="img"
            className="m-auto"
          />
        </div>
        <div className="p-[15px] md:p-[20px] flex-1 flex gap-3 justify-between flex-wrap lg:flex-nowrap">
          <div className="w-[100%] flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-[16px]">
            <p>artcile: {article?.name}</p>
            <p>amount: {article?.amount}</p>
            <p>dimensions: {`${article?.width}x${article?.height}`}</p>
            <p>opening: {article?.opening}</p>
          </div>
          <div className="w-[100%] flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-[16px]">
            <p>panel: {article?.panel?.name}</p>
            <p>color: {article?.color?.name}</p>
            <p>sub stock: {article?.substock}</p>
          </div>
          <div className="w-[100%] md:w-[30%] flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-[16px]">
            <p>
              blinds: {article?.blinds?.name}{" "}
              {article?.blindsWidth
                ? `${article?.blindsWidth}x${article?.blindsHeight}`
                : ""}
            </p>
            <p>
              price: {article?.price} <span className="text-xs">EUR</span>
            </p>
          </div>
          <div className="flex gap-3 justify-between  sm:justify-end lg:justify-center w-[100%] md:w-[50%] lg:w-auto sm:flex-col text-sm md:text-[16px]">
            {!readOnly && !offerItem && (
              <>
                <Button
                  onClick={() => {
                    setOpenConfirm(true);
                  }}
                >
                  Delete
                </Button>
                <Button secondary={true} onClick={handleEdit}>
                  Edit button
                </Button>
              </>
            )}
            {offerItem && (
              <Button
                onClick={() => {
                  setOpenConfirm(true);
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={offerItem ? "Remove article" : "Delete article"}
        content={
          offerItem
            ? "Do you realy wan't to remove this article from offer?"
            : "Are you sure that you wan't to delete this article?"
        }
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {offerItem ? "Remove" : "Delete"}
          </Button>
        }
      />
    </>
  );
};

export default Article;
