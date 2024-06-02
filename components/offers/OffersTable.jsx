"use client";
import React, {useEffect, useState} from "react";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableResponsiveWrap,
} from "@/components/table";
import { useRouter } from "next/navigation";
import OffersTableRow from "./OffersTableRow";
import { useDeleteOffer, useGetOffers } from "@/app/actions/GetOffers";
import Link from "next/link";
import Image from "next/image";
import useDebounce from "@/app/hooks/useDebounce";
import clsx from "clsx";

const TABLE_HEAD = [
  { id: "id", label: "ID", align: "left" },
  { id: "customerName", label: "Customer name", align: "left" },
  { id: "date", label: "Create Date", align: "left" },
  { id: "address", label: "Address", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "price", label: "Price", align: "left" },
  { id: "", label: "Options", align: "right" },
];

export default function OffersTable({ limit }) {
  const { push } = useRouter();
  const [offersList, setOffersList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterName, setFilterName] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: offers, isLoading } = useGetOffers();
  const { mutate: deleteOffer } = useDeleteOffer();

  useEffect(() => {
    if (searchValue.length > 3) {
      setFilterName(debouncedSearchValue);
    } else {
      setFilterName("");
    }
  }, [debouncedSearchValue, filterName]);

  useEffect(() => {
    if(!isLoading){
      setOffersList(offers)
    }
  }, [offers]);


  const handleSearchFilterChange = (event) => {
    setSearchValue(event.target.value);
    handleFilterList(event.target.value)
  };

  const handleFilterList = (value) => {
    if(offers){
      const exactMatch = offers.find(offer => offer?.customer_name.toLowerCase() === value.toLowerCase()),
          partialMatches = offers.filter(offer => offer?.customer_name.toLowerCase().includes(value.toLowerCase())),
          vagueMatches = offers.filter(offer =>
              value
                  .toLowerCase()
                  .split(' ')
                  .every(w => offer?.customer_name.toLowerCase().includes(w))
          )
      const tmpList = [...new Set([exactMatch, ...partialMatches, ...vagueMatches])]
      const newList = tmpList.filter(offer => {
        if(offer !== undefined) {
          return offer
        }
      });
      setOffersList(newList);
    }
  }

  const handleDeleteRow = (id) => {
    deleteOffer(id);
  };

  const handleEditRow = (id) => {
    push(`/dashboard/offers/${id}`);
  };

  const handleViewRow = (id) => {
    push(`/dashboard/offers/${id}/view`);
  };

  return (
    <div className="card">
      <div className="p-4 flex items-center gap-5">
        <h2 className="text-[18px] font-bold">Offers list</h2>
        <div className="relative">
          <input
              type="text"
              name="search"
              value={searchValue}
              placeholder="Search..."
              onChange={handleSearchFilterChange}
              onKeyUp={handleSearchFilterChange}
              className={clsx(
                  `
              block 
              w-full 
              rounded-[5px] 
              py-[5px]
              px-[12px]
              sm:py-[7px]
              sm:px-[15px]
              text-black
              border-1
              border
              bg-primary-lightred 
              border-primary-gray 
              placeholder:text-gray-400 
              focus:bg-white
              focus:outline-none
              focus:ring-transparent
              text-sm
              sm:text-md 
            `,
              )}
          />
        </div>
      </div>
      <TableResponsiveWrap>
        <table className="min-w-[800px]">
          <TableHeadCustom headLabel={TABLE_HEAD} rowCount={offersList?.length} />
          <tbody>
            {!isLoading && !limit
              ? offersList?.map((row) => (
                  <OffersTableRow
                    key={row.id}
                    row={row}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                  />
                ))
              : offersList
                  ?.slice(0, limit)
                  ?.map((row) => (
                    <OffersTableRow
                      key={row.id}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                    />
                  ))}
            <TableEmptyRows
              emptyRows={
                !isLoading && offersList?.lenght > 0 ? 5 - offersList?.length : 0
              }
              height={!isLoading && offersList?.length < 5 ? 60 : 0}
            />
            <TableNoData
              isNotFound={offersList?.length < 1 || offersList === undefined}
              title={isLoading ? "Table is loading..." : "No data in table"}
            />
          </tbody>
        </table>
      </TableResponsiveWrap>
      {limit && (
        <div className="p-4 flex justify-end">
          <div className="flex gap-2">
            <Link href={"/dashboard/offers"} className="text-sm">
              View all
            </Link>
            <Image
              src={"/assets/icons/ico_arrow.svg"}
              alt="arrow"
              width={12}
              height={12}
            />
          </div>
        </div>
      )}
    </div>
  );
}
