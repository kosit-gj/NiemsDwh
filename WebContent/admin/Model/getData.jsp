<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
     String role_name = request.getParameter("role_name");
	 String callback = request.getParameter("callback");
	 role_name="[\""+role_name+"\"]";
	 out.println(callback+"("+role_name+")");
%>