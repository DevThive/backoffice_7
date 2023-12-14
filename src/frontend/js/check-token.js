let user;
let headers = {};

// AccessToken 검사 및 헤더에 추가하는 함수
async function checkAndAddTokenToHeaders() {
    // 로컬 스토리지에서 AccessToken 가져오기
	// 인증 넣으면 수정
	const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjo0LCJpYXQiOjE3MDI1NDIyODYsImV4cCI6MTcwMjU4NTQ4Nn0.bdvW-CFSKA9iy5ThZiv2tStHBP5eUlkZQh_z_werYp0'

    try {
        if (authorization) {
            headers.authorization = authorization;
            const response = await axios.get(server + "/api/users/me", {
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