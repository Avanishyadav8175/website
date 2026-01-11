// constants
import { INITIAL_IMAGE_LIMIT } from "@/common/constants/adminTable";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";
import { useToast } from "@/components/ui/use-toast";

// redux
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import {
  createCustomizationImageAction,
  selectCustomizationImage
} from "@/store/features/media/customizationImageSlice";
import {
  createIdentificationImageAction,
  selectIdentificationImage
} from "@/store/features/media/identificationImageSlice";
import {
  createIssueImageAction,
  selectIssueImage
} from "@/store/features/media/issueImageSlice";
import {
  createReviewImageAction,
  selectReviewImage
} from "@/store/features/media/reviewImageSlice";

// components
import ImageManagementImagesHeader from "./components/ImageManagementImagesHeader";
import ImageManagementImagesList from "./components/ImageManagementImagesList";
import TableLayoutPagination from "@/layouts/utils/table/components/TableLayoutPagination";

// types
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { createFolderAction } from "@/store/features/media/folderSlice";

export default function ImageManagementImages(
  props: {
    userName?: string;
    isSuperAdmin?: boolean;
    permission?: PermissionDocument;
    manage:
      | "image"
      | "customization-image"
      | "identification-image"
      | "issue-image"
      | "review-image";
  } & (
    | {
        withFolders?: false;
      }
    | {
        withFolders: true;
        selectedFolderId: string;
        onChangeShowingDeletedImages: (showingDeletedImages: boolean) => void;
      }
  ) &
    (
      | {
          asPopup?: false;
        }
      | {
          asPopup: true;
          selectMultiple?: boolean;
          maxSelections?: number;
          onSelect: (selectedImageIds: string[]) => void;
        }
    )
) {
  // props
  const { userName, isSuperAdmin, permission, manage, withFolders, asPopup } =
    props;

  // hooks
  const dispatch = useDispatch();
  const { toast } = useToast();

  // states
  const [showBin, setShowBin] = useState<boolean>(false);
  const [enableSelection, setEnableSelection] = useState<boolean>(false);
  const [showAlt, setShowAlt] = useState<boolean>(false);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  // pagination states
  const [offset, setOffset] = useState<number>(0);

  // redux states
  const imageStatus = useSelector(selectImage.status);

  const imageNotifications = useSelector(selectImage.notifications);

  const { count: imagesCount, documents: images } = useSelector((state) =>
    selectImage.documentList(state, {
      deleted: showBin,
      offset,
      limit: INITIAL_IMAGE_LIMIT,
      ...(withFolders
        ? { filterBy: "folderId", filterKeyword: props.selectedFolderId }
        : {}),
      sortBy: "createdAt",
      orderBy: "desc"
    })
  );

  const customizationImageStatus = useSelector(selectCustomizationImage.status);

  const customizationImageNotifications = useSelector(
    selectCustomizationImage.notifications
  );

  const { count: customizationImagesCount, documents: customizationImages } =
    useSelector((state) =>
      selectCustomizationImage.documentList(state, {
        deleted: showBin,
        offset,
        limit: INITIAL_IMAGE_LIMIT,
        sortBy: "createdAt",
        orderBy: "desc"
      })
    );

  const identificationImageStatus = useSelector(
    selectIdentificationImage.status
  );

  const identificationImageNotifications = useSelector(
    selectIdentificationImage.notifications
  );

  const { count: identificationImagesCount, documents: identificationImages } =
    useSelector((state) =>
      selectIdentificationImage.documentList(state, {
        deleted: showBin,
        offset,
        limit: INITIAL_IMAGE_LIMIT,
        sortBy: "createdAt",
        orderBy: "desc"
      })
    );

  const issueImageStatus = useSelector(selectIssueImage.status);

  const issueImageNotifications = useSelector(selectIssueImage.notifications);

  const { count: issueImagesCount, documents: issueImages } = useSelector(
    (state) =>
      selectIssueImage.documentList(state, {
        deleted: showBin,
        offset,
        limit: INITIAL_IMAGE_LIMIT,
        sortBy: "createdAt",
        orderBy: "desc"
      })
  );

  const reviewImageStatus = useSelector(selectReviewImage.status);

  const reviewImageNotifications = useSelector(selectReviewImage.notifications);

  const { count: reviewImagesCount, documents: reviewImages } = useSelector(
    (state) =>
      selectReviewImage.documentList(state, {
        deleted: showBin,
        offset,
        limit: INITIAL_IMAGE_LIMIT,
        sortBy: "createdAt",
        orderBy: "desc"
      })
  );

  const status = (() => {
    switch (manage) {
      case "image":
        return imageStatus;

      case "customization-image":
        return customizationImageStatus;

      case "identification-image":
        return identificationImageStatus;

      case "issue-image":
        return issueImageStatus;

      case "review-image":
        return reviewImageStatus;

      default:
        return "";
    }
  })();

  const notifications = (() => {
    switch (manage) {
      case "image":
        return imageNotifications;

      case "customization-image":
        return customizationImageNotifications;

      case "identification-image":
        return identificationImageNotifications;

      case "issue-image":
        return issueImageNotifications;

      case "review-image":
        return reviewImageNotifications;

      default:
        return [];
    }
  })();

  const count = (() => {
    switch (manage) {
      case "image":
        return imagesCount;

      case "customization-image":
        return customizationImagesCount;

      case "identification-image":
        return identificationImagesCount;

      case "issue-image":
        return issueImagesCount;

      case "review-image":
        return reviewImagesCount;

      default:
        return 0;
    }
  })();

  const imageDocuments = (() => {
    switch (manage) {
      case "image":
        return images;

      case "customization-image":
        return customizationImages;

      case "identification-image":
        return identificationImages;

      case "issue-image":
        return issueImages;

      case "review-image":
        return reviewImages;

      default:
        return [];
    }
  })();

  // event handlers
  const handleSelectImage = (selectedImageId: string) => {
    if (asPopup) {
      if (props.selectMultiple) {
        if (props.maxSelections) {
          if (
            selectedImageIds.length < props.maxSelections ||
            selectedImageIds.includes(selectedImageId)
          ) {
            setSelectedImageIds((prevSelectedImageIds) =>
              prevSelectedImageIds.includes(selectedImageId)
                ? [...prevSelectedImageIds].filter(
                    (prevSelectedImageId) =>
                      prevSelectedImageId !== selectedImageId
                  )
                : [...prevSelectedImageIds, selectedImageId]
            );
          }
        } else {
          setSelectedImageIds((prevSelectedImageIds) =>
            prevSelectedImageIds.includes(selectedImageId)
              ? [...prevSelectedImageIds].filter(
                  (prevSelectedImageId) =>
                    prevSelectedImageId !== selectedImageId
                )
              : [...prevSelectedImageIds, selectedImageId]
          );
        }
      } else {
        setSelectedImageIds([selectedImageId]);
      }
    } else {
      setSelectedImageIds((prevSelectedImageIds) =>
        prevSelectedImageIds.includes(selectedImageId)
          ? prevSelectedImageIds.filter((id) => id !== selectedImageId)
          : [...prevSelectedImageIds, selectedImageId]
      );
    }
  };

  const handleUpload = (
    images: ImageDocument[] | IdentificationImageDocument[]
  ) => {
    switch (manage) {
      case "image":
        dispatch(
          createImageAction.addDocuments({
            newDocuments: images as ImageDocument[]
          })
        );
        break;

      case "identification-image":
        dispatch(
          createIdentificationImageAction.addDocuments({
            newDocuments: images as IdentificationImageDocument[]
          })
        );
        break;

      default:
        break;
    }
  };

  const handleRefresh = () => {
    switch (manage) {
      case "image":
        dispatch(createImageAction.fetchDocumentList());
        break;

      case "customization-image":
        dispatch(createCustomizationImageAction.fetchDocumentList());
        break;

      case "identification-image":
        dispatch(createIdentificationImageAction.fetchDocumentList());
        break;

      case "issue-image":
        dispatch(createIssueImageAction.fetchDocumentList());
        break;

      case "review-image":
        dispatch(createReviewImageAction.fetchDocumentList());
        break;

      default:
        break;
    }
  };

  const handleUpdateAlt = (imageId: string, alt: string) => {
    dispatch(
      createImageAction.updateDocument({
        documentId: imageId,
        updateData: { alt }
      })
    );
  };

  const handleTrashImage = (imageId: string) => {
    switch (manage) {
      case "image":
        dispatch(
          createImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: true }
          })
        );
        break;

      case "customization-image":
        dispatch(
          createCustomizationImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: true }
          })
        );
        break;

      case "identification-image":
        dispatch(
          createIdentificationImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: true }
          })
        );
        break;

      case "issue-image":
        dispatch(
          createIssueImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: true }
          })
        );
        break;

      case "review-image":
        dispatch(
          createReviewImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: true }
          })
        );
        break;

      default:
        break;
    }
  };

  const handleTrashImages = () => {
    switch (manage) {
      case "image":
        dispatch(
          createImageAction.trashDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "customization-image":
        dispatch(
          createCustomizationImageAction.trashDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "identification-image":
        dispatch(
          createIdentificationImageAction.trashDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "issue-image":
        dispatch(
          createIssueImageAction.trashDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "review-image":
        dispatch(
          createReviewImageAction.trashDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      default:
        break;
    }
  };

  const handleDeleteImage = (imageId: string) => {
    switch (manage) {
      case "image":
        dispatch(
          createImageAction.deleteDocument({
            documentId: imageId
          })
        );
        break;

      case "customization-image":
        dispatch(
          createCustomizationImageAction.deleteDocument({
            documentId: imageId
          })
        );
        break;

      case "identification-image":
        dispatch(
          createIdentificationImageAction.deleteDocument({
            documentId: imageId
          })
        );
        break;

      case "issue-image":
        dispatch(
          createIssueImageAction.deleteDocument({
            documentId: imageId
          })
        );
        break;

      case "review-image":
        dispatch(
          createReviewImageAction.deleteDocument({
            documentId: imageId
          })
        );
        break;

      default:
        break;
    }
  };

  const handleDeleteImages = () => {
    switch (manage) {
      case "image":
        dispatch(
          createImageAction.deleteDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "customization-image":
        dispatch(
          createCustomizationImageAction.deleteDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "identification-image":
        dispatch(
          createIdentificationImageAction.deleteDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "issue-image":
        dispatch(
          createIssueImageAction.deleteDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "review-image":
        dispatch(
          createReviewImageAction.deleteDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      default:
        break;
    }
  };

  const handleRestoreImage = (imageId: string) => {
    switch (manage) {
      case "image":
        dispatch(
          createImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: false }
          })
        );
        break;

      case "customization-image":
        dispatch(
          createCustomizationImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: false }
          })
        );
        break;

      case "identification-image":
        dispatch(
          createIdentificationImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: false }
          })
        );
        break;

      case "issue-image":
        dispatch(
          createIssueImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: false }
          })
        );
        break;

      case "review-image":
        dispatch(
          createReviewImageAction.updateDocument({
            documentId: imageId,
            updateData: { isDeleted: false }
          })
        );
        break;

      default:
        break;
    }
  };

  const handleRestoreImages = () => {
    switch (manage) {
      case "image":
        dispatch(
          createImageAction.restoreDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "customization-image":
        dispatch(
          createCustomizationImageAction.restoreDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "identification-image":
        dispatch(
          createIdentificationImageAction.restoreDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "issue-image":
        dispatch(
          createIssueImageAction.restoreDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      case "review-image":
        dispatch(
          createReviewImageAction.restoreDocuments({
            documentIds: selectedImageIds
          })
        );
        break;

      default:
        break;
    }
  };

  // side effects
  useEffect(() => {
    if (status === "idle") {
      switch (manage) {
        case "image":
          dispatch(createFolderAction.fetchDocumentList());
          dispatch(createImageAction.fetchDocumentList());
          break;

        case "customization-image":
          dispatch(createCustomizationImageAction.fetchDocumentList());
          break;

        case "identification-image":
          dispatch(createIdentificationImageAction.fetchDocumentList());
          break;

        case "issue-image":
          dispatch(createIssueImageAction.fetchDocumentList());
          break;

        case "review-image":
          dispatch(createReviewImageAction.fetchDocumentList());
          break;

        default:
          break;
      }
    }
  }, [manage, status, dispatch]);

  useEffect(() => {
    if (notifications.length) {
      notifications.forEach((notification) => {
        toast({
          title: notification.type.toUpperCase(),
          description: notification.message,
          variant:
            notification.type === "error"
              ? "destructive"
              : notification.type === "success"
                ? "success"
                : "warning"
        });
      });

      switch (manage) {
        case "image":
          dispatch(createImageAction.resetNotifications());
          break;

        case "customization-image":
          dispatch(createCustomizationImageAction.resetNotifications());
          break;

        case "identification-image":
          dispatch(createIdentificationImageAction.resetNotifications());
          break;

        case "issue-image":
          dispatch(createIssueImageAction.resetNotifications());
          break;

        case "review-image":
          dispatch(createReviewImageAction.resetNotifications());
          break;

        default:
          break;
      }
    }
  }, [manage, notifications, toast, dispatch]);

  useEffect(() => {
    setOffset(0);
    setShowAlt(false);

    if ("onChangeShowingDeletedImages" in props) {
      props.onChangeShowingDeletedImages(showBin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBin]);

  useEffect(() => {
    setSelectedImageIds([]);
  }, [enableSelection]);

  useEffect(() => {
    if (asPopup) {
      props.onSelect(selectedImageIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIds]);

  useEffect(() => {
    if (!count && offset) {
      setOffset(0);
    }

    setSelectedImageIds((prevSelectedImageIds) =>
      [...prevSelectedImageIds].filter((id) =>
        imageDocuments.find(({ _id }) => _id === id)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, imageDocuments]);

  return (
    <div
      className={`grid grid-cols-1 !z-0 ${withFolders ? (asPopup ? "sm:grid-cols-[60px_1fr]" : "sm:grid-cols-[44px_1fr]") : ""}`}
    >
      {withFolders && (
        <div className="row-span-2 grid place-items-stretch justify-center max-sm:hidden">
          <div className="w-px bg-charcoal-3/25" />
        </div>
      )}
      <ImageManagementImagesHeader
        userName={userName}
        asPopup={asPopup}
        manage={manage}
        withFolders={withFolders}
        selectedFolderId={withFolders ? props.selectedFolderId : ""}
        showAddIcon={
          manage === "image" || manage === "identification-image"
            ? Boolean(permission?.create)
            : false
        }
        showAltIcon={manage === "image"}
        showBinIcon={!asPopup && Boolean(isSuperAdmin)}
        showBin={showBin}
        showAlt={showAlt}
        isSelected={Boolean(selectedImageIds.length)}
        enableSelection={enableSelection}
        onUpload={handleUpload}
        onRefresh={handleRefresh}
        onToggleShowBin={() => {
          setShowBin((prevShowBin) => !prevShowBin);
        }}
        onToggleEnableSelection={() => {
          setEnableSelection((prevEnableSelection) => !prevEnableSelection);
        }}
        onToggleShowAlt={() => {
          setShowAlt((prevShowAlt) => !prevShowAlt);
        }}
        onTrashSelection={handleTrashImages}
        onRestoreSelection={handleRestoreImages}
        onDeleteSelection={handleDeleteImages}
      />
      <ImageManagementImagesList
        asPopup={asPopup}
        manage={manage}
        showUpdate={manage === "image" ? Boolean(permission?.update) : false}
        showDelete={Boolean(permission?.delete)}
        showingDelete={showBin}
        showingAlt={showAlt}
        enableSelection={enableSelection}
        images={imageDocuments}
        selectedImageIds={selectedImageIds}
        onSelectImage={handleSelectImage}
        onDeleteImage={showBin ? handleDeleteImage : handleTrashImage}
        onRestoreImage={handleRestoreImage}
        onUpdateAlt={handleUpdateAlt}
      />
      <TableLayoutPagination
        count={count}
        offset={offset}
        limit={INITIAL_IMAGE_LIMIT}
        onChangeOffset={setOffset}
      />
    </div>
  );
}
