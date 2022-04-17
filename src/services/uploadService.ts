import request from "@/services/axios/request";

export default {
  /**
   * @dec 向服务器上传单个文件
   * @param file 需要上传的文件
   * @returns 文件的url
   */
  async upload(file: File) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // 构建 FormData 对象
    const _FormData = new FormData();
    // 添加文件
    _FormData.append("file", file);

    // return params;
    const { data } = await request.post("/uploadFile", _FormData, config);
    return data;
  },
};
