$(function() {

	initTree();
});
var initTree = function(id) {
	$.getJSON("json/myTree_data.json", "", function(result) {　
		console.log(JSON.stringify(result));
		var t = $("#tree_left");
		t = $.fn.zTree.init(t, setting, result.list);
		var treeObj = $.fn.zTree.getZTreeObj("tree_left");
				treeObj.expandAll(true);  
	});
}
var setting = {
	check: {
		enable: true,
		chkStyle: "checkbox"
	},
	view: {
		showIcon: true
	},
	data: {
		key: {
			url: "myurl" // 更改默认的超链接获取属性,取消超链接
		},
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pId",
			rootPId: ""
		}
	},
	callback: {
		onAsyncSuccess: function() {
			alert("dddd");
			//                zTreeObj.expandAll(true);  
			showztreemenuNum(true, zTreeObj, 1);

		}
	}
};

function showztreemenuNum(b, childnodes, l) {
	if(b) {
		var rootnodes = zTreeObj.getNodes();
		showztreemenuNum(false, rootnodes, l); //递归  
	} else {
		var len = -1;
		if(!isNull(childnodes) && !isNull((len = childnodes.length)) && len > 0) {
			if(l < childnodes[0].level) {
				return;
			}
			for(var i = 0; i < len; i++) {
				zTreeObj.expandNode(childnodes[i], true, false, false, true);
				var child = childnodes[i].children;
				showztreemenuNum(false, child, l); //递归  
			}
		}
	}
}