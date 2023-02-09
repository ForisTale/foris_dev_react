
const getCSRFToken = () => {
  let token = "";
  let allCookies = (
      (document.getElementsByName("csrfmiddlewaretoken") as unknown) as HTMLInputElement[]
  );
  if (allCookies.length) {
    token = allCookies[0].value;
  }
  console.log("getCSRFToken can be only use by django server!");
  return token;
};

export default getCSRFToken;