sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";var t="";return{onPress:function(t){e.show("Custom handler invoked.")},onAfterItemAdded:async function(e){debugger;var a=e.getParameter("item");t=this._view.getModel().sServiceUrl;var n=e=>{var a={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var n={url:t+"Files",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(a)};return new Promise((e,t)=>{$.ajax(n).done((t,a,n)=>{e(t.ID)}).fail(e=>{t(e)})})};await n(a).then(e=>{debugger;var n=t+`Files(${e})/content`;a.setUploadUrl(n);var i=this.byId("uploadSet");i.setHttpRequestMethod("PUT");i.uploadItem(a)}).catch(e=>{console.log(e)})},onUploadCompleted:function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh()},onOpenPressed:function(e){}}});
//# sourceMappingURL=Attachments.js.map