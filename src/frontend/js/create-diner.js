function makeBusinessHourForm(){
	const days = '일월화수목금토'
	for(let i=0;i<7;++i){
		const dayForm = $(`<div class="businessHour" id="day${i}"><label>${days[i]}요일</label></div>`)
		const dayoff = $(`<input type="checkbox" id="dayoff${i}" name="dayoff${i}">
			<label for="dayoff${i}">휴일</label><br>`)
		const openTime = $(`<label for="day${i}Opening">영업 시작</label><input type="time" id="day${i}Opening" name="day${i}Opening"><br>`)
		const closeTime = $(`<label for="day${i}Closing">영업 종료</label><input type="time" id="day${i}Closing" name="day${i}Closing"><br>`)
		openTime.attr('required','true')
		closeTime.attr('required','true')
		dayoff.change(function(){
			if(dayoff.is(":checked")){
				openTime.attr('disabled','true')
				closeTime.attr('disabled','true')
				openTime.removeAttr('required')
				closeTime.removeAttr('required')
			}else{
				openTime.removeAttr('disabled')
				closeTime.removeAttr('disabled')
				openTime.attr('required','true')
				closeTime.attr('required','true')
			}
		})
		dayForm.append(dayoff)
		dayForm.append(openTime)
		dayForm.append(closeTime)
		$('#diners-form').append(dayForm)
	}
	$('#diners-form').append('<input type="submit" value="Submit">')
}

const timeConvert = time => +time.slice(3,)+100*time.slice(0,2)

async function submitDiner(){
	const name = $("#name").val()
	const type = $("#type").val()
	const address = $("#address").val()
	const phoneNumber = $("#phoneNumber").val()
	const introduction = $("#introduction").val()
	const homepage = $("#homepage").val()
	const businessHour = Array(7)
	for(let i=0;i<7;++i){
		const dayoff = $(`#dayoff${i}`).is(":checked")
		if(dayoff) continue
		const openTime = $(`#day${i}Opening`).val()
		const closeTime = $(`#day${i}Closing`).val()
		if(!openTime || !closeTime) continue
		
	}
	try{
		console.log(headers)
		const res = await axios.post(server+'/api/diners',{name,type,address,phoneNumber,introduction,homepage,businessHour}, {headers})
		console.log()
	}catch(e){
		console.log(e)
		alert(e.response?.data?.message || e.response?.data?.errorMessage || "오류가 발생했습니다.")
	}
}