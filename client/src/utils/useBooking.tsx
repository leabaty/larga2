import { Booking } from 'ApiTypes/booking';
import axios from 'axios';

const useBooking = () => {
  const sendGetRequest = async (URL: string, id: string): Promise<Booking> => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}${URL}/${id}`);

      // Assuming your response.data has the structure of Booking
      const booking: Booking = response.data;

      return booking;
    } catch (error) {
      console.error(error);
      // You may want to handle error cases here, e.g., throw an error or return a default Booking object
      throw error;
    }
  };

  return { sendGetRequest };
};

export default useBooking;
