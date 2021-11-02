/*
 * @Date: 2021-11-02 16:49:52
 * @LastEditors: tortorse
 * @LastEditTime: 2021-11-02 17:28:27
 * @FilePath: \web-samples\xml-parse\index.js
 */
const xml = `<resources>
<string name="meeting">开会吧</string>
<string name="login_or_register">登录/注册</string>
<string name="other_way_login">其他登录方式</string>
<string name="account_password_login">账号密码登录</string>
<string name="use_verify_code_login">使用验证码登录</string>
<string name="phone_number">手机号码</string>
<string name="please_input_phone_number">请输入手机号码</string>
<string name="password">密码</string>
<string name="please_input_password">请输入密码</string>
<string name="forget_password">忘记密码？</string>
<string name="new_user_register">新用户注册</string>
<string name="login">登录</string>
<string name="register">注册</string>
<string name="remember_pwd">记住密码</string>
<string name="verify_code_login">验证码登录</string>
<string name="use_password_login">使用账号密码登录</string>
<string name="verify_code">验证码</string>
<string name="please_input_verify_code">请输入验证码</string>
<string name="get_verify_code">获取验证码</string>
<string name="retry_get_code">重新获取</string>

<string name="join_room">加入会议</string>
<string name="quick_meeting">快速会议</string>
<string name="schedule_meeting">预定会议</string>
<string name="history_meeting">历史会议</string>
<string name="waiting_for_start">待开始</string>
<string name="meeting_going_on">进行中</string>
<string name="meeting_ended">已结束</string>

<string name="meeting_number">会议号</string>
<string name="please_input_meeting_number">请输入会议号</string>
<string name="your_name">您的姓名</string>
<string name="please_input_your_name">请输入您的名字</string>
<string name="join_options">入会选项</string>
<string name="open_microphone">开启麦克风</string>
<string name="open_speaker">开启扬声器</string>
<string name="open_camera">开启摄像头</string>
<string name="open_beauty">开启美颜</string>
<string name="beauty_setting">美颜设置</string>
<string name="click_to_set">点击设置</string>
<string name="delete_all">清空全部</string>
<string name="delete">删除</string>

<string name="done">完成</string>
<string name="cancel">取消</string>
<string name="use_personal_meeting_number">使用个人会议号</string>
<string name="use_password_opened">当前会议已开启密码</string>
<string name="change_personal_meeting_set">修改个人会议号设置</string>
<string name="pmi_setting">个人会议号设置</string>
<string name="change_pmi">更换会议号</string>

<string name="entering">正在进入会议</string>
<string name="finish">结束</string>
<string name="silent">静音</string>
<string name="cancel_silent">解除静音</string>
<string name="open_camera_live">开启视频</string>
<string name="close_camera_live">停止视频</string>
<string name="screen_share">共享屏幕</string>
<string name="stop_screen_share">停止共享</string>
<string name="manage_members">管理成员</string>
<string name="more">更多</string>
<string name="whiteboard_share">共享白板</string>
<string name="host">主持人</string>
<string name="invite_url">邀请链接</string>
<string name="send">发送</string>
<string name="chat">聊天</string>
<string name="red_bag">红包</string>
<string name="vote">投票</string>
<string name="beauty">美颜</string>
<string name="disconnect_voice">断开音频</string>
<string name="cloud_record">云录制</string>
<string name="setting">设置</string>
<string name="album">相册</string>
<string name="photo">拍摄</string>

<string name="search_member">搜索成员</string>
<string name="silent_all">全体静音</string>
<string name="silent_all_cancel">解除全体静音</string>
<string name="invite">邀请</string>

<string name="manage">管理</string>
<string name="hint_meeting_name_num_creator">会议名称、会议号、发起人</string>
<string name="check_avatar">查看头像</string>
<string name="change_name">改名</string>
<string name="change_name_space">修改名称</string>
<string name="kick_out">移出会议</string>
<string name="title_silent_all">所有以及新加入的成员将被静音</string>
<string name="allow_member_cancel_silent">允许成员自我解除静音</string>
<string name="cancel_silent_all">全体解除静音</string>
<string name="host_hope_you_to_cancel_silent">主持人希望您解除静音</string>
<string name="keep_silent">保持静音</string>
<string name="you_have_been_kicked_out">您已被主持人移出会议</string>
<string name="I_know">知道了</string>
<string name="tips_leave_host">如果您不想结束会议，\n请在离开会议前指定新的主持人。</string>
<string name="tips_leave">您确定离开会议吗？</string>
<string name="leave_meeting">离开会议</string>
<string name="finish_meeting">结束会议</string>
<string name="meeting_has_been_finished">会议已结束</string>

<string name="start_time">开始时间</string>
<string name="end_time">结束时间</string>
<string name="meeting_repeat">周期性会议</string>
<string name="repeat_interval">重复频率</string>
<string name="end_repeat">结束重复</string>
<string name="timezone">时区</string>
<string name="calender">日历</string>
<string name="tips_calender">开启后将收到系统日历提醒</string>
<string name="num_limit">会议人数上限</string>
<string name="meeting_password">会议密码</string>
<string name="hint_meeting_password">请输入4–6位密码</string>
<string name="document">文档</string>
<string name="allow_member_upload_doc">允许成员上传文档</string>
<string name="front_step">上一步</string>
<string name="confirm">确认</string>
<string name="next_step">下一步</string>
<string name="every_day">每天</string>
<string name="time_zone_beijing">（GMT+08:00）中国标准时间-北京</string>
<string name="mem_300">300人</string>

<string name="safety_setting">安全设置</string>
<string name="locking_meeting">锁定会议</string>
<string name="open_waiting_room">开启等候室</string>
<string name="join_permission">参会者权限</string>
<string name="start_share">发起共享</string>
<string name="im_freedom">自由聊天</string>
<string name="record_setting">录制设置</string>
<string name="only_host_cam_record">仅主持人可录制</string>
<string name="meeting_setting">会议设置</string>
<string name="be_silent_when_joining">成员入会时静音</string>
<string name="opened_when_more_than_6">超过6人后自动开启</string>
<string name="allow_members_cancel_silent">允许成员自我解除静音</string>
<string name="play_sound_when_join">成员进入时播放提示音</string>
<string name="open_screen_watermark">开启屏幕水印</string>
<string name="personal_setting">个人设置</string>
<string name="account_info">账户信息</string>
<string name="show_join_duration">显示参会时长</string>
<string name="open_mic_window_float">开启麦克风浮窗</string>
<string name="open_barrage">显示弹幕</string>
<string name="notice_for_new_msg">新聊天消息提醒</string>
<string name="voice_award">语音激励</string>
<string name="no_meeting">暂无会议</string>
<string name="open_mirror">视频镜像效果</string>
<string name="open">开启</string>
<string name="close">关闭</string>
<string name="trans_host">转让主持人</string>
<string name="pmi">个人会议号</string>

<string name="meeting_detail">会议详情</string>
<string name="meeting_qrcode">会议二维码</string>
<string name="enter_meeting">进入会议</string>
<string name="join_password">入会密码</string>
<string name="hint_join_password">请输入密码</string>
<string name="join">加入</string>

<string name="logout">退出登录</string>
</resources>`;

const domParser = new DOMParser();

const xmlDocument = domParser.parseFromString(xml, "text/xml");

let localeMap = [];

const xmlStringTags = xmlDocument.querySelectorAll("string");

xmlStringTags.forEach(tag => {
  const name = tag.getAttribute("name");
  const value = tag.textContent;
  localeMap.push({ name, value });
});


const localesWrapper = document.querySelector("#locales");
const table = document.createElement("table");
localeMap.forEach(locale => {
  const tr = document.createElement("tr");
  const name = document.createElement("td");
  const value = document.createElement("td");
  
  name.textContent = locale.name;
  value.textContent = locale.value;
  
  tr.appendChild(name);
  tr.appendChild(value);
  table.appendChild(tr);
});
localesWrapper.appendChild(table);
