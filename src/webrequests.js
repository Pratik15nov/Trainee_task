import axios from "axios";




export const post = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      console.log(response);
  
      if (response) {
        return response
       
      }
    } catch (err) {
      console.log(err);
  
      return err;
    }
}