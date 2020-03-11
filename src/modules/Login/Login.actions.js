export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const loginSuccess = res => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: res,
    message: "Login Successfull..!"
  };
};

export const loginFail = userObject => {
  return {
    type: USER_LOGIN_FAIL,
    payload: userObject,
    message: "Something went wrong..!"
  };
};
