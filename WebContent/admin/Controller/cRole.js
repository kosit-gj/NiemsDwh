function showSelectedValues()
{
  return ($("input[name=checkboxAsignLink]:checked").map(
     function () {return this.value;}).get().join(","));
}
var genHTMLGirdContent = function(gridName){
	//style='height:500px;
	htmldataContent="";
	htmldataContent+="<table id=\"grid-"+gridName+"\"  class=\"gridTable\">";
	htmldataContent+="<colgroup>";
	//htmldataContent+="<col style=\"width:5%\" />";
	//htmldataContent+="<col style=\"width:5%\" />";
	htmldataContent+="<col style=\"width:80%\" />";
	htmldataContent+="<col style=\"width:10%\" />";
	htmldataContent+="<colgroup>";
	htmldataContent+="<thead>";
		htmldataContent+="<tr>";
			//htmldataContent+="<th data-field=\"Field0\"></th>";
			//htmldataContent+="<th data-field=\"Field1\"><b>#</b></th>";
			htmldataContent+="<th data-field=\"Field2\"><b>Link</b></th>";
			htmldataContent+="<th data-field=\"Field3\"><b>Assign <input type='checkbox' name='assignLinkAll' id='assignLinkAll'></b></th>";
			
		htmldataContent+="</tr>";
	htmldataContent+="</thead>";
	htmldataContent+="<tbody >";
	htmldataContent+="<tr>";
			//htmldataContent+="<td></td>";
			htmldataContent+="<td></td>";
			htmldataContent+="<td></td>";
			htmldataContent+="<td></td>";
			
		htmldataContent+="</tr>";
		htmldataContent+="</tbody>";
	htmldataContent+="</table>";
htmldataContent+="<div class='clearfix'></div>";
return htmldataContent;
}


var $titleAssignLink =[
               /*
	              {
	                  field: "Field1",
					   width: "10%"
	              },
	              */
	              {
	                  field: "Field2",
					  width: "70%"
					 
				 },
	              {
	                  field: "Field3",
						 width:"10%"
					
				
				 }
				 ];

var dataAssignLink="[";
dataAssignLink+="{";
dataAssignLink+="Field1:\"1.1\",";
dataAssignLink+="Field2:\"<div class='textGrid'>afad</div>\",";
dataAssignLink+="Field3:\"<div class='textGrid'><input type='checkbox' name='assignLink' id='assignLink'></div>\",";

dataAssignLink+="},";
dataAssignLink+="{";
dataAssignLink+="Field1:\"1.2\",";
dataAssignLink+="Field2:\"<div class='textGrid'>afad</div>\",";
dataAssignLink+="Field3:\"<div class='textGrid'><input type='checkbox' name='assignLink' id='assignLink'></div>\",";


dataAssignLink+="}," ;
dataAssignLink+="{";
dataAssignLink+="Field1:\"1.3\",";
dataAssignLink+="Field2:\"<div class='textGrid'>afad</div>\",";
dataAssignLink+="Field3:\"<div class='textGrid'><input type='checkbox' name='assignLink' id='assignLink'></div>\",";


dataAssignLink+="}";
		
dataAssignLink+="]";

var objdataAssignLink=eval("("+dataAssignLink+")");
//console.log(objdataAssignLink);



var listCateLink = function(){
	var objdataAssignLink="";
	$.ajax({
		url:golbalURL+"/niems/Model/category_link/selectAll.jsp",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
		
			//listData(data);
			// [["1", "Admin", "2016-09-14 14:30:55.0", "2559-09-19 18:57:56.0"]]
			var dataJson="";
			dataJson+="[";
		/*
		 <input type='checkbox' name='assignALl' id='assignAll'>
		 */
		
			$.each(data,function(index,indexEntry){
				
				if(index==0){
					
					
					dataJson+="{";
					
					
					dataJson+="FieldCateLinkId:\""+indexEntry[0]+"\",";
					//dataJson+="Field1:\""+(index+1)+"\",";
					dataJson+="Field2:\"<b>"+indexEntry[1]+"</b>\",";
					//dataJson+="Field3:\"<center><input type='checkbox' name='cateLink' id='cateLink-"+indexEntry[0]+"' class='cateLink'></center>\",";
					dataJson+="Field3:\"\",";
					
					
				}else{	
					dataJson+=",{";
					dataJson+="FieldCateLinkId:\""+indexEntry[0]+"\",";
					//dataJson+="Field1:\""+(index+1)+"\",";
					dataJson+="Field2:\"<b>"+indexEntry[1]+"</b>\",";
					//dataJson+="Field3:\"<center><input type='checkbox' name='cateLink' id='cateLink-"+indexEntry[0]+"' class='cateLink'></center>\",";
					dataJson+="Field3:\"\",";
					
					
				}
				
				dataJson+="}";
				
				dataJson+=listLinkByCateId(indexEntry[0]);
				/*
				console.log("1======");
				console.log(listLinkByCateId(indexEntry[0]));
				console.log("2======");
				*/
				
			});
			dataJson+="]";
			console.log(dataJson);
			
			 objdataAssignLink=eval("("+dataJson+")");
			
			
			
			
		}
	});
	return objdataAssignLink;
};

var listLinkByCateId = function(cate_link_id){
	//var linkObject="";
	var dataJson="";
	//http://192.168.1.49:8082/niems/Model/portal_link/select_link_by_cate_link.jsp?callback=?&cate_link_id=1
	$.ajax({
		url:golbalURL+"/niems/Model/portal_link/select_link_by_cate_link.jsp",
		type:"post",
		dataType:"json",
		async:false,
		data:{"cate_link_id":cate_link_id},
		success:function(data){
			//console.log("33333");
			//console.log(data);
			//"47","73","AADAbc","CUSTOM_LINK","ADBCbc","custom url\n	","2559-09-24 21:43:47.0","2559-09-24 21:58:59.0"
			//var dataJson="";
			//dataJson+="[";
			if(data!=""){
				//alert("not null");
				
				$.each(data,function(index,indexEntry){
					
					
							dataJson+=",{";
							//dataJson+="Field1:\""+(index+1)+"\",";
							//dataJson+="Field1:\"\",";
							dataJson+="Field2:\"<div class='level2'>- "+indexEntry[2]+"</div>\",";
							dataJson+="Field3:\" <center> <input type='checkbox' name='checkboxAsignLink' class='checkboxAsignLink cateLink-"+cate_link_id+"' id='link-"+indexEntry[0]+"' value='"+indexEntry[0]+"'></center>\"";
							dataJson+="}";
						
						
					
				});
				
			}else{
				//alert("is null");
			}
			
			//dataJson+="]";
			//linkObject=eval("("+dataJson+")");	
			
		}
	});
	return dataJson;
}





var insertRoleFn = function(){
	if(vaidationRole()==true){
		
		var role_name=$("#role_name").val();
		
		//check user  unique start
			$.ajax({
				url:golbalURL+"/niems/Model/role/check_unique.jsp",
				type:"post",
				dataType:"json",
				data:{
					"role_name":role_name
					},
				success:function(data){
				
					if(data!=""){
						alert("Role name is already. ");
						
					}else{
						
						
						//insert start 
						$.ajax({
							url:golbalURL+"/niems/Model/role/insert.jsp",
							type:"post",
							dataType:"json",
							//"callback":"?",
							data:{
								"role_name":role_name
								},
							success:function(data){
								console.log(data);

								
								if(data[0]=="success"){
									alert("Insert is success");
									$("#roleModal").modal('hide');
									listDataAll();
									//listCateLinkByCateType(cate_type_id);
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
var vaidationRole = function(){
	var txtArert="";
	
	if($("#role_name").val()==""){
		txtArert+="Role name ห้ามเป็นค่าว่าง\n";
	}
	
	if(txtArert!=""){
		alert(txtArert);
		return false
	}else{
		return true;
	}
	
	
}
var deleteData = function(id){
	

	$.ajax({
		url:golbalURL+"/niems/Model/role/delete.jsp",
		type:"post",
		dataType:"json",
		data:{
			"role_id":id
			},
		success:function(data){
			if(data=="success"){
				
				listDataAll();
				//listCateLinkByCateType(cate_type_id);
				
			}
		}
	});
	
}
var searchDataFn= function(keyword){
	$.ajax({
		url:golbalURL+"/niems/Model/role/search.jsp",
		type:"post",
		dataType:"json",
		data:{"keyword":keyword},
		success:function(data){

			listData(data);
		}
	});
};

var listData = function(data){
			
			//userDataContent
			var htmlDataContent="";
		
			$.each(data,function(index,indexEntry){
				
				htmlDataContent+="<tr>";
					htmlDataContent+="<td>"+(index+1)+"</td>";
					htmlDataContent+="<td>"+indexEntry[1]+" </td>";
					if(indexEntry[0]=="1" || indexEntry[0]=="2" || indexEntry[0]=="3"){
						htmlDataContent+="<td ><center> <button data-target=\"#asignLink\"  data-toggle=\"modal\" id=\"assignRoleID-"+indexEntry[0]+"\"  class=\"btn btn-primary btn-xs assignLink\" type=\"button\">Assign link</button></center></td>";
					}else{
						htmlDataContent+="<td ><center> <button data-target=\"#asignLink\"  data-toggle=\"modal\" id=\"assignRoleID-"+indexEntry[0]+"\"  class=\"btn btn-primary btn-xs assignLink\" type=\"button\">Assign link</button> <button class=\"btn btn-warning btn-xs editRole \"  id=\"edit-"+indexEntry[0]+"\" type=\"button\">Edit</button> <button class=\"btn btn-danger btn-xs delRole\" id=\"del-"+indexEntry[0]+"\" type=\"button\">Del</button></center></td>";
					}
				htmlDataContent+="</tr>";
			});
			$("#roleDataArea").html(htmlDataContent);
			$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
			
			//action binding start
			$(".delRole").click(function(){
				var id=this.id.split("-");
				id=id[1];
				if(confirm("Do you want to delete this file?")){
					deleteData(id);	
				}
				
				
			});
			
			$(".editRole").click(function(){
				var id=this.id.split("-");
				id=id[1];
				$("#roleModal").modal();
				findData(id);
				
				$("#action").val("edit");
				$("#role_id").val(id);
				
				//binding action start
				$("#btnSubmit").off("click");
				$("#btnSubmit").on("click",function(){
					//alert("submit");
					updateData();
					
				
				});
				
				$("#btnClose").off("click");
				$("#btnClose").on("click",function(){
					clearRoleForm();
				});
				//binding action end
				
			});
			//action binding end
			
			//action asignLInk start
			$(".assignLink").off("click");
			$(".assignLink").on("click",function(){
				var id=this.id;
				id=id.split("-");
				id=id[1];
				//$(alert(id));
				
				
				$("#assignDataArea").html(genHTMLGirdContent("assignLinkTable"));				
				$("#grid-assignLinkTable").kendoGrid({
					height:"",
			        
					//sortable: true,
			        pageable: true,
			        scrollable: false,
			        pageable: {
			            refresh: true,
			            pageSizes: true,	
			            buttonCount: 5
			        },
			        
			        
			        dataSource: {
			     	   
			            data:listCateLink()
			        },
			        
			        
			       columns: $titleAssignLink,
			                    
			      // detailInit: detailInit,
			       /*
			        dataBound: function() {
			            this.expandRow(this.tbody.find("tr.k-master-row").first());
			        },
			        */
			       
				});
			
				$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
				
				
				//assign all,none assign all start
				
					$('#assignLinkAll').change(function(){
						if($(this).is( ':checked' )){
							//alert("1");
							$(".checkboxAsignLink").prop("checked",true);
						}else{
							//alert("0");
							$(".checkboxAsignLink").prop("checked",false);
						}
					});
				//assign all,none assign all end
				
				
				
				$("#assign_role_id").val(id);
				
				//binding action on grid start
				/*
					$(".cateLink").off("click");
					$(".cateLink").on("click",function(){
						
						var id=this.id;
						id=id.split("-");
						id=id[1];
						//$(alert(id));
						
						
						$(this).parent().prev().prev().prev().children().click();
						var statusExpland= $(this).parent().prev().prev().prev().children().get();
						console.log(statusExpland[0]);
						
						if($(statusExpland).hasClass("k-minus")){
							$(".cateLink-"+id).prop('checked',true);
							//alert("ok");
						}else{
							$(".cateLink-"+id).prop('checked',false);
							//alert("not ok");
						}
					
						
						//$(".cateLink-"+id).prop('checked',true);
						console.log($(this).parent().prev().prev().prev().children().get());
					});
					*/
				//binding action on grid end
					
					
				//submit Form Start
					$("#btnAssignSubmit").off("click");
					$("#btnAssignSubmit").on("click",function(){
						
						//alert("Submit now!!");
						//console.log(showSelectedValues());
						//console.log($("#assign_role_id").val());
						
						assignLinkToRoleFn($("#assign_role_id").val(),""+showSelectedValues()+"");
						//console.log(showSelectedValues());
						
						
						
						
						
						
					});
				//Submit Form End
					
				//get link  for assign role start
					getLinkFromRoleFn(id);
				//get link  for assign role end
					
				//click drilldown start
					$(".k-hierarchy-cell > .k-icon").off("click");
					$(".k-hierarchy-cell > .k-icon").on("click",function(){
						if($(this).hasClass("clicked")){
							$(this).removeClass("clicked");
						}else{
							$(this).addClass("clicked");	
						}
						
					});
				//click drilldown end
					
				
					
				
			});
			//action asignLink end
			//action asignColse start
			$("#btnAssignClose").on("click");
			$("#btnAssignClose").off("click",function(){
				$("#assign_role_id").val("");
			});
			//action asignColse end
	
}
function detailInit(e) {
	//alert(e.data.FieldCateLinkId);
	$("<table bgcolor='#f5f5f5'><th></th></table>").kendoGrid({
		columns: $titleAssignLink,
		dataSource: {
		data: listLinkByCateId(e.data.FieldCateLinkId),
		pageSize: 100,
		}
	}).appendTo(e.detailCell);
	
	//set data
	$(".k-grid td").css({"padding":"0em 0em"});
}
var updateData = function(){
	

	if(vaidationRole()==true){
		

		
		var role_name=$("#role_name").val();
		var role_id=$("#role_id").val();
		
		/*
		http://192.168.1.49:8082/niems/Model/role/update.jsp?callback=?
&role_id=2
&role_name=User
		*/
		
		$.ajax({
			url:golbalURL+"/niems/Model/role/update.jsp",
			type:"post",
			dataType:"json",
			data:{
				"role_id":role_id,
				"role_name":role_name
				},
			success:function(data){
				//console.log(data);
				if(data=="success"){
				alert("Update success");
				$("#roleModal").modal('hide');
				listDataAll();
				//listCateLinkByCateType(cate_type_id);
				
				}
				
			}
		});
		
	}
	
};
var findData = function(id){
	
	$.ajax({
		url:golbalURL+"/niems/Model/role/edit.jsp",
		type:"post",
		dataType:"json",
		data:{
			"role_id":id
			},
		success:function(data){
			//console.log(data);
		
			
			$("#role_name").val(data[0][1]);
			

			
			
		}
	});
	
}
var clearRoleForm = function(){
	$("#role_name").val("");
	$("#action").val("add");
	
}
var listDataAll = function(){	

		
	
		$.ajax({
			url:golbalURL+"/niems/Model/role/selectAll.jsp",
			type:"post",
			dataType:"json",
			success:function(data){
				//console.log(data);
				listData(data);
			}
		});
	
};

var assignLinkToRoleFn = function(role_id,link_id){
	
	$.ajax({
		url:golbalURL+"/niems/Model/role_map_link/insert.jsp",
		type:"post",
		dataType:"json",
		data:{"role_id":role_id,"link_id":link_id},
		success:function(data){
			console.log("resutl assign link to role");
			console.log(data);
			if(data=="success"){
				alert("asign is successfully");
				$("#asignLink").modal('hide');
			}
			
		}
	});
	return false;
}
var getLinkFromRoleFn = function(role_id){
	//http://192.168.1.49:8082/niems/Model/role_map_link/selectLinkAll.jsp
	$.ajax({
		url:golbalURL+"/niems/Model/role_map_link/selectLinkAll.jsp",
		type:"post",
		dataType:"json",
		data:{"role_id":role_id},
		success:function(data){
			
			console.log(data);
			
			$.each(data,function(index1,indexEntry1){
				//indexEntry[1];
				$.each($(".checkboxAsignLink").get(),function(index2,indexEntry2){
					//console.log($(indexEntry2).val());
					if($(indexEntry2).val()==indexEntry1[1]){
						//alert(indexEntry1[1]+"=ok");
						$("#link-"+indexEntry1[1]).prop( "checked", true );
						
					
					}
				});
				/*
				if($(".checkboxAsignLink").val()==indexEntry[1]){
					alert(indexEntry[1]+"=ok")
					$(this).prop("checked");
				
				}
				*/
			});
			
			
		}
	});
	return false;
}

$(document).ready(function(){
	//$("#userTable").DataTable();
	$("#roleTable").kendoGrid({
		height:"",
        sortable: true,
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
	
	listDataAll();
	
	//manage cateType start
	$("#manageRole").click(function(){

		clearRoleForm();
		
		$("#btnSubmit").off("click");
		$("#btnSubmit").on("click",function(){
			
		
				
				insertRoleFn();
				
			
		
		});
		
		$("#btnClose").off("click");
		$("#btnClose").on("click",function(){
			clearRoleForm();
		});
		
		
		
		
	});
	//manage cateType end
	//search start 
	$("#btnSearch").click(function(){
		
		//alert($("#searchInput").val());
		searchDataFn($("#searchInput").val());
		
	});
	//search end
	
	
});