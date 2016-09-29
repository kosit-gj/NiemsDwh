var searchDataFn= function(start_date,end_date,keyword){
	
	/*
 http://192.168.1.49:8082/niems/Model/usage_log/search.jsp?callback=?
  &keyword=Test
  &start_date=2016/09/01
  &end_date=2016/09/28
	 */
	/*
	var startDateTH=parseInt(start_date)+543;
	var endDateTH=parseInt(end_date)+543;
	*/
	$.ajax({
		url:golbalURL+"/niems/Model/usage_log/search.jsp",
		type:"post",
		dataType:"json",
		data:{"keyword":keyword,"start_date":start_date,"end_date":end_date},
		success:function(data){

			listData(data);
		}
	});
};
var listData = function(data){
			console.log(data);
			//userDataContent
			var htmlDataContent="";
		
			$.each(data,function(index,indexEntry){
				
				htmlDataContent+=" <tr>";
					htmlDataContent+="<td>"+(index+1)+"</td>";
					htmlDataContent+="<td>"+indexEntry[5]+" "+indexEntry[6]+"</td>";
					//htmlDataContent+="<td>"+indexEntry[7]+"</td>";
					//htmlDataContent+="<td>"+indexEntry[9]+"</td>";
					htmlDataContent+="<td>"+indexEntry[8]+"</td>";
					htmlDataContent+="<td>"+indexEntry[1]+"</td>";
					htmlDataContent+=" <td class=\"text-navy\"> "+indexEntry[4]+"</td>";
				htmlDataContent+="</tr>";
             
				
			});
			$("#logUsageDataContent").html(htmlDataContent);
			// $("#usage_log_table").kendoGrid();
}
var listDataAll = function(){	

		
	
		$.ajax({
			url:golbalURL+"/niems/Model/usage_log/selectAll.jsp",
			type:"post",
			dataType:"json",
			async:false,
			success:function(data){
				console.log(data);
				listData(data);
				
				//logUsageDataContent
			}
		});
	
};

$(document).ready(function(){
	
	//SearchText
	 $("#btnSearch").click(function(){
		// alert("hello");
		 searchDataFn( $("#fromDate").val(),$("#toDate").val(),$("#SearchText").val());
		 
	 });
	 //search end
	
	//alert("hello usage conntroller");
	 //$("#usage_log_table").DataTable();
	//seelect All start
	 listDataAll();
	 //select All end
	 
	 $("#usage_log_table").kendoGrid({
         height: "",
         sortable: true,
         //filterable: true,
         pageable: true,
         scrollable: false,
       /*
         schema: {
             model: {
                 fields: {
                	 field1: { type: "number" },
                	 field2: { type: "string" },
                	 field3: { type: "string" },
                	 field4: { type: "string" },
                	 field5: { type: "string" },
                	 field6: { type: "string" },
                	 field7: { type: "date" }
                 }
             }
         },
         */
     });
	 
	 $(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
	 
	
	 $(".date").datepicker({
			format: 'yyyy/mm/dd',
			todayHighlight: true,
			autoclose: true,
			onRender: function(date) {
			    return date.valueOf();
			  }
		});

	 $("#fromDate").val(currentDateFn());
	 $("#toDate").val(currentDateFn());
	 
	 
	 
	 
	 //search start
	 
	 
	
	 
	 
});