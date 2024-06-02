"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "@/components/forms/Select";
import FormProvider from "@/components/forms/FormProvider";
import RadioGroup from "@/components/forms/RadioGroup";
import { useAddArticle, useUpdateArticle } from "@/app/actions/GetArticles";
import { useGetArticleFormParams } from "@/app/actions/GetArticleFormParams";
import { useGetObjectId } from "@/app/actions/GenerateObjectId";

export default function ArticleForm({
  isEdit = false,
  forOffer = false,
  article,
  createCustomArticle,
}) {
  const {
    data: formParams,
    isLoading: paramsLoading,
    isFetching,
  } = useGetArticleFormParams();

  const { mutate: addArticle } = useAddArticle();
  const { mutate: updateArticle } = useUpdateArticle();

  const {
    data: objectId,
    isLoading: idLoading,
    refetch: refetchId,
  } = useGetObjectId();

  const [loading, setLoading] = useState(false);
  const [haveBlinds, setHaveBlinds] = useState(false);

  const ArticleSchema = Yup.object().shape({
    typeId: Yup.string().required("Required"),
    panelId: Yup.string().required("Required"),
    colorId: Yup.string().required("Required"),
    width: Yup.number().required("Required"),
    height: Yup.number().required("Required"),
    blindsTypeId: haveBlinds
      ? Yup.string().required("Required")
      : Yup.string().notRequired(),
    blindsWidth: haveBlinds
      ? Yup.number().required("Required")
      : Yup.number().notRequired(),
    blindsHeight: haveBlinds
      ? Yup.number().required("Required")
      : Yup.number().notRequired(),
    price: Yup.number().required("Required"),
    amount: Yup.number().required("Required"),
  });

  const defaultValues = useMemo(
    () => ({
      typeId: article?.typeId || "",
      panelId: article?.panelId || "",
      colorId: article?.colorId || "",
      opening: article?.opening || "",
      substock: article?.substock || "",
      width: article?.width || 0,
      amount: article?.amount || 1,
      height: article?.height || 0,
      blindsTypeId: article?.blindsId || "",
      blindsWidth: article?.blindsWidth || 0,
      blindsHeight: article?.blindsHeight || 0,
      price: article?.price || 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [article]
  );

  const methods = useForm({
    resolver: yupResolver(ArticleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isEdit && article) {
      reset(defaultValues);
      article?.blinds?.name === "none"
        ? setHaveBlinds(false)
        : setHaveBlinds(true);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, article]);

  const onSubmit = async (data) => {
    if (!forOffer) {
      try {
        setLoading(true);
        if (isEdit && article) {
          updateArticle({ id: article.id, body: data });
        }
        if (!isEdit) {
          addArticle(data);
        }
        // console.log("DATA", data);
      } catch (error) {
        console.error(error);
      }
    } else {
      if (!idLoading) {
        const id = objectId;
        const type = formParams.types.find((type) => {
          return type.id === data.typeId;
        });
        const panel = formParams.panels.find(
          (panel) => panel.id === data.panelId
        );
        const color = formParams.colors.find(
          (color) => color.id === data.colorId
        );
        const blinds = formParams.blindsTypes.find((blinds) => {
          if (data?.blindsTypeId === "") {
            return blinds.name === "none";
          } else {
            blinds.id === data?.blindsTypeId;
          }
        });

        const name = type.name;
        const customArticle = {
          ...data,
          id,
          name,
          type,
          panel,
          color,
          blinds,
        };
        createCustomArticle(customArticle);
        refetchId();
      }
    }
    reset();
    setLoading(false);
  };

  if (paramsLoading || isFetching) {
    return <div>Loading</div>;
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <h2 className="text-xl font-bold mb-4">Type of Article</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5">
            <Select
              label={"Type"}
              placeholder={"Select type..."}
              disabled={loading}
              name={"typeId"}
              errors={errors}
              register={register}
            >
              {formParams?.types?.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Select
              label={"Type of panel"}
              disabled={loading}
              placeholder={"Select panel..."}
              name={"panelId"}
              errors={errors}
              register={register}
            >
              {formParams?.panels?.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>

            <div className="flex items-center gap-2 justify-between">
              <RadioGroup
                title={"Opening"}
                defaultValue={"left"}
                register={register}
                inputs={[
                  { id: "left", name: "opening", value: "left" },
                  { id: "right", name: "opening", value: "right" },
                ]}
              />
              <RadioGroup
                title={"Sub Stock"}
                defaultValue={"no"}
                register={register}
                inputs={[
                  { id: "substockYes", name: "substock", value: "yes" },
                  { id: "substockNo", name: "substock", value: "no" },
                ]}
              />
            </div>
            <Select
              label={"Color"}
              placeholder={"Select color..."}
              disabled={loading}
              name={"colorId"}
              errors={errors}
              register={register}
            >
              {formParams?.colors?.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mb-7">
          <h2 className="text-xl font-bold mb-4">Dimensions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5">
            <Input
              disabled={loading}
              errors={errors}
              required
              register={register}
              id="width"
              label="Width (mm)"
              type="number"
            />
            <Input
              disabled={loading}
              errors={errors}
              required
              register={register}
              id="height"
              label="Height (mm)"
              type="number"
            />
          </div>
        </div>
        <div className="mb-7">
          <h2 className="text-xl font-bold mb-4">Blinds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5">
            <div className="flex items-center gap-2 justify-between">
              <RadioGroup
                title={"Do you want blinds?"}
                handleOnChange={() => {
                  setHaveBlinds(!haveBlinds);
                }}
                defaultValue={haveBlinds ? "yes" : "no"}
                register={register}
                inputs={[
                  { id: "blindsYes", name: "blinds", value: "yes" },
                  { id: "blindsNo", name: "blinds", value: "no" },
                ]}
              />
            </div>
            {haveBlinds && (
              <>
                <Select
                  label={"Type"}
                  placeholder={"Select type..."}
                  disabled={loading}
                  name={"blindsTypeId"}
                  errors={errors}
                  register={register}
                >
                  {formParams?.blindsTypes?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
                <Input
                  disabled={loading}
                  errors={errors}
                  required
                  register={register}
                  id="blindsWidth"
                  label="Width (mm)"
                  type="number"
                />
                <Input
                  disabled={loading}
                  errors={errors}
                  required
                  register={register}
                  id="blindsHeight"
                  label="Height (mm)"
                  type="number"
                />
              </>
            )}
          </div>
        </div>
        <div className="mb-7">
          <h2 className="text-xl font-bold mb-4">Price</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5">
            <Input
              disabled={loading}
              errors={errors}
              required
              register={register}
              id="price"
              label="Price €"
              type="number"
            />
            <Input
              disabled={loading}
              errors={errors}
              required
              register={register}
              id="amount"
              label="Amount"
              type="number"
            />
          </div>
          <div className="pt-6">
            <Button disabled={loading} fullWidth type="submit">
              {!isEdit ? "Create Article" : "Update Article"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
