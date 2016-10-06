var bgIcon=["btn-default","btn-primary","btn-success","btn-info","btn-warning","btn btn-danger",
            "btn-danger btn-outline","btn-default","btn-primary","btn-success","btn-info","btn-warning",
            "btn btn-danger","btn-default","btn-primary","btn-success","btn-info","btn-warning","btn btn-danger",
            "btn-danger btn-outline","btn-default","btn-primary","btn-success","btn-info","btn-warning",
            "btn btn-danger"];


var listCateType = function(role_id){
	
	$.ajax({
		url:golbalURL+"/niems/Model/category_type/selectAll.jsp",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			//console.log(data);		
		var cateTypeHTML="";
		/*	
		0:"1"
		1:"Test case"
		2:"2559-09-23 14:52:46.0"
		3:"2559-09-23 14:52:46.0"
		 */
		
		$.each(data,function(inde,indexEntry){
			
			cateTypeHTML+="<div class=\"row wrapper border-bottom white-bg page-heading\">";
				cateTypeHTML+="<div class=\"col-lg-10\">";
					cateTypeHTML+="<h2 class=\"h2Title\">"+indexEntry[1]+"</h2>";      
				cateTypeHTML+="</div>";
				cateTypeHTML+="<div class=\"col-lg-2\">";
				
				cateTypeHTML+="</div>";
			cateTypeHTML+="</div>";
			
			//Loop CateLink start
			cateTypeHTML+="<div class=\"row headerContent\">";
			$.ajax({
				url:golbalURL+"/niems/Model/portal_link/select_cate_link_by_cate_tpe.jsp",
				type:"post",
				dataType:"json",
				async:false,
				data:{"cate_type_id":indexEntry[0]},
				success:function(data2){
					/*
					console.log("hello testttt");
					console.log(data2);
					*/
					/*			
					0:194"
					1:"555"
					2:"fa fa-sort-amount-asc"
					3:"H"
					4:"231"
					5:"2559-10-02 10:13:10.0"
					6:"2559-10-02 10:13:33.0"
					7:"#ff062f"
					8:"ข้อมูลพื้นฐาน ที่ขึ้นทะเ...การแพทย์ฉุกเฉิน (ITEMS)"

					 */
					$.each(data2,function(index2,indexEntry2){
					var displayPanel="";	
					if(indexEntry2[3]=="H"){
						//Hidden
						displayPanel="panelHide";
					}else if(indexEntry2[3]=="N"){
						//Disable
						displayPanel="panelDisable";
					}else if(indexEntry2[3]=="Y"){
						//Show
						displayPanel="panelShow";
					}
					
					if(displayPanel!="panelDisable"){
					cateTypeHTML+="<div class=\"col-lg-6  "+displayPanel+"\">";
					}else{
						cateTypeHTML+="<div class=\"col-lg-6 \">";	
					}
					
					if(displayPanel=="panelDisable"){
						cateTypeHTML+="<div class=\"ibox panelDisable panelCustom\">";
					}else{
						cateTypeHTML+="<div class=\"ibox panelCustom\">";
					}
						cateTypeHTML+="<div class=\"ibox-title \">";
						if(indexEntry2[7]==null){
							cateTypeHTML+="<h5><span    class=\"btn btn-circle "+bgIcon[index2]+"\">";
						}else{
							cateTypeHTML+="<h5><span  style='background:"+indexEntry2[7]+"';  class=\"btn btn-circle\">";
						}
						
						if(indexEntry2[2]==null){
							cateTypeHTML+="<i class=\"fa fa-area-chart fontIcon\"></i>";
						}else{
							cateTypeHTML+="<i class=\""+indexEntry2[2]+" fontIcon\"></i>";
						}
						cateTypeHTML+=" </span>";
						cateTypeHTML+="<span class=\"contentCate\"> "+indexEntry2[1]+"</span></h5>";
						cateTypeHTML+="<div class=\"ibox-tools\">";
						cateTypeHTML+="<a class=\"collapse-link\">";
						cateTypeHTML+="<i class=\"i fa fa-plus fontBlue\"></i>";
						cateTypeHTML+=" </a>";
					               
						cateTypeHTML+="</div>";
						cateTypeHTML+="</div>";
						cateTypeHTML+="<div class=\"ibox-content\">";
						
							cateTypeHTML+="<ul style=\"padding: 0\" class=\"folder-list m-b-md\">"; 
							
							$.ajax({
								   
								url:golbalURL+"/niems/Model/portal_link/select_link_by_cate_link_by_role.jsp",
								type:"post",
								dataType:"json",
								async:false,
								data:{"cate_link_id":indexEntry2[0],"role_id":role_id},
								success:function(data3){
									
									console.log(data3);
									$.each(data3,function(index3,indexEntry3){
										
										cateTypeHTML+=" <li><a class='linkID "+indexEntry3[3]+"' id='linkID-"+indexEntry3[0]+"' href=\""+indexEntry3[4]+"\">"+(index3+1)+". "+indexEntry3[2]+" <i class=\"titleIconGreen fa fa-share-alt\"></i> </a></li>";
										
										
									});
									
								}
							});
							
		
							cateTypeHTML+=" </ul>";
						
						cateTypeHTML+=" </div>";
						cateTypeHTML+="</div>";
					cateTypeHTML+="</div>";
					
					
					});
					
				}
			});
			cateTypeHTML+="</div>";
			//Loop CateLink End
			 
		});
		
		$("#contentCateType").html(cateTypeHTML);
		// Collapse ibox function
	    $('.ibox-title ').css({"cursor":"pointer"});
	    $('.ibox-title ').click(function () {
	        var ibox = $(this).closest('div.ibox');
	        var button = $(this).find('.i');
	        var content = ibox.find('div.ibox-content');
	        content.slideToggle(200);
	        button.toggleClass('fa-plus').toggleClass('fa-minus')
	        button.toggleClass('fontBlue').toggleClass('fontWhite');
	        ibox.toggleClass('').toggleClass('border-bottom');
	        $(this).toggleClass('').toggleClass('titleClicked');
	        setTimeout(function () {
	            ibox.resize();
	            ibox.find('[id^=map-]').resize();
	        }, 50);
	    });
	    
	    
			
		}
	});
}
$(document).ready(function(){
	//alert(localStorage.getItem('role_id'));
	
	
	
	if(localStorage.getItem('user_name')==""){
		$( location ).attr("href", "./index.html");
		return false;
	}else{
		$(".display").show();
		if(localStorage.getItem('role_id')==1){
			//Check Role Start
			$("#roleAdmin").show();
			$("#roleSupperUser").hide();
			//CHeck Role End
		}else if(localStorage.getItem('role_id')==2){
			//Check Role Start
			$("#roleAdmin").hide();
			$("#roleSupperUser").show();
			
			//CHeck Role End
		}else{
			$("#roleAdmin").hide();
		}
	}
	//
	listCateType(localStorage.getItem('role_id'));
	
	$(".logout").click(function(){
		logoutFn();
	});
	
	
	

	//localStorage.getItem('first_name');
	//localStorage.getItem('last_name');
	
	$("#profileName").html(localStorage.getItem('first_name')+" "+localStorage.getItem('last_name'));
	
	$(".createReport").on("click",function(){
		alert("create report");
		var url=golbalPentahoURL+"/pentaho/plugin/jpivot/Pivot?new-action=true&schema=SVH_Data&cube=SVH_Data&Ok=Ok";
		auThenRedirectURL(localStorage.getItem('user_name'),localStorage.getItem('password'),url);
		//auThenRedirectURL("admin","password","http://localhost:8080/pentaho/api/repos/%3Apublic%3ASamitivej%3ASVH.wcdf/generatedContent?ts=1472206559057");

		return false;
	});
	
	
	//Save link start
	//saveToLogFn();
	$(".linkID").on("click",function(){
		var id=this.id.split("-");
		id=id[1];
		saveToLogFn(id);
		var url="";
		if($(this).hasClass("PENTAHO_LINK")){
			
			//url=$(this).attr("href")+"&userid="+localStorage.getItem('user_name')+"&password="+localStorage.getItem('password')+"";
			url=$(this).attr("href");
			/*
			var htmlForm="";
			htmlForm+="<form target=\"_blank\" method='post' id='formLoginPentaho' action='"+url+"'>";
			htmlForm+="<input type=\"hidden\" name=\"userid\" id=\"userid\" value="+localStorage.getItem('user_name')+">";
			htmlForm+="<input type=\"hidden\" name=\"password\" id=\"password\" value="+localStorage.getItem('password')+">";
			htmlForm+="<input type='submit' id='btnSubmit' name='btnSubmit'";
			htmlForm+="<form>";
			$("#formLoginPentaho").remove();
			$("body").append(htmlForm);
			
			setTimeout(function(){
				
				//auThenRedirectURL(localStorage.getItem('user_name'),localStorage.getItem('password'),url);
				//http://192.168.1.38:8086/pentaho/api/repos/%3Apublic%3ASteel%20Wheels%3AReports%3ATop%20Customers%20%28report%29.prpt/viewer?ts=1475595423671&userid=1460600053789&password=11111
					
					$("#btnSubmit").click();
					//$( location ).attr({"target" : "_blank"}).attr("href", url);
			},1000);
			*/
			auThenRedirectURL(localStorage.getItem('user_name'),localStorage.getItem('password'),url);
			
			
		}else if($(this).hasClass("STATIC_LINK")){
		
			url=$(this).attr("href");
			setTimeout(function(){
				$( location ).attr({"target" : "_blank"}).attr("href", url);
			},1000);
			
			
			
		}
		
		
		
		return false;
	});
	//Save link end
});
