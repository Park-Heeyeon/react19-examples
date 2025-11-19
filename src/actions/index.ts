export function addCommentAction(
  newComment: CommentType,
  result: "success" | "fail",
  addOptimisticComment: (c: CommentType) => void,
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
) {
  addOptimisticComment(newComment);

  simulateRequest(result)
    .then(() => {
      setComments((prev) => [...prev, newComment]);
    })
    .catch(() => {
      alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
    });
}
