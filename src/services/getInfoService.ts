import request from "@/services/axios/request";
const api = { getList: "/game/list", getGame: "/game" };
const config = {
  headers: { "Content-Type": "application/json" },
};

export default {
  async getList({
    skip,
    limit,
    where,
  }: {
    skip?: number;
    limit?: number;
    where?: any;
  }) {
    const { type } = where;
    let typeStr: string | null = "";
    for (const item of type) {
      if (typeStr.length) typeStr = typeStr + "|^" + item;
      else typeStr = typeStr + "^" + item;
    }
    if (!typeStr.length) typeStr = null;
    const params = {
      skip: skip,
      limit: limit,
      type: typeStr,
    };

    const { data } = await request.get(api.getList, { params: params });
    return data;
  },
  async getGame({ id }: { id: number }) {
    const { data } = await request.get(`${api.getGame}/${id}`);
    return data;
  },
};
