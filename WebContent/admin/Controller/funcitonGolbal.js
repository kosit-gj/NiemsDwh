function convestToYearTH(date){
	var yyyy="";
	var mm="";
	var dd="";
	var dateConvest="";
	
	var date=date.split("/");
	yyyy=(parseInt(date[0])+543);
	mm=date[1];
	dd=date[2];
	dateConvest=yyyy+"/"+mm+"/"+dd;
	return dateConvest;
	
}

function validateTel(phoneno){
	 
	 
	 if (/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phoneno))  
	  {  
	    return (true)  
	  }  
	    
	    return (false)  
	    
	    
}




function ValidateEmail(mail)   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }  
    
    return (false)  
} 
var manageGridFn = function(){
	 $(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
};
var currentDateFn = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = yyyy+'/'+mm+'/'+dd;
	return today;
}
var saveToLogFn = function(link_id){
	
	var user_name= localStorage.getItem('user_name');
	var password= localStorage.getItem('password');
	var reason= localStorage.getItem('reason');
	

		
		$.ajax({
			url:golbalURL+"/niems/Model/usage_log/insert.jsp",
			type:"post",
			dataType:"json",
			async:false,
			data:{"link_id":link_id,"user_name":user_name,"reason":reason},
			success:function(data){
				if(data=="success"){
					console.log("save to log successfully.");
				}
			}
	});
	
	
	
}
var auThenRedirectURL = function(user,pass,url){

	
	  $.ajax({
	  	url:"/../pentaho/j_spring_security_check",
	  	type:"get",
	  	dataType:"html",
	  	data:{"j_username":user,"j_password":pass},
	  	async:false,
	  	success:function(data){
	  		 window.location.assign(url);
	  	}
	  });

}
//auThenRedirectURL("admin","password","http://localhost:8080/pentaho/api/repos/%3Apublic%3ASamitivej%3ASVH.wcdf/generatedContent?ts=1472206559057");


var getSessionFn = function(){
	var session;
	$.ajax({
			url:golbalURL+"/niems/Model/user/session.jsp",
			type:"get",
			dataType:"json",
			async:false,
			//data:{"callback":"?"},
			success:function(data){
				session=data;
			}
	});
	return session;
}
var logoutFn = function(){
	
	localStorage.setItem('user_name',"");
	localStorage.setItem('prefix',"");
	localStorage.setItem('first_name',"");
	localStorage.setItem('last_name',"");
	localStorage.setItem('email',"");
	localStorage.setItem('province',"");
	localStorage.setItem('status',"");
	localStorage.setItem('position',"");
	localStorage.setItem('organization',"");
	localStorage.setItem('user_items',"");		
	localStorage.setItem('role_id',"");	
	
	$.ajax({
		url:golbalURL+"/niems/Model/user/destroySession.jsp",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			if(data=="success"){
				alert("logout is success.");
				$( location ).attr("href", "index.html");
			}
		}
	});
};
var listProvince = function(provinceName){
	//Province http://192.168.1.49:8082/niems/Model/user/select_province.jsp?callback=?
	$.ajax({
		url:golbalURL+"/niems/Model/user/select_province.jsp",
		type:"post",
		dataType:"json",
		//data:{"callback":"?"},
		success:function(data){
			
			var htmlSelectProvince="";
			htmlSelectProvince+="<select id=\"province\" class=\"form-control\" >";
			
					htmlSelectProvince+="<option value=\"none\">เลือกจังหวัด</option>";
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
			prefixHtml+="<option >เลือกคำนำหน้า</option>";
			prefixHtml+="<option selected='selected'>นาย</option>";
			prefixHtml+="<option>นาง</option>";
			prefixHtml+="<option>นางสาว</option>";
		prefixHtml+="</select>";
	    
	    
	}else if(prefixName=="นาง"){
		prefixHtml+="<select id=\"prefix\" class=\"form-control\" >";
			prefixHtml+="<option >เลือกคำนำหน้า</option>";
			prefixHtml+="<option >นาย</option>";
			prefixHtml+="<option selected='selected'>นาง</option>";
			prefixHtml+="<option>นางสาว</option>";
		prefixHtml+="</select>";
		
	}else if(prefixName=="นางสาว"){
		prefixHtml+="<select id=\"prefix\" class=\"form-control\" >";
			prefixHtml+="<option >เลือกคำนำหน้า</option>";
			prefixHtml+="<option >นาย</option>";
			prefixHtml+="<option>นาง</option>";
			prefixHtml+="<option selected='selected'>นางสาว</option>";
		prefixHtml+="</select>";
		
	}else{
		prefixHtml+="<select id=\"prefix\" class=\"form-control\" >";
			prefixHtml+="<option selected='selected'>เลือกคำนำหน้า</option>";
			prefixHtml+="<option>นาย</option>";
			prefixHtml+="<option>นาง</option>";
			prefixHtml+="<option>นางสาว</option>";
		prefixHtml+="</select>";
	}
	$("#prefixArea").html(prefixHtml);
}
var listRole = function(id){
	//Province http://192.168.1.49:8082/niems/Model/user/select_province.jsp?callback=?
	$.ajax({
		url:golbalURL+"/niems/Model/role/selectAll.jsp",
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
	
	if($("#user_name").val()==""){
		txtArert+="ชื่อผู้ใช้งานห้ามเป็นค่าว่าง\n";
	}
	
	if($('input[name="resetPass"]:checked').val()=="Y"){
		
		if($("#password").val()!=$("#confirm_password").val()){
			txtArert+="รหัสผ่านไม่ตรงกัน\n";
		}
		if($("#password").val()==""){
			txtArert+="รหัสผ่านห้ามเป็นค่าว่าง\n";
		}
		if($("#confirm_password").val()==""){
			txtArert+="ยืนยันรหัสผ่านห้ามเป็นค่าว่าง\n";
			
		}
		if($("#password").val().length<=4){
			txtArert+="รหัสผ่านต้องมากกว่า 4 ตัวอักษร\n";
		}
		
	}
	
	if($("#first_name").val()==""){
		txtArert+="ชื่อห้ามเป็นค่าว่าง\n";
	}
	if($("#last_name").val()==""){
		txtArert+="นามสกุลห้ามเป็นค่าว่าง\n";
	}
	
	
	if($("#email").val()==""){
		txtArert+="อีเมลล์ห้ามเป็นค่าว่าง\n";
	}
	if(ValidateEmail($("#email").val())==false){
		txtArert+="อีเมลล์ไม่ถูกต้อง\n";
	}
	
	if($("#tel").val()==""){
		txtArert+="เบอร์โทรห้ามเป็นค่าว่าง\n";
	}
	if(validateTel($("#tel").val())==false){
		txtArert+="เบอร์โทรไม่ถูกต้อง\n";
	}
	
	
	
	
	
	if(txtArert!=""){
		alert(txtArert);
		return false
	}else{
		return true;
	}
	
	
}



