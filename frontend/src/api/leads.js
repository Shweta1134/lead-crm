import axios from 'axios';

// CRA proxy in package.json handles forwarding to localhost:5000
const BASE = '/api/leads';

export const getLeads = (params) => axios.get(BASE, { params });
export const getStats = () => axios.get(`${BASE}/stats`);
export const createLead = (data) => axios.post(BASE, data);
export const updateLead = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deleteLead = (id) => axios.delete(`${BASE}/${id}`);
