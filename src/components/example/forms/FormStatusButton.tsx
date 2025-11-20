import { useFormStatus } from "react-dom";
import { Button } from "../../ui/button";

// useFormStatus 예시 컴포넌트
const FormStatusButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="w-[200px] h-full !bg-[#161e3dff] !text-white mx-auto mt-4"
      disabled={pending}
    >
      {pending ? "로그인 중..." : "로그인"}
    </Button>
  );
};
export default FormStatusButton;
