import axios from 'axios';

const BASE = 'https://lead-crm-backend-wxwj.onrender.com/api/leads';

export const getLeads = (params) => axios.get(BASE, { params });
export const getStats = () => axios.get(`${BASE}/stats`);
export const createLead = (data) => axios.post(BASE, data);
export const updateLead = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deleteLead = (id) => axios.delete(`${BASE}/${id}`);