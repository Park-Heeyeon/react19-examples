import { useState, type ComponentType } from "react";
import ActivityComponent from "./components/ActivityComponent";

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
  { key: "useOptimistic", label: "useOptimistic" },
  { key: "useActionState", label: "useActionState / useFormStatus" },
  { key: "useHook", label: "use (data fetching)" },
  { key: "formActions", label: "Form Actions" },
];

const React19Features = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="page-container">
      <div className="tab-container">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(index)}
            className="tab-button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="content-box">
        {ActiveComponent ? <ActiveComponent /> : <div>준비 중 입니다.</div>}
      </div>
    </div>
  );
};
export default React19Features;
