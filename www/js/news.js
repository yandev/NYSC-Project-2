/*
  function onDeviceReady() {


document.addEventListener('init', function(event){

document.getElementById("info-button").addEventListener("click",function(){



});
 document.getElementById('appNavigator').topPage.onInit = function () {

        this.querySelector('ons-toolbar div.center').textContent = this.data.title;
        var toolbarButton = ons.platform.isAndroid() ? ons.createElement(`<ons-icon icon="md-more-vert"></ons-icon>`) : ons.createElement(`<span>More</span>`);
        var infoButton = document.getElementById('info-button');
        infoButton.appendChild(toolbarButton);
        var toastDialog = document.getElementById('toast-dialog');
        toastDialog.parentNode.removeChild(toastDialog);
        document.getElementById('dialogs-page').appendChild(toastDialog);
        var timeoutID = 0;
        window.fn.showDialog = function (id) {
          var elem = document.getElementById(id);
          if (id === 'popover-dialog') {
            elem.show(infoButton);
          } else {
            elem.show();
            if (id === 'modal-dialog') {
              clearTimeout(timeoutID);
              timeoutID = setTimeout(() => fn.hideDialog(id), 2000);
            }
          }
        };
*/