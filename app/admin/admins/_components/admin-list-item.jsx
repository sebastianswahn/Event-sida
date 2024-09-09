import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Trash2 } from "lucide-react";

export const AdminListItem = ({ email, imageUrl, onClick }) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-slate-500/10">
      <div className="flex items-center gap-4">
        <Avatar className="size-8">
          <AvatarImage src={imageUrl} />
        </Avatar>
        <p>{email}</p>
      </div>
      <Trash2 className="cursor-pointer" onClick={onClick} />
    </div>
  );
};
