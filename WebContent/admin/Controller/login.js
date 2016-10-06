function getReason()
{
  return ($("input[name=reason]:checked").map(
     function () {return this.value;}).get().join(","));
}

function checkID(id)
	{
		if(id.length != 13) return false;
		for(i=0, sum=0; i < 12; i++)
		sum += parseFloat(id.charAt(i))*(13-i); if((11-sum%11)%10!=parseFloat(id.charAt(12)))
		return false; return true;
	}
var vaidationLogin = function(){
	var txtArert="";
	
	
	if(checkID($("#user_name").val())==false){
		txtArert+="รหัสบัตรประชาชนไม่ถูกต้อง\n";
	}
	
	if($("#user_name").val()==""){
		txtArert+="ชื่อผู้ใช้งานห้ามเป็นค่าว่าง\n";
	}
	if($("#password").val()==""){
		txtArert+="รหัสผ่านห้ามเป็นค่าว่าง\n";
	}
	if(getReason()==""){
		txtArert+="เลือกเหตุผลการขอใช้บริการด้วยครับ\n";
	}
	
	
	
	
	
	if(txtArert!=""){
		alert(txtArert);
		return false
	}else{
		return true;
	}
	
	
}


$(document).ready(function(){
	
	/*
	$("#listReason").click(function(){
		if($(this).val()=="reason5"){
			$(".textareaReason").show();
		}else{
			$(".textareaReason").hide();
		}
	});
	*/
	
	
	$("#reason6").click(function(){
		
		if($("#reason6").is(':checked')){
			
		    $(".textareaReason").show();  // checked
		}else{
			
			$("#textareaReason").val("");
		    $(".textareaReason").hide();
		}
		
	});
	
	
	function updateUserItemInDWH(rsData,user_name,password){
		
		var objectItem = eval("("+rsData['LOG_INResult']+")");
	    objectItem=objectItem[0];
	    
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

		var prefix= objectItem['TITLE_NAME'];
		var first_name= objectItem['FIRST_NAME'];
		var last_name= objectItem['LAST_NAME'];
		var email= "";
		var province= objectItem['CHANGWAT_NAME'];
		var status= "Y";
		var position= objectItem['POSITIONS'];
		var organization= objectItem['DEP_NAME'];
		
		var user_items= "Y";
		var role_id="2";
		
		$.ajax({
			url:golbalURL+"/niems/Model/user/update_by_user_items.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{
				"user_name":user_name,"password":password,
				"prefix":prefix,"first_name":first_name,
				"last_name":last_name,"email":email,
				"province":province,
				"position":position,"organization":organization
				//"user_items":"Y","role_id":"2","status":status
				
			},
			success:function(data){
				if(data=="success"){
					console.log("step 4");
					//alert("Upate data is successfully");
				}	
			}
		});
		
		
	}
	function insertUserItemtoDWH(rsData,user_name,password){
	
	    var objectItem = eval("("+rsData['LOG_INResult']+")");
	    objectItem=objectItem[0];
	    
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
		
		/*
		 
		ADDRESS:"   "
		AMPHUR_CODE:"00"
		AMPHUR_NAME:null
		BIRTHDATE:"25-05-2011"
		CHANGWAT_CODE:"02"
		CHANGWAT_NAME:null
		DEP_NAME:"สถาบันการแพทย์ฉุกเฉินแห่งชาติ"
		FILEPATH:null
		FIRST_NAME:"อนุรัตน์"
		ID_CARD:null
		LAST_NAME:"สมตน"
		MOO_CODE:"00"
		PHONE:null
		POSITIONS:"2"
		POSTCODE:null
		ROAD:null
		SOI:null
		TAMBOL_CODE:"00"
		TITLE_NAME:"นาย"
		TUMBON_NAME:null
			*/
		
		var prefix= objectItem['TITLE_NAME'];
		var first_name= objectItem['FIRST_NAME'];
		var last_name= objectItem['LAST_NAME'];
		var email= "";
		var province= objectItem['CHANGWAT_NAME'];
		var status= "Y";
		var position= objectItem['POSITIONS'];
		var organization= objectItem['DEP_NAME'];
		
		
		
		var user_items= "Y";
		var role_id="2";
		localStorage.setItem('first_name',first_name);
		localStorage.setItem('last_name',last_name);
		
		/*
		console.log("TITLE_NAME="+objectItem['TITLE_NAME']);
		console.log("FIRST_NAME="+objectItem['FIRST_NAME']);
		console.log("LAST_NAME="+objectItem['LAST_NAME']);
		console.log("CHANGWAT_NAME="+objectItem['CHANGWAT_NAME']);
		console.log("POSITIONS="+objectItem['POSITIONS']);
		console.log("DEP_NAME="+objectItem['DEP_NAME']);
	*/
		
		$.ajax({
			url:golbalURL+"/niems/Model/user/insert.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{
				"user_name":user_name,"password":password,
				"prefix":prefix,"first_name":first_name,
				"last_name":last_name,"email":email,
				"province":province,"status":status,
				"position":position,"organization":organization,
				"user_items":"Y","role_id":"2"
				
			},
			success:function(data){
				if(data=="success"){
					console.log("step 4");
					return false;
					//alert("Insert data is successfully");
				}	
			}
		});
		
	}
	
	
	var rs=false;
	function findUserItemsInDWH(user_name){
		
		$.ajax({
			url:golbalURL+"/niems/Model/user/edit.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"user_name":user_name},
			success:function(rsData){
				console.log("step 3");
				console.log(rsData);
				if(rsData==" " || rsData=="" || rsData==[]){
					console.log("true");
					rs=true;
					
					
				}else{
					console.log("false");
					rs=false;
				}	
			}
			
		});
		return rs;
		
		
	}
	
	function authenByIITEMS(user_name,password,appid,key){
		//http://ws.niems.go.th/EMS_MAP_API/EMSInfo.svc/reqLogin?inUSERNAME={inUSERNAME}&inPASSWORD={inPASSWORD}&appid={appid}&key={key}
		//http://192.168.1.49:8082/niems/Model/login/authen_items.jsp
		
		$.ajax({
			//url:golbalURL+"/niems/Model/login/authen_items.jsp",
			url:"http://ws.niems.go.th/EMS_MAP_API/EMSInfo.svc/reqLogin?inUSERNAME="+user_name+"&inPASSWORD="+password+"&appid=dwh&key=dwh12345",
			type:"get",
			dataType:"json",
			async:false,
			//data:{"user_name":user_name,"password":password,"appid":appid,"key":key},
			success:function(rsData){
				
				console.log("step 2");
				
				
				
				if(rsData['LOG_INResult']=='[]'){
					//check user by dwh
					console.log("data is empty");
					authenByUser(user_name,password);
					
						
				}else{
					//insert or update  user.
					console.log(rsData);
					//alert("Loin by super user.");
				/*
				ADDRESS:"   "
				AMPHUR_CODE:"00"
				AMPHUR_NAME:null
				BIRTHDATE:"25-05-2011"
				CHANGWAT_CODE:"02"
				CHANGWAT_NAME:null
				DEP_NAME:"สถาบันการแพทย์ฉุกเฉินแห่งชาติ"
				FILEPATH:null
				FIRST_NAME:"อนุรัตน์"
				ID_CARD:null
				LAST_NAME:"สมตน"
				MOO_CODE:"00"
				PHONE:null
				POSITIONS:"2"
				POSTCODE:null
				ROAD:null
				SOI:null
				TAMBOL_CODE:"00"
				TITLE_NAME:"นาย"
				TUMBON_NAME:null
				*/
					
					//alert(findUserItemsInDWH(user_name));
					

					$.ajax({
						url:golbalURL+"/niems/Model/user/edit.jsp",
						type:"get",
						dataType:"json",
						async:false,
						data:{"user_name":user_name},
						success:function(rsData2){
							console.log("step 3.1");
							console.log(rsData2);
							var statusUser=rsData2[0][7];
							
							if(rsData2==" " || rsData2=="" || rsData2==[]){
							
								console.log("insert");					
								insertUserItemtoDWH(rsData,user_name,password);
								localStorage.setItem('role_id','2');
								localStorage.setItem('role_name','Super user');
								
								
								
								setTimeout(function(){
									$( location ).attr("href", "portal_link.html");
									/*
									if(rsData2[7]=="Y"){
										$( location ).attr("href", "portal_link.html");
									}else{
										alert("รหัสผู้ใช้งานนี้ถูกระงับการใช้งาน");
										return false;
										$( location ).attr("href", "./index.html");
									}
									*/
								});
								
								
								//$( location ).attr("href", "admin/index.html");
								
								
							}else{
								
								console.log("update");
								console.log(rsData);
								console.log(user_name);
								console.log(password);
								updateUserItemInDWH(rsData,user_name,password);
								localStorage.setItem('role_id',rsData2[0][11]);
								localStorage.setItem('role_name','Super user');
								
								localStorage.setItem('first_name',rsData2[0][3]);
								localStorage.setItem('last_name',rsData2[0][4]);
								
								
								
								setTimeout(function(){
									
									//alert(statusUser);
									if(statusUser=="Y"){
										$( location ).attr("href", "portal_link.html");
									}else{
										alert("รหัสผู้ใช้งานนี้ถูกระงับการใช้งาน");
										return false;
										$( location ).attr("href", "./index.html");
									}
									
									
									//$( location ).attr("href", "portal_link.html");
									
								});
								//$( location ).attr("href", "admin/index.html");
							}	
						}
						
					});
					
					/*
					if(findUserItemsInDWH(user_name)==true){
						
						//insert true
						console.log("insert");
						alert("insert")
						insertUserItemtoDWH(rsData,user_name,password);
						
					}else{
						//update false
						alert("update")
						console.log("update");
						updateUserItemInDWH(rsData,user_name,password);
						
					}
					*/
				}
			}
		});
		
		
	}
	function authenByUser(user_name,password){
		//alert("authenByUser"+user_name);
		//alert("authenByUser"+password);
		$.ajax({
			url:golbalURL+"/niems/Model/login/authen.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"user_name":user_name,"password":password},
			success:function(rsData){
				//alert(rsData);
				if(rsData=='empty'){
					alert("Username or password is incorrect.");
					//$( location ).attr("href", "login.html");
				}else{
				
					console.log(rsData);
					var user_name=rsData[0][0];
					var prefix= rsData[0][1];
					var first_name= rsData[0][2];
					var last_name= rsData[0][3];
					var email= rsData[0][4];
					var province= rsData[0][5];
					var status=rsData[0][6];
					var position= rsData[0][7]
					var organization= rsData[0][8]
					var user_items=rsData[0][9];
					var role_id=rsData[0][10];
					var role_name=rsData[0][14];
					/*
					console.log(user_name);
					console.log(prefix);
					*/
					//alert(prefix);
					//DefineSession Start
					localStorage.setItem('user_name',user_name);
					localStorage.setItem('prefix',prefix);
					localStorage.setItem('first_name',first_name);
					localStorage.setItem('last_name',last_name);
					localStorage.setItem('email',email);
					localStorage.setItem('province',province);
					localStorage.setItem('status',status);
					localStorage.setItem('position',position);
					localStorage.setItem('organization',organization);
					localStorage.setItem('user_items',user_items);		
					localStorage.setItem('role_id',role_id);
					localStorage.setItem('role_name',role_name);
					
					//DefineSession End
					if(localStorage.getItem('status')=="Y"){
						$( location ).attr("href", "./portal_link.html");
					}else{
						
						alert("รหัสผู้ใช้งานนี้ถูกระงับการใช้งาน");
						return false;
						
						$( location ).attr("href", "./index.html");
					}
					
					
					/*
					$.ajax({
						url:golbalURL+"/niems/Model/login/authoriize.jsp",
						type:"post",
						dataType:"json",
						data:{
							"user_name":user_name,
							"prefix":prefix,"first_name":first_name,
							"last_name":last_name,"email":email,
							"province":province,"status":status,
							"position":position,"organization":organization,
							"user_items":user_items,"role_id":role_id},
						success:function(data){
							console.log(data);
							console.log(getSessionFn());
							if(data=="success"){
								localStorage.setItem('lastname','Smith');
								alert(localStorage.getItem('lastname'));
								//alert("Loin by user general.");
								//console.log(getSessionFn());
								$( location ).attr("href", "./portal_link.html");
								if(role_id==1){
									$( location ).attr("href", "admin/index.html");
								}else{
									$( location ).attr("href", "./portal_link.html");
								}
							}
						}
					});
					*/
					
				}
			}
		});
		
	}
	/*
	 inUSERNAME=3490500145408
	 inPASSWORD= anurut
	 */
	$("#btn_submit").click(function(){
		
		console.log("step 1");
		var user_name=$("#user_name").val();
		var password=$("#password").val();
		var reason="";
		
		/*
		if($("#listReason").val()=="reason1"){
			reason="เสนอผู้บริหารในจังหวัด";
		}else if($("#listReason").val()=="reason2"){
			reason="วางแผนพัฒนาในจังหวัด";
		}else if($("#listReason").val()=="reason3"){
			reason="ดูรายงาน";
		}else if($("#listReason").val()=="reason4"){
			reason="งานวิจัย";
		}else if($("#listReason").val()=="reason5"){
			reason=$("#reason").val();
		}
		*/
		//alert(getReason());
		if($("#reason6").is(':checked')){
		    reason= getReason()+": "+$("#textareaReason").val();
		}else{
			reason=getReason();
		}

		
		//keep data here..
		localStorage.setItem('user_name',user_name);
		localStorage.setItem('password',password);
		localStorage.setItem('reason',reason);
	
		
		
		if(vaidationLogin()){
			
			//vaidationLogin
			var appid="dwh";
			var key="dwh12345";
			console.log("step 1.1");
			//findUserItemsInDWH(user_name);
			authenByIITEMS(user_name,password,appid,key);
			
			
			
			
		
		}
		
		return false;
		
		
	});
});