"use client";
import Button from "@/components/Button";
import CustomDrawer from "@/components/CustomDrawer";
import PageSubheader from "@/components/PageSubheader";
import ArticleForm from "@/components/article/ArticleForm";
import React, { useState } from "react";

const ArticleListHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  return (
    <>
      <PageSubheader
        title={"Article List"}
        body={<Button onClick={handleOpenDrawer}>New article</Button>}
      />
      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title={"Create article"}
      >
        <ArticleForm closeEvent={handleCloseDrawer} />
      </CustomDrawer>
    </>
  );
};

export default ArticleListHeader;
