const localSessionKey = "SessionID";

export default {
  /**
   * @desc 获取localSession
   */
  getSession() {
    return localStorage.getItem(localSessionKey);
  },
  /**
   * @desc 更改localSession
   * @param value 更改的值
   */
  setSession(value: string) {
    localStorage.setItem(localSessionKey, value);
  },
  /**
   * @desc 删除localSession
   */
  removeSession() {
    return localStorage.removeItem(localSessionKey);
  },
};
