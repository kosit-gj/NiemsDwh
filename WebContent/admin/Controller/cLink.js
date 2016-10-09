//["3","1","link name1","1","http://www.google.com","test","2016-09-13 15:28:24.0","2016-09-13 15:28:24.0"]
//link_id,cate_link_id,link_name,link_type,link_url
var listCateLink = function(cateLinkId){
	
	$.ajax({
		url:golbalURL+"/niems/Model/category_link/selectAll.jsp",
		type:"post",
		dataType:"json",
		success:function(data){
			var selectHTML="";
			selectHTML+="<select style='width:350px;' id=\"listCateLink\" class=\"btnCustom form-control\">";
		
				selectHTML+="<option value='All'>เลือก Link Category</option>";
				$.each(data,function(index,indexEntry){
					if(indexEntry[0]==cateLinkId){
						selectHTML+="<option selected='selected' value="+indexEntry[0]+">"+indexEntry[1]+"</option>";	
					}else{
						selectHTML+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
					}
				});
				
			selectHTML+="</select>";
			
			$("#linkCateArea").html(selectHTML);
			
			//list cate link start
			/*
			$("#listLink").change(function(){
				listCateLinkByCateType($(this).val());
				$("#embedCateLinkId").remove();
				var paramHtml="<input type='hidden' calass='paramEmbed' id='embedCateLinkId' name='embedCateLinkId' value='"+$(this).val()+"'>";
				$("body").append(paramHtml);
			});
			$("#listLink").change();
			*/
			//list cate link end
			
			
		}
	});
}
var listCateLinkFilter = function(){

	$.ajax({
		url:golbalURL+"/niems/Model/category_link/selectAll.jsp",
		type:"post",
		dataType:"json",
		success:function(data){
			console.log(data);
			var selectHTML="";
			selectHTML+="<select style='width:190px;' id=\"listCateLinkFilter\" class=\"btnCustom form-control\">";
			
			selectHTML+="<option value=\"All\">All Link Category</option>";
				
				$.each(data,function(index,indexEntry){
					
						selectHTML+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>";
					
				});
				
			selectHTML+="</select>";
			
			$("#linkCateFilterArea").html(selectHTML);
			
			//list cate link filter start
			
			$("#listCateLinkFilter").change(function(){
				listLinkByCateLink($(this).val());
				
				$("#embedCateLinkFilterId").remove();
				var paramHtml="<input type='hidden' calass='paramEmbed' id='embedCateLinkFilterId' name='embedCateLinkFilterId' value='"+$(this).val()+"'>";
				$("body").append(paramHtml);
			});
			$("#listCateLinkFilter").change();
			
			//list cate link filter end
			
			
		}
	});
}

var updateData = function(){
	

	if(vaidationLink()==true){
		

		
		var link_name=$("#link_name").val();
		var link_id= $("#link_id").val();
		var cate_link_id=$("#listCateLink").val();
		var link_type=$('input[name="link_type"]:checked').val();
		var link_url=$("#link_url").val();
		var link_custom=$(".note-editable").html();
		
		/*
		http://192.168.1.49:8082/niems/Model/link/update.jsp?callback=?
		&link_id=2
		&cate_link_id=1
		&link_name=link name1
		&link_type=1
		&link_url=http://www.google.com1234
		&link_custom=test
		*/
		
		$.ajax({
			url:golbalURL+"/niems/Model/link/update.jsp",
			type:"post",
			dataType:"json",
			data:{
				"link_id":link_id,
				"cate_link_id":cate_link_id,
				"link_name":link_name,
				"link_type":link_type,
				"link_url":link_url,
				"link_custom":link_custom	
				
				},
			success:function(data){
				//console.log(data);
				if(data=="success"){
				alert("Update success");
				$("#linkModal").modal('hide');
				listDataAll();
				//listCateLinkByCateType(cate_type_id);
				
				}
				
			}
		});
	}
	
};

var insertLinkFn = function(){
	if(vaidationLink()==true){
		
		var link_name=$("#link_name").val();
		//var link_id= $("#link_id").val();
		var cate_link_id=$("#listCateLink").val();
		var link_type=$('input[name="link_type"]:checked').val();
		var link_url=$("#link_url").val();
		var link_custom=$(".note-editable").html();

		/*
		alert("link_name="+link_name);
		alert("cate_link_id="+cate_link_id);
		alert("link_type="+link_type);
		alert("link_custom="+link_custom);
		alert("link_url="+link_url);
		 */

		//check user  unique start
		/*
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
					if(data!=""){
						alert("Link name is already. ");
						
					}else{
						*/
		
						//insert start 
						$.ajax({
							url:golbalURL+"/niems/Model/link/insert.jsp",
							type:"post",
							dataType:"json",
							//"callback":"?",
							data:{
								"cate_link_id":cate_link_id,
								"link_name":link_name,
								"link_type":link_type,
								"link_url":link_url,
								"link_custom":link_custom,
								},
							success:function(data){
								console.log(data);

								
								if(data[0]=="success"){
									alert("Insert is success");
									$("#linkModal").modal('hide');
									listDataAll();
									//listCateLinkByCateType(cate_type_id);
								}
							}
						});
						//insert end
						/*
					}
				}
			});
			*/
		//check user  unique end

		
		return false;
		
	}
}
var vaidationLink = function(){
	var txtArert="";
	//alert($( ".link_type:checked" ).val());
	if($(".link_type:checked" ).val()=="CUSTOM_LINK"){
		if($("#listCateLink").val()=="All"){
			txtArert+="โปรดเลือก Link Category\n";
		}
	}else{
		if($("#listCateLink").val()=="All"){
			txtArert+="โปรดเลือก Link Category\n";
		}
		if($("#link_name").val()==""){
			txtArert+="Link Name ห้ามเป็นค่าว่าง\n";
		}
		if($("#link_url").val()==""){
			txtArert+="Link URL ห้ามเป็นค่าว่าง\n";
		}
	}
	
	
	
	
	if(txtArert!=""){
		alert(txtArert);
		return false
	}else{
		return true;
	}
	
	
}

var listDataAll = function(){	

		
	
		$.ajax({
			url:golbalURL+"/niems/Model/link/selectAll.jsp",
			type:"post",
			dataType:"json",
			success:function(data){
				console.log(data);
				listData(data);
			}
		});
	
};
var listLinkByCateLink = function(id){	

	if(id=="All"){
		listDataAll()
	}else{
	
		$.ajax({
			url:golbalURL+"/niems/Model/portal_link/select_link_by_cate_link.jsp",
			type:"post",
			dataType:"json",
			data:{"cate_link_id":id},
			success:function(data){
				console.log(data);
				listData(data);
			}
		});
	}

};

var clearLinkForm = function(){
	$("#link_name").val("");
	$("#link_url").val("");
	$("#link_url").val(""); 
	$("#action").val("add");
	linkRadioTypeFn("PENTAHO_LINK");
	
}
var listData = function(data){
			console.log(data);
			//userDataContent
			var htmlDataContent="";
			var link="";
		
			$.each(data,function(index,indexEntry){
				
				if(indexEntry[3]="CUSTOM_LINK"){
					link=indexEntry[5];
				}else{
					link=indexEntry[2];
				}
				htmlDataContent+="<tr>";
					htmlDataContent+="<td>"+(index+1)+"</td>";
					htmlDataContent+="<td>"+link+" </td>";
					htmlDataContent+="<td>"+indexEntry[8]+" </td>";
					
					
					
					htmlDataContent+="<td ><center> <button class=\"btn btn-warning btn-xs editLink \"  id=\"edit-"+indexEntry[0]+"\" type=\"button\">Edit</button> <button class=\"btn btn-danger btn-xs delLink\" id=\"del-"+indexEntry[0]+"\" type=\"button\">Del</button></center></td>";
				htmlDataContent+="</tr>";
			});
			$("#linkDataArea").html(htmlDataContent);
			$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
			
			//action binding start
			$(".delLink").click(function(){
				var id=this.id.split("-");
				id=id[1];
				if(confirm("Do you want to delete this file?")){
					deleteData(id);	
				}
				
				
			});
			
			$(".editLink").click(function(){
				var id=this.id.split("-");
				id=id[1];
				$("#linkModal").modal();
				findData(id);
				
				$("#action").val("edit");
				$("#link_id").val(id);
				
				summernoteFn();
				
				
				
				//binding action start
				$("#btnSubmit").off("click");
				$("#btnSubmit").on("click",function(){
					
						updateData();
					
					
				
				});
				
				
				
				$("#btnClose").off("click");
				$("#btnClose").on("click",function(){
					clearLinkForm();
				});
				//binding action end
				
				
				//click link type start
				$(".link_type").off("click");
				$(".link_type").on("click",function(){
					if($(this).val()=="STATIC_LINK"){
						$(".staticLinkArea").show();
						$(".customLinkArea").hide();
					}else if($(this).val()=="CUSTOM_LINK"){
						$(".staticLinkArea").hide();
						$(".customLinkArea").show();
						$(".modal-backdrop").remove();
					}else if($(this).val()=="PENTAHO_LINK"){
						$(".staticLinkArea").show();
						$(".customLinkArea").hide();
					}
				});
				
				
				$(".close").off("click");
				$(".close").click(function(){
					$(".modal-backdrop").remove();
					$(".note-link-dialog").modal('hide');
					
				});
				
				
			});
			//action binding end
			
			
	
}

var deleteData = function(id){
	

	$.ajax({
		url:golbalURL+"/niems/Model/link/delete.jsp",
		type:"post",
		dataType:"json",
		data:{
			"link_id":id
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
		url:golbalURL+"/niems/Model/link/search.jsp",
		type:"post",
		dataType:"json",
		data:{"keyword":keyword},
		success:function(data){

			listData(data);
		}
	});
};
var findData = function(id){
	
	$.ajax({
		url:golbalURL+"/niems/Model/link/edit.jsp",
		type:"post",
		dataType:"json",
		data:{
			"link_id":id
			},
		async:false,
		success:function(data){
			//console.log(data);
			/*
			[["45","73","เรื่องการฟิแกฟะำกก",
			"CUSTOM_LINK","www.google.com",
			"custom url","2559-09-24 21:20:25.0","2559-09-24 21:20:25.0"
			]]
			*/
			
			$("#link_name").val(data[0][2]);
			$("#link_url").val(data[0][4]);
			$(".note-editable").html(data[0][5]);
			linkRadioTypeFn(data[0][3]);
			listCateLink(data[0][1]);
			
			//summernoteFn("");
			
			//click link type start
			//alert(data[0][3]);
			showHideinputTypeFn(data[0][3]);
			//click link type end
			
			
			
			
		}
	});
	
}

var showHideinputTypeFn =function(linkType){
	//click link type start
	
	
		
		if(linkType=="STATIC_LINK"){
			$(".staticLinkArea").show();
			$(".customLinkArea").hide();
		}else if(linkType=="CUSTOM_LINK"){
			
			//click edit custom link start
			//$(".note-editable").html("EDIT");
			//click edit custom link end
			
			$(".staticLinkArea").hide();
			$(".customLinkArea").show();
			//$(".modal-backdrop").remove();
			
		}else if(linkType=="PENTAHO_LINK"){
			$(".staticLinkArea").show();
			$(".customLinkArea").hide();	
		}else{
			$(".staticLinkArea").show();
			$(".customLinkArea").hide();
		}

	

	//click link type end
	
}


var linkRadioTypeFn = function(linkType){
	var HTML="";
	
	if(linkType=="STATIC_LINK"){
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\" value=\"PENTAHO_LINK\">Pentaho URL";
		HTML+="<input class =\"link_type\"  name=\"link_type\" type=\"radio\" checked=\"checked\" value=\"STATIC_LINK\">Static URL"
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\" value=\"CUSTOM_LINK\">Custom URL";
		

	}else if(linkType=="CUSTOM_LINK"){
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\" value=\"PENTAHO_LINK\">Pentaho URL";
		HTML+="<input class =\"link_type\"  name=\"link_type\" type=\"radio\" value=\"STATIC_LINK\">Static URL"
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\" checked=\"checked\"  value=\"CUSTOM_LINK\">Custom URL";
	
	}else if(linkType=="PENTAHO_LINK"){
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\" checked=\"checked\" value=\"PENTAHO_LINK\">Pentaho URL";
		HTML+="<input class =\"link_type\"  name=\"link_type\" type=\"radio\" value=\"STATIC_LINK\">Static URL"
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\"   value=\"CUSTOM_LINK\">Custom URL";
	
	}else{
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\" checked=\"checked\" value=\"PENTAHO_LINK\">Pentaho URL";
		HTML+="<input class =\"link_type\"  name=\"link_type\" type=\"radio\" value=\"STATIC_LINK\">Static URL"
		HTML+="<input class =\"link_type\" name=\"link_type\" type=\"radio\"   value=\"CUSTOM_LINK\">Custom URL";
	
	}
	
	
	$("#linkTypeArea").html(HTML);
	
	
	
}
var summernoteFn = function(){
	
	$("#summernoteArea").html( "<div class=\"summernote\"> </div>");
	$('.summernote').summernote({
		toolbar: [
		         // ['style', ['style']],
		          ['font', ['bold', 'italic', 'underline', 'clear']],
		          //['fontname', ['fontname']],
		          ['color', ['color']],
		          ['para', ['ul', 'ol', 'paragraph']],
		        //  ['height', ['height']],
		          ['table', ['table']],
		          ['insert', ['link']],
		          //['view', ['fullscreen', 'codeview']],
		         // ['help', ['help']]
		        
		  ]
		});
	
	
}

$(document).ready(function(){
	
	
	
	 
	 
	//$("#userTable").DataTable();
	$("#linkTable").kendoGrid({
		 height: "",
         sortable: false,
         //filterable: true,
         pageable: true,
         scrollable: false,
         dataSource: {
             pageSize: 10
         }
	});
	$(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
	
	
	
	listDataAll();
	
	//manage cateType start
	$("#manageLink").click(function(){

		clearLinkForm();
		
		listCateLink($("#embedCateLinkFilterId").val());
		linkRadioTypeFn();
		
		
		
		summernoteFn();
		
		
		$(".close").off("click");
		$(".close").click(function(){
			$(".modal-backdrop").remove();
			$(".note-link-dialog").modal('hide');
		});
		
		
		$("#btnSubmit").off("click");
		$("#btnSubmit").on("click",function(){
			
			$('.click2edit').destroy();
			insertLinkFn();
		
		});
		
		$("#btnClose").off("click");
		$("#btnClose").on("click",function(){
			clearLinkForm();
		});
		
		
		//click link type start
		$(".link_type").off("click");
		$(".link_type").on("click",function(){
			//showHideinputTypeFn($(this).val());
			if($(this).val()=="STATIC_LINK"){
				$(".staticLinkArea").show();
				$(".customLinkArea").hide();
			}else if($(this).val()=="CUSTOM_LINK"){
				$(".staticLinkArea").hide();
				$(".customLinkArea").show();
				$(".modal-backdrop").remove();
			}else if($(this).val()=="PENTAHO_LINK"){
				$(".staticLinkArea").show();
				$(".customLinkArea").hide();
			}
		});
		$(".staticLinkArea").show();
		$(".customLinkArea").hide();
		
		//$(".link_type").click();
		//click link type end
		
		
	});
	//manage cateType end
	
	//search start 
	$("#btnSearch").click(function(){
		
		//alert($("#searchInput").val());
		searchDataFn($("#searchInput").val());
		
	});
	//search end
	
	//listCateLinkFilter start
	
	listCateLinkFilter();
	//listCateLinkFilter end
	
	
	
	
});
