import axios from "axios";
const apiLink = "https://qcnnig.api.cloudendpoint.cn/getGame";
const apiConfig = {
  headers: { "Content-Type": "application/json" },
};

export default {
  async getInfo({
    _id,
    id,
    skip,
    limit,
    where,
  }: {
    _id?: number;
    id?: number;
    skip?: number;
    limit?: number;
    where?: any;
  }) {
    for (const item in where) {
      if (where[item].length === 0) delete where[item];
    }
    const params = {
      _id: _id,
      id: id,
      skip: skip,
      limit: limit,
      where: where,
    };

    // return params;
    const { data } = await axios
      .post(apiLink, params, apiConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return data;
  },
};
