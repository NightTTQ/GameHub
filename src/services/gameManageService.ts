import request from "@/services/axios/request";

export default {
  /**
   * @desc 向服务器请求创建新游戏
   * @param info 新游戏信息
   */
  async createGame(info: any) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await request.post("/createGame", info, config);
    return data;
  },
};
