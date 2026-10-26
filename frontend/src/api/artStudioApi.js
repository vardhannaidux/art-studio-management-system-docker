import axiosInstance from './axiosInstance';

/**
 * Service for communicating with the ArtStudioService REST API.
 * Endpoints correspond directly to com.klef.soa.docker.controller.ArtStudioController:
 * - GET    /artstudio/displayall
 * - GET    /artstudio/{id}
 * - POST   /artstudio/add
 * - PUT    /artstudio/update/{id}
 * - DELETE /artstudio/delete/{id}
 */
export const artStudioApi = {
  /**
   * Retrieve all art studios.
   * @returns {Promise<Array<{id: number, studioName: string, ownerName: string, monthlyRent: number, active: boolean}>>}
   */
  async getAllStudios() {
    const response = await axiosInstance.get('/artstudio/displayall');
    return response.data;
  },

  /**
   * Retrieve a single art studio by primary key ID.
   * @param {number|string} id
   * @returns {Promise<{id: number, studioName: string, ownerName: string, monthlyRent: number, active: boolean}>}
   */
  async getStudioById(id) {
    const response = await axiosInstance.get(`/artstudio/${id}`);
    return response.data;
  },

  /**
   * Create a new art studio record.
   * @param {{studioName: string, ownerName: string, monthlyRent: number|string, active: boolean}} data
   * @returns {Promise<{id: number, studioName: string, ownerName: string, monthlyRent: number, active: boolean}>}
   */
  async createStudio(data) {
    // Ensure monthlyRent is sent as numeric/decimal
    const payload = {
      studioName: data.studioName?.trim(),
      ownerName: data.ownerName?.trim(),
      monthlyRent: Number(data.monthlyRent),
      active: Boolean(data.active),
    };
    const response = await axiosInstance.post('/artstudio/add', payload);
    return response.data;
  },

  /**
   * Update an existing art studio record by ID.
   * @param {number|string} id
   * @param {{studioName: string, ownerName: string, monthlyRent: number|string, active: boolean}} data
   * @returns {Promise<{id: number, studioName: string, ownerName: string, monthlyRent: number, active: boolean}>}
   */
  async updateStudio(id, data) {
    const payload = {
      studioName: data.studioName?.trim(),
      ownerName: data.ownerName?.trim(),
      monthlyRent: Number(data.monthlyRent),
      active: Boolean(data.active),
    };
    const response = await axiosInstance.put(`/artstudio/update/${id}`, payload);
    return response.data;
  },

  /**
   * Delete an existing art studio record by ID.
   * Backend returns HTTP 204 No Content.
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  async deleteStudio(id) {
    await axiosInstance.delete(`/artstudio/delete/${id}`);
  },
};

export default artStudioApi;
