function t(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var e=require("react"),r=t(e),n=require("history"),o=t(require("wayfarer")),i=e.createContext(),a=i.Provider,s=i.Consumer;exports.Router=function(t){function e(e){var i=this;t.call(this,e),this.history=e.history||n.createBrowserHistory(),this.unlisten=null,this.router=o(e.defaultPath||"/"),this.actions={push:this.history.push,goBack:this.history.goBack,goForward:this.history.goForward,replace:this.history.replace},r.Children.map(e.children,function(t){return i.addRoute(t)}),this.state={search:window.location.search,url:window.location.pathname}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.componentDidMount=function(){var t=this;this.unlisten=this.history.listen(function(e){var r=e.pathname,n=e.search;t.setState(function(t){return Object.assign({},t,{url:r,search:n})})})},e.prototype.componentWillUnmount=function(){this.unlisten()},e.prototype.addRoute=function(t){this.router.on(t.props.path,function(e){return function(t,e){return r.createElement(s,null,function(n){var o,i=n.state,a=n.push,s=n.replace,c=n.goBack,u=n.goForward;return r.cloneElement(t,{path:i.url,searchParams:(o=i.search,void 0===o&&(o=""),o?(/^[?#]/.test(o)?o.slice(1):o).split("&").reduce(function(t,e){var r=e.split("="),n=r[1];return t[r[0]]=n?decodeURIComponent(n.replace(/\+/g," ")):"",t},{}):{}),push:a,replace:s,goBack:c,goForward:u,params:e})})}(t,e)})},e.prototype.render=function(){var t=this.state.url;return r.createElement(a,{value:Object.assign({},{state:this.state},this.actions)},this.router(t))},e}(r.Component),exports.Link=function(t){var e=t.path,n=t.href,o=t.children,i=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&-1===e.indexOf(n)&&(r[n]=t[n]);return r}(t,["path","href","children"]),a=n||e;return r.createElement(s,null,function(t){var e=t.push;return r.createElement("a",Object.assign({},i,{href:a,onClick:function(t){t.preventDefault(),e(a)}}),o)})};
