"use client";
import React from "react";
import ArticleLIst from "@/components/article/ArticleLIst";
import ArticleListHeader from "./components/ArticleListHeader";
import { useGetArticles } from "@/app/actions/GetArticles";
import Loader from "@/components/Loader/Loader";
import { useGetArticleFormParams } from "@/app/actions/GetArticleFormParams";

const ArticleListPage = () => {
  const { data, isLoading, isError } = useGetArticles();

  const { data: formData } = useGetArticleFormParams();
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <section>
      <ArticleListHeader />
      {isLoading ? (
        <div>
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <>
          {data.length < 1 ? (
            <div className="text-center text-[24px] font-bold py-10 md:py-20">
              List is Empty
            </div>
          ) : (
            <ArticleLIst articleList={data} />
          )}
        </>
      )}
    </section>
  );
};

export default ArticleListPage;
