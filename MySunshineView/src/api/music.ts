
import request from '../utils/request';

/**
 * 获取歌曲列表
 *
 * @param data
 */
export const getSongList = () => {
  return request({
    url: '/music/musicList',
    method: 'get',
  })
}

