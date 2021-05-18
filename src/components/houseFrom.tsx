import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SearchBox } from "./searchBox";

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  image: FileList;
}

interface IProps {}

export default function HouseForm({}: IProps) {
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: {} });
  const address = watch("address");

  useEffect(() => {
    register("address", { required: "Please enter your address" });
    register("latitude", { required: true, min: -90, max: 90 });
    register("longitude", { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {
    console.log({ data });
  };

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };
  return (
    <form className="max-w-xl py-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add a New House</h1>

      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for your address
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue("address", address);
            setValue("latitude", latitude!);
            setValue("longitude", longitude!);
          }}
          defaultValue=""
        />
        {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
      </div>

      {address && (
        <>
          <div className="mt-4">
            <label htmlFor="image" className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer">
              Click to add image (16:9)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              {...register("image", {
                validate: (fileList: FileList) => {
                  if (fileList.length === 1) return true;
                  return "Please upload one file";
                },
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="image"
                className="mt-4 object-cover"
                style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
              />
            )}
            {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="bedrooms" className="block">
              Beds
            </label>
            <input
              type="number"
              id="bedrooms"
              className="p-2"
              {...register("bedrooms", {
                required: "Please enter the number of bedrooms",
                max: { value: 10, message: "Woah, too big of house" },
                min: { value: 1, message: "Must have at least 1 bedroom" },
              })}
            />
            {errors.bedrooms && <p className="text-red-600 text-sm">{errors.bedrooms.message}</p>}
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>
            <Link href="/">
              <a className="mx-4">Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  );
}
