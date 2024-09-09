import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { cn } from "@lib/utils";

export const UserListItem = ({ email, imageUrl, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-2 hover:bg-slate-500/10 cursor-pointer",
        isSelected && "bg-slate-500/15 hover:bg-slate-500/20"
      )}
    >
      <Avatar className="size-8">
        <AvatarImage src={imageUrl} />
      </Avatar>
      <p>{email}</p>
    </div>
  );
};
