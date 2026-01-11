// icons
import { ImageUpIcon } from "lucide-react";

// hooks
import { useState } from "react";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";
import { useToast } from "@/components/ui/use-toast";

// components
import ContentCustomizeUploadImageUpload from "./ContentCustomizeUploadImageUpload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Submit from "@/lib/Forms/Submit_Reset/Submit";

// types
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { type SelectedImages } from "@/lib/Forms/FileSelect/static/types";
import { useAppStates } from "@/hooks/useAppState/useAppState";

export default function ContentCustomizeUploadImageForm({
  contentName,
  limit,
  onUpload
}: {
  contentName: string;
  limit: number;
  onUpload: (images: CustomizationImageDocument[]) => void;
}) {
  // hooks
  const {
    auth: {
      data: { userName }
    }
  } = useAppStates();
  const { toast } = useToast();

  // states
  const [selectedImages, setSelectedImages] = useState<
    CustomizationImageDocument[]
  >([]);

  // event handlers
  const handleSelectImages = (selectedImages: SelectedImages[]) => {
    setSelectedImages(
      selectedImages.map(
        ({ extension, width, height, size, data }) =>
          ({
            data,
            extension,
            width,
            height,
            size,
            contentName,
            createdBy: userName || "User",
            updatedBy: userName || "User"
          }) as CustomizationImageDocument
      )
    );
  };

  const handleUpload = () => {
    if (!selectedImages.length) {
      toast({
        title: "WARNING",
        description: "No Images Selected",
        variant: "warning"
      });

      return;
    }

    onUpload(selectedImages);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <section
          className={`flex items-center justify-end ${!limit ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className="flex gap-1 px-4 py-2 bg-black text-white font-medium rounded-lg cursor-pointer">
            <div className="flex items-center justify-center ">
              <ImageUpIcon
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </div>
            <div className="text-sm">Upload Images</div>
          </div>
        </section>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[600px] md:min-w-[760px] flex flex-col justify-start gap-0 overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <span className="text-2xl font-light pb-3">Select Images</span>
        <div>
          <ContentCustomizeUploadImageUpload
            name="images"
            isRequired={false}
            limit={limit}
            showEmptyFieldError={false}
            onImagesSelect={handleSelectImages}
          />
          <div className="flex items-center justify-end *:w-fit gap-x-5">
            <div
              className="hover:underline hover:underline-offset-2 px-4 cursor-pointer"
              onClick={() => {
                setSelectedImages([]);
              }}
            >
              Reset
            </div>
            <DialogClose>
              <Submit
                masked
                label="Upload"
                onClick={handleUpload}
              />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
