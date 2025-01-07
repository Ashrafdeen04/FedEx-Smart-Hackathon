const baseUrl = 'http://slc.selectoptimus.com:43508/RestService.svc';

import axios from 'axios';
export default {
  GetWaitingVehicles(token) {
    return axios.get(`${baseUrl}/GetWaitingVehicles?token=${token}`);
  },
  GetEntries(token, FilterDate) {
    return axios.get(
      `${baseUrl}/GetEntries?token=${token}&filterDate=${FilterDate}`,
    );
  },
  AddEntry(token, entry) {
    return axios.post(`${baseUrl}/AddEntry?token=${token}`);
  },
  GetEntry(token, entryId) {
    return axios.get(`${baseUrl}/GetEntry?token=${token}&entryId=${entryId}`);
  },
  AddFileAttachment(token, entryId, fileAttachment) {
    return axios.post(
      `${baseUrl}/AddFileAttachment?token=${token}&entryId=${entryId}`,
    );
  },
  DeleteFileItem(token, fileId) {
    return axios.get(
      `${baseUrl}/DeleteFileItem?token=${token}&fileId=${fileId}`,
    );
  },
  GetEntryFiles(token, entryId) {
    return axios.get(
      `${baseUrl}/GetEntryFiles?token=${token}&entryId=${entryId}`,
    );
  },
  GetEntryFile(token, fileId) {
    return axios.get(
      `${baseUrl}/GetEntryFile?token=${token}&entryId=${fileId}`,
    );
  },
  GetSuppliers(token) {
    return axios.get(`${baseUrl}/GetSuppliers?token=${token}`);
  },
  GetHKCins(token) {
    return axios.get(`${baseUrl}/GetHKCins?token=${token}`);
  },
  GetWarehouses(token) {
    return axios.get(`${baseUrl}/GetWarehouses?token=${token}`);
  },
  GetExpers(token) {
    return axios.get(`${baseUrl}/GetExpers?token=${token}`);
  },
};
