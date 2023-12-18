const days = '일월화수목금토';

function makeBusinessHourForm() {
  for (let i = 0; i < 7; ++i) {
    const dayForm = $(
      `<div class="businessHour" id="day${i}"><label>${days[i]}요일</label></div>`,
    );
    const dayoff = $(`<input type="checkbox" id="dayoff${i}" name="dayoff${i}">
			<label for="dayoff${i}">휴일</label><br>`);
    const openTime = $(
      `<label for="day${i}Opening">영업 시작</label><input type="time" id="day${i}Opening" name="day${i}Opening"><br>`,
    );
    const closeTime = $(
      `<label for="day${i}Closing">영업 종료</label><input type="time" id="day${i}Closing" name="day${i}Closing"><br>`,
    );
    openTime.attr('required', 'true');
    closeTime.attr('required', 'true');
    dayoff.change(function () {
      if (dayoff.is(':checked')) {
        openTime.attr('disabled', 'true');
        closeTime.attr('disabled', 'true');
        openTime.removeAttr('required');
        closeTime.removeAttr('required');
      } else {
        openTime.removeAttr('disabled');
        closeTime.removeAttr('disabled');
        openTime.attr('required', 'true');
        closeTime.attr('required', 'true');
      }
    });
    dayForm.append(dayoff);
    dayForm.append(openTime);
    dayForm.append(closeTime);
    $('#diners-form').append(dayForm);
  }
}

const timeToInt = (time) => +time.slice(3) + 100 * time.slice(0, 2);
const intToTime = (n) => {
  const m = n % 100;
  const h = (n - m) / 100;
  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
};

async function submitDiner(dinerId = null) {
  const name = $('#name').val();
  const type = $('#type').val();
  const address = $('#address').val();
  const phoneNumber = $('#phoneNumber').val();
  const introduction = $('#introduction').val();
  const homepage = $('#homepage').val();
  const businessHour = Array(7);
  for (let i = 0; i < 7; ++i) {
    const dayoff = $(`#dayoff${i}`).is(':checked');
    if (dayoff) continue;
    const openTime = timeToInt($(`#day${i}Opening`).val());
    const closeTime = timeToInt($(`#day${i}Closing`).val());
    businessHour[i] = [openTime, closeTime];
  }
  try {
    if (dinerId) {
      const res = await axios.patch(
        server + `/api/diners/${dinerId}`,
        {
          name,
          type,
          address,
          phoneNumber,
          introduction,
          homepage,
          businessHour,
        },
        { headers },
      );
      alert('매장 정보가 수정되었습니다.');
    } else {
      const res = await axios.post(
        server + '/api/diners',
        {
          name,
          type,
          address,
          phoneNumber,
          introduction,
          homepage,
          businessHour,
        },
        { headers },
      );
      alert('매장이 등록되었습니다.');
    }
    window.location.replace('/admin.html');
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
  }
}

async function checkDiner(dinerId, adminId) {
  try {
    const res = await axios.get(server + `/api/diners/${dinerId}`);
    const diner = res.data.diner;
    if (adminId !== diner.adminId) {
      alert('권한이 없습니다.');
      location.href = '../admin.html';
    }
    return 1;
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
    window.location.replace('../admin.html');
  }
}

async function getDiner(dinerId, adminId) {
  try {
    const res = await axios.get(server + `/api/diners/${dinerId}`);
    const diner = res.data.diner;
    if (adminId !== diner.adminId) {
      alert('권한이 없습니다.');
      location.href = '../admin.html';
    }
    $('#name').val(diner.name);
    $('#type').val(diner.type);
    $('#address').val(diner.address);
    $('#phoneNumber').val(diner.phoneNumber);
    $('#introduction').val(diner.introduction);
    $('#homepage').val(diner.homepage);
    for (let i = 0; i < 7; ++i) $(`#dayoff${i}`).click();
    for (let { dayOfWeek: i, openTime, closeTime } of diner.BusinessHours) {
      $(`#dayoff${i}`).click();
      $(`#day${i}Opening`).val(intToTime(openTime));
      $(`#day${i}Closing`).val(intToTime(closeTime));
    }
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
    window.location.replace('../admin.html');
  }
}

async function deleteDiner(dinerId) {
  try {
    await axios.delete(server + `/api/diners/${dinerId}`, { headers });
    location.href = 'admin.html';
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
  }
}

async function showDiner(dinerId) {
  try {
    const res = await axios.get(server + `/api/diners/${dinerId}`);
    const diner = res.data.diner;
    $('#name').text(diner.name);
    $('#type').text(diner.type || '-');
    $('#address').text(diner.address);
    $('#phoneNumber').text(diner.phoneNumber);
    $('#introduction').text(diner.introduction);
    $('#homepage').text(diner.homepage || '-');
    for (let { dayOfWeek: i, openTime, closeTime } of diner.BusinessHours)
      $('#businessHours').append(`<tr>
				<th>${days[i]}요일</th>
				<td>${intToTime(openTime)}</td>
				<td>${(openTime < closeTime ? '' : '다음날 ') + intToTime(closeTime)}</td>
			</tr>
			`);
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
    location.href = 'index.html';
  }
}

async function getDiners(diners = null) {
  try {
    if (!diners) {
      const res = await axios.get(server + `/api/diners`);
      diners = res.data.diners;
    }
    $('#diners').empty();
    diners.forEach((diner) => {
      const dinerList = $(`<div class="col">
      <div class="card shadow-sm">
        <svg
          class="bd-placeholder-img card-img-top"
          width="100%"
          height="180"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
        </svg>
        <div class="card-body">
          <h4>${diner.name}</h4>
          <p class="card-text">${diner.type || '-'}</p>
         
          <p class="card-text">
          소개 : ${diner.introduction}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
              >
                들어가기
              </button>
            </div>
            <small class="text-body-secondary">좋아요 1</small>
          </div>
        </div>
      </div>
    </div>`);
      dinerList.click(function (e) {
        const toDetail = confirm('식당 상세 정보 페이지로 이동합니다.');
        if (toDetail)
          location.href = `/html/diner-detail.html?dinerId=${diner.dinerId}`;
      });
      $('#diners').append(dinerList);
    });
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
    location.href = 'index.html';
  }
}

async function searchDiners() {
  try {
    const keyword = $('#keyword').val();
    const res = await axios.get(server + `/api/diners/search?key=${keyword}`);
    const diners = res.data.diners;
    getDiners(diners);
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
  }
}

async function adminHasDiner(adminId) {
  try {
    const diner = await axios.get(server + `/api/diners/admin/${adminId}`);
    return diner.status !== 200;
  } catch (e) {
    console.log(e);
    if (e.response.status === 409) return e.response.data.dinerId || true;
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
    return true;
  }
}

async function showDinerMenu(dinerId) {
  try {
    const res = await axios.get(server + `/api/products/diner/${dinerId}`);
    const products = res.data.diner;
	console.log(res.data)

    // 메뉴 목록을 표시하는 부분
    const menuList = $('#menuList');
    menuList.empty(); // 기존에 있던 내용을 비웁니다.

    if (products.length === 0) {
      menuList.append('<p>등록된 메뉴가 없습니다.</p>');
      return;
    }

    // 각 메뉴를 표시
    products.forEach((product) => {
      const menuCard = $(`
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${product.imageUrl}" alt="${product.title}" class="img-fluid rounded-start diner-menu-image" data-product-id="${product.productId}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">가격: ${product.price}원</p>
              </div>
            </div>
          </div>
        </div>
      `);

      menuCard.find('.diner-menu-image').click(function () {
        viewProductDetail(product.productId);
      });

      menuList.append(menuCard);
    });
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
  }
}

function viewProductDetail(productId) {
  // 메뉴 상세 페이지로 이동하는 코드 추가
  location.href = `/html/menu-detail.html?productId=${productId}`;
}

// ...

// loadPage 함수에 showDinerMenu 호출 추가
async function loadPage() {
  // ... (기존 코드는 그대로 두고 아래에 메뉴 관련 코드 추가)

  // 메뉴 및 식당 정보 로딩
  await showDiner(dinerId);
  await showDinerMenu(dinerId);
}
