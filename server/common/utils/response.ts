const apiResponse: object = (
  success: boolean,
  statusCode: number,
  message: string,
  data: any
) => {
  return {
    success,
    statusCode,
    message,
    data,
  };
};

export default apiResponse;
