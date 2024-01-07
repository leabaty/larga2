import { FormContactValues, FormBookingValues } from 'FormTypes';
import axios from 'axios';

export const usePost = (URL: string, data: FormContactValues | FormBookingValues) => {
  const post = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER + URL, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return post;
};
