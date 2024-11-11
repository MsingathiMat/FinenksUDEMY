import axios, { AxiosResponse } from 'axios';

export const MattServerUploader = async (
  endPoint: string,
  formData: FormData
): Promise<AxiosResponse<{ file: string  }>> => {
  try {
    const response = await axios.post<{ file: string }>(endPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response; // Return the entire response object
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('Server Error:', error.response.data);
      throw new Error(
        `Server responded with status ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`
      );
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      // Something happened during the request setup
      console.error('Error:', error.message);
      throw new Error(`Error: ${error.message || 'Unknown error'}`);
    }
  }
};
