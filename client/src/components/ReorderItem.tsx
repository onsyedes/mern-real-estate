import React from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Grip, X } from "lucide-react";
import { FilesListType } from "../pages/CreateListing";
type DragTriggerProps = {
  item: FilesListType;
  onFileRemove: (index: number) => void;
  index: number;
};
const ReorderItem = ({ item, onFileRemove, index }: DragTriggerProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item.preview}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className="reorder-handle bg-gray-100 "
        onPointerDown={(e) => controls.start(e)}
      >
        <div className="flex justify-between p-3 border border-gray-400 items-center rounded-lg mb-1">
          <div
            className="cursor-pointer"
            onPointerDown={(event) => controls.start(event)}
          >
            <Grip />
          </div>
          <img
            src={item.preview}
            alt="listing image"
            className="max-h-24  rounded-md"
          />

          <button
            onClick={() => onFileRemove(index)}
            type="button"
            className="p-3 text-red-700  hover:scale-125"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
};

export default ReorderItem;
