const localSessionKey = "SessionID";
const localTokenKey = "TOKEN";
const localRefreshTokenKey = "RefreshToken";

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
    localStorage.removeItem(localSessionKey);
  },
  /**
   * @desc 获取localToken
   */
  getToken() {
    return localStorage.getItem(localTokenKey);
  },
  /**
   * @desc 更改localToken
   * @param value 更改的值
   */
  setToken(value: string) {
    localStorage.setItem(localTokenKey, value);
  },
  /**
   * @desc 删除localToken
   */
  removeToken() {
    localStorage.removeItem(localTokenKey);
  },
  /**
   * @desc 获取localRefreshToken
   */ getRefreshToken() {
    return localStorage.getItem(localRefreshTokenKey);
  },
  /**
   * @desc 更改localRefreshToken
   * @param value 更改的值
   */
  setRefreshToken(value: string) {
    localStorage.setItem(localRefreshTokenKey, value);
  },
  /**
   * @desc 删除localRefreshToken
   */
  removeRefreshToken() {
    localStorage.removeItem(localRefreshTokenKey);
  },
};
