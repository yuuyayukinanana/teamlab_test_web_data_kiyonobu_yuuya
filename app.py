from flask import Flask, jsonify, abort, make_response, render_template, request
from flask_cors import CORS
import json
import mysql.connector as mydb
import os
import glob
from PIL import Image
import base64


app = Flask(__name__)
CORS(app)

@app.route('/get', methods=['GET'])  # Getだけ受け付ける
def get():
    result = ""
    #sql接続
    conn = mydb.connect(
        host='',
        port='',
        user='',
        password='',
        database=''
    )
    #接続が途切れないようにする
    conn.ping(reconnect=True)
    print(conn.is_connected())

    cur = conn.cursor()
    # 全てのデータを取得
    cur.execute("select * from image_info")

    result = json.dumps(cur.fetchall())
    #sqlを閉じる
    cur.close()
    conn.close()
    #全データをレスポンス
    return result

@app.route('/post', methods=['POST'])  # Postだけ受け付ける
def post():
    img_data = request.files['image']
    img_name = request.form['image_name']
    title = request.form["title"]
    building = request.form["building"]
    sky = request.form["sky"]
    night_sky = request.form["night_sky"]
    art = request.form["art"]
    food = request.form["food"]
    spring = request.form["spring"]
    summer = request.form["summer"]
    autumn = request.form["autumn"]
    winter = request.form["winter"]

    img = Image.open(img_data)
    img_resize_thumbnail = img.resize((int(img.width *400/img.height), 400))
    img_resize_view = img.resize(size=(1920,int(img.height*1920/img.width)),resample=Image.LANCZOS )
    img_resize_thumbnail.save('./efs/thumbnail/'+img_name)
    img_resize_view.save('./efs/image/'+img_name)

    #sql接続
    conn = mydb.connect(
        host='',
        port='',
        user='',
        password='',
        database='',
    )
    #接続が途切れないようにする
    conn.ping(reconnect=True)
    print(conn.is_connected())


    cur = conn.cursor()

    sql = "insert into image_info(name,alt,title,building,sky,night_sky,art,food,spring,summer,autumn,winter) value ('"+img_name+"','"+img_name+"','"+title+"','"+building+"','"+sky+"','"+night_sky+"','"+art+"','"+food+"','"+spring+"','"+summer+"','"+autumn+"','"+winter+"');"
    cur.execute(sql)
    conn.commit()
    #sqlを閉じる
    return make_response("ok")
    cur.close()
    conn.close()


@app.route('/delete', methods=['post'])
def data_delete():
    img_name = request.form['image_name']
    print(img_name)
    #sql接続
    conn = mydb.connect(
        host='',
        port='',
        user='',
        password='',
        database='',
    )
    #接続が途切れないようにする
    conn.ping(reconnect=True)
    print(conn.is_connected())

    cur = conn.cursor()

    sql = "delete from image_info where name = '" +img_name+ "';"
    cur.execute(sql)
    conn.commit()

    #sqlを閉じる
    return make_response("ok")
    cur.close()
    conn.close()

@app.route('/modify', methods=['POST'])  # Postだけ受け付ける
def data_modify():
    img_name = request.form['image_name']
    title = request.form["title"]
    building = request.form["building"]
    sky = request.form["sky"]
    night_sky = request.form["night_sky"]
    art = request.form["art"]
    food = request.form["food"]
    spring = request.form["spring"]
    summer = request.form["summer"]
    autumn = request.form["autumn"]
    winter = request.form["winter"]
    print(img_name)

    #sql接続
    conn = mydb.connect(
        host='',
        port='',
        user='',
        password='',
        database='',
    )
    #接続が途切れないようにする
    conn.ping(reconnect=True)
    print(conn.is_connected())


    cur = conn.cursor()
    sql = "update image_info set title='"+title+"',building='"+building+"',sky='"+sky+"',night_sky='"+night_sky+"',art='"+art+"',food='"+food+"',spring='"+spring+"',summer='"+summer+"',autumn='"+autumn+"',winter='"+winter+"' where name ='"+img_name+"';"
    print(sql)
    cur.execute(sql)
    conn.commit()
    #sqlを閉じる
    return make_response("ok")
    cur.close()
    conn.close()

@app.route('/restream', methods=['POST'])
def restream():
    result = ""
    #sql接続
    sql_judge_data=""
    if request.form["building"] == "true":
        sql_judge_data += ' building = "true" '
    if request.form["sky"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' sky = "true" '
        else:
            sql_judge_data += ' or sky = "true" '
    if request.form["night_sky"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' night_sky = "true" '
        else:
            sql_judge_data += ' or night_sky = "true" '
    if request.form["art"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' art = "true" '
        else:
            sql_judge_data += ' or art = "true" '
    if request.form["food"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' food = "true" '
        else:
            sql_judge_data += ' or food = "true" '
    if request.form["spring"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' spring = "true" '
        else:
            sql_judge_data += ' or spring = "true" '
    if request.form["summer"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' summer = "true" '
        else:
            sql_judge_data += ' or summer = "true" '
    if request.form["autumn"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' autumn = "true" '
        else:
            sql_judge_data += ' or autumn = "true" '
    if request.form["winter"] == "true":
        if sql_judge_data =="":
            sql_judge_data += ' winter = "true" '
        else:
            sql_judge_data += ' or winter = "true" '

    conn = mydb.connect(
        host='',
        port='',
        user='',
        password='',
        database=''
    )
    #接続が途切れないようにする
    conn.ping(reconnect=True)
    print(conn.is_connected())
    sql = "select * from image_info"
    if not sql_judge_data == "":
        sql += " where "+sql_judge_data+";"
    else:
        sql += ";"
    print(sql)
    cur = conn.cursor()
    # 全てのデータを取得
    cur.execute(sql)

    result = json.dumps(cur.fetchall())
    #sqlを閉じる
    cur.close()
    conn.close()
    #全データをレスポンス
    return result

# 4000番ポートでWebサーバを起動する
if __name__ == '__main__':
    app.run(host='', port=, debug=True)
