import { useState } from "react";

function heavyCalc(num: number) {
  console.log("heavyCalc 실행");
  return num * 1000;
}

function Child({ value }: { value: number }) {
  console.log("Child 렌더");
  return <div>Child value: {value}</div>;
}

const ReactCompilerExample = () => {
  const [count, setCount] = useState(0);

  console.log("Parent 렌더");

  // heavyCalc의 입력을 고정값으로 유지
  const result = heavyCalc(1);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>증가</button>

      {/* props도 항상 동일 */}
      <Child value={10} />

      <p>count: {count}</p>
      <p>calc result: {result}</p>
    </div>
  );
};

export default ReactCompilerExample;
