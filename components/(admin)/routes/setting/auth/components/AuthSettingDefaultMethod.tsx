// constants
import { AUTH_METHODS_DATA } from "../constants/data";

// types
import { type AuthMethod } from "../types/types";

export default function AuthSettingDefaultMethod({
  defaultMethod,
  onChangeDefaultAuth
}: {
  defaultMethod: AuthMethod;
  onChangeDefaultAuth: (newDefaultMethod: AuthMethod) => void;
}) {
  return (
    <section className="grid grid-cols-[80px_1fr]  gap-5">
      <span className="text-xl">Default</span>
      <section className="flex gap-3">
        {AUTH_METHODS_DATA.map(({ name, label, icon }, i) => (
          <article
            key={i}
            className={`flex items-center gap-2 px-5 py-2 ${defaultMethod === name ? "bg-teal-200" : "bg-charcoal-3/15"} rounded-md transition-colors duration-200 cursor-pointer`}
            onClick={() => {
              onChangeDefaultAuth(name);
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
