sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';
    var baseurl='';
    return {
        onPress: function (oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        onAfterItemAdded: async function (oEvent) {
            debugger
            var item = oEvent.getParameter("item")
            baseurl=this._view.getModel().sServiceUrl;
            var _createEntity = (item) => {
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size
                };

                var settings = {
                    // url: "/odata/v4/catalog/Files",
                    url: baseurl+"Files",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            resolve(results.ID);
                        })
                        .fail((err) => {
                            reject(err);
                        })
                })
            }

            await _createEntity(item)
                .then((id) => {
                    debugger
                    // var url = `/odata/v4/catalog/Files(${id})/content`
                    var url = baseurl+`Files(${id})/content`
                    item.setUploadUrl(url);
                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT")
                    oUploadSet.uploadItem(item);

                })
                .catch((err) => {
                    console.log(err);
                })
        },

        onUploadCompleted: function (oEvent) {
            debugger
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            oUploadSet.getBinding("items").refresh();
        },

        onOpenPressed: function (oEvent) {
            // to be implemented			
        },



    };
});
