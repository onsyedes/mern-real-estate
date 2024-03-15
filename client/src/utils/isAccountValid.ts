const isAccountValid = (response: Response) => {
  if (response.status === 404) {
    return false;
  }
  return true;
};
export default isAccountValid;
