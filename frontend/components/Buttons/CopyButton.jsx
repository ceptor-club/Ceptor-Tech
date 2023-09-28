import IImage from "next/image";

const CopyButton = ({ selectedImage }) => {
  const grayDisable = selectedImage
    ? "grayscale-0 cursor-pointer"
    : "grayscale opacity-50";

  function copyImageToClipboard(selectedImage) {
    // Create a new image element
    const img = new Image();
    // Set the source of the image
    img.src = selectedImage;

    // When the image is loaded
    img.onload = () => {
      //   const imageBlob = new Blob([selectedImage], { type: "image/png" });
      // Use the Clipboard API to write the image data to the clipboard
      //   console.log("image blob", imageBlob);
      navigator.clipboard.write([
        new ClipboardItem({
          //   [imageBlob.type]: imageBlob,
          [selectedImage.type]: selectedImage,
        }),
      ]);

      // Alert the user that the image has been copied
      alert("Image copied to clipboard!");
    };
  }

  return (
    <>
      <a
        onClick={() => {
          try {
            // navigator.clipboard.write([
            //   // clipboard item with the selected image

            //   new ClipboardItem({
            //     selectedImage: pngImageBlob,
            //   }),
            // ]);
            copyImageToClipboard(selectedImage);
          } catch (error) {
            console.error(error);
          }
        }}
        className={`${grayDisable} grid grid-cols-1 grid-rows-2 text-black text-4xl mt-6`}
      >
        <IImage
          src="/images/Buttons/copy-btn.svg"
          alt="button-image"
          width={260}
          height={201}
          className="col-span-full row-span-full self-center"
        />
        <p className="flex items-end justify-center col-span-full row-start-1 p-1">
          COPY
        </p>
        <div className="flex justify-center content-center col-span-full row-start-2 row-end-3 mb-4">
          <div className="flex items-center mr-2">
            <IImage
              src="/images/Buttons/copy-icon.svg"
              alt="button-image"
              width={20}
              height={20}
            />
          </div>
          <p className="flex items-center text-xl">COPY TO CLIPBOARD</p>
        </div>
      </a>
    </>
  );
};

export default CopyButton;
