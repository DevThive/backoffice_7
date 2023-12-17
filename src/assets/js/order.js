async function showOrders(dinerId){
	try {
		const res = await axios.get(server+`/api/diners/${dinerId}/orders`)
		const orders = res.data.orders
		console.log(orders)
		for(const order of orders){
			const {amount,productId,userId,status} = order
			if(status=='DELIVERED') continue
			const orderInfo = {userId,productId,amount}
			const orderInfoName = {'amount':'양','productId':'메뉴','userId':'사용자'}
			const orderCard = $('<div class="flash-card" id="jsonDisplay"></div>')
			for (const key in orderInfo) {
			  orderCard.append($(`<div><span class="key">${orderInfoName[key]}:</span> <span class="value">${orderInfo[key]}</span></div>`));
			}
			const deliverBtn = $('<button>배달 완료</button>')
			orderCard.append(deliverBtn)
			$("#orders").append(orderCard)
		}
	}catch(e){
		console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
    //location.href = '../admin.html';
	}
}