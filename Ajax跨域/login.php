<?php
    header("Content-Type:text/html;charset=utf-8");
//    $username = $_GET['username'];
//    $password = $_GET['password'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    if ($username == "admin" && $password == "123456") {
        echo "登录成功";
    } else {
        echo "账号密码错误";
    }

?>
