var TableUtil = {};
// 初始化bootstrapTable
TableUtil.bootstrapTable = function(_obj, _data) {
	var $obj = $(_obj);
	var $parent = $obj.parent();
	var _height = $parent.height();
	$parent.children().each(function() {
		_height -= $(this).outerHeight();
	});
	
	var options = {
	    url : _data.url,
	    method : "post",
	    contentType : "application/x-www-form-urlencoded",
	    cache : false,
	    search : false,
	    striped : true,
	    pagination : true,
	    sidePagination : "server",
	    sortable : false,
	    pageNumber : 1,
	    pageSize : 10,
	    pageList : [ 10, 40, 80, 160, 200 ],
	    idField : _data.uniqueId ? _data.uniqueId : '',
	    uniqueId : _data.uniqueId ? _data.uniqueId : '',
	    detailView : false,
	    columns : _data.columns,
	    undefinedText : '',
	    queryParamsType : '',
	    queryParams : _data.queryParams,
	    _checkDatas : [],
	    onCheck: function (row) {
	      options._checkDatas[row.id] = row;
	      if(_data.onCheck) _data.onCheck(row);
	    },
	    onUncheck: function (row) {
	      delete options._checkDatas[row.id];
	      if(_data.onUncheck) _data.onUncheck(row);
      },
      onCheckAll: function (rows) {
        for(var key in rows){
          var row = rows[key];
          options._checkDatas[row.id] = row;
        }
        if(_data.onCheckAll) _data.onCheckAll(rows);
      },
      onUncheckAll: function (rows) {
        for(var key in rows){
          delete options._checkDatas[rows[key].id];
        }
        if(_data.onUncheckAll) _data.onUncheckAll(rows);
      },
	    onLoadSuccess: function(data){
	     
	    },
	    onLoadError : function(status) {
	      $.messager.alert("错误提示", "后台加载数据错误。", "error");
	    }
	};
	
	if(_data.toolbar){
	  options.toolbar = _data.toolbar;
	}
  if(_data.flag){
    options.search = _data.flag;
  }
  var _height1 = _data.height ? _data.height: 40;
  options.height = _height - _height1;
  
  options.height = _data.height ? _data.height: options.height;
	
	$obj.bootstrapTable(options);
}

// bootstrapTable翻页
TableUtil.refresh = function(_obj) {
	$(_obj).bootstrapTable('refresh', {
		pageNumber : 1
	});
}

//得到当前页选中的值
TableUtil.getAllSelections = function(_obj) {
  return $(_obj).bootstrapTable('getAllSelections');
}

//得到所有的值
TableUtil.getCheckDatas = function(_obj){
  return $(_obj).bootstrapTable('getOptions')._checkDatas;
}

var Util = {};
// ajax提交
Util.ajaxSubmit = function(_data) {
	$.ajax({
	    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
	    },
		type : "POST",
		dataType : "json",
		cache : false,
		async : typeof(_data.async)=="undefined" ? true : _data.async,
		url : _data.url,
		data : JSON.stringify(_data.datas),
		success : function(msg) {
			_data.success(msg);
		},
		error : function(msg) {
			$.messager.alert("错误提示", "后台加载数据错误，请检查网络是否已经连接。", "error");
		},
		complete:function(XMLHttpRequest,textStatus){   
	        var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus"); 
            if(sessionstatus == 'timeout'){   
                alert('登录超时, 请重新登录.'); 
                top.location.href=path+"/login/toPage.do"; 
             }   
	    }
	});
}

// 得到表单数据
Util.getData = function(_obj, param) {
	var data = param ? param : {};
	$("input[name],textarea[name],select[name]", _obj).each(function() {
		var $this = $(this);
		data[$this.attr("name")] = $this.val().trim();
	});
	return data;
}

//弹出消息框
Util.showMsg = function(option){
  var template = "<div class='modal fade' tabindex='-1' role='dialog'>" +
                  "<div class='modal-dialog' role='document'>" +
                      "<div class='modal-content'>" +
                          "<div class='modal-header'>" +
                              "<h4 class='modal-title'></h4>" +
                          "</div>" +
                          "<div class='modal-body'></div>" +
                          "<div class='modal-footer'>" +
                            "<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button>" +
                          "</div>" +
                      "</div>" +
                   "</div>" +
                "</div>";
  var $oDialog =  $(template);
  $(".modal-title",$oDialog).html(option.title ? option.title : "消息提示");
  $(".modal-body",$oDialog).html(option.msg);
  
  $oDialog.on("hidden.bs.modal", function(e) {
    if (option.onclose) option.onclose(e);
  })

  option.keyboard = false;
  option.backdrop = "static";
  $oDialog.modal(option);
}

//弹出页面
Util.openPage = function(option){
  var _height = option.height ? option.height : 800;
  var template = "<div class='modal fade myIframeBootstrapPage' tabindex='-1' role='dialog'>" +
                    "<div class='modal-dialog' role='document'>" +
                        "<div class='modal-content'>" +
                            "<div class='modal-header'>" +
  (option.close==true?"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>" :"") +
                                "<h4 class='modal-title'></h4>" +
                            "</div>" +
                            "<iframe></iframe>" +
                        "</div>" +
                     "</div>" +
                  "</div>";

  var $oDialog =  $(template);
  if (option.opacity) {
      $(".modal-dialog", $oDialog).css("opacity", option.opacity);
  }
  
  var _docwidth = document.documentElement.offsetWidth || document.body.offsetWidth;
  var _docheight = document.documentElement.offsetHeight || document.body.offsetHeight;
  var _width = option.width ? option.width : _docwidth * 0.75 ;
  var _height = option.height ? option.height : _docheight * 0.75;
  $(".modal-dialog", $oDialog).css("width", _width);
  $("iframe", $oDialog).css("height", _height);
  
  $(".modal-title",$oDialog).html(option.title);
  
  $oDialog.on("shown.bs.modal", function(e) {
      if (option.onshow) option.onshow(e);
  })

  $oDialog.on("hidden.bs.modal", function(e) {
      if (option.onclose) option.onclose(e);
  })

  option.keyboard = false;
  option.backdrop = "static";
  $oDialog.modal(option);
  $("iframe",$oDialog).attr("src",option.url) ;
}

//关闭弹出页面
Util.closePage = function(){
  $(".myIframeBootstrapPage").modal('hide');
}


Util.treeviewGetChecked = function(control) {
  return $(control).treeview('getChecked');
}

//treeview
Util.treeview = function(control, option) {
  var _treedata;
  Util.ajaxSubmit({url:option.url,async:false,success:function(data){
    _treedata = data.datas ? data.datas : data;
  }});
  Util.obj2treeview(_treedata,{text:option.text})
  
  //设置已经选择的项
  if(option.selecturl){
      Util.ajaxSubmit({url:option.selecturl,datas:option.selectdatas,async:false,success:function(data){
          var _selectdata = data.datas ? data.datas : data;
          var alldatas = {};
          Util.getAllTreeviewDatas(_treedata,alldatas)
          for(var i=0;i<_selectdata.length;i++){
              var _data = alldatas[_selectdata[i].id];
              if(_data){
                  _data.state={checked:true};
              }
          }
      }});
  }
  
  var $tree = $(control);
  var treeviewOption = {};
  treeviewOption.data = _treedata;
  treeviewOption.multiSelect = false;
  treeviewOption.showCheckbox = option.showCheckbox == true ? true : false;
  $tree.treeview(treeviewOption);
  $tree.on('nodeSelected', function(event, data) {
    if(treeviewOption.showCheckbox){
      return;
    }
    if(option.onNodeSelected) option.onNodeSelected(event, data);
  });
  $tree.on('nodeUnselected', function(event, data) {
    if(treeviewOption.showCheckbox){
      return;
    }
    if(option.onNodeUnselected) option.onNodeUnselected(event, data);
  });
  $tree.on('nodeChecked', function(event, data) {
    var selectNodes = getAllChildNodeId(data);
    if(selectNodes){
      $tree.treeview('checkNode',[selectNodes,{silent:true}])
    }
    setParentNodeCheck($tree,data);
  
    var texts = [];
    var ids = [];
    var _checkeds = $tree.treeview('getChecked');
    for(var key in _checkeds){
      texts.push(_checkeds[key].text);
      ids.push(_checkeds[key].id);
    }
  });
  $tree.on('nodeUnchecked', function(event, data) {
    var selectNodes = getAllChildNodeId(data);
    if(selectNodes){
      $tree.treeview('uncheckNode',[selectNodes,{silent:true}])
    }
    setParentNodesUnCheck($tree,data);
    
    var ids = [];
    var texts = [];
    var _checkeds = $tree.treeview('getChecked');
    for(var key in _checkeds){
      texts.push(_checkeds[key].text);
      ids.push(_checkeds[key].id);
    }
  });
}

//下拉树
Util.comboTree = function(control, option) {
  var $obj = $(control);
  var _name = $obj.attr("name");
  var _id = $obj.attr("id");
  var outerWidth = $obj.outerWidth();
  var outerHeight = $obj.outerHeight();
  var css = 'display:none;position:absolute;background-color:white;z-index:99999;height:200px;overflow-y:scroll;';
  css += 'width:'+ outerWidth +'px;';
  css += 'left:'+ $obj.offset().left +'px;';
  css += 'top:'+ ($obj.offset().top + outerHeight) +'px;';
  var tmp = '<div style="'+css+'"></div>';
  var $tree = $(tmp);
  var $cloneobj = $obj.clone(true);
  
  if(_name){
    $cloneobj.attr("name",_name+"_sxlk");
  }
  if(_id){
    $cloneobj.attr("id",_id+"_sxlk");
  }
  
  $("body").append($tree);
  $obj.before($cloneobj);
  $obj.hide();
  
  var _datas = option.datas ? option.datas : {};
  var _treedata;
  Util.ajaxSubmit({url:option.url,datas:_datas,async:false,success:function(data){
     _treedata = data.datas ? data.datas : data;
  }});
  
  Util.obj2treeview(_treedata,option)
  
  var treeviewOption = {};
  treeviewOption.data = _treedata;
  treeviewOption.multiSelect = false;
  treeviewOption.showCheckbox = option.showCheckbox == true ? true : false;
  $tree.treeview(treeviewOption);
  $tree.on('nodeSelected', function(event, data) {
    if(treeviewOption.showCheckbox){
      return;
    }
    $cloneobj.val(data.text);
    $obj.val(data.id);
    $tree.hide();
  });
  $tree.on('nodeUnselected', function(event, data) {
    if(treeviewOption.showCheckbox){
      return;
    }
    $cloneobj.val("");
    $obj.val("");
    $tree.hide();
  });
  $tree.on('nodeChecked', function(event, data) {
    var selectNodes = getAllChildNodeId(data);
    if(selectNodes){
      $tree.treeview('checkNode',[selectNodes,{silent:true}])
    }
    setParentNodeCheck($tree,data);
  
    var texts = [];
    var ids = [];
    var _checkeds = $tree.treeview('getChecked');
    for(var key in _checkeds){
      texts.push(_checkeds[key].text);
      ids.push(_checkeds[key].id);
    }
    $cloneobj.val(texts.join(";"));
    $obj.val(ids.join(";"));
  });
  $tree.on('nodeUnchecked', function(event, data) {
    var selectNodes = getAllChildNodeId(data);
    if(selectNodes){
      $tree.treeview('uncheckNode',[selectNodes,{silent:true}])
    }
    setParentNodesUnCheck($tree,data);
    
    var ids = [];
    var texts = [];
    var _checkeds = $tree.treeview('getChecked');
    for(var key in _checkeds){
      texts.push(_checkeds[key].text);
      ids.push(_checkeds[key].id);
    }
    $cloneobj.val(texts.join(";"));
    $obj.val(ids.join(";"));
  });
  $tree.mouseleave(function() {
    $tree.hide();
  });
  $cloneobj.click(function(){
    $tree.show();
  });
  
 var _dataid = $obj.val();
 if(_dataid){
   $cloneobj.val(Util.getTreeNodeName(_treedata,_dataid));
 }
}

//转换成treeview数据
Util.obj2treeview = function(datas,option) {
  for(var key=0;key<datas.length;key++){
    datas[key].text = datas[key][option.text];
    if(datas[key].children && datas[key].children instanceof Array && datas[key].children.length>0){
      datas[key].nodes = datas[key].children;
      Util.obj2treeview(datas[key].children,option)
    }
  }
}

Util.getAllTreeviewDatas = function(datas,alldatas) {
    for(var key=0;key<datas.length;key++){
      alldatas[datas[key].id] = datas[key];
      if(datas[key].nodes && datas[key].nodes instanceof Array && datas[key].nodes.length>0){
        Util.getAllTreeviewDatas(datas[key].children,alldatas)
      }
    }
  }

//得到下拉框选中的名称
Util.getTreeNodeName = function(datas,id) {
  if(!id){
    return "";
  }
  for(var key in datas){
    if(datas[key].id == id){
      return datas[key].text;
    }
    if(datas[key].nodes instanceof Array){
      var _nodeName = Util.getTreeNodeName(datas[key].nodes,id);
      if(_nodeName){
        return _nodeName;
      }
    }
  }
  return "";
}

function getAllChildNodeId(node) {
  var _nodes = [];
  if (!node.nodes) {
    return _nodes;
  }
  
  for (var key in node.nodes) {
      _nodes.push(node.nodes[key].nodeId);
      if (node.nodes[key].nodes) {
          var _childs = getAllChildNodeId(node.nodes[key]);
          for (var i in _childs) {
            _nodes.push(_childs[i].nodeId);
          }
      }
  }
  return _nodes;
}

function setParentNodeCheck($tree,node) {
  if(typeof(node.parentId)=="undefined"){
    return;
  }
  var parentNode = $tree.treeview("getNode", node.parentId);
  if (parentNode) {
    $tree.treeview("checkNode", [parentNode.nodeId,{silent:true}]);
    setParentNodeCheck($tree,parentNode);
  }
}

function setParentNodesUnCheck($tree,node) {
  if(typeof(node.parentId)=="undefined"){
    return;
  }
  var parentNode = $tree.treeview("getNode", node.parentId);
  if (parentNode) {
    var count = 0;
    for(var key in parentNode.nodes){
      if(parentNode.nodes[key].state.checked){
        count++;
      }
    }
    
    if(count==0){
      $tree.treeview("uncheckNode", [parentNode.nodeId,{silent:true}]);
      setParentNodeCheck($tree,parentNode);
    }
  }
}

Util.showTip = function(control, option) {
  $(control).tooltip(option);
}

//校验表单数据
Util.isValid = function(obj,filds){
  var $obj = $(obj)
  for(var key in filds){
    var _obj =$("input[name='"+key+"'],textarea[name='"+key+"'],select[name='"+key+"']",$obj);
    var _name = _obj.attr("name");
    if(_obj.length == 0){
      continue;
    }
    
    var _val = _obj.val().trim();
    var _validator = filds[key];
    if(_validator instanceof Array){
      for(var _key in _validator){
        if(!validatorOne(_validator[_key],_val)){
          return false;
        }
      }
    }else if(_validator instanceof Object){
      if(!validatorOne(_validator,_val)){
        return false;
      }
    }
  }
  return true;
}

function validatorOne (_validator,_val){
  if(_validator.notEmpty && _val.length==0){
    Util.showMsg({msg:_validator.notEmpty});
    return false;
  }
  if(_validator.emailAddress && _val.length>0 && /^[\w-]+@[\w-]+\.[\w-]+$/g.test(_val) == false){
    Util.showMsg({msg:_validator.emailAddress});
    return false;
  }
  if(_validator.regexp && _val.length>0 && new RegExp(_validator.regexp).test(_val) == false){
    Util.showMsg({msg:_validator.msg});
    return false;
  }
  return true;
}

//得到uuid
Util.uuid = function () {
    var S4 = function () {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

//得到流程状态
Util.getFlowStatus = function (val) {
    var _val = "";
    if(val == "0"){
        _val = "未提交";
    }else if(val == "1"){
        _val = "待审批";
    }else if(val == "2"){
        _val = "审批通过";
    }else if(val == "3"){
        _val = "驳回";
    }else if(val == "4"){
        _val = "中止";
    }else if(val == "5"){
        _val = "待处理";
    }
    return _val;
}

/**
 * 公共ajax方法
 */
function ajaxSubmit(_data) {
	$.ajax({
		type : "POST",
		dataType : "json",
		cache : false,
		url : _data.url,
		data : _data.datas,
		success : function(msg) {
			_data.success(msg);
		}
	});
}

// 以ajax的方式提交表单，并且当操作成功时，刷新父页面（自然相当于也就把这个子页面删掉了）
// 适用于后台系统中使用layer插件手动创建的iframe弹出页面
// isReloadParent：是否重新加载父页面，否则重新加载本页面
function ajaxSubmitForm(form, isReloadParent) {
	$.post(form.action, $(form).serialize(), function(ajaxResult) {
		alert(ajaxResult.data);
		if (ajaxResult.status == 'success') {
			if (isReloadParent) {
				parent.location.reload();
			} else {
				location.reload();
			}
		}
	}, 'json');
	event.preventDefault();
}

/**
 * 删除
 */
function ajaxDelete(url, params) {
	var reply = confirm('确定要删除吗？');
	if (reply) {
		$.post(url, params, function(ajaxResult) {
			if (ajaxResult.status == 'success') {
				location.reload();
			} else {
				// 删除失败后才告知用户删除失败
				alert(ajaxResult.data);
			}
		}, 'json');
	}
}

/**
 * 将form表单数据转换成json字符串
 * 
 * @param formId
 *            表单的id
 * @returns 返回json字符串
 */
function formToJson(formId) {
	var o = {};
	var a = $("#" + formId).serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}
/**
 * 检查一个表单中的input不为空 空：false 不为空：true
 * 
 * @param formId
 *            表单的id
 * @returns
 */
function checkFormNotNull(formId) {
	var flag = true
	$("#" + formId + "  input").each(function() {

		// 如果被选中每行的try都会有个class=selected属性
		if ($(this).val() == "") {
			flag = false;
			// 停止each遍历要用return false 相当于java中break，停止本次循环用return true
			return false;
		}

	});
	return flag;
}

/**
 * 获取table中选中行的某个td数据，会以数组的形式返回， 如果没有找到选中的返回"" 返回值 ""：没有发现选中的行
 * []：数组内容，将选中行的某个td信息返回。
 * 
 * @param formId
 *            bootstrap-table的id
 * @param tdClass
 *            被选中行中要获取信息的td的class，在datas中就能设置
 * @returns
 */
function getBatchCheckTr(formId, tdClass) {
	var k = 0;
	var list = [];
	$("#" + formId + " tr").each(function(i) {
		if (i > 0) {
			// 如果被选中每行的try都会有个class=selected属性
			if ($(this).attr("class") == 'selected') {
				list[k] = $(this).find('.' + tdClass).text();
				k++;
			}
		}

	});
	return list;

}

// 可选值：error,question,info,warning
message = function(title, message, type) {
	$.messager.alert(title, message, type);
}