"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "@/components/forms/Select";
import FormProvider from "@/components/forms/FormProvider";
import { useGetArticles } from "@/app/actions/GetArticles";
import Article from "@/components/article/Article";
import ArticleForm from "@/components/article/ArticleForm";
import CustomDrawer from "@/components/CustomDrawer";
import { useAddOffer, useUpdateOffer } from "@/app/actions/GetOffers";

const OffersForm = ({ isEdit = false, offer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState(
    offer ? offer.articleList : []
  );
  const [customArticles, setCustomArticles] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const articles = useGetArticles();

  const { mutate: updateOffer } = useUpdateOffer();
  const { mutate: addOffer } = useAddOffer();

  const OffersSchema = Yup.object().shape({
    customerName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
  });

  const defaultValues = useMemo(
    () => ({
      customerName: offer?.customer_name || "",
      address: offer?.customer_address || "",
      city: offer?.place?.place_name || "",
      email: offer?.customer_email || "",
      phone: offer?.customer_phone_number || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offer]
  );

  const methods = useForm({
    resolver: yupResolver(OffersSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isEdit && offer) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, offer]);

  useEffect(() => {
    setArticleList([...selectedArticles, ...customArticles]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArticles, customArticles]);

  const handleOnSelect = (event) => {
    let tmpArticle = articles?.data?.find((article) => {
      return article?.id === event.target.value;
    });

    const newState = selectedArticles?.map((article) => {
      if (article?.id === tmpArticle?.id) {
        tmpArticle = null;
        return { ...article, amount: article.amount + 1 };
      }

      return article;
    });

    if (tmpArticle !== null) {
      setSelectedArticles([...newState, tmpArticle]);
    } else {
      setSelectedArticles([...newState]);
    }
  };

  const handleCreateCustomArticle = (article) => {
    setCustomArticles([...customArticles, article]);
  };

  const handleDeleteArticle = (id) => {
    const deleteRow = articleList.filter((row) => row.id !== id);
    const deleteRowCustom = customArticles.filter((row) => row.id !== id);
    const deleteRowSelected = selectedArticles.filter((row) => row.id !== id);
    setArticleList(deleteRow);
    setCustomArticles(deleteRowCustom);
    setSelectedArticles(deleteRowSelected);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const body = {
        data: data,
        articles: selectedArticles,
        articleList: articleList,
      };

      if (isEdit && offer) {
        updateOffer({ id: offer.id, body: body });
        setSelectedArticles([]);
      }
      if (!isEdit) {
        addOffer(body);
        setSelectedArticles([]);
        setArticleList([]);
      }
      reset();
      setCustomArticles([]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="card">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-[20px] md:gap-5 md:p-[30px]">
            <Input
              disabled={isLoading}
              errors={errors}
              required
              register={register}
              id="customerName"
              label="Customer Name"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              register={register}
              id="address"
              label="Address"
              type="text"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              register={register}
              id="city"
              label="City"
              type="text"
              sx="capitalize"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              register={register}
              id="email"
              label="Email"
              type="email"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              register={register}
              id="phone"
              label="Phone"
              type="number"
            />
            <Select
              label={"Article"}
              placeholder={"Select article..."}
              disabled={isLoading}
              name={"article"}
              errors={errors}
              register={register}
              onChange={handleOnSelect}
              reset={true}
            >
              {articles.data?.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name} :{option.width}x{option.height}
                  {`+ ${option.blindsWidth > 0 ? "Blinds" : ""}`}
                </option>
              ))}
            </Select>

            <div className="flex flex-col justify-end pt-2 sm:p-0">
              <Button
                secondary
                disabled={isLoading}
                onClick={handleOpenDrawer}
                fullWidth
              >
                Custom article
              </Button>
            </div>

            <div className="flex flex-col justify-end pt-2 sm:p-0">
              <Button disabled={isLoading} fullWidth type="submit">
                {isEdit ? "Update offer" : "Create offer"}
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
      <div className="mt-7">
        {articleList?.map((article) => (
          <Article
            key={article?.id}
            article={article}
            offerItem={true}
            onDelete={() => {
              handleDeleteArticle(article?.id);
            }}
          />
        ))}
      </div>

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title={"Create article"}
      >
        <ArticleForm
          forOffer="true"
          createCustomArticle={handleCreateCustomArticle}
        />
      </CustomDrawer>
    </>
  );
};

export default OffersForm;
