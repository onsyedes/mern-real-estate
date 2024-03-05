import React from "react";
import { toast } from "react-toastify";

const Home = () => {
  const notify = () =>
    toast.success("Success Notification !", {
      position: "top-center",
    });

  return (
    <div>
      <button onClick={notify}>hello</button>
    </div>
  );
};

export default Home;
