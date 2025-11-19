import { useOptimistic, useState, useTransition, type FormEvent } from "react";
import CommentCard from "./CommentCard";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import type { CommentType } from "./types";

const UseOptimisticExample = () => {
  const [text, setText] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);

  const [isPending, startTransition] = useTransition();
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentType[],
    CommentType
  >(comments, (currentComments, newComment) => [
    ...currentComments.slice(0, 4),
    newComment,
  ]);

  const simulateRequest = async (
    newComment: CommentType,
    type: "success" | "fail"
  ): Promise<CommentType[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (type === "success") {
          const updatedComments = comments.slice(0, 4).concat(newComment);
          resolve(updatedComments);
        } else {
          reject(new Error("Request failed"));
        }
      }, 2000);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim() === "") return;

    setText("");

    const newComment: CommentType = {
      id: Date.now(),
      text,
      isLiked: false,
    };

    // 화면에 먼저 반영
    startTransition(async () => {
      // 1) 낙관적 업데이트: 바로 화면에 보여줌
      addOptimisticComment(newComment);

      try {
        const randomStatus = Math.random() < 0.8 ? "success" : "fail";
        // 2) 실제 요청
        const result = await simulateRequest(newComment, randomStatus);
        // 3) 성공 시 진짜 상태 업데이트
        setComments(result);
      } catch (error) {
        // 실패 시: setComments를 호출하지 않으므로
        // transition 종료 시점에 optimistic 값이 자동으로 롤백됩니다.
        alert("댓글 등록에 실패했습니다. 다시 시도해 주세요.");
        console.log("Error:", error);
      }
    });
  };

  return (
    <div className="content-container">
      <div className="comment-area">
        {optimisticComments.length === 0 ? (
          <div className="not-comment">아직 등록된 댓글이 없습니다.</div>
        ) : (
          <>
            {optimisticComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
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
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="submit"
            variant="outline"
            className="w-[100px] h-full !bg-[#6382b0ff] !text-white"
            disabled={isPending}
          >
            {isPending ? "등록 중" : "등록"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UseOptimisticExample;
