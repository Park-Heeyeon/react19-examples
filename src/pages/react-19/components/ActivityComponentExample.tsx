import { useState, Activity } from "react";

const ActivityComponentExample = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const toggle = () => setVisible((v: boolean) => !v);

  return (
    <div className="content-container">
      <div className="btn-container">
        <button onClick={toggle}>{visible ? "hide" : "show"}</button>
      </div>
      <div className="box-container">
        <div className="box-wrap">
          {visible && <SubComponent title="논리 연산자" />}
        </div>

        <div className="box-wrap">
          {visible ? <SubComponent title="삼항 연산자" /> : <></>}
        </div>

        <div className="box-wrap">
          <Activity mode={visible ? "visible" : "hidden"}>
            <SubComponent title="<Activity /> 컴포넌트" />
          </Activity>
        </div>
      </div>
    </div>
  );
};

const SubComponent = ({ title }: { title: string }) => {
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

export default ActivityComponentExample;
