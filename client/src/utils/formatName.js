const formatName = (text) => {
  if (text.includes(" ")) {
    return text?.slice(text.lastIndexOf(" "), text.length);
  } else {
    return text;
  }
};

export default formatName;
