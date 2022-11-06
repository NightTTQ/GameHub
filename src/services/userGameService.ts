import request from "@/services/axios/request";
const api = {
  userGame: "/user/game",
  createGame: "/game/create",
  updateGame: "/game/update",
};

/**
 * @dec 获取属于用户或用户可编辑的游戏
 * @param id 获取的具体游戏id
 */
async function getUserGame(id?: number) {
  const params = { id: id };
  const { data } = await request.get(api.userGame, { params: params });
  return data;
}
/**
 * @desc 向服务器请求创建新游戏
 * @param info 新游戏信息
 */
async function createGame(info: any) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = info;
  const { data } = await request.post(api.createGame, body, config);
  return data;
}
/**
 * @dec 向服务器请求更新游戏信息
 * @param id 需要修改的游戏id
 * @param info 需要更新的信息
 */
async function updateGame(id: number, info: object) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = info;
  const { data } = await request.patch(`${api.updateGame}/${id}`, body, config);
  return data;
}

export { getUserGame, createGame, updateGame };
export default { getUserGame, createGame, updateGame };
