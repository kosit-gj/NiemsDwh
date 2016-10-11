var insertcateLinkFn = function(){
	if(vaidationcateLink()==true){
		
		var cate_name=$("#cate_name").val();
		var cate_type_id= $("#listCateLink").val();
		var cate_icon=$("#cate_icon i").attr('class');

		var cate_icon_bg=$("#cate_icon_bg").val();
		var ineligible=$('input[name="ineligible"]:checked').val();
		/*
		alert(cate_name);
		alert(cate_type_id);
		alert(ineligible);
		alert(cate_icon);
		*/
		/*
		http://192.168.1.49:8082/niems/Model/category_link/insert.jsp?callback=?
&cate_name=test
&cate_icon=d://dir/image/abc.jpg
&ineligible=Y
&cate_type_id=1
		*/
		//check user  unique start
			$.ajax({
				url:golbalURL+"/niems/Model/category_link/check_unique.jsp",
				type:"post",
				dataType:"json",
				data:{
					"cate_name":cate_name,
					"cate_type_id":cate_type_id
					},
				success:function(data){
					
					console.log(data);
					
					if(data != ""){
						
						alert("The Cate type name is already.");
						
					}else{
						
						
						//insert start 
						$.ajax({
							url:golbalURL+"/niems/Model/category_link/insert.jsp",
							type:"post",
							dataType:"json",
							//"callback":"?",
							data:{
								"cate_name":cate_name,
								"cate_icon":cate_icon,
								"cate_icon_bg":cate_icon_bg,
								"ineligible":ineligible,
								"cate_type_id":cate_type_id,
								},
							success:function(data){
								
								console.log(data);
								
								if(cate_name != ""){
									
									if(data[0]=="success"){
										alert("Insert is success");
										$("#cateLinkModal").modal('hide');
										//listDataAll();
										listCateLinkByCateType(cate_type_id);
									}
									
								}else{
									
									alert("Please insert Category Link name.");
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

var listData = function(data){
			console.log(data);
			//userDataContent
			var htmlDataContent="";
		
			$.each(data,function(index,indexEntry){
				
				htmlDataContent+="<tr>";
					htmlDataContent+="<td>"+(index+1)+"</td>";
					htmlDataContent+="<td>"+indexEntry[8]+" </td>";
					htmlDataContent+="<td>"+indexEntry[1]+" </td>";
					if(indexEntry[3]=="Y"){
						htmlDataContent+="<td><center> <img width=\"20\" src=\"img/button-turn-on.jpg\"></center></td>";
					}else if(indexEntry[3]=="N"){
						htmlDataContent+="<td><center> <img width=\"20\" src=\"img/button-stand_by.jpg\"></center></td>";
					}else if(indexEntry[3]=="H"){
						htmlDataContent+="<td><center> <img width=\"20\" src=\"img/button-turn-off.jpg\"></center></td>";
					}
					
					
					htmlDataContent+="<td ><center> <button class=\"btn btn-warning btn-xs editcateLink \"  id=\"edit-"+indexEntry[0]+"\" type=\"button\">Edit</button> <button class=\"btn btn-danger btn-xs delcateLink\" id=\"del-"+indexEntry[0]+"\" type=\"button\">Del</button></center></td>";
				htmlDataContent+="</tr>";
			});
			$("#cateLinkDataArea").html(htmlDataContent);
			$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
			
			//action binding start
			$(".delcateLink").click(function(){
				var id=this.id.split("-");
				id=id[1];
				if(confirm("Do you want to delete this file?")){
					deleteData(id);	
				}
				
				
			});
			
			$(".editcateLink").click(function(){
				var id=this.id.split("-");
				id=id[1];
				$("#cateLinkModal").modal();
				findData(id);
				
				$("#action").val("edit");
				$("#cate_link_id").val(id);
				
				//binding action start
				$("#btnSubmit").off("click");
				$("#btnSubmit").on("click",function(){
					//alert("submit");
					if($("#action").val()=="add"){
						insertUserFn();
					}else{
						updateData();
					}
					
				
				});
				
				$("#btnClose").off("click");
				$("#btnClose").on("click",function(){
					clearCateLinkForm();
				});
				//binding action end
				
				//binding action color picker 
				$(function() { $('#cate_icon_bg_action').colorpicker(); });
				
				//GET ICON START
				$(".getIcon").off("click");
				$(".getIcon").on("click",function(){
					console.log($("i",this).attr('class'));
					$("#cate_icon").html("<i class=\""+$("i",this).attr('class')+"\"></i>");
				});
				
				//GET ICON END
				
			});
			//action binding end
	
}
var listDataAll = function(){	

		
	
		$.ajax({
			url:golbalURL+"/niems/Model/category_link/selectAll.jsp",
			type:"post",
			dataType:"json",
			success:function(data){
				console.log(data);
				listData(data);
			}
		});
	
};
var searchDataFn= function(keyword){
	$.ajax({
		url:golbalURL+"/niems/Model/category_link/search.jsp",
		type:"post",
		dataType:"json",
		data:{"keyword":keyword},
		success:function(data){

			listData(data);
		}
	});
};
var clearcateLinkForm = function(){
	$("#cate_link_name").val("");
	$("#action").val("add");
	
}
var vaidationcateLink = function(){
	
	var txtArert="";
	
	
	if($("#listCateLink").val()=="All"){
		txtArert+="โปรดเลือก Category Link\n";
	}
	if($("#cate_name").val()==""){
		txtArert+="Cate link name  ห้ามเป็นค่าว่าง\n";
	}
	
	
	if(txtArert!=""){
		alert(txtArert);
	
		return false
	}else{
	
		return true;
	}
	
	
}
var deleteData = function(id){
	
	//http://192.168.1.49:8082/niems/Model/category_link/delete.jsp?callback=?&cate_link_id=1
	var cate_type_id= $("#embedCateTypeFilterId").val();
	//alert(cate_type_id);
	$.ajax({
		url:golbalURL+"/niems/Model/category_link/delete.jsp",
		type:"post",
		dataType:"json",
		data:{
			"cate_link_id":id
			},
		success:function(data){
			if(data=="success"){
				
				//listDataAll();
				listCateLinkByCateType(cate_type_id);
				
			}
		}
	});
	
}
var ineligibleFn = function(status){
	var ineligibleHTML="";
	
	if(status=="H"){
		
		ineligibleHTML+="<input class =\"ineligible\" name=\"ineligible\" type=\"radio\" value=\"Y\">แสดง Link Category <br>";
		ineligibleHTML+="<input class =\"ineligible\"  name=\"ineligible\" type=\"radio\" checked=\"checked\" value=\"H\">ซ่อน Link Category <br>";
		ineligibleHTML+="<input class =\"ineligible\" name=\"ineligible\" type=\"radio\" value=\"N\">แสดง Link Category(คลิกไม่ได้) <br>";
		

	}else if(status=="Y"){
		ineligibleHTML+="<input class =\"ineligible\" name=\"ineligible\" type=\"radio\" checked=\"checked\" value=\"Y\">แสดง Link Category <br>";
		ineligibleHTML+="<input class =\"ineligible\"  name=\"ineligible\" type=\"radio\"  value=\"H\">ซ่อน Link Category <br>";
		ineligibleHTML+="<input class =\"ineligible\" name=\"ineligible\" type=\"radio\" value=\"N\">แสดง Link Category(คลิกไม่ได้) <br>";
		
	
	}else if(status=="N"){
		
		ineligibleHTML+="<input class =\"ineligible\" name=\"ineligible\" type=\"radio\" value=\"Y\">แสดง Link Category <br>";
		ineligibleHTML+="<input class =\"ineligible\"  name=\"ineligible\" type=\"radio\"  value=\"H\">ซ่อน Link Category <br>";
		ineligibleHTML+="<input class =\"ineligible\" name=\"ineligible\" type=\"radio\" checked=\"checked\" value=\"N\">แสดง Link Category(คลิกไม่ได้) <br>";
		

	}
	
	
	$("#ineligibleArea").html(ineligibleHTML);
}
var findData = function(id){
	
	$.ajax({
		url:golbalURL+"/niems/Model/category_link/edit.jsp",
		type:"post",
		dataType:"json",
		data:{
			"cate_link_id":id
			},
		success:function(data){
			//console.log(data);
		
			
			$("#cate_name").val(data[0][1]);
			//$("#cate_icon").val(data[0][1]);
			$("#cate_icon").html("<i class=\""+data[0][2]+"\"></i>");
			
			//var cate_type_id= $("#listCateLink").val();
			listCateType(data[0][4]);
			$("#cate_icon_bg").val(data[0][5]);
			
			ineligibleFn(data[0][3]);

			
			
		}
	});
	
}

var updateData = function(){
	

	if(vaidationcateLink()==true){
		

		
		var cate_name=$("#cate_name").val();
		
		var cate_type_id= $("#listCateLink").val();
		var cate_icon=$("#cate_icon i").attr('class');
		

		var cate_icon_bg=$("#cate_icon_bg").val();
		var ineligible=$('input[name="ineligible"]:checked').val();
		var cate_link_id=$("#cate_link_id").val();
		
		/*
		http://192.168.1.49:8082/niems/Model/category_link/update.jsp?callback=?
&cate_name=testabcd
&cate_icon=d://dir/image/abc.jpg
&ineligible=Y
&cate_type_id=1
&cate_link_id=1
		*/
		
		if(cate_name !=""){//add by jeep
			$.ajax({
				url:golbalURL+"/niems/Model/category_link/update.jsp",
				type:"post",
				dataType:"json",
				data:{
					
					"cate_name":cate_name,
					"cate_icon":cate_icon,
					"cate_icon_bg":cate_icon_bg,
					"ineligible":ineligible,
					"cate_type_id":cate_type_id,
					"cate_link_id":cate_link_id
					
					},
					
				success:function(data){
					//console.log(data);
					if(data=="success"){
						
						alert("Update success");
						$("#cateLinkModal").modal('hide');
						//listDataAll();
						listCateLinkByCateType(cate_type_id);
					
					}
					
				}
			});
		//add by jeep start
		}else{
			alert("Please insert Category type name.");
		}
		//add by jeep end
		
	}
	
};
var listCateLinkByCateType = function(cate_type_id){
	//http://192.168.1.49:8082/niems/Model/portal_link/select_cate_link_by_cate_tpe.jsp?callback=?&cate_type_id=1
	
	if(cate_type_id=="All"){
		
		listDataAll();
		
	}else{
		$.ajax({
			url:golbalURL+"/niems/Model/portal_link/select_cate_link_by_cate_tpe.jsp",
			type:"post",
			dataType:"json",
			data:{"cate_type_id":cate_type_id},
			success:function(data){
				
				listData(data);
			
			}
		});
	}
}
var listCateType = function(cateTypeId){
	$.ajax({
		url:golbalURL+"/niems/Model/category_type/selectAll.jsp",
		type:"post",
		dataType:"json",
		success:function(data){
			var selectHTML="";
			selectHTML+="<select style='width:100%;' id=\"listCateLink\" class=\"btnCustom form-control\">";
		
					selectHTML+="<option value='All'>เลือก Type Category </option>";
				$.each(data,function(index,indexEntry){
					if(indexEntry[0]==cateTypeId){
						selectHTML+="<option selected='selected' value="+indexEntry[0]+">"+indexEntry[1]+"</option>";	
					}else{
						selectHTML+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
					}
				});
				
			selectHTML+="</select>";
			
			$("#listCateLinkArea").html(selectHTML);
			//list cate link start
			/*
			$("#listCateLink").change(function(){
				//alert($(this).val());
				listCateLinkByCateType($(this).val());
				$("#embedCateTypeId").remove();
				var paramHtml="<input type='hidden' calass='paramEmbed' id='embedCateTypeId' name='embedCateTypeId' value='"+$(this).val()+"'>";
				$("body").append(paramHtml);
			});
			$("#listCateLink").change();
			*/
		//list cate link end
		}
	});
}
var listCateTypeFilterFn = function(){
	$.ajax({
		url:golbalURL+"/niems/Model/category_type/selectAll.jsp",
		type:"post",
		dataType:"json",
		success:function(data){
			var selectHTML="";
			selectHTML+="<select style='width:200px;' id=\"listCateLinkFilter\" class=\"btnCustom form-control\">";
		
				selectHTML+="<option value=\"All\">All Type Category</option>";
				$.each(data,function(index,indexEntry){
					selectHTML+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
				});
				
			selectHTML+="</select>";
			
			$("#listCateLinkFilterArea").html(selectHTML);
			//list cate link start
			
			$("#listCateLinkFilter").change(function(){
				//alert($(this).val());
				listCateLinkByCateType($(this).val());
				$("#embedCateTypeFilterId").remove();
				var paramHtml="<input type='hidden' calass='paramEmbed' id='embedCateTypeFilterId' name='embedCateTypeFilterId' value='"+$(this).val()+"'>";
				$("body").append(paramHtml);
			});
			$("#listCateLinkFilter").change();
		//list cate link end
		}
	});
}

var clearCateLinkForm = function(){
	$("#cate_name").val("");
	$("#action").val("add");
}
$(document).ready(function(){
	
	
	//$("#userTable").DataTable();
	$("#cateLinkTable").kendoGrid({
		height:"",
        sortable: false,
        pageable: true,
        scrollable: false,
        pageable: {
            refresh: true,
            pageSizes: true,	
            buttonCount: 5
        }, 
        dataSource: {
            pageSize: 10
        }
	});
	$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
	
	
	//Link All Start
	
		listDataAll();
	
	//Link All End
	
	//list cate link start
	listCateTypeFilterFn();
	//list cate link end
	
	
	//search start 
	$("#btnSearch").click(function(){
		
		//alert($("#searchInput").val());
		searchDataFn($("#searchInput").val());
		
	});
	//search end
	
	//manage cateType start
	$("#manageCateLink").click(function(){

		clearCateLinkForm();
		listCateType($("#embedCateTypeFilterId").val());
		
		$("#btnSubmit").off("click");
		$("#btnSubmit").on("click",function(){
			
			if($("#action").val()=="add"){
				
				insertcateLinkFn();
				
			}else{
				updateData();
			}
			
		
		});
		
		$("#btnClose").off("click");
		$("#btnClose").on("click",function(){
			clearCateLinkForm();
		});
		
		//GET ICON START
		$(".getIcon").off("click");
		$(".getIcon").on("click",function(){
			console.log($("i",this).attr('class'));
			$("#cate_icon").html("<i class=\""+$("i",this).attr('class')+"\"></i>");
		});
		
		//GET ICON END
		
		//binding action color picker start
		//$("#cate_bg").colorpicker();
		
		//binding action color picker 
		$(function() { $('#cate_icon_bg_action').colorpicker(); });
	});
	//manage cateType end
	
		
	
});