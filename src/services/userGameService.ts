import request from "@/services/axios/request";

/**
 * @dec 获取属于用户或用户可编辑的游戏
 * @param id 获取的具体游戏id
 */
async function getUserGame(id?: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const params = { id };
  const { data } = await request.post("/getMyGame", params, config);
  return data;
}
/**
 * @desc 向服务器请求创建新游戏
 * @param info 新游戏信息
 */
async function createGame(info: any) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data } = await request.post("/createGame", info, config);
  return data;
}

export { getUserGame, createGame };
export default { getUserGame, createGame };
