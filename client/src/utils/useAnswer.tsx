import axios from 'axios';

const useAnswer = () => {
  const sendPostRequest = async (URL: string, id: string): Promise<void> => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}${URL}/${id}`);
    } catch (error) {
      console.error('Error during post:', error);
      throw error;
    }
  };

  return { sendPostRequest };
};

export default useAnswer;
