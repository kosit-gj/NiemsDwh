var listProvince = function(provinceName){
	//Province http://192.168.1.49:8082/niems/Model/user/select_province.jsp?callback=?
	$.ajax({
		url:"http://192.168.1.49:8082/niems/Model/user/select_province.jsp",
		type:"post",
		dataType:"json",
		//data:{"callback":"?"},
		success:function(data){
			
			var htmlSelectProvince="";
			htmlSelectProvince+="<select id=\"province\" class=\"form-control\" >";
				
				$.each(data,function(index,indexEntry){
					if(provinceName==indexEntry[1]){
						htmlSelectProvince+="<option "+indexEntry[0]+" selected='selected'>"+indexEntry[1]+"</option>";
					}else{
						htmlSelectProvince+="<option "+indexEntry[0]+">"+indexEntry[1]+"</option>";
					}
				});
			htmlSelectProvince+=" </select>";
			
			$("#provinceArea").html(htmlSelectProvince);
		
		}
	});
}

var listPrefix = function(prefixName){
	var prefixHtml="";
	if(prefixName=="นาย"){
		
		prefixHtml+="<select id=\"prefix\" class=\"form-control\" >";
			prefixHtml+="<option selected='selected'>นาย</option>";
			prefixHtml+="<option>นาง</option>";
			prefixHtml+="<option>นางสาว</option>";
		prefixHtml+="</select>";
	    
	    
	}else if(prefixName=="นาง"){
		prefixHtml+="<select id=\"prefix\" class=\"form-control\" >";
			prefixHtml+="<option >นาย</option>";
			prefixHtml+="<option selected='selected'>นาง</option>";
			prefixHtml+="<option>นางสาว</option>";
		prefixHtml+="</select>";
		
	}else if(prefixName=="นางสาว"){
		prefixHtml+="<select id=\"prefix\" class=\"form-control\" >";
			prefixHtml+="<option >นาย</option>";
			prefixHtml+="<option>นาง</option>";
			prefixHtml+="<option selected='selected'>นางสาว</option>";
		prefixHtml+="</select>";
		
	}
	$("#prefixArea").html(prefixHtml);
}
var listRole = function(id){
	//Province http://192.168.1.49:8082/niems/Model/user/select_province.jsp?callback=?
	$.ajax({
		url:"http://192.168.1.49:8082/niems/Model/role/selectAll.jsp",
		type:"post",
		dataType:"json",
		//data:{"callback":"?"},
		success:function(data){
			
			console.log(data);
			
			var htmlSelect="";
			htmlSelect+="<select id=\"role_id\" class=\"form-control\" >";
				
				$.each(data,function(index,indexEntry){
					if(indexEntry[0]==id){
						htmlSelect+="<option selected=\"selected\" value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
					}else{
						htmlSelect+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
					}
					
				});
				htmlSelect+=" </select>";
			
			$("#roleArea").html(htmlSelect);
		
		}
	});
}
function checkID(id)
{
	if(id.length != 13) return false;
	for(i=0, sum=0; i < 12; i++)
	sum += parseFloat(id.charAt(i))*(13-i); if((11-sum%11)%10!=parseFloat(id.charAt(12)))
	return false; return true;
}

var vaidation = function(){
	var txtArert="";
	if(checkID($("#user_name").val())==false){
		txtArert+="รหัสบัตรประชาชนไม่ถูกต้อง\n";
	}
	if($("#password").val()!=$("#confirm_password").val()){
		txtArert+="รหัสผ่านไม่ตรงกัน\n";
	}
	if($("#user_name").val()==""){
		txtArert+="ชื่อผู้ใช้งานห้ามเป็นค่าว่าง\n";
	}
	if($("#password").val()==""){
		txtArert+="รหัสผ่านห้ามเป็นค่าว่าง\n";
	}
	if($("#confirm_password").val()==""){
		txtArert+="ยืนยันรหัสผ่านห้ามเป็นค่าว่าง\n";
	}
	
	if($("#first_name").val()==""){
		txtArert+="ชื่อห้ามเป็นค่าว่าง\n";
	}
	
	if($("#email").val()==""){
		txtArert+="อีเมลล์ห้ามเป็นค่าว่าง\n";
	}
	
	if(txtArert!=""){
		alert(txtArert);
		return false
	}else{
		return true;
	}
	
	
}

