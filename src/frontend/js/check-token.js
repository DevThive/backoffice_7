let user;
let headers = {};

// AccessToken 검사 및 헤더에 추가하는 함수
async function checkAdmin() {
    // 로컬 스토리지에서 AccessToken 가져오기
	// 인증 넣으면 수정
	//const authorization = ''
	const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjo1LCJpYXQiOjE3MDI1NTA0MjAsImV4cCI6MTcwMjU5MzYyMH0.4W1_ryLO1vGOBxUGbVJnq87vZBgcaGjv2UAJWMt9y9o'

    try {
        if (authorization) {
            headers.authorization = authorization;
            const response = await axios.get(server + "/api/users/auth/admin/me", {
                headers
            });
            user = response.data.data;

            if (user) {
                return true;
            }
        }
        return false;
    } catch (e) {
        console.log(e);
    }
    // AccessToken이 존재하는지 확인
}