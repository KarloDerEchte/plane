import React from "react";
// lucide icons
import { AlertCircle, SignalHigh, SignalMedium, SignalLow, Ban } from "lucide-react";
// components
import { FilterHeader } from "../helpers/filter-header";
import { FilterOption } from "../helpers/filter-option";
// mobx react lite
import { observer } from "mobx-react-lite";
// mobx store
import { useMobxStore } from "lib/mobx/store-provider";
import { RootStore } from "store/root";

const PriorityIcons = ({
  priority,
  size = 14,
  strokeWidth = 2,
}: {
  priority: string;
  size?: number;
  strokeWidth?: number;
}) => {
  if (priority === "urgent")
    return (
      <div className="flex-shrink-0 rounded-sm overflow-hidden w-[20px] h-[20px] border border-red-500 bg-red-500 text-white flex justify-center items-center">
        <AlertCircle size={size} strokeWidth={strokeWidth} />
      </div>
    );
  if (priority === "high")
    return (
      <div className="flex-shrink-0 rounded-sm overflow-hidden w-[20px] h-[20px] border border-custom-border-300 text-red-500 flex justify-center items-center pl-1">
        <SignalHigh size={size} strokeWidth={strokeWidth} />
      </div>
    );
  if (priority === "medium")
    return (
      <div className="flex-shrink-0 rounded-sm overflow-hidden w-[20px] h-[20px] border border-custom-border-300 text-orange-500 flex justify-center items-center pl-1">
        <SignalMedium size={size} strokeWidth={strokeWidth} />
      </div>
    );
  if (priority === "low")
    return (
      <div className="flex-shrink-0 rounded-sm overflow-hidden w-[20px] h-[20px] border border-custom-border-300 text-green-500 flex justify-center items-center pl-1">
        <SignalLow size={size} strokeWidth={strokeWidth} />
      </div>
    );
  return (
    <div className="flex-shrink-0 rounded-sm overflow-hidden w-[20px] h-[20px] border border-custom-border-300 text-gray-500 flex justify-center items-center">
      <Ban size={size} strokeWidth={strokeWidth} />
    </div>
  );
};

export const FilterPriority = observer(() => {
  const store: RootStore = useMobxStore();
  const { issueFilters: issueFilterStore } = store;

  const [previewEnabled, setPreviewEnabled] = React.useState(true);

  const handleFilter = (key: string, value: string) => {
    const _value =
      issueFilterStore?.userFilters?.filters?.[key] != null
        ? issueFilterStore?.userFilters?.filters?.[key].includes(value)
          ? issueFilterStore?.userFilters?.filters?.[key].filter((p: string) => p != value)
          : [...issueFilterStore?.userFilters?.filters?.[key], value]
        : [value];
    issueFilterStore.handleUserFilter("filters", key, _value);
  };

  return (
    <div>
      <FilterHeader
        title={`Priority (${issueFilterStore?.issueRenderFilters?.priority.length || 0})`}
        isPreviewEnabled={previewEnabled}
        handleIsPreviewEnabled={() => setPreviewEnabled(!previewEnabled)}
      />
      {previewEnabled && (
        <div className="space-y-[2px] pt-1">
          {issueFilterStore?.issueRenderFilters?.priority &&
            issueFilterStore?.issueRenderFilters?.priority.length > 0 &&
            issueFilterStore?.issueRenderFilters?.priority.map((_priority) => (
              <FilterOption
                key={_priority?.key}
                isChecked={
                  issueFilterStore?.userFilters?.filters?.priority != null &&
                  issueFilterStore?.userFilters?.filters?.priority.includes(_priority?.key)
                    ? true
                    : false
                }
                onClick={() => handleFilter("priority", _priority?.key)}
                icon={<PriorityIcons priority={_priority.key} />}
                title={_priority.title}
              />
            ))}
          <div className="pl-[32px] flex items-center gap-2 py-[6px] text-xs text-custom-primary-100">
            <div>View less</div>
            <div>View more</div>
            {/* TODO: <div>View all</div> */}
          </div>
        </div>
      )}
    </div>
  );
});