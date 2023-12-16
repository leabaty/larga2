import { FormContactValues, FormReservationValues } from 'FormTypes';
import axios from 'axios';

const usePost = (URL: string, data: FormContactValues | FormReservationValues) => {
  const post = async () => {
    try {
      console.log('UsePost try');
      console.log(process.env.REACT_APP_SERVER + URL);
      console.log(data);

      const response = await axios.post(process.env.REACT_APP_SERVER + URL, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return post;
};

export default usePost;
