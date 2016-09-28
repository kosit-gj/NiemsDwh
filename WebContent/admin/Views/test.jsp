<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<script>
$(document).ready(function(){
	//alert("hello jquery");
	//Test Aajax Insert Role Start
	//alert("ไทย");
	$.ajax({
		//url:"http://192.168.1.49:8082/niems/Model/role/insert.jsp?callback=?&role_name=ไกหดฟหกด",
		url:"http://192.168.1.49:8082/niemsDwh/Model/getData.jsp",
		//url:"http://192.168.1.42:8080/NiemsDwh/Model/getData.jsp",
		dataType:"jsonp",
		type:"post",
		data:{"callback":"?","role_name":"ส่งเป็นภาษาไทย"},
		success:function(data){
			console.log(data);
		}
	});
	
	//Test Aajax Inssrt Role End
});	
</script>
</head>
<body>

</body>
</html>