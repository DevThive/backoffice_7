function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById('sample6_extraAddress').value = extraAddr;
      } else {
        document.getElementById('sample6_extraAddress').value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById('sample6_address').value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('sample6_detailAddress').focus();
    },
  }).open();
}

function sample7_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById('sample7_extraAddress').value = extraAddr;
      } else {
        document.getElementById('sample7_extraAddress').value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample7_postcode').value = data.zonecode;
      document.getElementById('sample7_address').value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('sample7_detailAddress').focus();
    },
  }).open();
}

function sign_in() {
  let email = $('#inputEmail').val();
  let password = $('#inputPassword').val();
  console.log(email, password);
  $.ajax({
    type: 'POST',

    url: 'api/users/auth/user',

    data: {
      email: email,
      password: password,
    },
    success: function (response) {
      localStorage.setItem('token', response.token);

      console.log(response.token);
      alert('로그인 되었습니다.');
      window.location.replace('/main.html');
    },
    error: function (error) {
      console.log(error);
      alert('이메일 또는 비밀번호를 확인해주세요');
      windows.location.reload();
    },
  });
}

function admin_sign_in() {
  let email = $('#inputAdminEmail').val();
  let password = $('#inputAdminPassword').val();
  console.log(email, password);
  $.ajax({
    type: 'POST',
    url: 'api/users/auth/admin',
    data: {
      email: email,
      password: password,
    },
    success: function (response) {
      localStorage.setItem('token', response.token);
      console.log(response.token);
      alert('(사장님)로그인 되었습니다.');
      window.location.replace('./admin.html');
    },
    error: function (error) {
      console.log(error);
      alert('이메일 또는 비밀번호를 확인해주세요.');
      windows.location.reload();
    },
  });
}

function sign_up() {
  let email = $('#signupEmail').val();
  let nickname = $('#signupNickname').val();
  let password = $('#signupPassword').val();
  let checkPassword = $('#checkPassword').val();
  let address =
    $('#sample6_address').val() +
    $('#sample6_detailAddress').val() +
    $('#sample6_extraAddress').val();
  let phoneNumber = $('#signupPhone').val();

  console.log(email, nickname, password, checkPassword, address, phoneNumber);
  $.ajax({
    type: 'POST',
    url: 'api/users/',
    data: {
      email: email,
      nickname: nickname,
      password: password,
      confirmpassword: checkPassword,
      address: address,
      phoneNumber: phoneNumber,
    },
    success: function (response) {
      alert('회원가입이 완료되었습니다.');
      window.location.replace('/');
    },
    error: function (error) {
      alert(error.responseJSON.errors[0].msg);
      console.log(error.responseJSON.errors);
    },
  });
}

function admin_sign_up() {
  let email = $('#signupAdminEmail').val();
  let nickname = $('#signupAdminNickname').val();
  let password = $('#signupAdminPassword').val();
  let checkPassword = $('#checkAdminPassword').val();
  let address =
    $('#sample7_address').val() +
    $('#sample7_detailAddress').val() +
    $('#sample7_extraAddress').val();
  let marketNumber = $('#signupAdminMarket').val();

  console.log(
    email,
    nickname,
    password,
    password,
    checkPassword,
    address,
    marketNumber,
  );
  $.ajax({
    type: 'POST',
    url: 'api/users/admin',
    data: {
      email: email,
      nickname: nickname,
      password: password,
      confirmpassword: checkPassword,
      address: address,
      marketNum: marketNumber,
    },
    success: function (response) {
      alert('(사장님) 회원가입이 완료되었습니다.');
      window.location.reload();
    },
    error: function (error) {
      alert(error.responseJSON.errors[0].msg);
      console.log(error.responseJSON.errors[0].msg);
    },
  });
}

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}
