import React, { useRef, useState } from "react";
import { ErrorMessage, Loading, RadialProgress } from "..";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useAppDispatch } from "../../app/hooks";
import { userUpdateSuccess } from "../../features/userSlice";
import useFetch from "../../app/custom-hooks/useFetch";
import { User } from "../../../types";
type ProfileInfoFormProps = {
  user: User | null;
};

const ProfileInfoForm = ({ user }: ProfileInfoFormProps) => {
  const { fetchData } = useFetch<{ message: string }>();

  const dispatch = useAppDispatch();
  const [file, setfile] = useState<File | undefined>(undefined);

  const [username, setusername] = useState(user?.username);

  const [error, seterror] = useState({ username: "", avatar: "" });
  const [isBtnDisabled, setisBtnDisabled] = useState(false);
  const displayAvatar = file ? URL.createObjectURL(file) : user?.avatar;

  const handleFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = user?._id + ".jfif";

      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress >= 100) setisBtnDisabled(false);
        },
        () => {
          reject("File Type or size not supported");
          // seterror({ ...error, avatar: "File Type or size not supported" });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              resolve(downloadUrl);
            })
            .catch(reject);
        }
      );
    });
  };

  const onInputChange = (file: File) => {
    if (!file.name.match(/\.(jpg|jpeg|png|gif|jfif)$/i)) {
      seterror({ ...error, avatar: "File Type not supported" });
    } else {
      seterror({ ...error, avatar: "" });
      setfile(file);
    }
  };
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 0) {
      seterror({ ...error, username: "Username is required" });
      setisBtnDisabled(true);
    } else {
      seterror({ ...error, username: "" });
      setusername(e.target.value);
      setisBtnDisabled(false);
    }
  };
  const handleProfileFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setisBtnDisabled(true);

    let avatarUrl = null;
    if (file) {
      avatarUrl = await handleFileUpload(file);
    }

    const url = `/api/users/update/${user?._id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        avatar: avatarUrl,
      }),
    };

    const { data: responseData, error: fetchError } = await fetchData(
      url,
      options
    );

    if (!fetchError) {
      dispatch(userUpdateSuccess(responseData));
    }

    setisBtnDisabled(false);
  };

  return (
    <form className="card-body" onSubmit={handleProfileFormSubmit}>
      <div className=" px-4 ">
        <div className="text-center my-4">
          {file ? (
            <RadialProgress file={file}>
              <ProfileImageUploadContent
                image={displayAvatar}
                onInputChange={onInputChange}
              />
            </RadialProgress>
          ) : (
            <ProfileImageUploadContent
              image={user?.avatar || file}
              onInputChange={onInputChange}
            />
          )}
          <div className="py-2">
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
              {user?.username}
            </h3>
          </div>
          {error.avatar && <ErrorMessage message={error.avatar} />}
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          defaultValue={user?.username}
          onChange={onUsernameChange}
          type="text"
          placeholder="username"
          className="input input-bordered"
        />
        {error.username && <ErrorMessage message={error.username} />}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          placeholder={user?.email}
          className={`input input-bordered `}
          disabled
        />
      </div>

      <div className="form-control mt-6">
        <button
          className="btn btn-outline btn-primary "
          type="submit"
          disabled={isBtnDisabled}
        >
          {isBtnDisabled ? <Loading /> : "Confirm"}
        </button>
      </div>
    </form>
  );
};

/* Profile Image Content */
type ProfileImageUploadContentProps = {
  onInputChange: (file: File) => void;
  image: string | undefined;
};
const ProfileImageUploadContent = ({
  onInputChange,
  image,
}: ProfileImageUploadContentProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const onImageClick = () => {
    if (imageRef.current) imageRef.current.click();
  };
  const onInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onInputChange(e.target.files[0]);
  };

  return (
    <div className="z-10">
      <input
        type="file"
        accept="image/*"
        ref={imageRef}
        onChange={onInputChange1}
        hidden
      />
      <img
        className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4 object-cover cursor-pointer"
        src={image}
        alt="user image"
        onClick={onImageClick}
      />
    </div>
  );
};
export default ProfileInfoForm;
