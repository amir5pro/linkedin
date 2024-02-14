import "./Home.css";
import NavbarHome from "./NavbarHome";
import image from "../../assets/home.svg";
import { Button, Form, Input } from "antd";
import GoogleButton from "react-google-button";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth,provider } from "../../firebase/config";
import { login } from "../../redux/userSlice";
import { toast } from "react-toastify";
import { Spin } from "antd"; 
import {useState} from "react"
import { signInWithRedirect,signInWithEmailAndPassword  } from "firebase/auth";



function Home() {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  if (userInfo) { 
    return <Navigate to="/feed/main" />;
  }
  const onFinish = (values) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success(<p>successfully signed in</p>);
        return user;
      })
      .then((user) => {
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoading(false)
        toast.error(<p>{errorCode}</p>);
      });
 
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  
  const withGoogle =  () => {
    signInWithRedirect(auth, provider);
    
  
  }


  
  

  if (loading) {
    return (
      <div className="loading_container">
        <Spin size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="inner_home">
        <NavbarHome />
        <div className="landing">
          <div className="home_info">
            <h1>Find jobs through your community</h1>
            <div className="form">
              <Form
                name="basic"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input className="form_input" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password className="form_input" />
                </Form.Item>

                <Form.Item>
                  <h2 className="forget">Forget password?</h2>
                  <Button
                    className="signIn_button"
                    type="primary"
                    htmlType="submit"
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
              <div className="line_container">
                <div className="line"></div>
                <div className="text">or</div>
                <div className="line"></div>
              </div>
              <GoogleButton onClick={()=>withGoogle()} className="signIn_google" />
              <button className="join">
                <NavLink className="join_now" to="/signup">
                  New to LinkedIn? Join now
                </NavLink>
              </button>
            </div>
          </div>
          <div className="home_image">
            <img src={image} />
          </div>
        </div>
      </div>
      <div className="home_footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
