import { useState } from "react";

/**
 * 리액트 컴파일러를 사용하지 않으면 리렌더링이 발생하는 이유로
 * 첫 번째 이유는, React가 컴포넌트를 ‘렌더링 함수’로 보기 때문입니다.
 * 상태가 변경되면 부모 컴포넌트 함수가 다시 실행되고, 내부 코드도 모두 재실행됩니다. 따라서 heavyCalc 같은 계산 함수도 값이 바뀌지 않았는데도 매번 실행되는 비효율이 발생합니다.
 *
 * 두 번째 이유는, React가 자식 컴포넌트를 기본적으로 메모하지 않기 때문입니다.
 * Child 컴포넌트가 변화가 없더라도 Parent가 리렌더되면 Child도 함께 렌더됩니다.이를 막으려면 React.memo를 직접 적용해야 합니다.
 *
 * 세 번째 이유는, React가 함수의 identity를 추적하지 않기 때문입니다.
 * Parent가 렌더될 때마다 내부 함수가 새로 생성되며, React는 이를 매번 다른 함수로 간주합니다.
 * 이로 인해 자식 컴포넌트가 불필요하게 리렌더되는 문제가 발생할 수 있습니다.
 */

/**
 * 1. Child가 prop를 받지 않거나 변하지 않는 props를 받으면
 *    Child 렌더링 자체를 스킵
 */
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

  /**
   * 2. 입력이 동일하면 heavyCalc 결과를 재사용하고 재실행하지 않음
   */
  function heavyCalc(num: number) {
    console.log("heavyCalc 실행");
    return num * 1000;
  }

  /**
   * 3. 함수 생성 위치와 사용 패턴을 보고 불필요한 재생성을 막아 렌더링 트리를 안정화
   * => 즉, useCallback, useMemo의 역할을 자동으로 수행
   */
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
