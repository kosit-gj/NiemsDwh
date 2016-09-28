var insertCateTypeFn= function(){
	if(vaidationCateType()==true){
		
		var cate_type_name=$("#cate_type_name").val();
		
		
		
		//check user  unique start
			$.ajax({
				url:golbalURL+"/niems/Model/category_type/check_unique.jsp",
				type:"post",
				dataType:"json",
				data:{
					"cate_type_name":cate_type_name
					},
				success:function(data){
					console.log(data);
					if(data!=""){
						alert("The Cate type name is already. ");
						
					}else{
						
						
						//insert start 
						$.ajax({
							url:golbalURL+"/niems/Model/category_type/insert.jsp",
							type:"post",
							dataType:"json",
							//"callback":"?",
							data:{
								"cate_type_name":cate_type_name,
								
								},
							success:function(data){
								console.log(data);

								
								if(data[0]=="success"){
									alert("Insert is success");
									$("#cateTypeModal").modal('hide');
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
var listDataAll = function(keyword){
	//http://192.168.1.49:8082/niems/Model/user/selectAll.jsp?callback=?
	var urlParam="";
	if(keyword==undefined){
		urlParam=golbalURL+"/niems/Model/category_type/selectAll.jsp";
	}else{
	
		urlParam=golbalURL+"/niems/Model/category_type/search.jsp";
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
		
			$.each(data,function(index,indexEntry){
				htmlDataContent+="<tr>";
					htmlDataContent+="<td>"+(index+1)+"</td>";
					htmlDataContent+="<td>"+indexEntry[1]+" </td>";
					
					htmlDataContent+="<td > <button class=\"btn btn-warning btn-xs editCateType \"  id=\"edit-"+indexEntry[0]+"\" type=\"button\">Edit</button> <button class=\"btn btn-danger btn-xs delCateType\" id=\"del-"+indexEntry[0]+"\" type=\"button\">Del</button></td>";
				htmlDataContent+="</tr>";
			});
			$("#cateTypeDataArea").html(htmlDataContent);
			$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
			
			//action binding start
			$(".delCateType").click(function(){
				var id=this.id.split("-");
				id=id[1];
				if(confirm("Do you want to delete this file?")){
					deleteData(id);	
				}
				
				
			});
			
			$(".editCateType").click(function(){
				var id=this.id.split("-");
				id=id[1];
				$("#cateTypeModal").modal();
				findData(id);
				
				$("#action").val("edit");
				$("#cate_type_id").val(id);
				
				//binding action start
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
				//binding action end
				
			});
			//action binding end
		}
	});
};
var clearCateTypeForm = function(){
	$("#cate_type_name").val("");
	
}
var vaidationCateType = function(){
	var txtArert="";
	
	if($("#cate_type_name").val()==""){
		txtArert+="Cate type name ห้ามเป็นค่าว่าง\n";
	}
	
	if(txtArert!=""){
		alert(txtArert);
		return false
	}else{
		return true;
	}
	
	
}
var deleteData = function(id){
	//http://192.168.1.49:8082/niems/Model/user/delete.jsp?user_name=1234567891234
	
	$.ajax({
		url:golbalURL+"/niems/Model/category_type/delete.jsp",
		type:"post",
		dataType:"json",
		data:{
			"cate_type_id":id
			},
		success:function(data){
			if(data=="success"){
				listDataAll();
				
			}
		}
	});
	
}
var findData = function(id){
	
	$.ajax({
		url:golbalURL+"/niems/Model/category_type/edit.jsp",
		type:"post",
		dataType:"json",
		data:{
			"cate_type_id":id
			},
		success:function(data){
			console.log(data);
		
			
			$("#cate_type_name").val(data[0][1]);

			
			
		}
	});
	
}

var updateData = function(){
	

	if(vaidationCateType()==true){
		
		var cate_type_name=$("#cate_type_name").val();
		var cate_type_id=$("#cate_type_id").val();
		
		
		
		
		$.ajax({
			url:golbalURL+"/niems/Model/category_type/update.jsp",
			type:"post",
			dataType:"json",
			data:{
				"cate_type_id":cate_type_id,
				"cate_type_name":cate_type_name,
				
				},
			success:function(data){
				//console.log(data);
				if(data=="success"){
				alert("Update success");
				$("#cateTypeModal").modal('hide');
				listDataAll();
				
				}
				
			}
		});
	}
	
};


$(document).ready(function(){
	//$("#userTable").DataTable();
	$("#cateTypeTable").kendoGrid({
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
	$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
	
	
	
	
	//show display start
	listDataAll();
	//show display end
	
	//search start 
	$("#btnSearch").click(function(){
		
		//alert($("#searchInput").val());
		listDataAll($("#searchInput").val());
		
	});
	//search end
	
	
	//action binding start
	$(".delCateType").click(function(){
		var id=this.id.split("-");
		id=id[1];
		if(confirm("Do you want to delete this file?")){
			deleteData(id);	
		}
		
		
	});
	
	
	//manage cateType start
	$("#manageCateType").click(function(){

		clearCateTypeForm();
		
		$("#btnSubmit").off("click");
		$("#btnSubmit").on("click",function(){
			
			if($("#action").val()=="add"){
				insertCateTypeFn();
			}else{
				//updateData();
			}
			
		
		});
		
		$("#btnClose").off("click");
		$("#btnClose").on("click",function(){
			clearCateTypeForm();
		});
		
		
	});
	//manage cateType end
});