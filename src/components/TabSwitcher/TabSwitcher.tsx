/* ---------------------------------
TabSwitcher
--------------------------------- */

import React, { ReactElement, useState } from "react";

interface IOwnProps {
  tabs: ITabConfig[];
}

interface ITabConfig {
  name: string;
  content: ReactElement | React.FC | string;
}

// TODO
export default function TabSwitcher({ tabs }: IOwnProps): ReactElement {
  const [selected, setSelected] = useState(0);

  return (
    <div className="TabSwitcher">
      <div className="TabHeader">
        {tabs.map((tab, k) => (
          <button
            key={k}
            type="button"
            className={`TabButton ${
              selected === k ? "TabButton--selected" : ""
            }`}
            onClick={() => setSelected(k)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="TabContent">{tabs[selected]["content"]}</div>
    </div>
  );
}
