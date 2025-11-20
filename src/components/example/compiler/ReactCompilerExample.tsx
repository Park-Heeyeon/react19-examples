import { useState } from "react";

function Child() {
  console.log("Child 렌더");
  return (
    <div className="p-3 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
      Child Component
    </div>
  );
}

const ReactCompilerExample = () => {
  const [count, setCount] = useState(0);

  console.log("Parent 렌더");

  function heavyCalc(num: number) {
    console.log("heavyCalc 실행");
    return num * 1000;
  }

  const result = heavyCalc(count);

  return (
    <div className="space-y-6 w-[50%] h-full mx-auto flex flex-col items-center justify-center">
      <button
        onClick={() => setCount((c) => c + 1)}
        className="
          w-[100%]
          py-2 rounded-md 
          !bg-[#161e3dff] text-white !font-bold
          hover:bg-blue-700 
          transition-colors duration-200
        "
      >
        증가
      </button>
      {/* Child 컴포넌트 박스 */}
      <div className="rounded-lg border border-slate-300 p-4 bg-slate-50 w-[100%]">
        <Child />
      </div>
      {/* 결과 박스 */}
      <div className="w-[100%] rounded-lg border border-slate-200 bg-white p-4 space-y-1">
        <p className="text-lg font-semibold text-slate-800">결과 정보</p>
        <p className="text-sm text-slate-600">count: {count}</p>
        <p className="text-sm text-slate-600">calc result: {result}</p>
      </div>
    </div>
  );
};

export default ReactCompilerExample;
