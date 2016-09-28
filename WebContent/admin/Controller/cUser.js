var listDataAll = function(keyword){
	//http://192.168.1.49:8082/niems/Model/user/selectAll.jsp?callback=?
	var urlParam="";
	if(keyword==undefined){
	
		urlParam=golbalURL+"/niems/Model/user/selectAll.jsp";
	}else{
	
		urlParam=golbalURL+"/niems/Model/user/search.jsp";
	}
	
	$.ajax({
		url:urlParam,
		type:"post",
		dataType:"json",
		data:{"keyword":keyword},
		success:function(data){
			console.log(data);
			//userDataContent
			var htmlDataContent="";
			/*
			 ["1460600053789","Mr.","Kosit","Aromsava","kosit@gongjesse.com",
			 "bangkok","Y","SA","GJ","N",
			 "1","2559-09-20 13:33:08.0","2559-09-20 13:33:08.0","Admin"]
			 */
			$.each(data,function(index,indexEntry){
				htmlDataContent+="<tr>";
					htmlDataContent+="<td>"+(index+1)+"</td>";
					htmlDataContent+="<td>"+indexEntry[2]+" </td>";
					htmlDataContent+="<td>"+indexEntry[3]+"</td>";
					if(indexEntry[6]=="Y"){
						htmlDataContent+="<td><img src=\"img/button-turn-on.jpg\" width=\"20\"></td>";
					}else{
						htmlDataContent+="<td><img src=\"img/button-turn-off.jpg\" width=\"20\"></td>";
					}
					htmlDataContent+="<td>"+indexEntry[13]+"</td>";
					htmlDataContent+="<td>"+indexEntry[5]+"</td>";
					htmlDataContent+="<td > <button class=\"btn btn-warning btn-xs editUser \"  id=\"edit-"+indexEntry[0]+"\" type=\"button\">Edit</button> <button class=\"btn btn-danger btn-xs delUser\" id=\"del-"+indexEntry[0]+"\" type=\"button\">Del</button></td>";
				htmlDataContent+="</tr>";
			});
			$("#userDataContent").html(htmlDataContent);
			$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
			
			//action binding start
			$(".delUser").click(function(){
				var id=this.id.split("-");
				id=id[1];
				if(confirm("Do you want to delete this file?")){
					deleteData(id);	
				}
				
				
			});
			
			$(".editUser").click(function(){
				var id=this.id.split("-");
				id=id[1];
				$("#userModal").modal();
				findData(id);
				
				$("#action").val("edit");
				
				//submit binding action start
					$("#btnSubmit").off("click");
					$("#btnSubmit").on("click",function(){
						alert("submit");
						if($("#action").val()=="add"){
							insertUserFn();
						}else{
							updateData();
						}
						
					
					});
					
					$("#btnClose").off("click");
					$("#btnClose").on("click",function(){
						clearUserForm();
					});
				//submit binding action end
				
				});
			//action binding end
			
			
			
		}
	});
};
var deleteData = function(id){
	//http://192.168.1.49:8082/niems/Model/user/delete.jsp?user_name=1234567891234
	
	$.ajax({
		url:golbalURL+"/niems/Model/user/delete.jsp",
		type:"post",
		dataType:"json",
		data:{
			"user_name":id
			},
		success:function(data){
			if(data=="success"){
				listDataAll();
				
			}
		}
	});
	
}
var findData = function(id){
	//alert(id);
	//http://192.168.1.49:8082/niems/Model/user/edit.jsp?callback=?&user_name=444
	$.ajax({
		url:golbalURL+"/niems/Model/user/edit.jsp",
		type:"post",
		dataType:"json",
		data:{
			"user_name":id
			},
		success:function(data){
			console.log(data);
			/*
			?([["1460600053789","fca8f81368818c45144b072265140703","Mr.",
			"Kosit","Aromsava","kosit@gongjesse.com",
			"bangkok","Y","SA","GJ","N","1","2559-09-20 13:33:08.0",
			"2559-09-20 13:33:08.0"]]) 
			 */
			
			$("#user_name").val(data[0][0]);
			//$("#password").val("999999999");
			//$("#confirm_password").val("999999999");
			
			$("#password").val("");
			$("#confirm_password").val("");

			
			//prefix start
			listPrefix(data[0][2]);
			//prefix end
			
			$("#first_name").val(data[0][3]);
			$("#last_name").val(data[0][4]);
			$("#email").val(data[0][5]);
			//$("#province").val(data[0][6]);
			listProvince(data[0][6]);
			$("#organization").val(data[0][9]);
			$("#position").val(data[0][8]);
			//$("#role_id").val(data[0][11]);
			listRole(data[0][11]);
			

			listStatusUserFn(data[0][7]);
			
			
		}
	});
	
}

var updateData = function(){
	
/*
http://192.168.1.49:8082/niems/Model/user/update.jsp
?user_name=123456
&password=1234
&prefix=%E0%B8%99%E0%B8%B2%E0%B8%87
&first_name=%E0%B9%82%E0%B8%86%E0%B8%A9%E0%B8%B4%E0%B8%95
&last_name=%E0%B8%AD%E0%B8%B2%E0%B8%A3%E0%B8%A1%E0%B8%93%E0%B9%8C%E0%B8%AA%E0%B8%A7%E0%B8%B0
&email=kosit2@gmail.com&province=bangkok
&status=true&position=SAA
&organization=GJ
&user_items=Y
&role_id=1
*/
	if(vaidation()==true){
		
		var user_name=$("#user_name").val();
		var password=$("#password").val();
		var prefix=$("#prefix").val();
		var first_name=$("#first_name").val();
		var last_name=$("#last_name").val();
		var email=$("#email").val();
		var province=$("#province").val();
		var status=$('input[name="status"]:checked').val();
		
		var position=$("#position").val();
		var organization=$("#organization").val();
		var user_items="N";
		var role_id=$("#role_id").val();
		
		
		$.ajax({
			url:golbalURL+"/niems/Model/user/update.jsp",
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
				"role_id":role_id
				},
			success:function(data){
				//console.log(data);
				if(data=="success"){
				alert("Update success");
				$("#userModal").modal('hide');
				listDataAll();
				
				}
				
			}
		});
	}
	
};


var listStatusUserFn = function(status){
	
	if("Y"==status){
		var statusHtml="";
		statusHtml+="<input class =\"status\"  name=\"status\" type=\"radio\" checked=\"checked\" value=\"Y\">เปิดใช้งาน";
		statusHtml+="<input class =\"status\" name=\"status\" type=\"radio\" value=\"N\">ปิดใช้งาน";
		$("#statusArea").html(statusHtml);
	}else{
		var statusHtml="";
		statusHtml+="<input class =\"status\"  name=\"status\" type=\"radio\"  value=\"Y\">เปิดใช้งาน";
		statusHtml+="<input class =\"status\" name=\"status\" type=\"radio\" checked=\"checked\" value=\"N\">ปิดใช้งาน";
		$("#statusArea").html(statusHtml);
	}
}

var insertUserFn= function(){
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
		var role_id=$("#role_id").val();
		
		
		//check user  unique start
			$.ajax({
				url:golbalURL+"/niems/Model/user/edit.jsp",
				type:"post",
				dataType:"json",
				data:{
					"user_name":user_name
					},
				success:function(data){
					console.log(data);
					if(data!=""){
						alert("The user is already. ");
						
					}else{
						
						
						//insert start 
						$.ajax({
							url:golbalURL+"/niems/Model/user/insert.jsp",
							type:"post",
							dataType:"json",
							//"callback":"?",
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
								"role_id":role_id
								},
							success:function(data){
								console.log(data);
								alert(data);
								console.log(eval+"("+data+")");
								
								if(data[0]=="success"){
									alert("Register is success");
									$("#userModal").modal('hide');
									listDataAll();
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
}

var clearUserForm = function(){
	$("#user_name").val("");
	$("#password").val("");
	listPrefix("นาย");
	$("#first_name").val("");
	$("#last_name").val("");
	$("#email").val("");
	$("#province").val("");
	
	listStatusUserFn("Y");
	
	$("#position").val("");
	$("#organization").val("");
	//var user_items="N";
	$("#role_id").val("");
	listRole(3);
	listProvince();
	$("#action").val("add");
}


$(document).ready(function(){
	//$("#userTable").DataTable();
	$("#userTable").kendoGrid({
        height:"",
        sortable: true,
        pageable: true,
        scrollable: false,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        }
	});
	
	
	
	//search start 
	$("#btnSearch").click(function(){
		
		//alert($("#searchInput").val());
		listDataAll($("#searchInput").val());
		
	});
	//search end
	
	
	//list data start
	listDataAll();
	//list data end
	
	$("#manageUser").click(function(){
		//listRole(3);
		//listProvince();
		
		clearUserForm();
		
		$("#btnSubmit").off("click");
		$("#btnSubmit").on("click",function(){
			
			if($("#action").val()=="add"){
				insertUserFn();
			}else{
				updateData();
			}
			
		
		});
		
		$("#btnClose").off("click");
		$("#btnClose").on("click",function(){
			clearUserForm();
		});
		
		
	});
	
});