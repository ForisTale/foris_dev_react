
const getCSRFToken = () => {
  let allCookies = document.getElementsByName("csrfmiddlewaretoken");
  if (allCookies.length) {
    return allCookies[0].value;
  }
  console.log("getCSRFToken can be only use by django server!");
  return "";
};

export default getCSRFToken;