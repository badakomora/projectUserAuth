export const LogoutUser = () => {
  localStorage.removeItem("email");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
