import { useParams, useNavigate } from "react-router";
import axios from "../libs/axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { toast } from "react-hot-toast";

async function getNote(id) {
  const res = await axios.get(`/notes/${id}`);

  return res.data;
}

async function deleteNote(id) {
  const res = await axios.delete(`/notes/${id}`);

  return res;
}

export default function DetailNote() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log(id);
  const deleteMutate = useMutation({
    mutationFn: () => deleteNote(id),
    onMutate: () => toast.success("Deleting Note"),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries(["notes"]);
      toast.success("A Note Deleted");
      navigate("/");
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
  });
  if (isLoading) return <div>Loading</div>;

  return (
    <div className="container mx-auto">
      <div className="w-full">
        <div className="w-full md:w-full lg:w-1/2 mx-auto space-y-5 p-5 shadow-lg border border-primary/10 rounded-lg">
          <h1 className="font-bold text-2xl">{data?.title}</h1>
          <p className=" tracking-wide leading-loose text-sm">
            {data?.content}
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 mx-auto flex justify-end mt-5">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="btn btn-ghost"
          >
            <PenSquareIcon className="text-primary" />
          </button>
          <button onClick={deleteMutate.mutate} className="btn btn-ghost">
            <Trash2Icon className="text-error" />
          </button>
        </div>
      </div>
    </div>
  );
}
