import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
const VerifyToken = () => {
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  const fetchToken = async () => {
    const response = await fetch("/api/auth/activate-account?token=" + token);

    if (response.status != 200) {
      return navigate("/notfound");
    } else {
      return navigate("/sign-in", {
        state: { message: "Account activated succefully, You can login" },
      });
    }
  };
  useEffect(() => {
    fetchToken();
  }, []);

  return <div>VerifyToken</div>;
};

export default VerifyToken;
