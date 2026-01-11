// utils
import { camelToTitleCase } from "@/common/utils/case";

// types
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function AdminRolePermission(
  props: {
    permissionKey: string;
    position?: "top" | "bottom";
    permission: PermissionDocument;
    onChangePermission: (newPermission: PermissionDocument) => void;
  } & (
    | {
        isSection?: undefined;
      }
    | {
        isSection?: boolean;
        isCustomized?: boolean;
        toggleShowSectionItems: () => void;
      }
  )
) {
  const {
    permissionKey,
    isSection,
    position,
    permission: { create: c, read: r, update: u, delete: d },
    onChangePermission
  } = props;

  const handleChangePermission = (
    c: boolean,
    r: boolean,
    u: boolean,
    d: boolean
  ) => {
    onChangePermission({
      create: c,
      read: r,
      update: u,
      delete: d
    } as PermissionDocument);
  };

  return (
    <>
      <span
        className={`grid place-items-center  ${isSection ? "py-2.5 bg-teal-100 border border-r-0 border-teal-200 rounded-l-lg cursor-pointer" : position === "top" ? "pt-2 pb-1" : position === "bottom" ? "pt-1 pb-2" : "py-1"}`}
      >
        <input
          type="checkbox"
          checked={(isSection && props.isCustomized) || c || r || u || d}
          onChange={() => {
            if (c || r || u || d) {
              handleChangePermission(false, false, false, false);
            } else {
              handleChangePermission(true, true, true, true);
            }
          }}
          className={`${isSection ? "h-5 w-5" : "w-4 h-4"} accent-teal-500 cursor-pointer`}
        />
      </span>
      <span
        className={`${isSection ? "py-2.5 bg-teal-100 border border-x-0 border-teal-200 text-lg font-medium cursor-pointer" : position === "top" ? "pt-2 pb-1" : position === "bottom" ? "pt-1 pb-2" : "py-1"}`}
        onClick={isSection ? props.toggleShowSectionItems : undefined}
      >
        {camelToTitleCase(permissionKey)}
      </span>
      <span
        className={` grid place-items-center  ${isSection ? "py-2.5 bg-teal-100 border border-x-0 border-teal-200 cursor-pointer" : position === "top" ? "pt-2 pb-1" : position === "bottom" ? "pt-1 pb-2" : "py-1"}`}
      >
        <input
          type="checkbox"
          checked={c}
          onChange={() => {
            handleChangePermission(!c, !c ? true : r, u, d);
          }}
          className={`${isSection ? "h-5 w-5" : "w-4 h-4"} accent-teal-500 cursor-pointer`}
        />
      </span>
      <span
        className={` grid place-items-center  ${isSection ? "py-2.5 bg-teal-100 border border-x-0 border-teal-200 cursor-pointer" : position === "top" ? "pt-2 pb-1" : position === "bottom" ? "pt-1 pb-2" : "py-1"}`}
      >
        <input
          type="checkbox"
          checked={r}
          onChange={() => {
            handleChangePermission(
              !r ? c : false,
              !r,
              !r ? u : false,
              !r ? d : false
            );
          }}
          className={`${isSection ? "h-5 w-5" : "w-4 h-4"} accent-teal-500 cursor-pointer`}
        />
      </span>
      <span
        className={` grid place-items-center ${isSection ? "py-2.5 bg-teal-100 border border-x-0 border-teal-200 cursor-pointer" : position === "top" ? "pt-2 pb-1" : position === "bottom" ? "pt-1 pb-2" : "py-1"}`}
      >
        <input
          type="checkbox"
          checked={u}
          onChange={() => {
            handleChangePermission(c, !u ? true : r, !u, d);
          }}
          className={`${isSection ? "h-5 w-5" : "w-4 h-4"} accent-teal-500 cursor-pointer`}
        />
      </span>
      <span
        className={` grid place-items-center ${isSection ? "py-2.5 bg-teal-100 border border-l-0 border-teal-200 rounded-r-lg cursor-pointer" : position === "top" ? "pt-2 pb-1" : position === "bottom" ? "pt-1 pb-2" : "py-1"}`}
      >
        <input
          type="checkbox"
          checked={d}
          onChange={() => {
            handleChangePermission(c, !d ? true : r, u, !d);
          }}
          className={`${isSection ? "h-5 w-5" : "w-4 h-4"} accent-teal-500 cursor-pointer`}
        />
      </span>
    </>
  );
}
