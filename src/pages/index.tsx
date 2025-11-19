import { Activity, useState } from "react";
import type { TabItem } from "./types";
import {
  ActionFormExample,
  ActivityComponentExample,
  UseExample,
  UseOptimisticExample,
} from "../components/example";

const tabs: TabItem[] = [
  {
    key: "activityComponent",
    label: "<Activity />",
    component: ActivityComponentExample,
  },
  {
    key: "useOptimistic",
    label: "useOptimistic / useTransition",
    component: UseOptimisticExample,
  },
  {
    key: "actionForm",
    label: "useActionState / useFormStatus",
    component: ActionFormExample,
  },
  {
    key: "useHook",
    label: "use (data fetching)",
    component: UseExample,
  },
];

const MainPage = () => {
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
export default MainPage;
