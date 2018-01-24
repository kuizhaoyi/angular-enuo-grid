angular.module("enuo.grid",[]).run(["$templateCache",function(n){n.put("enuo/grid/templates/emptyResult.html",'<div class="row" ng-style="outStyle">\n    <div class="col-md-4 col-md-offset-4" ng-style="innerStyle">\n        <div class="media">\n            <div class="media-left">\n                <i style="font-size:42px;" ng-class="config.icon"></i>\n            </div>\n            <div class="media-body">\n                <h4 class="media-heading">{{ config.title }}</h4>\n                {{ config.intro }}\n            </div>\n        </div>\n    </div>\n</div>'),n.put("enuo/grid/templates/enuoGrid.html",'<div class="enuo-grid">\n    <div class="box-tool clearfix" ng-if="config.tool && config.query">\n        <div class="btn-group" ng-if="config.tool">\n            <a ng-repeat="item in config.tool.items" ng-click="item.click(config.selectedList)" ng-class="item.cssClass" class="btn">\n                <i ng-class="item.icon"></i> {{item.name}}\n            </a>\n        </div>\n        <div class="pull-right" ng-if="config.query && config.query.items.length > 0">\n            <form class="form-inline">\n                <div class="input-group">\n                    <div class="pull-left" ng-repeat="item in config.query.items">\n                        <div ng-if="item.type==\'select\'" class="input-group-btn">\n                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                                 {{ item.display }} \n                                 <span class="caret"></span>\n                            </button>\n                            <ul class="dropdown-menu">\n                                <li ng-repeat="option in item.options" ng-click="fnSelectQuery(option,item)">\n                                    <a>{{option.name}}</a>\n                                </li>\n                            </ul>\n                        </div>\n                        <input ng-if="item.type==\'input\'" type="text" ng-model="item.value" class="form-control" placeholder="{{item.placeholder}}" />\n                        <input ng-if="item.type==\'hideen\'" type="hidden" ng-model="item.value" />\n                    </div>\n                    <span class="input-group-btn pull-left">\n                        <button type="submit" ng-click="fnQuery()" class="btn btn-primary">\n                            <i class="glyphicon glyphicon-search"></i>\n                            {{config.query.action.title || \'搜索\'}}\n                        </button>\n                    </span>\n                </div>\n            </form>\n        </div>\n    </div>\n    <table class="table table-bordered table-hover">\n        <thead>\n            <tr>\n                <th ng-if="config.pkid" class="check">\n                    <input type="checkbox" ng-checked="checkAll" ng-click="fnCheckAll()" />\n                </th>\n                <th ng-repeat="column in config.columns" ng-style="{width:column.width?column.width:\'auto\'}">{{column.name}}</th>\n            </tr>\n        </thead>\n        <tbody ng-style="contentStyle" ng-if="!config.loading && gridSource.length > 0">\n            <tr ng-repeat="item in gridSource" ng-click="fnCheckItem(item)">\n                <td class="check" ng-if="config.pkid">\n                    <input type="checkbox" ng-checked="fnItemChecked(item)" />\n                </td>\n                <td ng-repeat="column in config.columns" ng-style="{width:column.width?column.width:\'auto\'}">\n                    <enuo-grid-cell column="column" item="item"></enuo-grid-cell>\n                </td>\n            </tr>\n        </tbody>\n        <tbody ng-style="contentStyle" ng-if="!config.loading && gridSource.length <= 0">\n            <tr>\n                <td colspan="{{columnsCount }}">\n                    <empty-result></empty-result>\n                </td>\n            </tr>\n        </tbody>\n        <tbody ng-style="contentStyle" ng-if="config.loading">\n            <tr>\n                <td colspan="{{columnsCount }}">\n                    <empty-result em-style="loading"></empty-result>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div class="box-footer" ng-if="config.page">\n        <paging page="config.page.pageIndex" class="pull-right paging" page-size="config.page.pageSize" total="config.page.total" paging-action="config.page.callback(page)" show-prev-next="true" show-first-last="true">\n        </paging>\n    </div>\n</div>')}]);
angular.module("enuo.grid").directive("paging",function(){function t(t,e){return!!angular.isDefined(e)&&!!t.$parent.$eval(e)}function e(t,e){t.page!=e&&(t.isDisabled||(t.page=e,t.pagingAction({page:t.page,pageSize:t.pageSize,total:t.total}),t.scrollTop&&scrollTo(0,0)))}function a(t,a,s){if(!(!t.showPrevNext&&!t.showFirstLast||a<1)){var i,l,r;if("prev"===s){i=t.page-1<=0;var g=t.page-1<=0?1:t.page-1;t.showFirstLast&&(l={value:t.textFirst,title:t.textTitleFirst,aClass:t.textFirstClass,page:1}),t.showPrevNext&&(r={value:t.textPrev,title:t.textTitlePrev,aClass:t.textPrevClass,page:g})}else{i=t.page+1>a;var p=t.page+1>=a?a:t.page+1;t.showPrevNext&&(l={value:t.textNext,title:t.textTitleNext,aClass:t.textNextClass,page:p}),t.showFirstLast&&(r={value:t.textLast,title:t.textTitleLast,aClass:t.textLastClass,page:a})}var x=function(a,s){return{title:a.title,aClass:a.aClass,value:a.aClass?"":a.value,liClass:s?t.disabledClass:"",pgHref:s?"":t.pgHref.replace(n,a.page),action:function(){s||e(t,a.page)}}};if(t.isDisabled&&(i=!0),l){var o=x(l,i);t.List.push(o)}if(r){var d=x(r,i);t.List.push(d)}}}function s(t,a,s){var i=0;for(i=t;i<=a;i++){var l=s.pgHref.replace(n,i),r=s.page==i?s.activeClass:"";s.isDisabled&&(l="",r=s.disabledClass),s.List.push({value:i,title:s.textTitlePage.replace(n,i),liClass:r,pgHref:l,action:function(){e(s,this.value)}})}}function i(t){t.List.push({value:t.dots,liClass:t.disabledClass})}function l(t,e){s(1,2,t),3!=e&&i(t)}function r(t,e,a){a!=t-2&&i(e),s(t-1,t,e)}var n=/\{page\}/g;return{restrict:"EA",link:function(e,i,n){e.$watchCollection("[page,pageSize,total,disabled]",function(i,g){!function(e,i){(!e.pageSize||e.pageSize<=0)&&(e.pageSize=1);var n=Math.ceil(e.total/e.pageSize);(function(e,a){e.List=[],e.Hide=!1,e.page=parseInt(e.page)||1,e.total=parseInt(e.total)||0,e.adjacent=parseInt(e.adjacent)||2,e.pgHref=e.pgHref||"",e.dots=e.dots||"...",e.ulClass=e.ulClass||"pagination",e.activeClass=e.activeClass||"active",e.disabledClass=e.disabledClass||"disabled",e.textFirst=e.textFirst||"<<",e.textLast=e.textLast||">>",e.textNext=e.textNext||">",e.textPrev=e.textPrev||"<",e.textFirstClass=e.textFirstClass||"",e.textLastClass=e.textLastClass||"",e.textNextClass=e.textNextClass||"",e.textPrevClass=e.textPrevClass||"",e.textTitlePage=e.textTitlePage||"Page {page}",e.textTitleFirst=e.textTitleFirst||"First Page",e.textTitleLast=e.textTitleLast||"Last Page",e.textTitleNext=e.textTitleNext||"Next Page",e.textTitlePrev=e.textTitlePrev||"Previous Page",e.hideIfEmpty=t(e,a.hideIfEmpty),e.showPrevNext=t(e,a.showPrevNext),e.showFirstLast=t(e,a.showFirstLast),e.scrollTop=t(e,a.scrollTop),e.isDisabled=t(e,a.disabled)})(e,i),function(t,e){t.page>e&&(t.page=e),t.page<=0&&(t.page=1),t.adjacent<=0&&(t.adjacent=2),e<=1&&(t.Hide=t.hideIfEmpty)}(e,n);var g,p,x=2*e.adjacent+2;a(e,n,"prev"),n<=x+2?s(g=1,n,e):e.page-e.adjacent<=2?(s(g=1,p=1+x,e),r(n,e,p)):e.page<n-(e.adjacent+2)?(g=e.page-e.adjacent,p=e.page+e.adjacent,l(e,g),s(g,p,e),r(n,e,p)):(p=n,l(e,g=n-x),s(g,p,e)),a(e,n,"next")}(e,n)},!0)},template:function(t,e){return'<ul data-ng-hide="Hide" data-ng-class="ulClass"> <li title="{{Item.title}}" data-ng-class="Item.liClass" data-ng-repeat="Item in List"> <a '+(e.pgHref?'data-ng-href="{{Item.pgHref}}" ':"href ")+'data-ng-class="Item.aClass" data-ng-click="Item.action()" data-ng-bind="Item.value"></a> </li></ul>'},scope:{page:"=",pageSize:"=",total:"=",disabled:"@",dots:"@",ulClass:"@",activeClass:"@",disabledClass:"@",adjacent:"@",pagingAction:"&",pgHref:"@",textFirst:"@",textLast:"@",textNext:"@",textPrev:"@",textFirstClass:"@",textLastClass:"@",textNextClass:"@",textPrevClass:"@",textTitlePage:"@",textTitleFirst:"@",textTitleLast:"@",textTitleNext:"@",textTitlePrev:"@"}}});
angular.module("enuo.grid").directive("emptyResult",function(){return{restrict:"EA",scope:{height:"@",emTitle:"@",emIntro:"@",emIcon:"@",emStyle:"@"},replace:!0,templateUrl:"enuo/grid/templates/emptyResult.html",controller:["$scope","$element","$attrs",function(e,t,n){e.$watchGroup(["height","emTitle","emIntro","emIcon","emStyle"],function(t,n){e.fnUpdate()},!0),e.fnUpdate=function(){e.config={title:e.emTitle||"没有匹配的数据",icon:e.emIcon||"glyphicon glyphicon-info-sign text-yellow",intro:e.emIntro||"请尝试修改查询条件后再试一次。"},"loading"==e.emStyle&&(e.config.title="loading",e.config.intro="正在加载,请稍后...",e.config.icon="fa fa-refresh fa-spin text-muted");var t=e.height||200,n=(t-60)/2;e.outStyle={"min-height":t+"px"},e.innerStyle={"margin-top":n+"px"}}}]}});
angular.module("enuo.grid").directive("enuoGridCell",function(){return{restrict:"EA",replace:!0,transclude:!0,scope:{column:"=",item:"="},template:'<span ng-click="click($event)"></span>',compile:function(){return{pre:function($scope,$elm,$attrs){function getFunc(func){return angular.isFunction(func)?func:eval("("+func+")")}var value=$scope.item[$scope.column.key];$scope.column.format?value=getFunc($scope.column.format)(value,$scope.item):void 0===value?value=$scope.column.name:null===value&&(value=""),"add"==$scope.column.template?$elm.append("<a class='text-success text-link'><i class='glyphicon glyphicon-plus'></i> "+value+"</a>"):"edit"==$scope.column.template?$elm.append("<a class='text-primary text-link'><i class='glyphicon glyphicon-pencil'></i> "+value+"</a>"):"delete"==$scope.column.template?$elm.append("<a class='text-danger text-link'><i class='glyphicon glyphicon-remove'></i> "+value+"</a>"):$scope.column.template?$elm.append(getFunc($scope.column.template)(value,$scope.item)):$elm.append(value+"")},post:function($scope,$elm,$attrs){$scope.click=function($event){if($scope.column.click){var invoke;invoke=angular.isFunction($scope.column.click)?$scope.column.click:eval("("+$scope.column.click+")"),invoke($scope.item[$scope.column.name],$scope.item,$event)}$event.stopPropagation()}}}}}});
angular.module("enuo.grid").directive("enuoGrid",function(){return{restrict:"E",replace:!0,scope:{config:"=",gridSource:"="},templateUrl:"enuo/grid/templates/enuoGrid.html",controller:["$scope","$element","$attrs",function(e,n,c){e.config.selectedList=e.config.selectedList||[],e.checkAll=!1,e.columnsCount=e.config.pkid?e.config.columns.length+1:e.config.columns.length,e.contentStyle=e.config.style?e.config.style.contentStyle:{},e.fnItemChecked=function(n){var c=n[e.config.pkid];return e.config.selectedList.filter(function(n){return n[e.config.pkid]==c}).length>0},e.fnCheckIsAll=function(){var n=e.gridSource.filter(function(n){return e.fnItemChecked(n)}).length;e.checkAll=n==e.gridSource.length},e.fnCheckItem=function(n){var c=n[e.config.pkid],i=e.config.selectedList.filter(function(n){return n[e.config.pkid]==c}),t=i.length>0?i[0]:null;if(t){var l=e.config.selectedList.indexOf(t);e.config.selectedList.splice(l,1)}else e.config.selectedList.push(n);e.fnCheckIsAll()},e.fnCheckAll=function(){return e.checkAll=!e.checkAll,angular.forEach(e.gridSource,function(n,c,i){var t=n[e.config.pkid],l=e.config.selectedList.filter(function(n){return n[e.config.pkid]==t}),o=l.length>0?l[0]:null;if(e.checkAll&&!o&&e.config.selectedList.push(n),!e.checkAll&&o){c=e.config.selectedList.indexOf(o);e.config.selectedList.splice(c,1)}}),!1},e.$watch("gridSource",function(n,c){e.fnCheckIsAll()},!0),e.fnSelectQuery=function(e,n){n.value=e.value,n.display=e.display||e.name},e.fnQuery=function(){var n={};angular.forEach(e.config.query.items,function(e,c,i){n[e.key]=e.value}),e.config.query.action.callback(n)}}]}});