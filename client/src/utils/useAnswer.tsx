import axios from 'axios';

const useAnswer = (URL: string, data: string) => {
  const post = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER + URL, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return post;
};

export default useAnswer;
