import { useForm } from "react-hook-form";
import axios from "../libs/axios";

export default function CreateNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post("/notes", data);
    console.log(res);
  };
  return (
    <div className="flex justify-center">
      <div className="w-96 mx-auto shadow-lg border border-primary/20 rounded-lg p-5">
        <h1 className="text-2xl font-bold">Add New Note</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 mt-5">
            <div>
              <label htmlFor="title" className="block font-bold">
                Title
              </label>
              <input
                type="text"
                className="input input-primary w-full"
                {...register("title", { required: true })}
              />
              {errors?.title && (
                <small className="text-error">Title is required</small>
              )}
            </div>
            <div>
              <label htmlFor="content" className="block font-bold">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                className="textarea textarea-primary w-full"
                {...register("content", { required: true })}
              ></textarea>
              {errors?.content && (
                <small className="text-error">Content is required</small>
              )}
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
