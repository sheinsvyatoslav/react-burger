export const BASE_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err));
};

const checkSuccess = (res: { success: boolean } & any) => {
  if (res && res.success) {
    return res;
  }
  throw Error("no data");
};

export const request = async (url: string, options?: RequestInit) => {
  return fetch(url, options).then(checkResponse).then(checkSuccess);
};
