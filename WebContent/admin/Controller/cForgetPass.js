function generatePasswordFn() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
var vaidation = function(){
	var txtArert="";
	if(checkID($("#user_name").val())==false){
		txtArert+="รหัสบัตรประชาชนไม่ถูกต้อง\n";
	}
	
	if(txtArert!=""){
		alert(txtArert);
		return false
	}else{
		return true;
	}
	
	
}


var findUsername = function(user_name){
	var dataReturn="";
	$.ajax({
		url:golbalURL+"/niems/Model/user/edit.jsp",
		type:"post",
		dataType:"json",
		data:{
			"user_name":user_name
			},
		async:false,
		success:function(data){
			console.log(data);
			dataReturn=data;
		}
	});
	return dataReturn;
}
//findUsername("1460600053789");
var updateNewPassword = function(user_name,newPassword,email){
	var returnData = false;
	//http://localhost:8083/niems/Model/user/updateNewPass.jsp?user_name=1460600053789&newPassword=22222
	$.ajax({
		url:golbalURL+"/niems/Model/user/updateNewPass.jsp",
		type:"post",
		dataType:"json",
		data:{
			"user_name":user_name,
			"newPassword":newPassword
			},
		async:false,
		success:function(data){
			console.log(data);
			if(data=="success"){
				
				 if(sendEmail(user_name,newPassword,email)==true){
					 returnData=true;
				 }else{
					 returnData=false;
				 }
				 
				// returnData=true;
				
			}else{
				returnData=false;
			}
			
		}
	});
	return returnData;
	
};
$(document).ready(function(){
	//alert("hello jquery");
	
	$("#btnSubmit").click(function(){
		var email="";
		var generatePassword=generatePasswordFn();
		//if(vaidation()==true){
			var dataUser=findUsername($("#user_name").val());
			if(dataUser==""){
				alert("ไม่พบ Username นี้");
			}else{
				
				email=dataUser[0][5];
				alert(generatePassword);
				if(updateNewPassword($("#user_name").val(),generatePassword,email)==true){
					alert("ได้ส่งรหัสผ่านใหม่ไปที่ E-mail:"+email+"แล้ว");
					//return false;
				}
			}
		//}
		
		
		
		return false;
		
	});
});