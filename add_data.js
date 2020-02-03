// JavaScript Document
function add_modal(){
  $('#addModal').modal('toggle')
}





get_func('');

var json_data;
function get_func(url) {
　　　　document.getElementById('stream_list').style.display = 'none';
      fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var div = document.createElement('div');
        json_data = json;
        for (var i in json) {
            div.insertAdjacentHTML('afterbegin','<div class="card no-gutters card-animate animated fadeInUpBig"><div class="card-body no-gutters"><img class="no-gutters card-img-top" src="./efs/thumbnail/'+String(json[i][0])+'" onclick="modal_photo('+i+')"></div></div>');
            //document.getElementById('stream_list').innerHTML +='<div class="card no-gutters card-animate animated fadeInDownBig"><div class="card-body no-gutters"><img class="no-gutters card-img-top" src="./efs/thumbnail/'+String(json[i][0])+'" onclick="modal_photo('+i+')"></div></div>';
        }
        document.getElementById('stream_list').append(div);
      });
    }
 window.onload = function () {
        document.getElementById('stream_list').style.display = 'block';
 }
 
 function modal_photo(data){
  $('#mainModal').modal('toggle')
  document.getElementById('modal-photo').setAttribute("src","./efs/image/"+String(json_data[data][0]));
  document.getElementById('modal-photo').setAttribute("name",String(json_data[data][0]));
     
  document.getElementById('change_title_text').value = json_data[data][2];
  if(json_data[data][3] == "true")document.getElementById('change_building').checked=true;
  if(json_data[data][4] == "true")document.getElementById('change_sky').checked=true;
  if(json_data[data][5] == "true")document.getElementById('change_night_sky').checked=true;
  if(json_data[data][6] == "true")document.getElementById('change_art').checked=true;
  if(json_data[data][7] == "true")document.getElementById('change_food').checked=true;
  if(json_data[data][8] == "true")document.getElementById('change_spring').checked=true;
  if(json_data[data][9] == "true")document.getElementById('change_summer').checked=true;
  if(json_data[data][10] == "true")document.getElementById('change_autumn').checked=true;
  if(json_data[data][11] == "true")document.getElementById('change_winter').checked=true; 

}






$('.custom-file-input').on('change', handleFileSelect);
function handleFileSelect(evt) {
        $('#preview').remove();// 繰り返し実行時の処理
        $(this).parents('.input-group').after('<div id="preview"></div>');

    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {

        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                if (theFile.type.match('image.*')) {
                    var $html = ['<div class="d-inline-block mr-1 mt-1"><img class="img-thumbnail" src="', e.target.result,'" title="', escape(theFile.name), '/><div class="small text-muted text-center">', escape(theFile.name),'</div></div>'].join('');// 画像では画像のプレビューとファイル名の表示
                } else {
                    var $html = ['<div class="d-inline-block mr-1"><span class="small">', escape(theFile.name),'</span></div>'].join('');//画像以外はファイル名のみの表示
                }

                $('#preview').append($html);
            };
        })(f);

        reader.readAsDataURL(f);
    }
    $(this).next('.custom-file-label').html(+ files.length + '個のファイルを選択しました');
}

//ファイルの取消
$('.reset').click(function(){
    $(this).parent().prev().children('.custom-file-label').html('ファイル選択...');
    $('#preview').remove();
    $('.custom-file-input').val('');
})


function add_func(url) {
      // Postで送るパラメータを作成
      var formData = new FormData();
      var image_name = document.getElementById('cutomfile').files[0].name;
      formData.append('image', document.getElementById('cutomfile').files[0]);
      formData.append('image_name',image_name);
      formData.append('title', document.getElementById('add_title_text').value);
      formData.append('building', document.getElementById('add_building').checked);
      formData.append('sky', document.getElementById('add_sky').checked);
      formData.append('night_sky', document.getElementById('add_night_sky').checked);
      formData.append('art', document.getElementById('add_art').checked);
      formData.append('food', document.getElementById('add_food').checked);
      formData.append('spring', document.getElementById('add_spring').checked);
      formData.append('summer', document.getElementById('add_summer').checked);
      formData.append('autumn', document.getElementById('add_autumn').checked);
      formData.append('winter', document.getElementById('add_winter').checked); 
      fetch(url, {
        method: 'POST',  // methodを指定しないとGETになる
        enctype:"multipart/form-data",
        body: formData  // Postで送るパラメータを指定
      })
    }

function data_delete(url) {
      // Postで送るパラメータを作成
      var formData = new FormData();
      var image_name = String(document.getElementById('modal-photo').name);
      console.log(image_name)
      formData.append('image_name',image_name);
      fetch(url, {
        method: 'POST',  // methodを指定しないとGETになる
        enctype:"multipart/form-data",
        body: formData  // Postで送るパラメータを指定
      }).then(function() {
          location.reload();
        })
    }

function data_modify(url) {
      // Postで送るパラメータを作成
      var formData = new FormData();
      var image_name = String(document.getElementById('modal-photo').name);
      formData.append('image_name',image_name);
      formData.append('title', document.getElementById('change_title_text').value);
      formData.append('building', document.getElementById('change_building').checked);
      formData.append('sky', document.getElementById('change_sky').checked);
      formData.append('night_sky', document.getElementById('change_night_sky').checked);
      formData.append('art', document.getElementById('change_art').checked);
      formData.append('food', document.getElementById('change_food').checked);
      formData.append('spring', document.getElementById('change_spring').checked);
      formData.append('summer', document.getElementById('change_summer').checked);
      formData.append('autumn', document.getElementById('change_autumn').checked);
      formData.append('winter', document.getElementById('change_winter').checked); 
      fetch(url, {
        method: 'POST',  // methodを指定しないとGETになる
        enctype:"multipart/form-data",
        body: formData  // Postで送るパラメータを指定
      }).then(function() {
          location.reload();
        })
    }

