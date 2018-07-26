<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="/page/commn/commn.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/page/front/index/index.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/page/front/index/index.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>知心你我</title>
</head>
<body>

    <div>
        <header class="AppHeader">
        <div class="inner-h">
            <a href="<%=request.getContextPath()%>/index.do"> <img class="AppHeader-img" alt="断网" src="${pageContext.request.contextPath}/img/zhixin.png">
            </a>

            <div class="col-sm-5">
                <div class="input-group">
                    <input type="text" class="form-control" onkeydown="onKeyDown(event)" /> <span class="input-group-addon"><a href="#"><i
                            class="glyphicon glyphicon-search"> <span>搜索 </span></i></a></span>
                </div>
            </div>
        </div>
        </header>
    </div>

    <div class="container">
        <div class="Card">
            <div class="TopstoryHeader">
                <div onclick="index.openZhiXin();"   class="btn btn-default btn-lg " style="padding-top:15px;border: 0;color:blue;text-shadow: blue 3px 3px 9px;" >
                    <span class="glyphicon glyphicon-pencil"></span> 心事
                </div>
                <a class="TopstoryHeader-rightItem" href="/draft" target="_blank" title="草稿">草稿</a>
            </div>
        </div>
    </div>
</body>
</html>