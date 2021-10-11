const regex = /^[0-9a-z-]{3,10}$/;

const isValidSubdomain = (subdomain) => {
  return regex.test(subdomain);
};

export default isValidSubdomain;
