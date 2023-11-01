import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableImage from "../components/DraggableImage";
import { InitialImages } from "../images";

const ImageGallery = () => {
  const [images, setImages] = useState(InitialImages);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // Logic for handling checkbox change
  const handleCheckboxChange = (image, target) => {
    if (target) {
      setIsChecked(true);
      setSelectedImages((prevSelected) => [...prevSelected, image]);
    } else {
      const updatedSelected = selectedImages.filter(
        (selected) => selected !== image
      );
      setSelectedImages(updatedSelected);
      setIsChecked(updatedSelected.length > 0); // Check if any images are still selected
    }
  };

  // Logic for deleting selected images
  const handleDelete = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image)
    );
    setImages(updatedImages);
    setSelectedImages([]); // Clear selected images after deletion
    setIsChecked(false);
  };

  // Logic for handling image drop in gallery
  const handleImageDrop = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    const newImages = [...images];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    setImages(newImages);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center py-3 px-3 sm:px-8 border-2 border-gray-950 rounded-lg mb-2">
        {isChecked ? (
          <>
            <div className="flex justify-start items-center gap-3">
              <input type="checkbox" checked className="w-4 h-4" />
              <h2>{`${selectedImages.length} File Selected`}</h2>
            </div>

            <button className="text-red-600 font-medium" onClick={handleDelete}>
              Delete Files
            </button>
          </>
        ) : (
          <h2>Gallery</h2>
        )}
      </div>

      {/* Rendering the draggable images */}
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={index === 0 ? "col-span-2 row-span-2" : ""}
            >
              <DraggableImage
                key={index}
                image={image}
                index={index}
                handleImageDrop={handleImageDrop}
                selected={selectedImages.includes(image)}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default ImageGallery;
