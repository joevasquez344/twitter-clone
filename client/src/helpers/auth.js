export const checkForUserInStorage = () => {
  let user = JSON.parse(localStorage.getItem('userDetails'));



  console.log('PARSED USER: ', user);

  if (user) return user;
  else return null;
};
