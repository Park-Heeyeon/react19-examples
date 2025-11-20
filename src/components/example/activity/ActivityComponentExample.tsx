import { useState, Activity } from "react";
import CountCard from "./CountCard";

const ActivityComponentExample = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const toggle = () => setVisible((v: boolean) => !v);

  return (
    <>
      <div className="btn-container">
        <button onClick={toggle}>{visible ? "hide" : "show"}</button>
      </div>
      <div className="box-container">
        <div className="box-wrap">
          {visible && <CountCard title="논리 연산자" />}
        </div>

        <div className="box-wrap">
          {visible ? <CountCard title="삼항 연산자" /> : <></>}
        </div>

        <div className="box-wrap">
          <Activity mode={visible ? "visible" : "hidden"}>
            <CountCard title="<Activity /> 컴포넌트" />
          </Activity>
        </div>
      </div>
    </>
  );
};

export default ActivityComponentExample;
