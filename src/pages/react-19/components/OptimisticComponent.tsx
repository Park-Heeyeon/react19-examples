import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Heart } from "lucide-react";

interface CommentType {
  id: number;
  text: string;
  isLiked: boolean;
}
const OptimisticComponent = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState<string>("");

  //   const simulateRequest = async (type: "success" | "fail") => {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         if (type === "success") {
  //           resolve("Request successful");
  //         } else {
  //           reject(new Error("Request failed"));
  //         }
  //       }, 2000);
  //     });
  //   };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim() === "") return;
    if (comments.length === 4) {
      setComments((prev) => prev.slice(0, 4));
      return;
    }

    const newComment: CommentType = {
      id: Date.now(),
      text,
      isLiked: false,
    };

    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="content-container">
      <div className="comment-area">
        {comments.length === 0 ? (
          <div className="not-comment">아직 등록된 댓글이 없습니다.</div>
        ) : (
          <>
            {comments.map((comment) => (
              <CardComponent key={comment.id} comment={comment} />
            ))}
          </>
        )}
      </div>
      <div className="input-area">
        <form onSubmit={handleSubmit} className="flex w-full gap-2 h-full">
          <Input
            type="text"
            placeholder="댓글을 입력해 주세요"
            className="h-full px-4"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="submit"
            variant="outline"
            className="h-full bg-[#6382b0ff] text-white"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

const CardComponent = ({ comment }: { comment: CommentType }) => {
  const { text, isLiked } = comment;

  return (
    <Card className="w-full p-4 bg-[#f9f9f9] mb-4">
      <CardContent className="flex items-center p-0">
        <p className="flex-1 flex items-center text-sm">{text}</p>
        {/* 좋아요 버튼 */}
        <button
          // onClick={handleLike}
          className="flex items-center gap-1 text-sm ml-2"
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>
      </CardContent>
    </Card>
  );
};
export default OptimisticComponent;
