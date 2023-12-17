async function showOrders(dinerId){
	try {
		const res = await axios.get(server+`/api//diners/${dinerId}/orders`)
		const orders = res.data.orders
		console.log(orders)
	}catch(e){
		console.log(e)
		alert('AAA')
	}
}