"use client";

import { useToast } from "@/components/ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { dataUrl, getImageSize } from "@/lib/utils";
import Image from "next/image";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  image: any;
  publicId: string;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prev: any) => ({
      ...prev,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Image Uploaded Successfully.",
      description: "1 Credit was deducted from your account.",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onUploadErrorHandler = (error: any) => {
    toast({
      title: "Something went wrong while uploading.",
      description: "Please try again.",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="senpai_imaginify"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original Image</h3>

          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cld-image"
                />
              </div>
            </>
          ) : (
            <>
              <div className="media-uploader_cta" onClick={() => open()}>
                <div className="media-uploader_cta-image">
                  <Image
                    src="/assets/icons/add.svg"
                    width={20}
                    height={20}
                    alt="Add"
                  />
                </div>
                <p className="p-4-medium">
                  Click here to upload an image. (Max size: 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
