import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";

const DraggableImage = ({
  image,
  index,
  handleImageDrop,
  selected,
  handleCheckboxChange,
}) => {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);

  // Drag and drop functionality
  // Dragging configuration
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { type: "IMAGE", index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop configuration
  const [, drop] = useDrop({
    accept: "IMAGE",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      handleImageDrop(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref)); // Attaching drag and drop to the DOM element

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <div
      key={index}
      ref={ref}
      className="relative cursor-pointer"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image}
        alt={`Image ${index + 1}`}
        style={{
          width: "100%",
          height: "auto",
          transition: "transform 0.3s ease-in-out",
          transform: isDragging ? "scale(0.75)" : "scale(1)",
        }}
        className="border-2 border-gray-600 rounded-lg"
      />

      {(isHover || selected) && (
        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50 cursor-pointer rounded-lg">
          <input
            type="checkbox"
            checked={selected}
            className="absolute top-2 left-2 w-5 h-5 cursor-pointer"
            onChange={(e) => handleCheckboxChange(image, e.target.checked)}
          />
        </div>
      )}
    </div>
  );
};

export default DraggableImage;
