import axios from 'axios';
import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://ss-company.free.beeceptor.com';

export const addNewCompany = async (): Promise<NextResponse>  => {
  return axios.post(`${API_BASE_URL}`);
};