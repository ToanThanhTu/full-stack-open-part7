import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    config,
  );
  return response.data;
};

const comment = async (blogObject, comment) => {
  const commentObj = {
    content: comment
  }

  const response = await axios.post(
    `${baseUrl}/${blogObject.id}/comments`,
    commentObj,
  );

  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  setToken,
  update,
  comment,
  deleteBlog,
};
