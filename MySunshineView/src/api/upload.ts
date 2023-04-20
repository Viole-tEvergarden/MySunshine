import request from '../utils/request';

/**
 * 新增歌曲
 *
 * @param data
 */
export const addSong = (data) => {
  return request({
    url: '/music/addMusic',
    method: 'post',
    data
  })
}

