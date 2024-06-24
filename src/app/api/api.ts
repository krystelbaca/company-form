import axios from 'axios';

const API_BASE_URL = 'https://ss-company.free.beeceptor.com';

export const addNewCompany = async (formData: any): Promise<any>  => {
  return axios.post(`${API_BASE_URL}/company`, formData);
};