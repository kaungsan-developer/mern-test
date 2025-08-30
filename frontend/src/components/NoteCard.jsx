import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "../libs/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

async function deletePost(id) {
  const res = await axios.delete(`/notes/${id}`);
  return res;
}

export default function NoteCard({ note }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutate = useMutation({
    mutationFn: () => deletePost(note._id),
    onMutate: () => toast.success("Deleting Note"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.removeQueries({ queryKey: ["note", note._id] });
      toast.success("A Note Deleted");
    },
  });
  return (
    <div className="card border border-primary/10 bg-primary/2 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 ">
      <div className="card-body">
        <h1
          onClick={() => navigate(`/detail/${note._id}`)}
          className="card-title text-xl cursor-pointer line-clamp-1"
        >
          {note.title}
        </h1>
        <div className="text-sm line-clamp-2">{note.content}</div>
        <div className="card-actions items-center justify-between mt-3">
          <span className="text-sm text-base-content/60">
            {format(new Date(note.createdAt), "MM-dd-yyyy")}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/edit/${note._id}`)}
              className="btn btn-ghost btn-xs  text-primary"
            >
              <PenSquareIcon className="size-4 " />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={deleteMutate.mutate}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
