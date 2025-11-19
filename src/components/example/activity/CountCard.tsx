import { useState } from "react";

const CountCard = ({ title }: { title: string }) => {
  const [count, setCount] = useState<number>(0);

  const handleBtnClick = (type: string) => {
    if (type === "increment") {
      setCount((c) => c + 1);
    } else if (type === "decrement") {
      if (count === 0) return;
      setCount((c) => c - 1);
    }
  };

  return (
    <div className="box">
      <div>
        <b>{title}</b> <br />
        Count: {count}
      </div>
      <div className="box-btn">
        <button onClick={() => handleBtnClick("increment")}>+</button>
        <button onClick={() => handleBtnClick("decrement")}>-</button>
      </div>
    </div>
  );
};
export default CountCard;
