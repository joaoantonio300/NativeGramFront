import { api, requestConfig } from "../utils/config";

// Publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/photos", config).then((res) => res.json());

    return res;
  } catch (error) {
    ("Network request failed");
  }
};

// Get user photos

const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/user/" + id, config).then((res) =>
      res.json()
    );

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

// Delete a photo
const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => "Network request failed");

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

// Update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => "Network request failed");

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

// Get a photo by id
const getPhoto = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => "Network request failed");

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

// Like a photo
const like = async (id, token) => {
  const config = requestConfig("PUT", null, token);

  try {
    const res = await fetch(api + "/photos/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => "Network request failed");

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

// Add comment to a photo
const comment = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => "Network request failed");

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

// Get all photos
const getPhotos = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => v);

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

// Seach p hoto by title
const searchPhotos = async (query, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/search?q" + query, config)
      .then((res) => res.json())
      .catch((err) => "Network request failed");

    return res;
  } catch (error) {
    return "Network request failed";
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
  comment,
  getPhotos,
  searchPhotos,
};

export default photoService;
