import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  image: FileList;
}

interface IProps {}

export default function HouseForm({}: IProps) {
  const [submiting, setSubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: {} });

  useEffect(() => {
    register("address", { required: "Please enter your address" });
    register("latitude", { required: true, min: -90, max: 90 });
    register("longitude", { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {};

  const onSubmit = (data: IFormData) => {
    setSubmiting(true);
    handleCreate(data);
  };
  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add a New House</h1>

      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for your address
        </label>
        {/*SEARCH FIELD*/}
        {errors.address && <p>{errors.address.message}</p>}
      </div>
    </form>
  );
}
