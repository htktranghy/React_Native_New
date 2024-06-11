import ApiManager from './ApiManager';

export const user_dangnhap = async (data:any) => {
  try {
    const result = await ApiManager('/api/jwt/Login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });

    return result;
  } catch (error:any) {
    return error.response.data;
  }
};
