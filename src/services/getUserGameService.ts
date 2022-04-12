import request from "@/services/axios/request";

export default {
  /**
   * @dec 获取属于用户或用户可编辑的游戏
   * @param id 获取的具体游戏id
   */
  async getGame(id?: number) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const params = { id };
    const { data } = await request.post("/getMyGame", params, config);
    return data;
  },
};
