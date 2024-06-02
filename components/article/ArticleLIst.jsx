"use client";

import React, { useState } from "react";
import Article from "@/components/article/Article";
import CustomDrawer from "@/components/CustomDrawer";
import ArticleForm from "@/components/article/ArticleForm";
import { useDeleteArticle } from "@/app/actions/GetArticles";

function ArticleLIst({ articleList, readOnly }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { mutate: deleteArticle } = useDeleteArticle();

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
  };

  const handleDeleteArticle = (id) => {
    deleteArticle(id);
  };

  return (
    <section>
      {articleList === undefined || articleList.lenght < 1 ? (
        <div className="text-center text-[24px] font-bold py-10">
          List is Empty
        </div>
      ) : (
        <>
          {articleList?.map((article) => (
            <Article
              key={article.id}
              article={article}
              readOnly={readOnly}
              setEdit={() => {
                setIsEdit(true);
              }}
              onSelect={handleSelectArticle}
              onDelete={() => handleDeleteArticle(article.id)}
              openDrawer={handleOpenDrawer}
            />
          ))}
        </>
      )}

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title={"Create article"}
      >
        <ArticleForm isEdit={isEdit} article={selectedArticle} />
      </CustomDrawer>
    </section>
  );
}

export default ArticleLIst;
