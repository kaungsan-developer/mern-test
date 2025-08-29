import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { format } from "date-fns";

export default function NoteCard({ note }) {
  return (
    <div className="card border border-primary/10 bg-primary/2 hover:shadow-lg hover:-translate-y-1 transition-all duration-400">
      <div className="card-body">
        <h1 className="card-title text-xl">{note.title}</h1>
        <div className="text-sm line-clamp-2">{note.content}</div>
        <div className="card-actions items-center justify-between mt-3">
          <span className="text-sm text-base-content/60">
            {format(new Date(note.createdAt), "MM-dd-yyyy")}
          </span>
          <div className="flex items-center">
            <button className="btn btn-ghost btn-xs  text-primary">
              <PenSquareIcon className="size-4 " />
            </button>
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
