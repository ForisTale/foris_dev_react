
const getCSRFToken = () => {
  let allCookies = document.getElementsByName("csrfmiddlewaretoken");
  return allCookies[0].value;
};

export default getCSRFToken;