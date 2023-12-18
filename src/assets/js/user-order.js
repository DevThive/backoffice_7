document.addEventListener('DOMContentLoaded', async () => {
  const menuList = document.getElementById('menuList');
  const productIdSelect = document.getElementById('productId');

  // 서버에서 메뉴 목록 가져오기
  const menuResponse = await fetch(
    `http://localhost:3000/api/userorders/diner/${dinerId}`,
  );
  const menuData = await menuResponse.json();

  // 메뉴 목록 표시
  menuData.products.forEach((product) => {
    const menuItem = document.createElement('li');
    menuItem.textContent = `${product.title} - 가격: ${product.price}원`;
    menuList.appendChild(menuItem);

    // 선택 옵션에 메뉴 추가
    const option = document.createElement('option');
    option.value = product.productId;
    option.text = `${product.title} - ${product.price}원`;
    productIdSelect.appendChild(option);
  });
});

async function placeOrder() {
  const productId = document.getElementById('productId').value;
  const amount = document.getElementById('amount').value;

  // AccessToken 검사 및 헤더에 추가
  const user = await checkUser();
  if (!user) {
    alert('로그인이 필요합니다.');
    return;
  }

  try {
    // 주문 생성 요청
    const response = await fetch(
      `http://localhost:3000/api/userorders/diner/${dinerId}`,
      {
        // DINER_ID를 실제 식당 ID로 대체
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId: parseInt(productId),
          amount: parseInt(amount),
        }),
      },
    );

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
    } else {
      const errorResult = await response.json();
      alert(errorResult.message);
    }
  } catch (error) {
    console.error(error);
    alert('주문 생성 중 오류가 발생했습니다.');
  }
}
