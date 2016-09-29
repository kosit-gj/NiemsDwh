var bgIcon=["btn-default","btn-primary","btn-success","btn-info","btn-warning","btn btn-danger","btn-danger btn-outline","btn-default","btn-primary","btn-success","btn-info","btn-warning","btn btn-danger"];


var listCateType = function(){
	
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
					
					//console.log(data2);
					/*			
					0:"71"
					1:"ฟก2"
					2:null
					3:"N"
					4:"1"
					5:"2559-09-24 11:41:06.0"
					6:"2559-09-24 11:56:20.0"
					7:"Test case"
					 */
					$.each(data2,function(index2,indexEntry2){
						
					
					
					cateTypeHTML+="<div class=\"col-lg-6\">";
						cateTypeHTML+="<div class=\"ibox panelCustom\">";
						cateTypeHTML+="<div class=\"ibox-title \">";
						cateTypeHTML+="<h5><span  class=\"btn "+bgIcon[index2]+" btn-circle\">";
						cateTypeHTML+="<i class=\"fa fa fa-list fontIcon\"></i>";
						cateTypeHTML+=" </span>";
						cateTypeHTML+=" "+indexEntry2[1]+"</h5>";
						cateTypeHTML+="<div class=\"ibox-tools\">";
						cateTypeHTML+="<a class=\"collapse-link\">";
						cateTypeHTML+="<i class=\"i fa fa-plus\"></i>";
						cateTypeHTML+=" </a>";
					               
						cateTypeHTML+="</div>";
						cateTypeHTML+="</div>";
						cateTypeHTML+="<div class=\"ibox-content\">";
						
							cateTypeHTML+="<ul style=\"padding: 0\" class=\"folder-list m-b-md\">"; 
							
							$.ajax({
								   
								url:golbalURL+"/niems/Model/portal_link/select_link_by_cate_link.jsp",
								type:"post",
								dataType:"json",
								async:false,
								data:{"cate_link_id":indexEntry2[0]},
								success:function(data3){
									
									console.log(data3);
									$.each(data3,function(index3,indexEntry3){
										
										cateTypeHTML+=" <li><a href=\"http://"+indexEntry3[4]+"\">"+(index3+1)+". "+indexEntry3[2]+" <i class=\"titleIconGreen fa fa-share-alt\"></i> </a></li>";
										
										
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
	        button.toggleClass('fa-plus').toggleClass('fa-minus');
	        ibox.toggleClass('').toggleClass('border-bottom');
	        setTimeout(function () {
	            ibox.resize();
	            ibox.find('[id^=map-]').resize();
	        }, 50);
	    });
	    
	    
			
		}
	});
}
$(document).ready(function(){
	//alert(localStorage.getItem('user_name'));
	if(localStorage.getItem('user_name')==""){
		$( location ).attr("href", "./index.html");
		return false;
	}else{
		$(".display").show();
		if(localStorage.getItem('role_id')==1){
			//Check Role Start
			$("#roleAdmin").show();
			//CHeck Role End
		}else{
			$("#roleAdmin").hide();
		}
	}
	
	listCateType();
	
	$(".logout").click(function(){
		logoutFn();
	});
	
	
	

	//localStorage.getItem('first_name');
	//localStorage.getItem('last_name');
	
	$("#profileName").html(localStorage.getItem('first_name')+" "+localStorage.getItem('last_name'));
	
	$("#createReport").click(function(){
		
		var username=localStorage.getItem('user_name');
		var password=localStorage.getItem('password');
		//auThenRedirectURL("admin","password","http://localhost:8080/pentaho/api/repos/%3Apublic%3ASamitivej%3ASVH.wcdf/generatedContent?ts=1472206559057");

		return false;
	});
});
