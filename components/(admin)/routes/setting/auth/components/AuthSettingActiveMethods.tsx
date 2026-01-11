// constants
import { AUTH_METHODS_DATA } from "../constants/data";

// types
import { type AuthMethod } from "../types/types";
import { type SettingAuthActiveMethodsDocument } from "@/common/types/documentation/nestedDocuments/settingAuthActiveMethods";

export default function AuthSettingActiveMethods({
  defaultMethod,
  activeMethods,
  onChangeActiveMethods
}: {
  defaultMethod: AuthMethod;
  activeMethods: SettingAuthActiveMethodsDocument;
  onChangeActiveMethods: (
    newActiveMethods: SettingAuthActiveMethodsDocument
  ) => void;
}) {
  const handleToggleActive = (method: AuthMethod) => {
    if (method !== defaultMethod) {
      onChangeActiveMethods({
        ...activeMethods,
        [method]: !activeMethods[method]
      } as SettingAuthActiveMethodsDocument);
    }
  };

  return (
    <section className="grid grid-cols-[80px_1fr] gap-5">
      <span className="text-xl">Active</span>
      <section className="flex gap-3">
        {AUTH_METHODS_DATA.map(({ name, label, icon }, i) => (
          <article
            key={i}
            className={`flex items-center gap-2 px-5 py-2 ${activeMethods[name] ? "bg-teal-200" : "bg-charcoal-3/15"} rounded-md transition-colors duration-200 cursor-pointer`}
            onClick={() => {
              handleToggleActive(name);
            }}
          >
            {icon}
            <span>{label}</span>
          </article>
        ))}
      </section>
    </section>
  );
}
