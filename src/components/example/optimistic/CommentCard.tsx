import { Card, CardContent } from "../../ui/card";
import type { CommentType } from "./types";

const CommentCard = ({ comment }: { comment: CommentType }) => {
  const { text } = comment;

  return (
    <Card className="w-full p-4 bg-[#f9f9f9] mb-4">
      <CardContent className="flex items-center p-0">
        <p className="flex-1 flex items-center text-sm">{text}</p>
      </CardContent>
    </Card>
  );
};
export default CommentCard;
