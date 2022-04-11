import request from "@/services/axios/request";
const config = {
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
    _id?: number | string;
    id?: number | string;
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

    const { data } = await request.post("/getGame", params, config);
    return data;
  },
};
