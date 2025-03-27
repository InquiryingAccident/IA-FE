import axiosInstance from './axios';

const getFlight = async (ident: string) => {
  const formData = new FormData();
  formData.append('flightNumber', ident);
  const {data} = await axiosInstance.post(
    '/api/plane/registration/search',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

const getModel = async (modelCode: string) => {
  const formData = new FormData();
  formData.append('modelCode', modelCode);
  const {data} = await axiosInstance.post(
    '/api/plane/type/model-code',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export {getModel, getFlight};
