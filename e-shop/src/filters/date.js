export default function (timeStamp) {
    const date = new Date(timeStamp * 1000);
    // 後端固定回傳 UTC+0 前端自行轉換為當地時區
    // 回傳格式 "2019/10/11"
    return date.toLocaleDateString();
  }
