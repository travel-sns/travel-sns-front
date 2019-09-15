import React from "react";
import { MdAccountCircle, MdLock } from "react-icons/md";
import classNames from "classnames/bind";
import styles from "./LoginPage.css";

const cx = classNames.bind(styles);

const LoginPagePresenter = () => {
  return (
    <div className={cx("Container")}>
      <div className={cx("BackgroundSlider")} />
      <div className={cx("MainFrame")}>
        <div className={cx("Title")}>
          <div className={cx("MainTitle")}>Untitled</div>
          <div className={cx("SubTitle")}>당신의 여행 앱</div>
        </div>
        <div className={cx("LoginFrame")}>
          <div className={cx("InputFrame")}>
            <MdAccountCircle className={cx("UserIcon")}></MdAccountCircle>
            <input type="text" className={cx("InputTag")} />
          </div>
          <div className={cx("InputFrame")}>
            <MdLock className={cx("PwIcon")}></MdLock>
            <input type="password" className={cx("InputTag")} />
          </div>
          <button className={cx("ActiveBtn")}>로그인</button>
          <button className={cx("ActiveBtn")}>회원가입</button>
          <div className={cx("BottomFrame")}>
            <div className={cx("SeeMore")}>내 계정 찾기</div>
            <div className={cx("SeeMore")}>서비스 약관</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPagePresenter;
