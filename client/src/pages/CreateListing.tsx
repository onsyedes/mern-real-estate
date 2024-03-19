import React, { useReducer } from "react";
import { UploadCloud } from "lucide-react";
import { ErrorMessage, ReorderItem } from "../components";
import { Reorder } from "framer-motion";
enum FileActionKind {
  REMOVE = "REMOVE_FILES",
  UPLOAD = "UPLOAD_FILES",
  REORDER = "REORDER_FILES",
}
export type FilesListType = {
  file: File;
  preview: string;
};
type FilesState = {
  filesList: FilesListType[];
  error: string;
};

type FilesAction = {
  type: FileActionKind;
  payload: FilesState | number;
};
function filesReducer(state: FilesState, action: FilesAction): FilesState {
  const { type, payload } = action;
  switch (type) {
    case FileActionKind.REMOVE: {
      const indexToRemove = payload as number;
      const updatedFilesList = [
        ...state.filesList.slice(0, indexToRemove),
        ...state.filesList.slice(indexToRemove + 1),
      ];
      return { ...state, filesList: updatedFilesList };
    }
    case FileActionKind.UPLOAD: {
      const files = payload.filesList.map((file: FilesListType) => file.file);

      if (state.filesList.length >= 6) {
        return {
          ...state,
          error: "You can Upload only 6 images",
        };
      } else {
        const validFiles = files.filter((file: File) => {
          const validExtensions = /\.(jpg|jpeg|png|gif|jfif)$/i;
          return (
            file.type.match(/^image\//) || file.name.match(validExtensions)
          );
        });
        const selectedFiles = Array.from(validFiles).slice(
          0,
          6 - state.filesList.length
        );

        const filesList = selectedFiles.map((file: File) => {
          return {
            file,
            preview: URL.createObjectURL(file as Blob | MediaSource),
          };
        });
        return {
          filesList: state.filesList.concat(filesList),
          error: "",
        };
      }
    }

    case FileActionKind.REORDER: {
      return { ...state, filesList: payload.filesList };
    }
    default: {
      throw Error("Action non reconnue: " + action.type);
    }
  }
}
const CreateListing = () => {
  const [state, dispatchFiles] = useReducer(filesReducer, {
    filesList: [],
    error: "",
  });
  const onReorder = (newValues: FilesListType[]) => {
    dispatchFiles({
      type: FileActionKind.REORDER,
      payload: { ...state, filesList: newValues as FilesListType[] },
    });
  };
  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const filesList = filesArray.map((file) => {
        return { file, preview: "" };
      });
      dispatchFiles({
        type: FileActionKind.UPLOAD,
        payload: { ...state, filesList },
      });
    }
  };
  const onFileRemove = (index: number) => {
    dispatchFiles({ type: FileActionKind.REMOVE, payload: index });
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const filesArray = Array.from(e.dataTransfer.files);
    const filesList = filesArray.map((file) => {
      return { file, preview: "" };
    });
    dispatchFiles({
      type: FileActionKind.UPLOAD,
      payload: { ...state, filesList },
    });
  };
  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full "
          />

          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full max-h-28 textarea-md"
          ></textarea>

          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full "
          />
          <div className="flex gap-4 flex-wrap">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-success"
                />
                <span className=" pl-2">Sell</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-success"
                />
                <span className=" pl-2">Rent</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className=" pl-2">Parking spot</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className=" pl-2">Furnished</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className=" pl-2">Offer</span>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {/* {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )} */}
              </div>
            </div>
            {/* {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>

                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )} */}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div
            className="max-w-xl"
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
          >
            <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <UploadCloud />

                <span className="font-medium text-gray-600">
                  Drop files to Attach, or
                  <span className="text-blue-600 underline pl-2">browse</span>
                </span>
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileUpload}
                multiple
              />
            </label>
          </div>

          <p className="text-red-700 text-sm">
            {state.error && <ErrorMessage message={state.error} />}
          </p>
          <Reorder.Group values={state.filesList} onReorder={onReorder}>
            {state.filesList.map((item, index) => (
              <ReorderItem
                key={item.preview}
                item={item}
                onFileRemove={onFileRemove}
                index={index}
              />
            ))}
          </Reorder.Group>

          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create listing
          </button>
          {/* {error && <p className="text-red-700 text-sm">{error}</p>} */}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
