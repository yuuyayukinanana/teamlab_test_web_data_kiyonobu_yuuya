get_func('');

var json_data;
var tag_data = { building:"false", sky:"false", night_sky:"false", art:"false", food:"false", spring:"false", summer:"false", autumn:"false", winter:"false"}
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
  document.getElementById('view_title_text').innerHTML = json_data[data][2];
  document.getElementById('view_modal_badge').innerHTML="";
  if(json_data[data][3] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_building" class="badge badge-secondary w-100">建物</span></li>';
  if(json_data[data][4] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_sky" class="badge badge-primary w-100">青空</span></li>';
  if(json_data[data][5] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_night_sky" class="badge badge-dark w-100">夜景</span></li>';
  if(json_data[data][6] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_art" class="badge badge-danger w-100" >アート</span></li>';
  if(json_data[data][7] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_food" class="badge badge-warning w-100">食べ物</span></li>';
  if(json_data[data][8] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_spring" class="badge badge-success w-100">春</span></li>';
  if(json_data[data][9] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_summer" class="badge badge-primary w-100">夏</span></li>';
  if(json_data[data][10] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_autumn" class="badge badge-danger w-100">秋</span></li>';
  if(json_data[data][11] == "true")document.getElementById('view_modal_badge').innerHTML+='<li class="nav-item active col-1"><span id="modal_winter" class="badge badge-info w-100">冬</span></li>';
}

function tag_change(data, result, next, judge, next_judge){
    tag_data[data] = judge;
    document.getElementById('nav_'+data).setAttribute("class","w-100 btn "+result);
    document.getElementById('nav_'+data).setAttribute("onClick","tag_change('"+data+"','"+next+"','"+result+"','"+next_judge+"','"+judge+"')");
    var formData = new FormData();
    formData.append('building',tag_data["building"]);
    formData.append('sky',tag_data["sky"]);
    formData.append('night_sky',tag_data["night_sky"]);
    formData.append('art',tag_data["art"]);
    formData.append('food',tag_data["food"]);
    formData.append('spring',tag_data["spring"]);
    formData.append('summer',tag_data["summer"]);
    formData.append('autumn',tag_data["autumn"]);
    formData.append('winter',tag_data["winter"]);
    fetch('', {
        method: 'POST',// methodを指定しないとGETになる
        body: formData  // Postで送るパラメータを指定
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        document.getElementById('stream_list').innerHTML="";
        var div = document.createElement('div');
        json_data = json;
        for (var i in json) {
            div.insertAdjacentHTML('afterbegin','<div class="card no-gutters card-animate animated fadeInUpBig"><div class="card-body no-gutters"><img class="no-gutters card-img-top" src="./efs/thumbnail/'+String(json[i][0])+'" onclick="modal_photo('+i+')"></div></div>');
            //document.getElementById('stream_list').innerHTML +='<div class="card no-gutters card-animate animated fadeInDownBig"><div class="card-body no-gutters"><img class="no-gutters card-img-top" src="./efs/thumbnail/'+String(json[i][0])+'" onclick="modal_photo('+i+')"></div></div>';
        }
        document.getElementById('stream_list').append(div);
      });


}
