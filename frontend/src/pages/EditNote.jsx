import { useForm } from "react-hook-form";
import axios from "../libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

async function getNote(id) {
  const res = await axios.get(`/notes/${id}`);
  return res.data;
}

export default function editNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false); //if true submit btn disable

  //getting initial value of note
  const { data, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title || "",
      content: data?.content || "",
    },
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  //edit note request to backend
  const onSubmit = async (data) => {
    const res = await axios.put(`/notes/${id}`, data);
    return res;
  };

  const updateMutate = useMutation({
    mutationFn: onSubmit,
    onMutate: () => setIsEditing(true),
    onSuccess: () => {
      toast.success("Edited");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      navigate("/");
    },
  });

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="flex justify-center items-center w-screen py-10">
      <div className="w-full md:w-[70%] lg:w-1/2 mx-5 shadow-lg border border-primary/20 rounded-lg p-5">
        <h1 className="text-2xl font-bold">Update Note</h1>
        <form action="" onSubmit={handleSubmit(updateMutate.mutate)}>
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
                className="textarea  textarea-lg textarea-primary w-full"
                {...register("content", { required: true })}
              ></textarea>
              {errors?.content && (
                <small className="text-error">Content is required</small>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary float-right"
              disabled={isEditing}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
