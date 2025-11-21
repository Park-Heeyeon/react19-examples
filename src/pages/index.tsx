import { Activity, useState } from "react";
import type { TabItem } from "./types";
import {
  ActionFormExample,
  ActivityComponentExample,
  ReactCompilerExample,
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
  {
    key: "reactCompiler",
    label: "React Compiler",
    component: ReactCompilerExample,
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

      <div
        className="mx-auto
                  w-full max-w-7xl
                  min-h-[140px]
                  bg-white
                  p-6
                  rounded-tr-none rounded-tl-lg rounded-br-lg rounded-bl-lg
                  shadow-md
                  md:p-8
                  lg:min-h-[500px]"
      >
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
