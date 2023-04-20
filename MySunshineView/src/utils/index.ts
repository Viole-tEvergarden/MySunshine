/**
 * 将秒数转换为 `mm:ss` 格式的时间字符串
 * @param {number} seconds - 要转换的秒数
 * @returns {string} - 格式化后的时间字符串
 */
export const secondsToMinutes = function (seconds:number):string {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0'); // 计算整数分钟数并转为字符串
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0'); // 计算剩余秒数并转为字符串

  return `${minutes}:${remainingSeconds}`; // 返回格式化后的时间字符串
}