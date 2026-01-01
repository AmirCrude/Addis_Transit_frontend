import axios from "../../../utils/Axios";

// reset password api
export const resetPasswordApi = (token, newPassword) => {
  return axios.post("/auth/reset-password", {
    token,
    newPassword,
  });
};

// change password api
export const changePasswordApi = (oldPassword, newPassword) => {
  return axios.post("/auth/change-password", {
    oldPassword,
    newPassword,
  });
};
