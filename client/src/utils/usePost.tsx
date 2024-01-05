import { FormContactValues, FormBookingValues } from 'FormTypes';
import axios from 'axios';

const usePost = (URL: string, data: FormContactValues | FormBookingValues) => {
  const post = async () => {
    try {
      await axios.post(process.env.REACT_APP_SERVER + URL, data);
    } catch (error) {
      console.error(error);
    }
  };

  return post;
};

export default usePost;
