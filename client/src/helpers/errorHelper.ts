export const errorHelper = (isError: boolean, error: any) => {
  let errorMessage = "";
  if (isError) {
    if ("data" in (error as any) && (error as any).data.message) {
      errorMessage = (error as any).data.message;
    } else {
      errorMessage = "error occured";
    }
  }
  return errorMessage;
};
