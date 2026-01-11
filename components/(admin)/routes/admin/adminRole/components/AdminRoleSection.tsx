// hooks
import { useState } from "react";

// components
import AdminRolePermission from "./AdminRolePermission";

// types
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function AdminRoleSection({
  sectionKey,
  initialSectionPermission: {
    isCustomized: initialIsCustomized,
    all: initialAll,
    custom: initialCustom
  },
  sectionPermission: { isCustomized, all, custom },
  onChangeSectionPermission
}: {
  sectionKey: string;
  initialSectionPermission: {
    isCustomized: boolean;
    all: PermissionDocument;
    custom: Record<string, PermissionDocument>;
  };
  sectionPermission: {
    isCustomized: boolean;
    all: PermissionDocument;
    custom: Record<string, PermissionDocument>;
  };
  onChangeSectionPermission: (newSectionPermission: {
    isCustomized: boolean;
    all: PermissionDocument;
    custom?: Record<string, PermissionDocument>;
  }) => void;
}) {
  const [showSectionItems, setShowSectionItems] = useState<boolean>(false);

  return (
    <section
      className={`grid grid-cols-[60px_1fr_60px_60px_60px_60px] overflow-y-hidden overflow-hidden transition-all duration-500`}
    >
      <AdminRolePermission
        permissionKey={sectionKey}
        isSection
        isCustomized={isCustomized}
        toggleShowSectionItems={() => {
          setShowSectionItems((prevShowSectionItems) => !prevShowSectionItems);
        }}
        permission={all || initialAll}
        onChangePermission={(newAllPermission) => {
          const newSectionPermission = {
            isCustomized: false,
            all: newAllPermission,
            custom: undefined
          };

          onChangeSectionPermission(newSectionPermission);
        }}
      />
      {showSectionItems &&
        Object.keys(initialCustom).map((key, i) => (
          <AdminRolePermission
            key={i}
            permissionKey={key}
            position={
              i === 0
                ? "top"
                : i === Object.keys(initialCustom).length - 1
                  ? "bottom"
                  : undefined
            }
            permission={
              isCustomized
                ? custom && custom[key]
                  ? custom[key]
                  : initialCustom[key]
                : all || initialAll
            }
            onChangePermission={(newSectionItemPermission) => {
              const newSectionPermission = {
                isCustomized: true,
                all: initialAll,
                custom: isCustomized ? custom : {}
              };

              if (
                !isCustomized &&
                (all.create || all.read || all.update || all.delete)
              ) {
                Object.keys(initialCustom).forEach((initialCustomKey) => {
                  newSectionPermission.custom[initialCustomKey] = all;
                });
              }

              if (
                !newSectionItemPermission.create &&
                !newSectionItemPermission.read &&
                !newSectionItemPermission.update &&
                !newSectionItemPermission.delete
              ) {
                delete newSectionPermission.custom[key];
              } else {
                newSectionPermission.custom[key] = newSectionItemPermission;
              }

              if (
                Object.keys(newSectionPermission.custom).length ===
                Object.keys(initialCustom).length
              ) {
                let isCustom = false;

                Object.keys(newSectionPermission.custom).forEach(
                  (customKey) => {
                    if (
                      newSectionPermission.custom[customKey].create !==
                        newSectionItemPermission.create ||
                      newSectionPermission.custom[customKey].read !==
                        newSectionItemPermission.read ||
                      newSectionPermission.custom[customKey].update !==
                        newSectionItemPermission.update ||
                      newSectionPermission.custom[customKey].delete !==
                        newSectionItemPermission.delete
                    ) {
                      isCustom = true;
                    }
                  }
                );

                if (!isCustom) {
                  newSectionPermission.all = newSectionItemPermission;
                  newSectionPermission.custom = {};
                }
              }

              if (!Object.keys(newSectionPermission.custom).length) {
                newSectionPermission.isCustomized = false;
              }

              onChangeSectionPermission(newSectionPermission);
            }}
          />
        ))}
    </section>
  );
}
