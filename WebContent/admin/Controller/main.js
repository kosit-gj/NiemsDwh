
$(document).ready(function(){
	var listCategoryTypeFn = function(){
		//http://192.168.1.49:8082/niems/Model/category_type/selectAll.jsp?callback=?
		$.ajax({
			url:"http://192.168.1.49:8082/niems/Model/category_type/selectAll.jsp",
			type:"get",
			dataType:"jsonp",
			async:false,
			data:{"callback":"?"},
			success:function(data){
				console.log(data);
			}
		});
		
	}
	var listSelectCateLinkByCateTypeFn = function(cate_type_id){
		//http://192.168.1.49:8082/niems/Model/category_type/selectAll.jsp?callback=?
		$.ajax({
			url:"http://192.168.1.49:8082/niems/Model/portal_link/select_cate_link_by_cate_tpe.jsp",
			type:"get",
			dataType:"jsonp",
			async:false,
			data:{"callback":"?","cate_type_id":cate_type_id},
			success:function(data){
				console.log(data);
			}
		});
		
	}
	var listSelectLinkByCateLinkFn = function(cate_link_id){
		//http://192.168.1.49:8082/niems/Model/category_type/selectAll.jsp?callback=?
		$.ajax({
			url:"http://192.168.1.49:8082/niems/Model/portal_link/select_link_by_cate_link.jsp",
			type:"get",
			dataType:"jsonp",
			async:false,
			data:{"callback":"?","cate_link_id":cate_link_id},
			success:function(data){
				console.log(data);
			}
		});
		
	}
	
	/*
	http://192.168.1.49:8082/niems/Model/portal_link/select_cate_link_by_cate_tpe.jsp?callback=?&cate_type_id=1
	http://192.168.1.49:8082/niems/Model/portal_link/select_link_by_cate_link.jsp?callback=?&cate_link_id=1
	 */
	listCategoryTypeFn();
	
	
	$.ajax({
		url:"http://192.168.1.49:8082/niems/Model/user/session.jsp",
		type:"get",
		dataType:"json",
		async:false,
		//data:{"callback":"?"},
		success:function(data){
			//alert(data);
			console.log(data)
			if(data["user_name"]=="null"){
			
				//alert("not ok");
				$( location ).attr("href", "login.html");
				
			}else{
				
				$("#logout").click(function(){
					$.ajax({
						url:"http://192.168.1.49:8082/niems/Model/user/destroySession.jsp",
						type:"get",
						dataType:"json",
						async:false,
						success:function(data){
							if(data=="success"){
								alert("logout is success.");
								$( location ).attr("href", "portal_link.html");
							}
						}
					});
				});
				
				$("#roleName").html(data['role_id']);
				$("#fristName").html(data['first_name']);
				$(".display").show();
				$(".embed_param").remove();
				/*
				?({"user_name":"1460600053789","prefix":"Mr.","first_name":"Kosit",
				"last_name":"Aromsava","email":"kosit@gongjesse.com","status":"Y","position":"SA",
				"organization":"GJ","role_id":"1","user_items":"Y","province":"bangkok"}) 
					
						
				*/
				$("body").append("<input type='hidden' id='embed_user_name' class='embed_param' name='embed_user_name' value='"+data['user_name']+"'>");
				$("body").append("<input type='hidden' id='embed_prefix' class='embed_param' name='embed_prefix' value='"+data['prefix']+"'>");
				$("body").append("<input type='hidden' id='embed_first_name' class='embed_param' name='embed_first_name' value='"+data['first_name']+"'>");
				$("body").append("<input type='hidden' id='embed_last_name' class='embed_param' name='embed_last_name' value='"+data['last_name']+"'>");
				$("body").append("<input type='hidden' id='embed_email' class='embed_param' name='embed_email' value='"+data['email']+"'>");
				$("body").append("<input type='hidden' id='embed_status' class='embed_param' name='embed_status' value='"+data['status']+"'>");
				$("body").append("<input type='hidden' id='embed_position' class='embed_param' name='embed_position' value='"+data['position']+"'>");
				$("body").append("<input type='hidden' id='embed_organization' class='embed_param' name='embed_organization' value='"+data['organization']+"'>");
				
				$("body").append("<input type='hidden' id='embed_role_id' class='embed_param' name='embed_role_id' value='"+data['role_id']+"'>");
				$("body").append("<input type='hidden' id='embed_user_items' class='embed_param' name='embed_user_items' value='"+data['user_items']+"'>");
				$("body").append("<input type='hidden' id='embed_province' class='embed_param' name='embed_province' value='"+data['province']+"'>");
				
			}
		}
		
	});
});