import { FormContactValues, FormBookingValues } from 'FormTypes';
import axios from 'axios';

export const usePost = (URL: string, data: FormContactValues | FormBookingValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const post = async () => {
    try {
      setLoading(true);
      const response = await axios.post(process.env.REACT_APP_SERVER + URL, data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw error;
    }
  };

  return post;
};
