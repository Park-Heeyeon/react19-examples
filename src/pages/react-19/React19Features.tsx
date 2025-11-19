import { Activity, useState, type ComponentType } from "react";
import {
  ActivityComponentExample,
  UseExample,
  UseOptimisticExample,
} from "./components";
import UseActionStateExample from "./components/UseActionStateExample";

type TabItem = {
  key: string;
  label: string;
  component?: ComponentType;
};

const tabs: TabItem[] = [
  {
    key: "activityComponent",
    label: "<Activity /> 컴포넌트",
    component: ActivityComponentExample,
  },
  {
    key: "useOptimistic",
    label: "useOptimistic / useTransition",
    component: UseOptimisticExample,
  },
  {
    key: "useActionState",
    label: "useActionState / useFormStatus",
    component: UseActionStateExample,
  },
  {
    key: "useHook",
    label: "use (data fetching)",
    component: UseExample,
  },
];

const React19Features = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="page-container">
      <div className="tab-container">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(index)}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="content-box">
        {tabs.map((tab, index) => (
          <Activity
            key={index}
            mode={activeTab === index ? "visible" : "hidden"}
          >
            {tab.component ? <tab.component /> : <div>준비중입니다.</div>}
          </Activity>
        ))}
      </div>
    </div>
  );
};
export default React19Features;
