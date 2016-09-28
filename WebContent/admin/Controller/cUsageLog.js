$(document).ready(function(){
	//alert("hello usage conntroller");
	 //$("#usage_log_table").DataTable();
	 $("#usage_log_table").kendoGrid({
         height: "",
         sortable: true,
         //filterable: true,
         sortable: true,
         pageable: true,
         scrollable: false,
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
     });
	 $(".k-grid td").css({"padding":"0px","padding-left":"3px","padding-right":"3px"});
	 
	 $("#fromDate").kendoDatePicker();
	 $("#toDate").kendoDatePicker();
});