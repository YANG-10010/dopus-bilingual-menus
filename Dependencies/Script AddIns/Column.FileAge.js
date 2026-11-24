// Column.FileAge
// (c) 2024 bytim

// This is a script for Directory Opus.
// See https://www.gpsoft.com.au/endpoints/redirect.php?page=scripts for development information.

function log(str){ DOpus.Output(str); }

// 全局定义脚本的基本信息，用于初始化OnInit和关于OnAboutScript等函数=============
var Global = {};
Global.SCRIPT_NAME = "File Age";
Global.SCRIPT_DESC = DOpus.strings.Get("ScriptDesc");
Global.SCRIPT_VERSION = 'v1.0.0';
Global.SCRIPT_COPYRIGHT = '(c) 2024 bytim';
Global.SCRIPT_MIN_VERSION = '13.0';
Global.SCRIPT_DATE = '2024.4.15';
Global.SCRIPT_GROUP = 'bytim';

Global.cfgDateRange = DOpus.strings.Get("cfgDateRange");
Global.cfgAccuracy = DOpus.strings.Get("cfgAccuracy");
//Global["DateGroup"] = 'Modify';//脚本配置改变时，在OnScriptConfigChange()中刷新该配置项对应关联的列名。
//Global["ModifyGroup"] = 'Modify';
//Global["CreateGroup"] = 'Create';

function OnInit(initData)
{
	initData.name = Global.SCRIPT_NAME;
	initData.version = Global.SCRIPT_VERSION;
	initData.copyright = Global.SCRIPT_COPYRIGHT;
//	initData.url = "https://resource.dopus.com/c/buttons-scripts/16";
	initData.desc = Global.SCRIPT_DESC;
	initData.default_enable = true;
	initData.min_version = Global.SCRIPT_MIN_VERSION;

	///////////////////////////////////////////////////////////////////////////
	//配置添加助手
	function ConfigHelper(data){ //v1.3 add config_groups
		var t=this; t.d=data; t.c=data.config; t.cd=DOpus.Create.Map();t.cg=DOpus.Create.Map();
		t.add=function(name, val, des){ t.l={n:name,ln:name.
			toLowerCase()}; return t.val(val).des(des);}
		t.des=function(des){ if (!des) return t; if (t.cd.empty)
			t.d.config_desc=t.cd; t.cd(t.l.n)=des; return t;}
		t.val=function(val){ var l=t.l; if (l.v!==l.x&&typeof l.v=="object")
			l.v.push_back(val);else l.v=t.c[l.n]=val;return t;}
		t.grp=function(grp){ if (!grp) return t; if (t.cg.empty)
			t.d.config_groups=t.cg; t.cg(t.l.n)=grp; return t;}
		t.trn=function(){return t.des(t("script.config."+t.l.ln));}
	}
	///////////////////////////////////////////////////////////////////////////
	
	var cfg = new ConfigHelper(initData);
	cfg.add("Accuracy_Auto_Created", "0").
		des("Decimal place accuracy for automatically calculated Age-Created column\n自动计算的[年龄-创建]列的小数位精度")
		.grp(Global.cfgAccuracy);
	cfg.add("Accuracy_Auto_Modified", "0").
		des("Decimal place accuracy for automatically calculated Age-Modified column\n自动计算的[年龄-修改]列的小数位精度")
		.grp(Global.cfgAccuracy);
	
	cfg.add('DateGroup', DOpus.Create.Vector())
		.val("-1;0;"+DOpus.strings.Get("DateGroup0"))
		.val("0;86400;"+DOpus.strings.Get("DateGroup1"))
		.val("86400;259200;"+DOpus.strings.Get("DateGroup2"))
		.val("259200;604800;"+DOpus.strings.Get("DateGroup3"))
		.val("604800;1296000;"+DOpus.strings.Get("DateGroup4"))
		.val("1296000;2592000;"+DOpus.strings.Get("DateGroup5"))
		.val("2592000;7776000;"+DOpus.strings.Get("DateGroup6"))
		.val("7776000;31557600;"+DOpus.strings.Get("DateGroup7"))
		.val("31557600;63115200;"+DOpus.strings.Get("DateGroup8"))
		.val("63115200;94672800;"+DOpus.strings.Get("DateGroup9"))
		.val("94672800;-1;"+DOpus.strings.Get("DateGroup10"))
		.des('时间分组范围与名称')
		.grp(Global.cfgDateRange);
	
}

function OnAddColumns(AddColData){
	addColumn(AddColData, "Modify", "Column_GetMultiInfo", "right", "", true, true, false, "DateGroup", 0);
	addColumn(AddColData, "Create", "Column_GetMultiInfo", "right", "", true, true, false, "DateGroup", 0);
}

// 处理添加列
function addColumn(data, name, method, justify, type, multicol, autorefresh, autogroup, cfgGroupKey, grpOrder, defsort, ellipsis) {
    var colPrefix = 'Age ';
    var col = data.AddColumn();
	col.keyscroll = true;
    col.name = name;
    col.header = DOpus.strings.Get(name);
    col.label = colPrefix + col.header;
    col.method = method;
    col.justify = justify;
    col.type = type;
    col.multicol = multicol;
    col.autorefresh = autorefresh;
    if(!autogroup) {
    col.autogroup = autogroup;
    col.grouporder = OrderGroup(cfgGroupKey, grpOrder);
	}
    if(defsort==-1)
    col.defsort = -1;//列的排序默认是asc升序，若 defsort=-1 则是desc逆序，日期、大小类型默认是desc，无须设置此值
    if(ellipsis=="m" && DOpus.version.AtLeast("13.1")) //超长时省略，默认是在尾部省略为"..."，ellipsis="m" 则将中间省略为"..."
    col.ellipsis = "m"; //v13才增加的属性 (v12会报错不支持此属性)
	//col.graph_colors.push_back(graph_colors)
}

// 分组的排序
function OrderGroup(cfgGroupKey, grpOrder){ //order=0, asc; order=1, desc
	var groupNames = new Array();
	cfgItem = Script.config[cfgGroupKey];
	for(var v=0;v<cfgItem.length;v++){
		var parts = cfgItem(v).split(";");
		groupNames.push(parts[3]+" ("+parts[2]+")");
	}
	if(grpOrder) groupNames.reverse();
	return groupNames.join(";");
}

// 脚本配置改变时刷新相关列
function OnScriptConfigChange(cfgData){
	Script.InitColumns();// 重新初始化OnAddColumns中的所有列，也使col.grouporder从配置中更新
	/*
	for (var e = new Enumerator(cfgData.changed); !e.atEnd(); e.moveNext()){ 
		var cfgItem = e.item(); 
		//DOpus.Output(Global[cfgItem]);
		Script.RefreshColumn(Global[cfgItem]);//刷新配置项对应的脚本列
	}
	*/
	// 本脚本中，配置项DateGroup对应全部两个列，直接指定刷新这两列
	Script.RefreshColumn("Modify");
	Script.RefreshColumn("Create");
}

// 关于脚本的对话框
function OnAboutScript(AboutData){
	var dlg	= DOpus.Dlg;
	dlg.window = AboutData.window
	dlg.title = Global.SCRIPT_NAME + ' - Directory Opus';
	dlg.icon = 'info';
	dlg.message = "\n" + Global.SCRIPT_NAME + " " + Global.SCRIPT_VERSION + "\n\n" + 
					Global.SCRIPT_COPYRIGHT + "\n\n" + 
					Global.SCRIPT_DATE + "\n\n\n" + 
					Global.SCRIPT_DESC + "                ";
	dlg.buttons = DOpus.strings.Get("ok");
	//dlg.detach = true;
	//dlg.create;
	dlg.Show();
	while(true){
		var msg = dlg.GetMsg();
		if(!msg.result) break;
	}
}

// 分组归属处理
function InGroup(cfgkey, value){
	var result = "";
	for(var v=0;v<Script.config[cfgkey].length;v++){
		var entry = Script.config[cfgkey](v);
		var parts = entry.split(";");
		var min = parseInt(parts[0],10);
		var max = parseInt(parts[1],10);
		if (max == 0) {
			if (value<0){
				result = parts[3]+" ("+parts[2]+")";
				break;
			}
		} else if (max == -1){
			if (value>=min){
				result = parts[3]+" ("+parts[2]+")";
				break;
			}
		} else if (value<max && value>=min){
			result = parts[3]+" ("+parts[2]+")";
			break;
		}
	}
	return result;
}

// 获取列值的具体处理函数
function Column_GetMultiInfo(data){
	//if (data.item.ext.toLowerCase() != ".mp3") return;
	//var file = data.item.open();
	//if (file.error) return;
	//file.Close();
	var dateMod = new Date(data.item.modify).valueOf();
	var dateCre = new Date(data.item.create).valueOf();
	var dateNow = new Date().valueOf();
	var diffMod = (dateNow-dateMod)/1000; //求得修改距今秒数
	var diffCre = (dateNow-dateCre)/1000; //求得创建距今秒数
	var accuracy_am = Number(Script.config["Accuracy_Auto_Modified"]);
	var accuracy_ac = Number(Script.config["Accuracy_Auto_Created"]);
	
	//log("dateNow-dateMod=" + dateNow + "-" + dateMod + "=" + (dateNow-dateMod));
	//log("diffMod=" + diffMod);
	
	if (diffMod <= -31557600){
		data.columns("Modify").value = "未来 " + (Math.abs(diffMod)/31557600).toFixed(accuracy_am) + " 年"; //超过未来365.25天，显示为x年
	} else if (diffMod <= -86400){
		data.columns("Modify").value = "未来 " + (Math.abs(diffMod)/86400).toFixed(accuracy_am) + " 天"; //超过未来24小时，显示为x天
	} else if (diffMod <= -3600){
		data.columns("Modify").value = "未来 " + (Math.abs(diffMod)/3600).toFixed(accuracy_am) + " 小时"; //超过未来60分钟，显示为x小时
	} else if (diffMod <= -60){
		data.columns("Modify").value = "未来 " + (Math.abs(diffMod)/60).toFixed(0) + " 分钟"; //超过未来1分钟，显示为x分钟
	} else if (diffMod < 0){
		data.columns("Modify").value = "未来 " + Math.abs(diffMod).toFixed(0) + " 秒"; //未来1分钟内，显示为x秒
	} else if (diffMod < 60){
		data.columns("Modify").value = (diffMod).toFixed(0) + " 秒"; //60秒内，显示为x秒
	} else if (diffMod < 3600){
		data.columns("Modify").value = ((diffMod)/60).toFixed(0) + " 分钟"; //60分钟内，显示为x分钟
	} else if (diffMod < 86400){
		data.columns("Modify").value = ((diffMod)/3600).toFixed(accuracy_am) + " 小时"; //24小时内，显示为x小时
	} else if (diffMod < 31557600){
		data.columns("Modify").value = ((diffMod)/86400).toFixed(accuracy_am) + " 天"; //365.25天内，显示为x天
	} else {
		data.columns("Modify").value = ((diffMod)/31557600).toFixed(accuracy_am) + " 年"; //超过365.25天，显示为x年
	}

	if (diffCre <= -31557600){
		data.columns("Create").value = "未来 " + (Math.abs(diffCre)/31557600).toFixed(accuracy_ac) + " 年"; //超过未来365.25天，显示为x年
	} else if (diffCre <= -86400){
		data.columns("Create").value = "未来 " + (Math.abs(diffCre)/86400).toFixed(accuracy_ac) + " 天"; //超过未来24小时，显示为x天
	} else if (diffCre <= -3600){
		data.columns("Create").value = "未来 " + (Math.abs(diffCre)/3600).toFixed(accuracy_ac) + " 小时"; //超过未来60分钟，显示为x小时
	} else if (diffCre <= -60){
		data.columns("Create").value = "未来 " + (Math.abs(diffCre)/60).toFixed(0) + " 分钟"; //超过未来1分钟，显示为x分钟
	} else if (diffCre < 0){
		data.columns("Create").value = "未来 " + Math.abs(diffCre).toFixed(0) + " 秒"; //未来1分钟内，显示为x秒
	} else if (diffCre < 60){
		data.columns("Create").value = (diffCre).toFixed(0) + " 秒"; //60秒内，显示为x秒
	} else if (diffCre < 3600){
		data.columns("Create").value = ((diffCre)/60).toFixed(0) + " 分钟"; //60分钟内，显示为x分钟
	} else if (diffCre < 86400){
		data.columns("Create").value = ((diffCre)/3600).toFixed(accuracy_ac) + " 小时"; //24小时内，显示为x小时
	} else if (diffCre < 31557600){
		data.columns("Create").value = ((diffCre)/86400).toFixed(accuracy_ac) + " 天"; //365.25天内，显示为x天
	} else {
		data.columns("Create").value = ((diffCre)/31557600).toFixed(accuracy_ac) + " 年"; //超过365.25天，显示为x年
	}
	
	data.columns("Modify").sort = diffMod;//排序的值
	data.columns("Create").sort = diffCre;//排序的值
	
	data.columns("Modify").group = InGroup("DateGroup", diffMod);//分组
	data.columns("Create").group = InGroup("DateGroup", diffCre);//分组
}

==SCRIPT RESOURCES
<resources>
	<resource type="strings">
		<strings lang="english">
			<string id="cfgAccuracy">Decimal place accuracy</string>
			<string id="cfgDateRange">Date range setting</string>
			<string id="Create">Create</string>
			<string id="DateGroup0">After now;In the future</string>
			<string id="DateGroup1">0-24 hours;Within 1 day</string>
			<string id="DateGroup10">Three years or more;A long time ago</string>
			<string id="DateGroup2">1-3 days;Within 3 days</string>
			<string id="DateGroup3">3-7 days;Within 7 days</string>
			<string id="DateGroup4">7-15 days;Within 15 days</string>
			<string id="DateGroup5">15-30 days;Within 1 month</string>
			<string id="DateGroup6">1-3 months;Within 3 months</string>
			<string id="DateGroup7">3-12 months;Within 1 year</string>
			<string id="DateGroup8">1-2 years;Within 2 years</string>
			<string id="DateGroup9">2-3 years;Within 3 years</string>
			<string id="Modify">Modify</string>
			<string id="ok">&amp;OK</string>
			<string id="ScriptDesc">Adds sortable and groupable columns that indicate folder/file age since creation or modification</string>
		</strings>
		<strings lang="chs">
			<string id="cfgAccuracy">小数精度</string>
			<string id="cfgDateRange">时间区段设置</string>
			<string id="Create">创建距今</string>
			<string id="DateGroup0">超过现在;未来</string>
			<string id="DateGroup1">0-24 小时;1天内</string>
			<string id="DateGroup10">3年以上;很久以前</string>
			<string id="DateGroup2">1-3 天;3天内</string>
			<string id="DateGroup3">3-7 天;7天内</string>
			<string id="DateGroup4">7-15 天;15天内</string>
			<string id="DateGroup5">15-30 天;1个月内</string>
			<string id="DateGroup6">1-3 个月;3个月内</string>
			<string id="DateGroup7">3-12 个月;1年内</string>
			<string id="DateGroup8">1-2 年;2年内</string>
			<string id="DateGroup9">2-3 年;3年内</string>
			<string id="Modify">修改距今</string>
			<string id="ok">确定(&amp;O)</string>
			<string id="ScriptDesc">计算文件(夹)自动创建或修改以来的年龄(距现在的时长)，来生成可排序和可分组的列</string>
		</strings>
	</resource>
</resources>