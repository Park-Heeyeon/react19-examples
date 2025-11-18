import { Activity, useState, type ComponentType } from "react";
import ActivityComponent from "./components/ActivityComponent";
import OptimisticComponent from "./components/OptimisticComponent";

type TabItem = {
  key: string;
  label: string;
  component?: ComponentType;
};

const tabs: TabItem[] = [
  {
    key: "activityComponent",
    label: "<Activity /> 컴포넌트",
    component: ActivityComponent,
  },
  {
    key: "useOptimistic",
    label: "useOptimistic",
    component: OptimisticComponent,
  },
  { key: "useActionState", label: "useActionState / useFormStatus" },
  { key: "useHook", label: "use (data fetching)" },
  { key: "formActions", label: "Form Actions" },
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
