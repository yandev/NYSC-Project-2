// For an introduction to the Blank template, see the following documentation:
 // http://go.microsoft.com/fwlink/?LinkID=397704
 // To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
 // and then run "window.location.reload()" in the JavaScript Console.
/*
            Mysql instance name :   nyscinstance2
            Master Username     :   nysc_user
            Master Password     :   StuejfoggEp1
            Data base Name      :   NYSC_DB
*/




 (function () {
     "use strict";

     var StateCode;
     var OldPassword;
     var dynamodb = null;
     
     var end = false;
     var wall;
     var pageshowing = null;
     var mainyear;
     
     var My_IdentityId_partition = null;
     var My_IdentityId = null;
     var bucket = null;
     var cognitoUser = null;

     var cmstd_wall = null;
     
     
 
     var profileinfo = [];
 
     var pathtophp = 'http://localhost:8080/new-nysc-gdb/';
     var skip = 0;
     var swipernewspage;
     var swiperprofilepage;
     var swipercorperspage;
     var itemCount = 0;
     var scrollevent;
     var newspageend = false;
     var ViewMoreoptionspageend = false;
     var corperwallpageend = false;
     var camera_dialog;
     var pictures = [];
     
     var picture_index = 0;

     var fullstatename = "";
     var batch = "";
     var yearofservice = "";
    var data_skip_yearbook = 0;
    var data_skip_cmwall = 0;
    //var user_pool_id = 'us-west-2_TLjDm1fS9';
     //var Client_Id  = '3jthg266kfff40ibhj4juaf3jl';us-east-1_NNYGO9I8N 1gk071ek18funlseh67a1rdjhg
    var user_pool_id = 'us-east-1_NNYGO9I8N';
    var Client_Id = '1gk071ek18funlseh67a1rdjhg';
    var BucketName;
    var s3;
    var MD5;
     // var bucketname = "newstest-userfiles-mobilehub-1607183395";
   // nyscapp - userfiles - mobilehub - 145406771
    var bucketname;// = "nyscapp-userfiles-mobilehub-145406771";
     document.addEventListener('deviceready', onDeviceReady.bind(this), false);

  

     function onDeviceReady() {

         //alert(cordova.file); alert(navigator.camera)
          bucketname = new AWS.S3({ params: { Bucket: "newstest-userfiles-mobilehub-1607183395" } });
        document.getElementById("btnSignin").addEventListener('click', Signincliick);
        
    //    document.getElementById("btnSignin2").addEventListener('click', Signincliick2);
         
    checksesssion();
       //  document.addEventListener("scroll", ScrollLoadmore);
    // document.querySelector.bind(document);

 

  
/* this is the end of device ready function *************************


            *********************************************************
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *        this is the end of Init         function       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *********************************************************






*/
















         document.addEventListener('init', function (event) {

                

                 
$('.page__content').on('scroll', scrollevent);
 
             if (event.target.matches('#resetpasswordpage')) {
 
                 if (StateCode !== undefined) {
                  //   document.getElementById('newpasswordusernameplaceholder').innerHTML = StateCode;
                 } else {
                    // document.getElementById('newpasswordusernameplaceholder').innerHTML = "Corps Member";
                 }

                 document.getElementById("btngetresetPasswordcode").addEventListener('click', Loginandchangepassword);




             }else if (event.target.matches('#signinpage')){
               
                console.log(" the init ")
                document.getElementById("btnSignin").addEventListener('click', Signincliick);
            
             }else if (event.target.matches('#signinpage2')){
                
                 console.log(" the init 2")
                 document.getElementById("btnSignin2").addEventListener('click', Signincliick2);
             
              }
              else if (event.target.matches('#newspage')) {
                  



//$(window).scroll();
                   //  document.addEventListener("scroll", ScrollLoadmore);

                        
                        newspageend = false;
                                              $('#thatsall-id').fadeOut();
               /*     AWS.config.credentials.refresh((error) => {




                     if (error) {
                         console.error(error);
                     } else {

                         bucket = new AWS.S3();

                         var params_buc = {
                             Bucket: bucketname,
                             Key: 'public/122.js/Domain_listing.txt'
                         }

                        /* var params = {
                             RoleArn: 'arn:aws:iam::429004225449:role/testapp_auth_MOBILEHUB_1221341559',
                           
                             RoleSessionName: 'Corpers_session',
                           
                             DurationSeconds: 3600,

                         };
                         
                     
                       

                         var sts = new AWS.STS();
                         sts.assumeRole(params, function (err, data) {
                             if (err) {

                             } else {

                             };



                         });
                         bucket.getObject(params_buc, function (err, data) {
                             if (err) {
                                 console.log(err);
                             } else {
                                 console.log(data.Body.toString());

                             }
                         });
                         //console.log(AWS.config.credentials.params.IdentityId);

                         //console.log(GetSortKey(AWS.config.credentials.params.IdentityId));

                       
      
      
                

            bucket.listObjects({}, function(err, resp){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(resp.Contents);
                }
            })
           
          bucket.config.credentials.get(function() {
              
  console.log("My Identity Id = : " + bucket.config.credentials.params.IdentityId);
 // well user POOL ID IS NOT WORKING  WE WILL STICK WITH THE IDENTITY ID    //
 // console.log("my user pool id = : "+ bucket.config.credentials.params.UserPoolId);
    
});
            var fileChooser = document.getElementById('fileid');
            var file = fileChooser.files[0];
             var userid = "";
       userid = bucket.config.credentials.params.IdentityId;
       
            if (file) {
                  var fileName = file.name;
                  //us-west-2:ecb015c8-3a26-4150-bf91-df6d01fe4449 try puting in this
                var params = { Key: "private/"+userid+"/"+fileName, ContentType: file.type, Body: file };
                bucket.upload(params).on('httpUploadProgress', function (evt) {
                    console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
                }).send(function (err, data) {
                    console.log("File uploaded successfully.");
                });
            }

        }
    });


      
      
      
      
      
      
      
      var bucket = new AWS.S3({ params: { Bucket: "newstest-userfiles-mobilehub-1607183395" } });

            bucket.listObjects({}, function(err, resp){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(resp.Contents);
                }
            })
         
          bucket.config.credentials.get(function() {
               
  console.log("My Identity Id = : " + bucket.config.credentials.params.IdentityId); 




 // well user POOL ID IS NOT WORKING  WE WILL STICK WITH THE IDENTITY ID    //
 // console.log("my user pool id = : "+ bucket.config.credentials.params.UserPoolId);
    
//});
            var fileChooser = document.getElementById('fileid');
            var file = fileChooser.files[0];
             var userid = "";
       userid = bucket.config.credentials.params.IdentityId;
       
            if (file) {
                  var fileName = file.name;
                  //us-west-2:ecb015c8-3a26-4150-bf91-df6d01fe4449 try puting in this
                var params = { Key: "private/"+userid+"/"+fileName, ContentType: file.type, Body: file };
                bucket.upload(params).on('httpUploadProgress', function (evt) {
                    console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
                }).send(function (err, data) {
                    console.log("File uploaded successfully.");
                });
            }


                     }
                 });*/
             } else if (event.target.matches("#yearbookpage")) {
                
                            document.getElementById("State_name").innerHTML = fullstatename;
                            document.getElementById("Batch_name").innerHTML = batch;
                            document.getElementById("year-id").innerHTML = yearofservice;
                             
                            wall = new Freewall("#freewall");
                            wall.reset({
                                selector: '.brick',
                                animate: true,
                                cellW: 300,
                                cellH: 'auto',
                                onResize: function () {
                                    wall.fitWidth();
               
                                },
               
                            });
               
                            wall.container.find('.brick img').on('load', function () {
               
                                wall.fitWidth();
               
                            });
               
/*
                 dynamodb = new AWS.DynamoDB({
                     region: 'us-west-2'
                 });
                 docClient = new AWS.DynamoDB.DocumentClient({
                     service: dynamodb
                 });
                 var table = "Corpers_tb";
                 var UserIdentityID = "2333324234";
                 var timestamp = "5555555";

                 var params = {
                     TableName: table,
                     Key: {
                         "timeStamp": timestamp,
                         "UserIdentityID": UserIdentityID
                     }
                 };
                 docClient.get(params, function (err, data) {
                     //    docClient.put(params, function (err, data) {
                     if (err) {
                         console.log(err)
                     } else {


                         var resultData = data;

                         console.log("the data is = " + JSON.stringify(data, undefined, 2));
                         //  data.Body.toString('ascii')
                     }
                     //   })
                 });



*/



             } else if (event.target.matches("#profilepage")) {

     


         
                    autosize(document.querySelectorAll('textarea'));



                 $('.toast').hide();

                 var i = $(".profile_edit"); // Get all elements of with  class profile_edit
                 var i_num = 0; //iterator
                 $.each(i, function () { //for each item with the class profile_edit disable it



                     i[i_num].disabled = true;

                     ++i_num;
                 });



             } //end of profile page event.target. init
             else if (event.target.matches("#ViewMoreoptionspage")) {

                $('.select-input').on('change',function(e){
                    
                  
                    $("#errormess_no_data_avail").fadeOut(1500);

                });

                $('.yeardiv').on('click',function(e){
                    
                    document.getElementById("selected_year").innerHTML = e.target.innerHTML;
                    $("#errormess_no_data_avail").fadeOut(1500);

                });
                document.getElementById('btngetyearbk').addEventListener('click',function(){
                    yearofservice = (document.getElementById("selected_year").innerHTML).trim();
                    batch = $("#batch-select").val().trim();
                       fullstatename = $("#state-select").val().trim();
                        

                      
                       if((yearofservice) && (batch)&&(fullstatename) && (yearofservice != "") &&(batch != "Choose Batch") &&(fullstatename != "Choose State")){

                        data_skip_yearbook = 0;
                        
                        LoadCm_selected_yearbook(fullstatename,yearofservice,batch)
                     
                            

                       }else{
                        ons.notification.alert("Please provide a year, batch and state");
                           document.getElementById("message_from_s3").innerHTML = "Select a year, a batch and state";
                           $("#errormess_no_data_avail").fadeIn(300);
                          
                       }
                   })

             } else if (event.target.matches("#corperwallpage")) {


                 wall = new Freewall("#freewall_corpers_wall");
                 wall.reset({
                     selector: '.brick_corperwall',
                     animate: true,
                     cellW: 200,
                     cellH: 'auto',
                     onResize: function () {
                         wall.fitWidth();

                     },

                 });

                 wall.container.find('.brick_corperwall img').on('load', function () {

                     wall.fitWidth();

                 });


             } else if (event.target.matches("#settingpage")) {
                    $('#Logout').on('click',Logout);
             }

         }); // the end of init event

 


         



/* this is the end of device ready function *************************


            *********************************************************
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *        this is the end of show         function       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *********************************************************






*/













    

  
         document.addEventListener("show", function (event) {
    
                
            if (event.target.matches('#newspage')) {
  
                 pageshowing = "newspage";

                newspageend = false;

 

// Begin fetching infomation  from news 



// end of fetching infomation
}else if (event.target.matches('#signin')) {
                  
  
                
             }
                
            else if (event.target.matches("#yearbookpage")) {

                 pageshowing = "yearbookpage";
                
                 wall.fitWidth();
                 wall.refresh();




                 wall.container.find('.brick img').on('load', function () {
                     wall.fitWidth();
                     wall.refresh();
                 });


                    if(document.getElementById("freewall").innerHTML.trim()){

                       
                   

                    }else{
                    
                        // the yearbook page is loading for the first time so the corp members  yearbook is displayed by default
                      
                        if((fullstatename)&&(yearofservice)&&(batch)){
                            
                            LoadCmyearbook(fullstatename,yearofservice,batch)
                          
    
                            }
                        
                        
                    }
                   
    

// Begin fetching infomation  from news 



                      



                 document.getElementById('choose_year').addEventListener('click', function () {

                     
                     document.querySelector('#myNavigator').pushPage('ViewMoreoptions.html');

                 })

               

          


             } else if (event.target.matches("#profilepage")) {

                 //var mySwiper = document.querySelector('.swiper-container_profile').swiper

                 swiperprofilepage = new Swiper('.swiper-container_profile', {
                         
                     spaceBetween: 10,
                     // Responsive breakpoints
                     breakpoints: {
                         // when window width is <= 320px
                         320: {
                             slidesPerView: 1,
                             spaceBetween: 10
                         },
                         // when window width is <= 480px
                         480: {
                             slidesPerView: 1,
                             spaceBetween: 10
                         },
                         // when window width is <= 640px
                         640: {
                             slidesPerView: 1,
                             spaceBetween: 10
                         }
                     },
                     pagination: {
                         el: '.swiper-pagination_profile',
                      
                     },
                     navigation: {
                         nextEl: '.swiper-button-next_profile',
                         prevEl: '.swiper-button-prev_profile',
                     },
                 });

            
                



                 var state = document.getElementById('StateCode');
                 state.disable = true;
                 pageshowing = "profilepage";






                 $("#edit_switch").on('change', function () {

                     var edit_switch = document.getElementById('edit_switch');


                     
                     if (edit_switch.checked === true) {

                         $("#saving_fields_toast").hide();
                         $("#edit_fields_toast").show();

                         var i = $(".profile_edit"); // Get all elements of with  class profile_edit
                         var i_num = 0; //iterator
                         $.each(i, function () { //for each item with the class profile_edit disable it



                             i[i_num].disabled = false;

                             ++i_num;
                         });

                         setTimeout($("#edit_fields_toast").fadeOut(6000), 7000);


                     } else {
                         $("#edit_fields_toast").hide();
                         $("#saving_fields_toast").show();

                         var i = $(".profile_edit"); // Get all elements of with  class profile_edit
                         var i_num = 0; //iterator



                        var st = '{'
                         $.each(i, function () { //for each item with the class profile_edit disable it     

                             i[i_num].disabled = true;
                             profileinfo[i[i_num].id] = i[i_num].value;
                            st += '"'+i[i_num].id +'"' + ':' +'"'+ i[i_num].value+'"'+',';


                             ++i_num;
                         });
                         
                            st += '"statecd" :'+ '"'+StateCode+'"}';
                             
                                                    
                            
                   
                   
                         $.ajax({
                            type: "POST",
                            url: pathtophp + 'updatenewinfo.php',
                            data:{"cm_data":st},
                            dataType: "text",
                            success:function(data){
                                console.log(data);
                                

                            },
                            error:function(e){
                                    console.log(e.responseText);
                            }

                            
                            
                         });
                       
                             
                           
                         

                         



                         setTimeout($("#saving_fields_toast").fadeOut(6000), 7000);

                     }
                 })



                 autosize(document.querySelectorAll('textarea'));

                 // change password Dialog function
                 document.getElementById("btn_change_password").addEventListener("click", function () {
                     var dialog = document.getElementById('password_change_dialog');

                     if (dialog) {
                         dialog.show();

                         document.getElementById("cancel").addEventListener("click", function () {

                             dialog.hide();
                         });
                     } else {
                         ons.createDialog('password_change_dialog_page.html')
                             .then(function (dialog) {
                                 dialog.show();
                                 //the change password

                                 document.getElementById('submit_new_pass').addEventListener('click', ChangePassword)

                                 document.getElementById("cancel").addEventListener("click", function () {
                                     document.getElementById("input_Current").value = "";
                                     document.getElementById("input_password").value = "";
                                     document.getElementById("input_confrim_password").value = "";


                                     dialog.hide();
                                 });
                             });
                     }


                 });
                

                 document.getElementById('camera_post').addEventListener('click', function () {
                     console.log("camera clicked");
                     camera_dialog = document.getElementById('Picture_dialog');
                     if (camera_dialog) {
                         camera_dialog.show();
                        
                         document.getElementById("camera_option_cancel_btn").addEventListener("click", function () {

                             camera_dialog.hide();
                         });
                     } else {
                         ons.createDialog('Picture_dialog_page.html')
                             .then(function (camera_dialog) {

                                 $(".btn_picture_choice").on("click", function (e) {
                                   
                                
                                     openCamera(e.target.id);
                                     clearCache();
                                     camera_dialog.hide();
                                 });





                                 camera_dialog.show();
                                 document.getElementById("camera_option_cancel_btn").addEventListener("click", function () {



                                     camera_dialog.hide();
                                 });
                             })
                     }

                 })
                 /** 
                  * 
                  * function uploadPics() {
console.log("Ok, going to upload "+images.length+" images.");
var defs = [];
images.forEach(function(i) {
console.log('processing '+i);
var def = $.Deferred();
function win(r) {
console.log("thing done");
if($.trim(r.response) === "0") {
console.log("this one failed");
def.resolve(0);
} else {
console.log("this one passed");
def.resolve(1);
}
}
function fail(error) {
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
def.resolve(0);
}
var uri = encodeURI("http://localhost/testingzone/test.cfm");
var options = new FileUploadOptions();
options.fileKey="file";
options.fileName=i.substr(i.lastIndexOf('/')+1);
options.mimeType="image/jpeg";
var ft = new FileTransfer();
ft.upload(i, uri, win, fail, options);
defs.push(def.promise());
});
$.when.apply($, defs).then(function() {
console.log("all things done");
console.dir(arguments);
});
}
                  * 
                  * 
                  * 
                  */


                 $("#btn_Post_event").on("click", function (e){

                     var post_text = $('#text_area_post').val();
                     var timeofpost = Date.now();
                     var rand = Math.floor((Math.random() * 20) + 1);

                     var value = timeofpost + rand;
                     console.log(timeofpost);
                     console.log(rand);
                     
                     console.log((md5(value)));
                     var profilePic = "NYSCYEARBOOK" + (md5(timeofpost)) + ".jpg"
                     var location = "";
                     
                   
                     // well user POOL ID IS NOT WORKING  WE WILL STICK WITH THE IDENTITY ID    //
                    // console.log("my user pool id = : " + BucketName.config.credentials.params.UserPoolId);
                    // console.log("my code " + BucketName.config.credentials.params.IdentityId);
                    
                     
                     var bucket = new AWS.S3({ params: { Bucket: "nyscapp-userfiles-mobilehub-1454067712" } });

                     bucket.listObjects({}, function (err, resp) {
                         if (err) {
                             console.log(err);
                         }
                         else {
                             console.log(resp.Contents);
                         }
                     })

                     bucket.config.credentials.get(function () {

                         console.log("My Identity Id = : " + bucket.config.credentials.params.IdentityId);
                         // well user POOL ID IS NOT WORKING  WE WILL STICK WITH THE IDENTITY ID    //
                         // console.log("my user pool id = : "+ bucket.config.credentials.params.UserPoolId);

                     });


                     var params_buc = {
                       
                         Key: 'public/example-image.png'
                     }



                     bucket.getObject(params_buc, function (err, data){
                         if (err) {
                             console.log(err);
                         } else {
                             console.log(data);

                         }
                     });



                   
                     if ((post_text) || (pictures.length > 0)) {
                       

                         var userid = bucketname.config.credentials.params.IdentityId;
                         console.log(userid);
                         console.log(path);
                         var path = "private/" +    userid + "/" + (md5(value)) + "/";
                            
                         uploadPhoto(path, profilePic,post_text);
                         

                             //us-west-2:ecb015c8-3a26-4150-bf91-df6d01fe4449 try puting in this
                   /*
                    * 
                              var params = { Key: "private/"+userid+"/"+fileName, ContentType: file.type, Body: file };
                             bucket.upload(params).on('httpUploadProgress', function (evt) {
                                 console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
                             }).send(function (err, data) {
                                 console.log("File uploaded successfully.");
                             });

                             */
/*

                         
                        

                         var params_buc = {
                             Bucket: "newstest-userfiles-mobilehub-1607183395",
                             Key: 'public/122.js/Domain_listing.txt'
                         }

                         var params = {
                             RoleArn: 'arn:aws:iam::429004225449:role/testapp_auth_MOBILEHUB_1221341559',
                             
                             RoleSessionName: 'Corpers_session',
                             
                             DurationSeconds: 3600,

                         };

                     
                       

                         var sts = new AWS.STS();
                         sts.assumeRole(params, function (err, data) {
                             if (err) {

                             } else {

                             };



                         });
                         bucket.getObject(params_buc, function (err, data) {
                             if (err) {
                                 console.log(err);
                             } else {
                                 console.log(data.Body.toString());

                             }
                         });
                         //console.log(AWS.config.credentials.params.IdentityId);

                         //console.log(GetSortKey(AWS.config.credentials.params.IdentityId));

                         
      
      
                  var bucket = new AWS.S3({ params: { Bucket: "newstest-userfiles-mobilehub-1607183395" } });

            bucket.listObjects({}, function(err, resp){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(resp.Contents);
                }
            })
           
          bucket.config.credentials.get(function() {
              
  console.log("My Identity Id = : " + bucket.config.credentials.params.IdentityId);
 // well user POOL ID IS NOT WORKING  WE WILL STICK WITH THE IDENTITY ID    //
 // console.log("my user pool id = : "+ bucket.config.credentials.params.UserPoolId);
    
});
            var fileChooser = document.getElementById('fileid');
            var file = fileChooser.files[0];
             var userid = "";
       userid = bucket.config.credentials.params.IdentityId;
       
            if (file) {
                  var fileName = file.name;
                  //us-west-2:ecb015c8-3a26-4150-bf91-df6d01fe4449 try puting in this
                var params = { Key: "private/"+userid+"/"+fileName, ContentType: file.type, Body: file };
                bucket.upload(params).on('httpUploadProgress', function (evt) {
                    console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
                }).send(function (err, data) {
                    console.log("File uploaded successfully.");
                });
            }

                     }
                     */



                         
                         
                     } else {
                         ons.notification.alert("Picture or text must be posted");
                     }
                        
                     
                     
                 })




             } //the end of profile page show event
             else if (event.target.matches("#ViewMoreoptionspage")) {

                              pageshowing = "ViewMoreoptionspage";
                
                              ViewMoreoptionspageend = false;
                


                 Setyear();


                 document.getElementById("goback").addEventListener('click', function () {

                     if (mainyear > 1900) {


                        document.getElementById("mainyear_4").innerHTML = mainyear - 4;
                        document.getElementById("mainyear_3").innerHTML = mainyear - 3;
                         document.getElementById("mainyear_2").innerHTML = mainyear - 2;                         
                         document.getElementById("mainyear_1").innerHTML = mainyear - 1;
                         document.getElementById("mainyear").innerHTML = mainyear;


                         mainyear = mainyear - 1;
                     }

                 });

                 document.getElementById("goforward").addEventListener('click', function () {


                     if (mainyear <= 10000) {

                         document.getElementById("mainyear").innerHTML = mainyear;
                         document.getElementById("mainyear_1").innerHTML = mainyear + 1;
                         document.getElementById("mainyear_2").innerHTML = mainyear + 2;
                         document.getElementById("mainyear_3").innerHTML = mainyear + 3;
                         document.getElementById("mainyear_4").innerHTML = mainyear + 4;

                         mainyear = mainyear + 1;
                     }



                 });



             } //the end of View More options page page show event
             else if (event.target.matches('#corperwallpage')) {

                    
                              pageshowing = "corperwallpage";
                
                              corperwallpageend = false;
                              Load_CM_Wall(cmstd_wall);
                             
                 autosize(document.querySelectorAll('textarea'));
             }

             // the end of the corpers page 



         }); // the end of the show event 


       


         $('.info-button').on('click', function () {
             var menu = $('#popover-dialog');
             menu.show();

         });


       
         //  load the js only on device ready function
    



/* this is the end of device ready function *************************


            *********************************************************
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *        this is the  of btnSignin  function       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *********************************************************






*/





                function Signincliick() {
        
                  
                   StateCode = document.getElementById('txtStateCode').value.trim();
                   OldPassword = document.getElementById('txtPassword').value.trim();
      
      
                   if ((!StateCode) || (!OldPassword)) {
                       ons.notification.alert('You must provide a State Code and Password');
                       ///ons.notification.toast('You must provide a task title.');
      
      
      
                   } else {
                    StateCode = StateCode.toUpperCase();
                       $('#signinspinner').fadeIn(400);
      
                       var authenticationData = {
                           Username: StateCode,
                           Password: OldPassword
                       };
      
                       var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
                       var poolData = {
                           UserPoolId: user_pool_id,
                           ClientId: Client_Id
                       };
      
                       var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                       var userData = {
                           Username: StateCode,
                           Pool: userPool
                       };
      
                       cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      
      
                       cognitoUser.authenticateUser(authenticationDetails, {
      
                           onSuccess: function (result, userConfirmationNecessary) {
                            Loaduserdata(cognitoUser.username);
                            
                            LoadallState();
                            Checker(cognitoUser.username)
                               //AWS.config.region = 'us-west-2';
                        
                            AWS.config.region = 'us-east-1';
      
      
                               //let loginsCognitoKey = "cognito-idp.us-west-2.amazonaws.com/us-west-2_TLjDm1fS9";
                            
                         
                            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                                RoleArn: "arn:aws:iam::226813198723:role/nyscapp_auth_MOBILEHUB_1454067712",
                                    IdentityPoolId : 'us-east-1:6527ed6d-4483-4f36-a638-a24c98cfcd2e', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_NNYGO9I8N': result.getIdToken().getJwtToken()
                }
            });

                               //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                     //example: var s3 = new AWS.S3();
                     console.log('Successfully logged!');
                }
            });
        
                               var params = {
                                   RoleArn: "arn:aws:iam::226813198723:role/nyscapp_auth_MOBILEHUB_1454067712",

                                   RoleSessionName: 'Corpers_session',

                                   DurationSeconds: 3600,

                               };




                               var sts = new AWS.STS();
                               sts.assumeRole(params, function (err, data) {
                                   if (err) {
                                       console.log(err)
                                   } else {
                                       console.log("sts assumed "+data)
                                   };



                               });

                               AWS.config.credentials.get(function (err) {
                                   if (err) console.log(err);
                                   else console.log(AWS.config.credentials);
                               });

      
                               /*
      
                               data = {
                                AssumedRoleUser: {
                                 Arn: "arn:aws:sts::123456789012:assumed-role/demo/Bob", 
                                 AssumedRoleId: "ARO123EXAMPLE123:Bob"
                                }, 
                                Credentials: {
                                 AccessKeyId: "AKIAIOSFODNN7EXAMPLE", 
                                 Expiration: <Date Representation>, 
                                 SecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY", 
                                 SessionToken: "AQoDYXdzEPT//////////wEXAMPLEtc764bNrC9SAPBSM22wDOk4x4HIZ8j4FZTwdQWLWsKWHGBuFqwAeMicRXmxfpSPfIeoIYRqTflfKD8YUuwthAx7mSEI/qkPpKPi/kMcGdQrmGdeehM4IC1NtBmUpp2wUE8phUZampKsburEDy0KPkyQDYwT7WZ0wq5VSXDvp75YU9HFvlRd8Tx6q6fE8YQcHNVXAkiY9q6d+xo0rKwT38xVqr7ZD0u0iPPkUL64lIZbqBAz+scqKmlzm8FDrypNC9Yjc8fPOLn9FX9KSYvKTr4rvx3iSIlTJabIQwj2ICCR/oLxBA=="
                                }, 
                                PackedPolicySize: 6
                               }
                               */
      
      
      
      
                               //call refresh method in order to authenticate user and get new temp credentials
                               $('#signinspinner').fadeOut();
      
      
      
                               document.querySelector('#myNavigator').pushPage('main.html');
      
                           },
      
                           onFailure: function (err) {
                               if (err) 
                               {
                                   
                                  if(err.code  == "PasswordResetRequiredException" ){

                                    ons.notification.alert("Looks like you forgot your password. ")
                                   }else if (err.code == "NotAuthorizedException"){

                                    ons.notification.alert(err.message);
                                   }
                                       else if (err.code == "NetworkingError") {
                                       
                                          ons.notification.alert("Check your internet Connection");
                                          
                                      }else if (err.code == "UserNotFoundException"){
                                        ons.notification.alert("The user does not Exist");
                                      }else 
                                   {
                                    ons.notification.alert("Sorry there was and Error to type " + err)
                                    console.log(JSON.stringify(err,null,3));
                                    
                                   } 
                                   
                                  
                                    
                          
                                
      
                                   $('#signinspinner').fadeOut(2000);
                                   return;
                               }
                           },
                         
                     
                       });
      
      
      
      
      
                   }
      
               }




               


        
         


var GetPassword = function(){
 

    document.querySelector('#myNavigator').pushPage('changetemppass.html');      

    
}

         document.getElementById('Newuser').addEventListener('click',GetPassword);


         


function LoadallState(){
                                
                        $('#progress-bar-news').fadeIn(300);
                                    $.ajax({
                        type: "POST",
                        url: pathtophp + "newspageloaddata.php",  
                        data:{"data_skip":skip},
                        dataType: "json",
                        
                        complete:function(){
                            
                               // initslider();
                        },
                        //xhr: 
                    /*	xhr: function(){
		var xhr = new window.XMLHttpRequest();
			
			xhr.upload.addEventListener('progress', function(e){
				
				if(e.lengthComputable){
					
					
                    var percent = Math.round((e.loaded / e.total) * 100);
                    console.log(e.loaded + "loaded ")
                    console.log(e.total + " total loaded ")
                    console.log(percent + '%');
					//$('#'+model).attr('aria-valuenow',percent).css('width',percent + '%').text(percent + '%');
				}
				
			});
			
			
			
		return xhr;
		
    },
    */
                        success: function (r) {
                           
                                               if (r.n){
                                                   
                             
                             LoadCM(r.n); 
                             $('#progress-bar-news').fadeOut(300);
                          skip = parseInt(r.skip_return) + 10;
                                               }
                            else{
                                newspageend = true;
                                $('#thatsall-id').fadeIn(500);
                                $('#progress-bar-news').fadeOut(300);
                                //  ons.notification.alert("No more data to load");
                            }
                             

	


                        },
                            error: function(e){
                                    ons.notification.alert("errr of type "+ e);
                                    console.log(e);
                                
                            }
                                    })



}       // end of LoadallState





                    function Loaduserdata(username){

                        $.ajax({
                            type:"POST",
                            url:pathtophp + "getuserdata.php",
                            data:{"username":username},
                            dataType:"json",
                            success:function(data){
                                                                   
                                    $('.profile_display').attr('src',data.Cm[0].profilepic)
                                  $('#First_Name').val(data.Cm[0].firstname)
                                  $('#Middle_Name').val(data.Cm[0].middlename)
                                  $('#Last_Name').val(data.Cm[0].lastname)                                    
                                  document.getElementById('StateCode').innerHTML = username;
                                  $('#Email').val(data.Cm[0].email);
                                  $('#PhoneNo').val(data.Cm[0].phNumber );
                                  $('#CDSUnit').val(data.Cm[0].cdsunit);
                                  $('#LGAUnit').val(data.Cm[0].lgaofservice);
                                  $('#institution').val(data.Cm[0].institution );
                                  $('#callup').val(data.Cm[0].callup );
                                  $('#ppa').val(data.Cm[0].ppa );
                                  $('#Age').val(data.Cm[0].Age );
                                  $('#stateoforigin').val(data.Cm[0].stateoforigin );
                                  $('#AboutME').val(data.Cm[0].aboutme );
                                  
                                    
                                 
                                   
                                  
                                    
                                  
                                    
                                  
                                    
                              
                                    
                                   
                            },
                            error:function(e){
                                console.log(e.responseText);
                            }

                        })

                    }




                    function Load_CM_Wall(statecode_local){
                        
                //$('#progress-bar-news').fadeIn(300);
                            $.ajax({
                type: "POST",
                url: pathtophp + "loadCMwall.php",  
                data:{"statecode":statecode_local,"data_skip_cmwall":data_skip_cmwall},
                dataType: "json",
                
                complete:function(){
                    
                       // initslider();
                },
               
                success: function (r) {
                   
                                       if (r.n){
                                        //skip_cmwall_return                   
                  
                     
                     // this if statement to check if the wall page is be
                    
                
                       document.getElementById("ii").innerHTML = statecode_local;
                    Load_CM_Wall_call(r.n); 
                       
                      
                
                    
                     //$('#progress-bar-news').fadeOut(300);
                     data_skip_cmwall = parseInt(r.skip_cmwall_return) + 10;
                                       }
                    else{



                  //      newspageend = true;
                    //    $('#thatsall-id').fadeIn(500);
                      //  $('#progress-bar-news').fadeOut(300);
                        //  ons.notification.alert("No more data to load");
                    }
                     




                },
                    error: function(e){
                            ons.notification.alert("errr of type "+ e);
                            console.log(e);
                        
                    }
                            })



}       // end of Load Cm Wall







                


/* this is the end of Scroll Event  function *************************


            *********************************************************
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *        this is the end of Scroll Event function       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *********************************************************






*/





   function ScrollLoadmore () {
        //    console.log("called ")
       $('#thatsall-id').fadeOut(500);
       var maxScroll = parseInt((($(this)[0].scrollHeight - $(this).height()) - 100));
        var curScroll = parseInt(($(this)[0].scrollTop));
       
              //       console.log(" maximum heigth of div whether showing or not $(this)[0].scrollHeight  = "+ $(this)[0].scrollHeight)
                //     console.log(" this is the height of the div that we are measuring  $(this).height()  = "+$(this).height())
                 //    console.log("$(this)[0].scrollTop  = " + $(this)[0].scrollTop);
                   
        //are we at the bottom?
               
                // console.log("max = " + maxScroll + " cur = " + curScroll);
                // console.log(" maxScroll <= curScroll" );
                // console.log(maxScroll < curScroll);
        if (maxScroll < curScroll) {
                if(pageshowing == "newspage"){
                    if(newspageend == false){
                        LoadallState();
                       // $(this)[0].scrollTop = $(this)[0].scrollHeight - $(this).height();
                        scrollevent.cancel();
                       //  console.log('rock botttom ');
                }
                }
               
                    
         
         
              

  //console.log("$(this)[0].scrollTop =  $(this)[0].scrollHeight - $(this).height()   = " + ($(this)[0].scrollHeight - $(this).height()))
                       
            // if we are on yearbook page and at the bottom then load more or if we are on the Mystate Page and at the bottom load more for each page respectivly
         


           

        }
    }               

 scrollevent =_.debounce(ScrollLoadmore,500);


     










 function checksesssion(){
    
  
                  var poolData = {
                     UserPoolId: user_pool_id,
                     ClientId: Client_Id
                 };

                 var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
         
             if(err){
                 
                
                if (err.code == "NetworkingError") {
                 
                    ons.notification.alert("Check your internet Connection");
                    return;
                }
                else{
                    ons.notification.alert("your error is  " + err.message);
                    console.log(JSON.stringify(err,null,3));
                    return;
                }
             }
            
             StateCode = cognitoUser.username;
            Loaduserdata(cognitoUser.username);
            LoadallState();
            Checker(cognitoUser.username)
     
            // NOTE: getSession must be called to authenticate user before calling getUserAttributes
            cognitoUser.getUserAttributes(function(err, attributes) {
                if (err) {
                    // Handle error
                } else {
                   
                    // Do something with attributes
                }
            });
            
          
                         AWS.config.region = 'us-east-1';


            //let loginsCognitoKey = "cognito-idp.us-west-2.amazonaws.com/us-west-2_TLjDm1fS9";


                         AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                             RoleArn: "arn:aws:iam::226813198723:role/nyscapp_auth_MOBILEHUB_1454067712",
                             IdentityPoolId: 'us-east-1:6527ed6d-4483-4f36-a638-a24c98cfcd2e', // your identity pool id here
                             Logins: {
                                 // Change the key below according to the specific region your user pool is in.
                                 'cognito-idp.us-east-1.amazonaws.com/us-east-1_NNYGO9I8N': session.getIdToken().getJwtToken()
                             }
                         });

              AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                    //example: var s3 = new AWS.S3();
                    
                    BucketName = 'nyscapp-userfiles-mobilehub-1454067712';
                    var bucketRegion = 'us-east-1';
                    var IdentityPoolId = 'us-east-1:6527ed6d-4483-4f36-a638-a24c98cfcd2e';


                    s3 = new AWS.S3({
                        apiVersion: '2006-03-01',
                        params: { Bucket: BucketName }
                    });
                  



                     console.log('Successfully logged!');
                }
            });

                         var params = {
                             RoleArn: "arn:aws:iam::226813198723:role/nyscapp_auth_MOBILEHUB_1454067712",

                             RoleSessionName: 'Corpers_session',

                             DurationSeconds: 3600,

                         };




                         var sts = new AWS.STS();
                         sts.assumeRole(params, function (err, data) {
                             if (err) {
                                 console.log(err)
                             } else {
                                 console.log("sts assumed " + data)
                             };



                         });


          document.querySelector('#myNavigator').pushPage('main.html');
 
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();

        });
    }

   
}









     function LoadCM(data) {
         
                           
          //     var t = data[i].imagecount;
           //var i =  data[i].vidcount;
        
         
    
            
        
            data.forEach(function(cm) {
                      
                    
            var html = '<div id="news-number">'+
    	            '<div class="date_div_container">'+

						'<span class="date_of_new">'+convdate(cm.postedtime)+'</span>'+
                    '</div>';
                    if ((cm.imagecount > 0) || (cm.vidcount > 0)){
                    html +=        '<div class="swiper-container">'+
                                            '<div class="swiper-scrollbar"></div>'+
                                  
                                                 '<div class="swiper-wrapper">';
                    
                     for(var i = 1; i <= cm.imagecount; i++){
                          
                            var key = 'img_'+i;
  

                      html +=                        '<div class="swiper-slide">'+
                                                         '<div class="swiper-zoom-container">'+
                                                            '<img class="imageclass" src="'+cm[key]+'" >'+
                                                         '</div>'+
                                                     ' </div>'
            
                                    
                                    //cm.key
 

                                
                        }
                                 for(var i = 1; i <= cm.vidcount; i++){
                          
                            var key = 'vid_'+i;
  

                      html +=                            '<div class="swiper-slide">'+
                                                                 '<video controls class="video_event_display">'+
                                                                      '<source src="'+cm[key]+'" type="video/mp4">'
                                                                    '  <source src="'+cm[key]+'" type="video/ogg">'

                                                                 '</video>'+
         
        
                                                 ' </div>'
            
                                    
                                    //cm.key



                                
                        }
				html +=	 '</div>' + '</div>'+'</div>'
      
    
                                
            	
			
     		}
            
            
            
       
				html +=	'<h2 class="news-number-title">'+cm.title+'</h2>'+
					'<div class="news-text">'+

						'<div>'+ cm.text +'</div>'+
					
                    '<div class="postedby"> Posted by: ' +
                        cm.name+
                    '</div>'+
				
				'</div>'
                      
                
                       
                     //   foreach(i in cm.vidcount){
                            
                     //   }*/
                     $('#container-id').append(html);


            }, this);
             
             swipernewspage = new Swiper('.swiper-container', {
                 zoom: true,
                 spaceBetween: 10,
                 breakpoints: {
                     // when window width is <= 320px
                     320: {
                         slidesPerView: 1,
                         spaceBetween: 10
                     },
                     // when window width is <= 480px
                     480: {
                         slidesPerView: 1,
                         spaceBetween: 20
                     },
                     // when window width is <= 640px
                     640: {
                         slidesPerView: 1,
                         spaceBetween: 30
                     }
                 },
     
     
    });
         
     }                    





     function Load_CM_Wall_call(data) {
        
                          
         //     var t = data[i].imagecount;
          //var i =  data[i].vidcount;
       
          var html ="";
         
           data.forEach(function(cm) {
                     console.log(cm.postedtime);
                 //  document.getElementById('Wall_containers_corpers_page').append('<div id="news-number">' + cm.postedtime+'</div>'); 
            html = '<div id="news-number">'+
                   '<div class="date_div_container">'+

                       '<span class="date_of_new">'+convdate(cm.postedtime)+'</span>'+
                   '</div>';
                   if ((cm.imagecount > 0) || (cm.vidcount > 0)){
                       html += '<div class="swiper-container_corpers">' +
                                           '<div class="swiper-scrollbar_corpers"></div>' +
                                 
                                                '<div class="swiper-wrapper">';
                   
                    for(var i = 1; i <= cm.imagecount; i++){
                         
                           var key = 'img_'+i;
 

                     html +=                        '<div class="swiper-slide">'+
                                                        '<div class="swiper-zoom-container">'+
                                                           '<img class="imageclass" src="'+cm[key]+'" >'+
                                                        '</div>'+
                                                    ' </div>'
           
                                   
                                   //cm.key


                               
                       }
                                for(var i = 1; i <= cm.vidcount; i++){
                         
                           var key = 'vid_'+i;
 

                     html +=                            '<div class="swiper-slide">'+
                                                                '<video controls class="video_event_display">'+
                                                                     '<source src="'+cm[key]+'" type="video/mp4">'
                                                                   '  <source src="'+cm[key]+'" type="video/ogg">'

                                                                '</video>'+
        
       
                                                ' </div>'
           
                                   
                                   //cm.key



                               
                       }
               html +=	 '</div>' + '</div>'+'</div>'
     
   
                               
               
           
            }
           
           
           
      
               html +=	'<h2 class="news-number-title">'+cm.title+'</h2>'+
                   '<div class="news-text">'+

                       '<div>'+ cm.text +'</div>'+
                   
                   '<div class="postedby"> Posted by: ' +
                       cm.name+
                   '</div>'+
               
               '</div>'
                     
               
                      
                    //   foreach(i in cm.vidcount){
                           
                    //   }*/
                    $('#Wall_containers_corpers_page').append(html);
                   
                     
                    

           }, this);
            
           swipercorperspage = new Swiper('.swiper-container_corpers', {
               zoom: true,
               spaceBetween: 10,
               centeredSlides: true,
               observer:true,
               breakpoints: {
                   // when window width is <= 320px
                   320: {
                       slidesPerView: 1,
                       spaceBetween: 10
                   },
                   // when window width is <= 480px
                   480: {
                       slidesPerView: 1,
                       spaceBetween: 20
                   },
                   // when window width is <= 640px
                   640: {
                       slidesPerView: 1,
                       spaceBetween: 20
                   }
               },
   
   });
        
    }       

            function convdate(date){
                var d = new Date(date);
                
              
                
                    var month = parseInt(d.getMonth()) + 1
                    var outtime = d.getDate() + "/"+ month + "/"+ d.getFullYear();
                    return outtime;
                
                
            }






            function Loginandchangepassword() {
                $('#signinspinnergetcode').fadeIn(400);
       
                //both password are not empty
              
               
                var stcode = document.getElementById("txtstatecode").value.trim();
                if((stcode)){

                    
                    
       
                        stcode = stcode.toUpperCase();
                    // the are the same 
                    
                     
       
                        var authenticationData = {
                            Username: stcode,
                            Password: "OldPassword"
                        };
       
                        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
                        var poolData = {
                            UserPoolId: user_pool_id,
                            ClientId: Client_Id
                        };
       
                        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                        var userData = {
                            Username: stcode,
                            Pool: userPool
                        };
       
                        cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
       
                        
                        cognitoUser.forgotPassword({
                            onSuccess: function (data) {                            
                            
                            $('#successmsg').fadeOut(200);
                            
                        },
                        
                            onFailure: function(err) {  
                             
                                if(err){
                                    
                                 
                                   if (err.code == "NetworkingError") {
                                    
                                       ons.notification.alert("Check your internet Connection");
                                       return;
                                   }
                                   else{
                                       ons.notification.alert("your error is  " + err.message);
                                       console.log(JSON.stringify(err,null,3));
                                       return;
                                   }
                                }
                            },
                            //Optional automatic callback
                            inputVerificationCode: function(data) {
                                var resetdialog = document.getElementById("Resetpass_dialog");

                                if (resetdialog) {
                                    resetdialog.show();
                                    document.getElementById("distination").innerHTML = "A verification code has been sent to "+ data.CodeDeliveryDetails.Destination;
                                    document.getElementById("btnchangetempPasswordCancel").addEventListener("click", function () { 
                                       
                                        document.getElementById("errormsg").innerHTML = "";
                                        document.getElementById("distination").innerHTML = "";
                                         document.getElementById("txtverificationcode").value = "";
                                         document.getElementById("txttempPassword").value= "";
                                       document.getElementById("txtConfirmtempPassword").value= "";
                                       $('#signinspinner-2').fadeOut(200);
                                       $('#successmsg').fadeOut(200);
                                       $('#errormsg').fadeOut(200);
                                       $('#signinspinnergetcode').fadeOut(400);
                                        resetdialog.hide();
                                    });
                                    document.getElementById("btnchangetempPasswordsubmit").addEventListener("click", function () {
                                        var verification_Code = document.getElementById("txtverificationcode").value.trim();
                                        var newpassword = document.getElementById("txttempPassword").value.trim();
                                        var ConfirmPassword = document.getElementById("txtConfirmtempPassword").value.trim();
                                        if ((newpassword) && (ConfirmPassword) && (verification_Code) && (newpassword.length > 7)) {
                                            if ((newpassword === ConfirmPassword) ) {
                                            
            
                                        cognitoUser.confirmPassword(verification_Code, newpassword, this);
                                        $('#successmsg').fadeIn();
                                        document.getElementById("errormsg").innerHTML = "";
                                        document.getElementById("distination").innerHTML = "";
                                         document.getElementById("txtverificationcode").value = "";
                                         document.getElementById("txttempPassword").value= "";
                                       document.getElementById("txtConfirmtempPassword").value= "";
                                       $('#signinspinner-2').fadeOut(200);
                                       $('#successmsg').fadeOut(200);
                                       $('#errormsg').fadeOut(200);
                                        resetdialog.hide();
                                        $('#signinspinnergetcode').fadeOut(400);
                                        document.querySelector('#myNavigator').pushPage('main.html');      
                                    }   
                                    else {
                                        document.getElementById("errormsg").innerHTML = "Passwords don't match";
                                       $('#errormsg').fadeIn(200);
                                       $('#signinspinner-2').fadeOut(200);
                                   }
                                    }
                                    else {
                                        document.getElementById("errormsg").innerHTML = "Passwords verification Code required. Passwords must be at least 8 Characters ";
                                       $('#signinspinner-2').fadeOut(200);
                                       $('#errormsg').fadeIn(200);
                                   }
                                      
                                    });
                                } else {
                                    ons.createDialog('Resetpassdialog.html')
                                        .then(function (resetdialog) {
                                            resetdialog.show();
                                            //the change password
           
                                     document.getElementById("distination").innerHTML = "A verification code has been sent to "+ data.CodeDeliveryDetails.Destination;           
           
                                     
                                     document.getElementById("btnchangetempPasswordCancel").addEventListener("click", function () { 
                                        
                                         document.getElementById("errormsg").innerHTML = "";
                                         document.getElementById("distination").innerHTML = "";
                                          document.getElementById("txtverificationcode").value = "";
                                          document.getElementById("txttempPassword").value= "";
                                        document.getElementById("txtConfirmtempPassword").value= "";
                                        $('#signinspinner-2').fadeOut(200);
                                        $('#successmsg').fadeOut(200);
                                        $('#errormsg').fadeOut(200);
                                        $('#signinspinnergetcode').fadeOut(400);
                                         resetdialog.hide();
                                     });
                                            document.getElementById("btnchangetempPasswordsubmit").addEventListener("click", function () {
                                              
                                                var verification_Code = document.getElementById("txtverificationcode").value.trim();
                                                var newpassword = document.getElementById("txttempPassword").value.trim();
                                                var ConfirmPassword = document.getElementById("txtConfirmtempPassword").value.trim();
                                                if ((newpassword) && (ConfirmPassword) && (verification_Code) && (newpassword.length > 7)) {
                                                    if ((newpassword === ConfirmPassword) ) {
                                                    
                    
                                                cognitoUser.confirmPassword(verification_Code, newpassword, this);
                                                $('#successmsg').fadeIn(200);
                                                $('#successmsg').fadeIn();
                                                document.getElementById("errormsg").innerHTML = "";
                                                document.getElementById("distination").innerHTML = "";
                                                 document.getElementById("txtverificationcode").value = "";
                                                 document.getElementById("txttempPassword").value= "";
                                               document.getElementById("txtConfirmtempPassword").value= "";
                                               $('#signinspinner-2').fadeOut(200);
                                               $('#successmsg').fadeOut(200);
                                               $('#errormsg').fadeOut(200);
                                               $('#signinspinnergetcode').fadeOut(400);
                                                resetdialog.hide();
                                                document.querySelector('#myNavigator').pushPage('main.html');      
                                            }   
                                            else {
                                                document.getElementById("errormsg").innerHTML = "Passwords don't match";
                                               $('#errormsg').fadeIn(200);
                                               $('#signinspinner-2').fadeOut(200);
                                           }
                                            }
                                            else {
                                                document.getElementById("errormsg").innerHTML = "Passwords verification Code required. Passwords must be at least 8 Characters ";
                                               $('#signinspinner-2').fadeOut(200);
                                               $('#errormsg').fadeIn(200);
                                           }
                                               
                                            });
                                        });
                                }
                                
                                
                               

                               
                              
                           

                            }
                         } )
                    



                     



                                   // $('#signinspinner').fadeOut(200);
                            
                                /*   
                                var bucket = new AWS.S3({ params: { Bucket: "newstest-userfiles-mobilehub-1607183395" } });
       
                   bucket.listObjects({}, function(err, resp){
                       if(err){
                           console.log(err);
                       }
                       else{
                           console.log(resp.Contents);
                       }
                   })
                
                 bucket.config.credentials.get(function() {
                      
         console.log("My Identity Id = : " + bucket.config.credentials.params.IdentityId); 
       
       
       
       
        // well user POOL ID IS NOT WORKING  WE WILL STICK WITH THE IDENTITY ID    //
        // console.log("my user pool id = : "+ bucket.config.credentials.params.UserPoolId);
           
       //});
                   var fileChooser = document.getElementById('fileid');
                   var file = fileChooser.files[0];
                    var userid = "";
              userid = bucket.config.credentials.params.IdentityId;
              
                   if (file) {
                         var fileName = file.name;
                         //us-west-2:ecb015c8-3a26-4150-bf91-df6d01fe4449 try puting in this
                       var params = { Key: "private/"+userid+"/"+fileName, ContentType: file.type, Body: file };
                       bucket.upload(params).on('httpUploadProgress', function (evt) {
                           console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
                       }).send(function (err, data) {
                           console.log("File uploaded successfully.");
                       });
                   }
       */
         
               
            }else{
                ons.notification.alert("Please Supply your State Code");
                $('#signinspinnergetcode').fadeOut(2000);
               
             
                
            }
                $('#signinspinnergetcode').fadeOut(1000);
       
            }
       
       
       
            // the is the code for loading the selected options year book 
            function LoadCm_selected_yearbook(statename,year,batch_local){
                $("#loading_progress_from__yearbook").fadeIn(200)
                $.ajax({
                    type:"POST",
                    url: pathtophp + "loadcmyearbook.php",
                    data:{"statename":statename,"year":year,"batch":batch,"data_skip_yearbook":data_skip_yearbook},
                    dataType:"json",

                    success:function(data){
                         console.log(data);
                         if(data.cm){
                            if(pageshowing == "ViewMoreoptionspage"){//this is entered when we are coming from viewmoreoptionpage ie a fresh request to load a new set hence we make free to empty and skip to 0 
                                document.getElementById("State_name").innerHTML = statename;
                                document.getElementById("Batch_name").innerHTML = batch;
                                document.getElementById("year-id").innerHTML = year;
                                 
                                document.getElementById('freewall').innerHTML = "";
                                
                                data_skip_yearbook = 0; 
                                document.querySelector('#myNavigator').popPage();
                            }else{
                                data_skip_yearbook = data.skip_num_yearbook + 20;
                                
                            }

                               
                             LoadCM_yearbook(data.cm)
                             
                         }else{
                            $("#loading_progress_from__yearbook").fadeOut(2000)
                            document.getElementById("message_from_s3").innerHTML = "Sorry No Data on the search";
                            $("#errormess_no_data_avail").fadeIn(1000);
                         }
                          
                           
                        
                       
                       //      document.querySelector('#myNavigator').pushPage('yearbook.html');   
                             
                    },
                    error:function(e){
                        $("#loading_progress_from__yearbook").fadeOut(2000)
                                               document.getElementById("message_from_s3").innerHTML = "Sorry No Data on the search";
                        $("#message_from_s3").fadeIn(300);
                        console.log(e);

                    }

                })
            }


            // the is the  code for loading Year book on show that is corps members own year book

            function LoadCmyearbook(statename,year,batch){
                $("#progress-id-yearbook").fadeIn(200)
                $.ajax({
                    type:"POST",
                    url: pathtophp + "loadcmyearbook.php",
                    data:{"statename":statename,"year":year,"batch":batch,"data_skip_yearbook":data_skip_yearbook},
                    dataType:"json",

                    success:function(data){
                            

                             data_skip_yearbook = data.skip_num_yearbook + 20;
                             LoadCM_yearbook(data.cm)
                          
                             
                    },
                    error:function(e){
                        console.log(e);

                    }

                })
            }

            function LoadCM_yearbook(data){
                
                var html="";
                data.forEach(function(element) {
                    
    			html +=			'<div   class="brick">'+
                            '<img src="'+element.profilepic + '" width="100%">'+
                            '<div class="info">'+                            
                            '<div class="list-item__title  border_bottom yearbook-items-list">Name :<span class="list-item__subtitle yearbook-items-values">' + element.firstname + " "+element.middlename + " " + element.lastname + '</span> </div>'+
                            '<div class="list-item__title border_bottom yearbook-items-list">State Code :<span class="list-item__subtitle yearbook-items-values">'+ element.name+'</span> </div>'+
                                '<div class="list-item__title border_bottom yearbook-items-list">Phone No :<span class="list-item__subtitle yearbook-items-values">'+element.phNumber +'</span> </div>'+
                                        '<div class="list-item__title border_bottom yearbook-items-list">Institution:<span class="list-item__subtitle yearbook-items-values">'+ element.institution+'</span> </div>'+
                                '<div class="list-item__title border_bottom yearbook-items-list">State of Origin :<span class="list-item__subtitle  yearbook-items-values">'+element.stateoforigin +'</span> </div>'+	
                                            '<div class="list-item__title border_bottom yearbook-items-list">Phone No :<span class="list-item__subtitle yearbook-items-values">'+ element.phNumber +'</span> </div>'+
                                            '<ons-button id="'+element.name+'" class="btn-viewwall">View Wall</ons-button>'+
                            '</div>'+
                        '</div>'



                }, this);

                 $("#freewall").append(html)    
                 $(".btn-viewwall").on("click",function(e){
                    
                                        data_skip_cmwall = 0;
                                        document.querySelector('#myNavigator').pushPage('corperwall.html');  
                                       
                                        cmstd_wall = e.target.id;
                                         
                    
                    
                    
                    
                    
                                     })
                 wall.fitWidth();
                 wall.refresh();
                 $("#loading_progress_from__yearbook").fadeOut(3000)
                 
                 $("#progress-id-yearbook").fadeOut(3000)
            }




         /* this is the end of camera options function *************************
         
         
                     *********************************************************
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *  this is the begining of camera options function      *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *********************************************************
         
         
         
         
         
         
         */

          
            function clearCache() {
                navigator.camera.cleanup();
            }


            function setOptions(srcType) {
                var options = {
                    quality: 80,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: srcType,
                    //  encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    allowEdit: true,
                    saveToPhotoAlbum: true,

                }
                return options;
            }

            function cameraError(error) {

                navigator.notification.confirm(
                                    'Sorry Gallery failed to start please try again', // message
                                     onConfirm,// callback to invoke with index of button pressed
                                    'Gallery failed',           // title
                                    ['OK']     // buttonLabels
                                 );



            }




            function Setimagetodisplay(imageURI) {



                //pictures.push(newfilepath);
                //navigator.notification.alert("new file path" + newfilepath);
                //window.FilePath.resolveNativePath(imageURI, function (newfilepath) {
                    //navigator.notification.alert("new file path" + newfilepath);

                  //  pictures.push(newfilepath);
                //}, function (error) { alert("FilePath.resolveNativePath" + error); });
    
   



                picture_index = pictures.length;
                swiperprofilepage.appendSlide('<div  class="swiper-slide"> <div class="swiper-container-upload"> <div class="picture_div_class"> <img  id="" class= "img_wall_pic" src="' + imageURI + '" width="100%"/></div><div class="picture_delete_btn_class" id="' + picture_index + '"> <button  class="  button--quiet">Delete</button>     </div></div></div>');
              


                pictures.push(imageURI);
                getFileEntry(imgUri);
                //picture_index += 1;
                  console.log(pictures);
             



                document.getElementById(picture_index).addEventListener("click", deleteimage_from_slide_and_array);
             
                //getFileEntry(imageURI);

            
                //  var image = document.getElementById('test-image');
                //image.src = imageURI; '<div class="swiper-slide">Slide 1"</div>',

                //    $("#test-image").attr('src', imageURI)
              



            }

            function getFileEntry(imgUri) {
                alert(imgUri);
                window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

                    // Do something with the FileEntry object, like write to it, upload it, etc.
                    // writeFile(fileEntry, imgUri);
                    console.log("got file: " + fileEntry.fullPath);
                    // displayFileData(fileEntry.nativeURL, "Native URL");

                }, function () {
                    alert(imgUri);
                    // If don't get the FileEntry (which may happen when testing
                    // on some emulators), copy to a new FileEntry.
                    createNewFileEntry(imgUri);
                });
            }


            function deleteimage_from_slide_and_array() {
                var deleted_id = this.id;

                console.log(deleted_id);
                
                
                
                    pictures.splice(this.id, 1);
                    //      picture_index -= 1;
                   
                   


                    $("." + this.id).fadeOut(800);
                    swiperprofilepage.removeSlide(this.id);
                   
                    
                    console.log(pictures);
                
                    var i = $(".picture_delete_btn_class");

                $.each(i, function (iis) {

                    console.log("iis " + iis);
                    console.log("deleted_id " + deleted_id);
                    console.log(i[iis].id)


                    if (deleted_id < i[iis].id)
                    {
                        console.log("changing iis " + iis)

                        $("#" + i[iis].id).attr('id', i[iis].id - 1);

                        console.log("changing ....");
                    }                  
                })
            }


            function openCamera(Camerachoice_local) {
               

                if (Camerachoice_local == "PHOTOLIBRARY") {
                    var srcType = Camera.PictureSourceType.PHOTOLIBRARY;

                    var options = setOptions(srcType);
                    navigator.camera.getPicture(Setimagetodisplay, cameraError, options);


                } else if (Camerachoice_local == "CAMERA") {

                    var srcType = Camera.PictureSourceType.CAMERA;                    
                    var options = setOptions(srcType);
                    navigator.camera.getPicture(Setimagetodisplay, cameraError, options);

                }


                //     $("#cameraoptionpop").popup("close");

            }





         /* this is the end of Logout function *************************
         
         
                     *********************************************************
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *        this is the begining of Logout function       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *                                                       *
                     *********************************************************
         
         
         
         
         
         
         */




            function Logout(){
                var poolData = {
                             UserPoolId: user_pool_id,
                             ClientId: Client_Id
                         };
        
                         var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
                
            var cognitoUser = userPool.getCurrentUser();
        
        if (cognitoUser != null) {
            document.querySelector('#myNavigator').pushPage('signin.html');
            window.location.reload(true);
            
            cognitoUser.signOut();

            
          }
         //  cognitoUser.globalSignOut();                        
    }
        










     }

     

/* this is the end of device ready function *************************


            *********************************************************
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *        this is the end of device ready function       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *                                                       *
            *********************************************************






*/















         

/*



     function LoadCM(err, data) {
        if (err) {
              console.log("Oops something went wrong " +JSON.stringify(err, undefined, 2));
        } else {
            // Print all the movies
                console.log(data);
          itemCount  = data.length;
        //    console.log("Oops something went wrong " +JSON.stringify(data, undefined, 2));
            
           console.log(itemCount);
                   infiniteList.refresh();
  infiniteList.delegate = {
    createItemContent: function(i) {
       var html = "";
       console.log(i);
         data.forEach(function(news){
          console.log(news);
               html =   '<div   class="brick">'+
		        '<img src="'+news.img_1+'" width="100%">'+
		       ' <div class="info">'+				
				'<div class="list-item__title  border_bottom">Name :<span class="list-item__subtitle">'+ +'</span> </div>'+
				'<div class="list-item__title border_bottom">State Code :<span class="list-item__subtitle">'+ +'</span> </div>'+		
					'<div class="list-item__title border_bottom">Phone No :<span class="list-item__subtitle">'+ +'</span> </div>'+		
							'<div class="list-item__title border_bottom">Institution:<span class="list-item__subtitle">'+ +'</span> </div>'+		
					'<div class="list-item__title border_bottom">State of Origin :<span class="list-item__subtitle">'+ +'</span> </div>'+		
								'<div class="list-item__title border_bottom">Email:<span class="list-item__subtitle">'+ news.text+'</span> </div>'+		
								'<ons-button id="'+ +'" class="btn-viewwall">View Wall</ons-button>'
		        '</div>'+
			'</div>'            
                  })
            return ons._util.createElement(
            
                    html
         )
     
    },
    countItems: function() {
     return itemCount;
    }
  }
 infiniteList.refresh();
          
          
        }
              
        
    }
                            
                        // end of LoadCM

*/





                        // end of Logout

/*


     function onScan(err, data) {
        if (err) {
              console.log("Oops something went wrong " +JSON.stringify(err, undefined, 2));
        } else {
            // Print all the movies
                
                itemCount  += parseInt(data.Count);
               
            
           console.log(itemCount);
                   infiniteList.refresh();
  infiniteList.delegate = {
    createItemContent: function(i) {
       var html = "";
         data.Items.forEach(function(news) {
                   

  
 
        

            
               html =   '<div class="Newfeed">' +
                        
                            '<div class="center">'+
                                    
                                '<div id="'+news.timeStamp+'">'+
                                    '<div class="date_div_container">'+

                                        '<span class="date_of_new">'+news.timeStamp+'</span>'+
                                    '</div>'+

                                '<div id="visualinfo">'+

                                    '<div class="visualinfo-inner">'+

                                        '<img src="'+ news.imagePath +'" id="newsimage" alt="">'+

                                    '</div>'+                  
                                
                                '</div>'+

                                '<h2 class="news-number-title">'+news.timeStamp +'</h2>'+
                                
                                '<div class="news-text">'+
                                
                                    '<div>'+ news.message +'</div>'+

                                '</div>'+
                                  '</br>'  +
                                  '</br>'+ 
                                    '</br>'  +
                                  '</br>'+ 
                            '</div>'+ 
                        
                        
                         '</div>'
                       
                  })
            return ons._util.createElement(
            
                    html
         )
     
    },
    countItems: function() {
      return itemCount;
    }
  }
 infiniteList.refresh();
                // Continue scanning if we have more movies (per scan 1MB limitation)
            console.log(newspage_LastEvaluated_key);
            console.log(typeof newspage_LastEvaluated_key);
             if (newspage_LastEvaluated_key) {
            console.log("Scanning for more...");
            newspage_LastEvaluated_key = data.LastEvaluatedKey 
            params.ExclusiveStartKey = newspage_LastEvaluated_key;
            docClient_new.scan(params, onScan);
        }
              
        }
    }

*/


     



     function ChangePassword() {
         $("#change_pass_signinspinner-2").fadeIn(400);
         var Current_password = document.getElementById("input_Current").value.trim();
         var Newpassword = document.getElementById("input_password").value.trim();
         var ConfirmPassword = document.getElementById("input_confrim_password").value.trim();
         //if all are not falsy.... 
         if ((Current_password) && (Newpassword) && (ConfirmPassword) && (ConfirmPassword.length > 7)) {

             //check if 
             if (Newpassword === ConfirmPassword) {




                 document.getElementById("input_Current").value = "";
                 document.getElementById("input_password").value = "";
                 document.getElementById("input_confrim_password").value = "";

                 cognitoUser.changePassword(Current_password,Newpassword, function(err, result) {
        if (err) {
              ons.notification.alert(err);
              
                 $("#change_pass_signinspinner-2").fadeOut(400);
                 $('#change_pass_errormsg').fadeOut(100);
               
            return;
        }
             $('#change_pass_successmsg').fadeOut(200);
                 var dialog = document.getElementById('password_change_dialog');
                  dialog.hide();

                 $("#change_pass_signinspinner-2").fadeOut(400);
                 $('#change_pass_errormsg').fadeOut(100);
                 $('#change_pass_successmsg').fadeIn(200);
                setTimeout($("#saved_info_fields_toast").fadeOut(6000), 7000);
        
    });
            
                


             } else {

                 $("#change_pass_signinspinner-2").fadeOut(400);
                 $('#change_pass_errormsg').fadeIn(200);
                 $('#change_pass_successmsg').fadeOut(200);


             }



         } else {

             ons.notification.alert("Passwords required. At least 8 Characters");
             $('#change_pass_signinspinner-2').fadeOut(200);
             $('#change_pass_errormsg').fadeOut(200);

         }


     }




     function Setyear() {
         mainyear = new Date().getFullYear()
         document.getElementById("mainyear").innerHTML = mainyear;
         document.getElementById("mainyear_1").innerHTML = mainyear - 1;
         document.getElementById("mainyear_2").innerHTML = mainyear - 2;
         document.getElementById("mainyear_3").innerHTML = mainyear - 3;
         document.getElementById("mainyear_4").innerHTML = mainyear - 4;
     }



     function Checker(codenum){
        
        //  document.getElementById("loaderId").style.display = "block";
            
                var firstslash =  codenum.indexOf("/");
                var secondslash =  codenum.lastIndexOf("/");
                batch = codenum.substring(secondslash - 1, secondslash).trim();
                var year = codenum.substring(firstslash+1,secondslash-1).trim();
                var statename = codenum.substring(0,firstslash).toUpperCase().trim();
            
            
                fullstatename = checkState(statename);		
                yearofservice = yearchecker(year);
            
              
            
              
            
     }             


	function yearchecker(year){
		var fullyear = "0";
		if (year.length == 1){
				fullyear =	"200"+year;
			}
			else if(year.length == 2){
				fullyear =	"20"+year;	
			}else if(year.length == 3){
				fullyear =	"2"+year;	
			}else if(year.length >= 4){
				fullyear = year;	
			}
			return fullyear;
	}
	
	
	
     function checkState(stateinitials) {
        stateinitials.toUpperCase()
        
if (stateinitials=="AB"){
    return "Abia";
}
else if(stateinitials=="AD"){ 
        return "Adamawa";
}
else if(stateinitials=="AK"){ 
    return "Akwa_Ibom";	
}
else if(stateinitials=="AN"){ 
    return "Anambra";	
}
else if(stateinitials=="BAU"){ 
    return "Bauchi";	
}
else if(stateinitials=="BY"){ 
    return "Bayelsa";	
}
else if(stateinitials=="BUE"){ 
    return "Benue";	
}
else if(stateinitials=="BO"){ 
    return "Borno";	
}else if(stateinitials=="CR"){ 
    return "Cross_River";	
}else if(stateinitials=="DT"){ 
    return "Delta";	
}
else if(stateinitials=="EB"){ 
    return "Ebonyi";	
}else if(stateinitials=="ED"){ 
    return "Edo";	
}else if(stateinitials=="EK"){ 
    return "Ekiti";	
}
else if(stateinitials=="EN"){ 
    return "Enugu";	
}else if(stateinitials=="FCT"){ 
    return "FCT";	
}else if(stateinitials=="GM"){ 
    return "Gombe";	
}else if(stateinitials=="IM"){ 
    return "Imo";	
}else if(stateinitials=="JG"){ 
    return "Jigawa";	
}else if(stateinitials=="KD"){ 
    return "Kaduna";	
}
else if(stateinitials=="KN"){ 
    return "Kano";	
}
else if(stateinitials=="KT"){ 
    return "Katsina";	
}
else if(stateinitials=="KB"){ 
    return "Kebbi";	
}
else if(stateinitials=="KG"){ 
    return "Kogi";	
}
else if(stateinitials=="KW"){ 
    return "Kwara";	
}
else if(stateinitials=="LA"){ 
    return "Lagos";	
}
else if(stateinitials=="NS"){ 
    return "Nasarawa";	
}
else if(stateinitials=="NG"){ 
    return "Niger";	
}
else if(stateinitials=="OG"){ 
    return "Ogun";	
}else if(stateinitials=="OD"){ 
    return "Ondo";	
}else if(stateinitials=="OS"){ 
    return "Osun";	
}
else if(stateinitials=="OY"){ 
    return "Oyo";	
}
else if(stateinitials=="PL"){ 
    return "Plateau";	
}
else if(stateinitials=="RV"){ 
    return "Rivers";	
}
else if(stateinitials=="SO"){ 
    return "Sokoto";	
}
else if(stateinitials=="TR"){ 
    return "Taraba";	
}else if(stateinitials=="YB"){ 
    return "Yobe";	
}
else if(stateinitials=="ZM"){ 
    return "Zamfara";	
}
else {
    return "null";
}

}





     $("#txttempPassword").on("keyup", function () {
         $('#signinspinner').fadeOut(200);
         $('#errormsg').fadeOut(200);
         $('#successmsg').fadeOut(200);

     });
     $("#txtConfirmtempPassword").on("keyup", function () {

         $('#signinspinner').fadeOut(200);
         $('#errormsg').fadeOut(200);
         $('#successmsg').fadeOut(200);

     });

     // the change password for profile page

     $("#input_password").on("keyup", function () {
         $('#change_pass_signinspinner-2').fadeOut(200);
         $('#change_pass_errormsg').fadeOut(200);
         $('#change_pass_successmsg').fadeOut(200);

     });



     $("#input_Current").on("keyup", function () {
         $('#change_pass_signinspinner-2').fadeOut(200);
         $('#change_pass_successmsg').fadeOut(200);

     });


     $("#input_confrim_password").on("keyup", function () {

         $('#change_pass_signinspinner-2').fadeOut(200);
         $('#change_pass_errormsg').fadeOut(200);
         $('#change_pass_successmsg').fadeOut(200);

     });





     







         function uploadPhoto(path,filename) {
          //   var ft = new FileTransfer();

             bucket = new AWS.S3();
             var defs = [];

                
          //   $("#animateloading").fadeIn(1000);
     //animatecomplete
     //animateloading
           
            
              bucket = new AWS.S3({ params: { Bucket: "newstest-userfiles-mobilehub-1607183395" } });

             pictures.forEach(function (i) {
                 navigator.notification.alert('processing ' + i);
             
                 var def = $.Deferred();


                 var params = { Key: path + i, ContentType: file.type, Body: file };
             bucket.upload(params).on('httpUploadProgress', function (evt) {
                 console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + '%');
             }).send(function (err, data) {
                 if (err) {
                     console.log("File uploaded failed." + i);
                     def.resolve(0);
                     
                 } else {

                 
                 console.log("File uploaded successfully." + i);
                 def.resolve(1);
                 
                 }
                 clearCache();
             });
             defs.push(def.promise());
                
                 /*     function win(r) {
                         console.log("thing done");
                         if ($.trim(r.response) === "0") {
                             console.log("this one failed");
                             clearCache();
                           
                         } else {
                             console.log("this one passed");
                           
                         }
                     }
                     function fail(error) {
                         console.log("upload error source " + error.source);
                         console.log("upload error target " + error.target);
                         clearCache();
                         def.resolve(0);
                     }
                     var uri = encodeURI(pathtophp);
                     var options = new FileUploadOptions();
                     options.fileKey = "file";
                     options.fileName = profilePic;
                     options.mimeType = "image/jpeg";
                     var ft = new FileTransfer();
                     ft.upload(path, uri, win, fail, options);
                   */


                 });
                 $.when.apply($, defs).then(function () {
                     console.log("all things done");
                     console.dir(arguments);
                 });



/*


                 newfilepath = newfilepath.replace("file:///", "/");
                 
      


                
            
                       

                 var win = function win(response) {
                     var fullstatename = userState.replace("-", "_");
                     var profilePic = "NYSCYEARBOOK_BONZER_" + PictimeStamp + ".jpg";
                   
                     var profilepicpath = "resources/CM/" + fullstatename + "/" + useryear + "/Batch_" + userbatch + "/" + userfourdigitcode + "/images/thumbnail/" + profilePic;
                    
                    
                    
                    SavePicToDB(profilepicpath, usertable, usercode);

                    

                 }

                 var fail = function fail(error) {

                     navigator.notification.confirm(
                                            'Upload failed please try again', // message
                                             onConfirm,// callback to invoke with index of button pressed
                                            'Upload failed',           // title
                                            ['OK']     // buttonLabels
                                         );                

                     $("#animateloading").fadeOut(800);
                    
                    

                 }


               
         
                 var fullstatename = userState.replace("-", "_");
                 //    displayImage(imageURI);
                 var profilePic = "NYSCYEARBOOK_BONZER_" + PictimeStamp + ".jpg";
                 
                 var profilepicpath = "resources/CM/" + fullstatename + "/" + useryear + "/Batch_" + userbatch + "/" + userfourdigitcode + "/images/thumbnail/" + profilePic;
                           
                 var params = new Object();

                 params.profilepicpath = profilepicpath;
                 params.userbatch = userbatch;
                 params.userfourdigitcode = userfourdigitcode;
                 params.useryear = useryear;
                 params.fullstatename = fullstatename;
                 params.table = usertable;
                 params.usercode = usercode;



                 

                 var options = new FileUploadOptions();
                 options.fileKey = "file";
                 options.fileName = "Profilepic.jpg";
                 options.mimeType = "image/jpeg";
                 options.httpMethod = "POST";
                 options.params = params;
                
                 options.chunkedMode = false;
               //  options.headers = { Connection: "close" };
                
                 ft.upload(newfilepath, "http://127.0.0.1:5500/upload2.php", win, fail, options);
                 // ft.upload(imageURI, hostposition + "upload.php", win, fail, options);


*/


             
         }











      

     
 })();