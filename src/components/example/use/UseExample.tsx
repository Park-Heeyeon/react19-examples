import { Suspense, use } from "react";
import { Spinner } from "../../ui/spinner";

const getData = async () => {
  console.log("API 호출됨");

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  if (!res.ok) throw new Error("API 에러 발생");
  return res.json();
};

const dataPromise = getData();

const DataComponent = () => {
  const { id, title, completed } = use(dataPromise);
  return (
    <div className="space-y-1 text-left">
      <p className="text-lg font-semibold">할 일 정보</p>
      <p>ID: {id}</p>
      <p>제목: {title}</p>
      <p>완료 여부: {completed ? "완료" : "미완료"}</p>
    </div>
  );
};

const UseExample = () => {
  return (
    <div className="flex items-center justify-center w-[100%] h-[100%]">
      <Suspense fallback={<Spinner className="size-10" />}>
        <div className="text-center text-base font-medium text-slate-700">
          <DataComponent />
        </div>
      </Suspense>
    </div>
  );
};

export default UseExample;
