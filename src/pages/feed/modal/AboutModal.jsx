import React, { useState } from "react";
import "./AboutModal.css";
import { Button, Modal, Form, Input } from "antd";
import { collection, addDoc,doc, getDocs,setDoc ,query, where} from "firebase/firestore"; 
import { db } from "../../../firebase/config";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";

function AboutModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
const userInfo=useSelector((state)=>state.userInfo.userInfo)
  const onFinish = (values) => {
    setLoading(true)
    const isAboutValid = Object.values(values).every((value) => {
        if (typeof value !== 'undefined') {
          const hasOptionalLabel = /\(optional\)/i.test(value); 
          if (hasOptionalLabel) {
            return true;
          }
          const trimmedValue = value.trim(); 
          return trimmedValue.length >= 1;
        }
        return true; 
      });
      if(isAboutValid){
        
        try{
          const updateOrCreateUserInfo = async () => {
            const userDocRef = collection(db, "users")
            const q = query(userDocRef, where("myUserId", "==", userInfo.uid));
            const docSnapshot = await getDocs(q);
            if (!docSnapshot.empty) {
              const docId = docSnapshot.docs[0].id;
              await setDoc(doc(db,"users",docId), {
                name: userInfo.displayName,
                myUserId: userInfo.uid,
                email: userInfo.email,
                profession: values.Profession,
                country: values.Country,
                college: values.College !== undefined ? values.College : "",
                city: values.City,
                company: values.Company !== undefined ? values.Company : "",
                industry: values.Industry,
                skill: values.Skill,
                website: values.Website !== undefined ? values.Website : "",
                aboutMe: values.About_me,
              });
              toast.success(<p>Profile Info updated successfully!</p>);
            }else{
             
              await addDoc(collection(db, "users"), {
                name: userInfo.displayName,
                myUserId: userInfo.uid,
                email: userInfo.email,
                profession: values.Profession,
                country: values.Country,
                college: values.College !== undefined ? values.College : "",
                city: values.City,
                company: values.Company !== undefined ? values.Company : "",
                industry: values.Industry,
                skill: values.Skill,
                website: values.Website !== undefined ? values.Website : "",
                aboutMe: values.About_me,
              });
              toast.success(<p>Profile Info entered successfully!</p>);
            }
            setOpen(false);
            setLoading(false);
            form.resetFields();
          };
  
          updateOrCreateUserInfo();
        }catch(e){
            toast.error(<p>Oops! Something went wrong. Please try again</p>);
            setLoading(false)
        }
      
      }else{
        toast.error(<p>invalid input</p>);
        setLoading(false)

      }
    
    
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
      className="a_modal"
        open={open}
        title="Edit info"
        onCancel={() =>{
          setOpen(false)
          setLoading(false)
         } }
        footer={null}
      >
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Form
           form={form}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              maxWidth: 420,
            }}
            key={loading}
          >
            <Form.Item
              name="Profession"
              label="Profession"
              rules={[
                {
                  required: true,
                  message: "please input your Profession",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="Country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: "please input your Country",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="City"
              label="City"
              rules={[
                {
                  required: true,
                  message: "please input your City",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="Company" label="Company(optional)">
              <Input />
            </Form.Item>

            <Form.Item
              name="Industry"
              label="Industry"
              rules={[
                {
                  required: true,
                  message: "Please specify the industry or sector you work in.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="College" label="College(optional)">
              <Input />
            </Form.Item>

            <Form.Item name="Website" label="Website(optional)">
              <Input />
            </Form.Item>

            <Form.Item
              name="Skill"
              label="Skill"
              rules={[
                {
                  required: true,
                  message: "Please enter your skill",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
            name="About_me" 
            label="About_me"
            rules={[
                {
                  required: true,
                  message: "Please say something about yourself",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default AboutModal;
