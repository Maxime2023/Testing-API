(this["webpackJsonptest-api"]=this["webpackJsonptest-api"]||[]).push([[0],{102:function(e,t,a){e.exports=a(159)},107:function(e,t,a){},108:function(e,t,a){},159:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(14),i=a.n(s),r=(a(107),a(79)),l=a(80),c=a(48),d=a(101),u=a(97),m=(a(108),a(62)),h=a(161),p=a(164),g=a(70),f=a(165),v=a(163),E=h.a.Option,S=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={url:"",config:{},apiSelected:0,apiValidated:0,isChecked:!1,isHeader:!0,value:"",testImage:"",isLogedIn:!1,login:"",password:""},e.handleChange=function(t){e.setState({apiSelected:t})},e.handleCheck=function(){e.setState({isChecked:!e.state.isChecked})},e.handleHeader=function(){e.setState({isHeader:!e.state.isHeader})},e.handleChangeLogin=function(t){e.setState({login:t.target.value})},e.handleChangePassword=function(t){e.setState({password:t.target.value})},e.handleConnect=function(){"maxime.dizier.luxcarta@gmail.com"===e.state.login&&"Password1!"===e.state.password&&e.setState({isLogedIn:!0})},e.openNotification=function(e,t,a){p.a.open({style:{color:a},message:t,description:e})},e.modifyUrl=function(t){e.setState({value:t.target.value}),e.setState({url:t.target.value})},e.clearStorage=function(){localStorage.clear(),sessionStorage.clear()},e.callApi=function(){var t=new XMLHttpRequest;e.state.isChecked?t.open("GET",e.state.value,!0):t.open("GET",["https://jsonplaceholder.typicode.com/todos/1","https://2fthddyg5m.execute-api.eu-central-1.amazonaws.com/Prod/get/get?map=cp%2F3876_australia_vodafone_062018.map&srs=EPSG%3A3857&transparent=true&format=image%2Fpng&exceptions=application%2Fvnd.ogc.se_xml&styles=&tiled=true&feature_count=101&service=WMS&version=1.1.1&request=GetMap&layers=ORTHO&bbox=15429272.781532537%2C-4138606.4594725817%2C15439056.72115304%2C-4128822.5198520795&width=256&height=256","https://3kzsy3ah3h.execute-api.eu-central-1.amazonaws.com/Prod/tms/mosaic/ndvimask/1/0/1/1/1/1.png","https://vr77y6sw57.execute-api.eu-central-1.amazonaws.com/TestCognitoToken/transactions?transactionId=5&type=PURCHASE&amount=3"][e.state.apiSelected],!0),e.state.isHeader&&t.setRequestHeader("Authorization",localStorage.getItem("Token")),t.onload=function(e){4===t.readyState&&(200===t.status?(this.setState({apiValidated:this.state.apiSelected}),this.setState({url:t.responseText}),this.openNotification("L'API a \xe9t\xe9 correctement appel\xe9e","","green")):(console.error(t.statusText),console.log("ezrzer :",t),this.openNotification("erreur status : ".concat(t.status),"Une erreur s'est produite lors de l'appel","red")))}.bind(Object(c.a)(e)),t.onerror=function(e){console.error(t.statusText),this.openNotification("erreur status : ".concat(t.status),"Une erreur s'est produite lors de l'appel","red")}.bind(Object(c.a)(e)),t.send(null)},e.identify=function(){var t=new m.a({Username:"maxime.dizier.luxcarta@gmail.com",Password:"Password1!"}),a={Username:"maxime.dizier.luxcarta@gmail.com",Pool:new m.c({UserPoolId:"eu-central-1_cosPuLBeK",ClientId:"6cl7iogefk5mjfk5qfsgo2ogmq"})};new m.b(a).authenticateUser(t,{onSuccess:function(e){this.openNotification(e.idToken.jwtToken.slice(0,20)+"...","Le Token a \xe9t\xe9 correctement g\xe9n\xe9r\xe9 :"),console.log("token generated :",e.idToken.jwtToken),localStorage.setItem("Token",e.idToken.jwtToken),this.loadScript()}.bind(Object(c.a)(e))})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e={headers:{Authorization:localStorage.getItem("Token")}};this.setState({config:e})}},{key:"render",value:function(){var e={width:"60%",marginLeft:"20%",marginTop:"2%",textAlign:"center"};return this.state.isLogedIn?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(g.a,{onClick:this.identify,style:e},"OBTENIR UN TOKEN")),o.a.createElement("div",{style:e},"Ne pas ajouter le Header ",o.a.createElement(f.a,{onChange:this.handleHeader})),o.a.createElement("div",{style:e},o.a.createElement(g.a,{onClick:this.clearStorage},"Effacer le storage")),o.a.createElement("div",{className:"api"},o.a.createElement("div",{className:"select-api"},o.a.createElement(h.a,{defaultValue:"Choisir L'API",onChange:this.handleChange},o.a.createElement(E,{value:"0"},"API PUBLIQUE"),o.a.createElement(E,{value:"1"},"1ere API AWS"),o.a.createElement(E,{value:"2"},"2eme API AWS"),o.a.createElement(E,{value:"3"},"API PERSO AWS"))),o.a.createElement("div",{className:"call-api"},o.a.createElement(g.a,{onClick:this.callApi},"APPELER L'API"))),o.a.createElement("div",{className:"response"},this.state.apiValidated>0&&this.state.url?o.a.createElement("div",null,o.a.createElement("img",{src:this.state.url,alt:"#"})):o.a.createElement("div",null,this.state.url),o.a.createElement("div",null,this.state.url.slice(0,4)))):o.a.createElement("div",null,o.a.createElement("div",{style:e},o.a.createElement(v.a,{onChange:this.handleChangeLogin})),o.a.createElement("div",{style:e},o.a.createElement(v.a.Password,{onChange:this.handleChangePassword})),o.a.createElement("div",{style:e},o.a.createElement(g.a,{onClick:this.handleConnect},"Se connecter")))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(158);i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[102,1,2]]]);
//# sourceMappingURL=main.1e7c13f2.chunk.js.map