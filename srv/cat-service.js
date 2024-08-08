const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
    console.log("Inside Service")
    let { Files } = this.entities;
    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/catalog/Files(${req.data.ID})/content`
    })

})