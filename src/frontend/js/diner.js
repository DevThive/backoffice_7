const days = '일월화수목금토'

function makeBusinessHourForm(){
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
}

const timeToInt = time => +time.slice(3,)+100*time.slice(0,2)
const intToTime = n => {
	const m = n%100
	const h = (n-m)/100
	return `${h<10? '0'+h:h}:${m<10? '0'+m:m}`
}

async function submitDiner(dinerId=null){
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
		const openTime = timeToInt($(`#day${i}Opening`).val())
		const closeTime = timeToInt($(`#day${i}Closing`).val())
		if(!openTime || !closeTime) continue
		businessHour[i] = [openTime,closeTime]
	}
	try{
		if(dinerId){
			const res = await axios.patch(server+`/api/diners/${dinerId}`,{name,type,address,phoneNumber,introduction,homepage,businessHour}, {headers})
			alert("매장 정보가 수정되었습니다.")
		}
		else{
			const res = await axios.post(server+'/api/diners',{name,type,address,phoneNumber,introduction,homepage,businessHour}, {headers})
			alert("매장이 등록되었습니다.")
		}
		location.href = "index.html"
	}catch(e){
		console.log(e)
		alert(e.response?.data?.message || e.response?.data?.errorMessage || "오류가 발생했습니다.")
	}
}

async function getDiner(dinerId){
	try{
		const res = await axios.get(server+`/api/diners/${dinerId}`)
		const diner = res.data.diner
		$("#name").val(diner.name)
		$("#type").val(diner.type)
		$("#address").val(diner.address)
		$("#phoneNumber").val(diner.phoneNumber)
		$("#introduction").val(diner.introduction)
		$("#homepage").val(diner.homepage)
		for(let i=0;i<7;++i)
			$(`#dayoff${i}`).click()
		for(let {dayOfWeek:i,openTime,closeTime} of diner.BusinessHours){
			$(`#dayoff${i}`).click()
			$(`#day${i}Opening`).val(intToTime(openTime))
			$(`#day${i}Closing`).val(intToTime(closeTime))
		}
	}catch(e){
		console.log(e)
		alert(e.response?.data?.message || e.response?.data?.errorMessage || "오류가 발생했습니다.")
		location.href = "index.html"
	}
}

async function deleteDiner(dinerId){
	try{
		await axios.delete(server+`/api/diners/${dinerId}`, {headers})
		location.href = "index.html"
	}catch(e){
		console.log(e)
		alert(e.response?.data?.message || e.response?.data?.errorMessage || "오류가 발생했습니다.")
	}
}

async function showDiner(dinerId){
	try{
		const res = await axios.get(server+`/api/diners/${dinerId}`)
		const diner = res.data.diner
		$("#name").text(diner.name)
		$("#type").text(diner.type || '-')
		$("#address").text(diner.address)
		$("#phoneNumber").text(diner.phoneNumber)
		$("#introduction").text(diner.introduction)
		$("#homepage").text(diner.homepage || '-')
		for(let {dayOfWeek:i,openTime,closeTime} of diner.BusinessHours)
			$("#businessHours").append(`<tr>
				<th>${days[i]}요일</th>
				<td>${intToTime(openTime)}</td>
				<td>${(openTime<closeTime? '':'다음날')+intToTime(closeTime)}</td>
			</tr>
			`)
	}catch(e){
		console.log(e)
		alert(e.response?.data?.message || e.response?.data?.errorMessage || "오류가 발생했습니다.")
		location.href = "index.html"
	}
}

async function getDiners(){
	try{
		const res = await axios.get(server+`/api/diners`)
		const diners = res.data.diners
		console.log(diners)
		diners.forEach(diner => $("#diners").append($(`<li>
			  <div class="diner-info">
				매장명: ${diner.name}
			  </div>
			  <div>
				매장 분류: ${diner.type || '-'}
			  </div>
			  <div>
				매장 주소: ${diner.address}
			  </div>
			  <div>
				매장 전화번호: ${diner.phoneNumber}
			  </div>
			</li>`
		  )))
	}catch(e){
		console.log(e)
		alert(e.response?.data?.message || e.response?.data?.errorMessage || "오류가 발생했습니다.")
		location.href = "index.html"
	}
}