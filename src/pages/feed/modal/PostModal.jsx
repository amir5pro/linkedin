import React, { useState } from 'react';
import { Modal,Button } from "antd";
import "./PostModal.css";
const PostModal = ({modalOpen,setModalOpen,sendPost,loading,setLoading,postRef,setPostValue,postValue}) => {
    
    const handlePost = (e) => {
      const trimmedValue = e.target.value.trim();
     
      if(trimmedValue.length>0){

          setPostValue(true);
      }else{
        setPostValue(false);

      }
    };

   const submitPost=()=>{
    setLoading(true)
      sendPost(postRef.current.value);
 
   }
  return (
    <>
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() =>{
          setModalOpen(false)
          setLoading(false)
        } }
        footer={[
          <Button key="submit" type="primary" loading={loading} disabled={postValue ? false:true} onClick={()=>submitPost()} >
            Post
          </Button>
         
        ]}
      >
     
     <textarea  style={{ resize: "vertical" }} placeholder="What do you want to talk about ?" className="Post_modal_input" rows="5" cols="1" wrap="soft"  onChange={(e) => handlePost(e)} ref={postRef} ></textarea>
      </Modal>
    </>
  );
};
export default PostModal;









