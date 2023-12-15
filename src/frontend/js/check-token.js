let user;
let headers = {};

// AccessToken 검사 및 헤더에 추가하는 함수
async function checkAdmin() {
  // 로컬 스토리지에서 AccessToken 가져오기
  const authorization = localStorage.getItem('token');

  try {
    if (authorization) {
      headers.authorization = `Bearer ${localStorage.getItem('token')}`
      const response = await axios.get(server + '/api/users/auth/admin/me', {
		  headers});
      user = response.data.data;
      if (user) {
        return user;
      }
    }
    return false;
  } catch (e) {
    console.log(e);
  }
  // AccessToken이 존재하는지 확인
}

async function checkUser() {
  // 로컬 스토리지에서 AccessToken 가져오기
  const authorization = localStorage.getItem('token');

  try {
    if (authorization) {
      headers.authorization = `Bearer ${localStorage.getItem('token')}`
      const response = await axios.get(server + '/api/users/auth/user/me', {
		  headers});
      user = response.data.data;
      if (user) {
        return user;
      }
    }
    return false;
  } catch (e) {
    console.log(e);
  }
  // AccessToken이 존재하는지 확인
}