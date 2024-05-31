import axios from 'axios';

export const fetchData = async (endpoint: string, currentPage: number, pageSize: number) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${endpoint}?page=${currentPage}&size=${pageSize}`);
    return {
      items: response.data.items,
      totalElements: response.data.total_elements,
    };
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const addItem = async (endpoint: string, item: any) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/${endpoint}`, item);
    return response.data;
  } catch (error) {
    console.error(`Error adding ${endpoint}:`, error);
    throw error;
  }
};

export const updateItem = async (endpoint: string, item: any) => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/${endpoint}${item.id}`, item);
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    throw error;
  }
};

export const deleteItem = async (endpoint: string, id: number) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/${endpoint}/${id}`);
  } catch (error) {
    console.error(`Error deleting ${endpoint}:`, error);
    throw error;
  }
};
