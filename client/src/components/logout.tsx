export const LogoutUser = () => {
  localStorage.removeItem("phone");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
