import axios from 'axios';

const API_URL = '/api/moods';

function getAllMoods() {
  return axios.get(`${API_URL}`);
}

function getMoodByDate(date) {
  return axios.get(`${API_URL}/${date}`);
}

function createMood(moodData) {
  return axios.post(`${API_URL}`, moodData);
}

function updateMood(entryId, moodData) {
  return axios.put(`${API_URL}/${entryId}`, moodData);
}

function deleteMood(entryId) {
  return axios.delete(`${API_URL}/${entryId}`);
}

const MoodService = {
  getAllMoods,
  getMoodByDate,
  createMood,
  updateMood,
  deleteMood,
};

export default MoodService;
