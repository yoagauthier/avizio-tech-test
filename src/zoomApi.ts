import axios, { Axios } from 'axios';

/**
 * Note : This class is not used as it is not possible to call the Zoom API using
 * a JWT because of CORS issues.
 */
class ZoomAPI {
  private axiosInstance: Axios;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://localhost:5000/',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_ZOOM_JWT}`,
      },
    });
  }

  async createMeeting(startAt: string) {
    try {
      await this.axiosInstance.post('/users/me/meetings', {
        startAt,
      });
    } catch (e) {
      console.error('Issue creating the meeting on the Zoom API', e);
    }
  }
}
export default ZoomAPI;
