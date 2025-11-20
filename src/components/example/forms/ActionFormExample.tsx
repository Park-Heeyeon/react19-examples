import { useActionState, useState } from "react";
import { Input } from "../../ui/input";
import FormStatusButton from "./FormStatusButton";

// action 함수
const loginAction = async (
  prevState: {
    success: boolean;
    idError: string;
    passwordError: string;
    globalError: string;
  },
  formData: FormData
) => {
  await new Promise((res) => setTimeout(res, 1000));

  const id = formData.get("id")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  // 필드 단위 에러 반환
  if (!id || !password) {
    return {
      success: false,
      idError: !id ? "아이디를 입력해주세요." : "",
      passwordError: !password ? "비밀번호를 입력해주세요." : "",
      globalError: "",
    };
  }

  // 값은 있지만 틀린 경우 → 글로벌 에러
  if (id !== "test" || password !== "1234") {
    return {
      success: false,
      idError: "",
      passwordError: "",
      globalError: "아이디 또는 비밀번호가 일치하지 않습니다.",
    };
  }

  // 성공
  return {
    success: true,
    idError: "",
    passwordError: "",
    globalError: "",
    message: "로그인 성공!",
  };
};

// useActionState 예시 컴포넌트
const ActionFormExample = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [state, submitAction] = useActionState(loginAction, {
    success: false,
    idError: "",
    passwordError: "",
    globalError: "",
    message: "",
  });

  return (
    <div className="flex justify-center h-[450px]">
      <div className="flex items-center px-16 rounded-lg space-y-4 mt-5 border bg-gray-100">
        <form action={submitAction} className="flex flex-col gap-3">
          <div>
            <p></p>
            <Input
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디"
              className="border-gray-400"
            />
            {state.idError && (
              <p className="text-red-500 text-sm mt-1">{state.idError}</p>
            )}
          </div>

          <div>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="border-gray-400"
            />
            {state.passwordError && (
              <p className="text-red-500 text-sm mt-1">{state.passwordError}</p>
            )}
          </div>

          {state.globalError && (
            <p className="text-red-600 text-sm">{state.globalError}</p>
          )}

          {state.success && (
            <p className="text-green-600 text-sm">{state.message}</p>
          )}

          <FormStatusButton />
        </form>
      </div>
    </div>
  );
};
export default ActionFormExample;
