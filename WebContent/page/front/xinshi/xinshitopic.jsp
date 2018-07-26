<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="/page/commn/commn.jsp"></jsp:include>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/page/front/xinshi/xinshitopic.css">
<title>心事</title>
</head>
<body>
    <div class="header">
        <div class="header name">
            <a href="<%=request.getContextPath()%>/index.do"> <img class="AppHeader-img" alt="断网" src="${pageContext.request.contextPath}/img/zhixin.png">
            </a>
        </div>
        <div class="header centername"  style="border: 0; color: blue; text-shadow: blue 3px 3px 9px;">
            <span class="glyphicon glyphicon-heart"></span> 心事
        </div>
    </div>
</body>
</html>