var clearUserForm = function(){
	$("#user_name").val("");
	$("#password").val("");
	$("#confirm_password").val("");
	listPrefix();
	$("#first_name").val("");
	$("#last_name").val("");
	$("#email").val("");
	$("#province").val("");
	
	//listStatusUserFn("Y");
	
	$("#position").val("");
	$("#organization").val("");
	//var user_items="N";
	$("#tel").val("");

	listProvince();
	
}


$(document).ready(function(){
	

	listProvince();
	//prefix start
	listPrefix();
	//prefix end
	
	
	
	
	//console.log(sendEmail("1234","1234","nn.it@hotmail.com"));
	
	$("#submit").click(function(){
		
		if(vaidation()==true){
			
			var user_name=$("#user_name").val();
			var password=$("#password").val();
			var prefix=$("#prefix").val();
			var first_name=$("#first_name").val();
			var last_name=$("#last_name").val();
			var email=$("#email").val();
			var province=$("#province").val();
			var status="Y";
			var position=$("#position").val();
			var organization=$("#organization").val();
			var user_items="N";
			var tel=$("#tel").val();
			var role_id="3";
			
			/*
			
			console.log(user_name);
			console.log(password);
			console.log(prefix);
			console.log(first_name);
			console.log(email);
			console.log(province);
			console.log(status);
			console.log(position);
			console.log(organization);
			console.log(user_items);
			console.log(role_id);
			*/
			/*
			 http://192.168.1.49:8082/niems/Model/user/insert.jsp
?callback=?
&user_name=1460600053789
&password=1460600053789
&prefix=Mr.
&first_name=Kosit
&last_name=Aromsava
&email=kosit@gongjesse.com
&province=bangkok
&status=Y
&position=SA
&organization=GJ
&user_items=Y
&role_id=1
			 */
			
//check user  unique start
	$.ajax({
		url:golbalURL+"/niems/Model/user/edit.jsp",
		type:"post",
		dataType:"json",
		data:{
			"user_name":user_name
			},
		success:function(data){
			//console.log(data);
			if(data!=""){
				alert("User is already. ");
				
			}else{
				
				
				//insert start 
				$.ajax({
					url:golbalURL+"/niems/Model/user/insert.jsp",
					type:"post",
					dataType:"json",
					data:{
						"user_name":user_name,
						"password":password,
						"prefix":prefix,
						"first_name":first_name,
						"last_name":last_name,
						"email":email,
						"province":province,
						"status":status,
						"position":position,
						"organization":organization,
						"user_items":user_items,
						"role_id":role_id,
						"tel":tel
						},
					success:function(data){
						//console.log(data);
						if(data=="success"){
							
							if(sendEmail(user_name,password,email,"newPass")==true){
								alert("Register is success");
							}
							
							
							clearUserForm();
							
							
						}
					}
				});
				//insert end
			}
		}
	});
//check user  unique end

			
			return false;
			
		}
	
	});
	

	
	
});