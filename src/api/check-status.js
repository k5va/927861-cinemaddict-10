const ResponseCodes = {
  SUCCESS: 200
};

const checkStatus = (response) => {
  if (response.status === ResponseCodes.SUCCESS) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

export {checkStatus};
