async function addOrder(order, dinerId, adminId) {
  const { orderId, amount, productId, userId, status } = order;
  if (status == 'DELIVERED') return;
  const product = await axios.get(server + `/api/products/${productId}`);
  console.log(product.data);
  const { title, price } = product.data.product;
  const orderInfo = { userId, title, price, amount };
  const orderInfoName = {
    amount: '양',
    title: '메뉴',
    price: '가격',
    userId: '사용자',
  };
  const orderCard = $('<div class="flash-card" id="jsonDisplay"></div>');
  for (const key in orderInfo) {
    orderCard.append(
      $(
        `<div><span class="key">${orderInfoName[key]}:</span> <span class="value">${orderInfo[key]}</span></div>`,
      ),
    );
  }
  const deliverBtn = $('<button>배달 완료</button>');
  deliverBtn.click(async function (event) {
    const finishedOrder = confirm('주문을 완료 처리합니다.');
    if (!finishedOrder) return;
    try {
      await axios.patch(server + `/api/diners/${dinerId}/orders/${orderId}`);
      alert('배달이 완료되었습니다.');
    } catch (e) {
      alert('이미 완료된 주문입니다.');
    } finally {
      orderCard.remove();
    }
  });
  orderCard.append(deliverBtn);
  $('#orders').append(orderCard);
}

async function showOrders(dinerId, adminId) {
  try {
    const res = await axios.get(server + `/api/diners/${dinerId}/orders`);
    const orders = res.data.orders;
    console.log(orders);
    await Promise.all(orders.map((order) => addOrder(order, dinerId, adminId)));
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
    //location.href = '../admin.html';
  }
}
