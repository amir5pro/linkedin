import React, { useState } from "react";
import { Button, Modal, Progress, Space } from "antd";
import "./ProPicModal.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function ProPicModal({ openPic, setOpenPic }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const uniqueId = uuidv4();
      const dynamicFileName = uniqueId + "_" + selectedFile.name;
      const storageRef = ref(storage, "images/" + dynamicFileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setUploadProgress(progress);
        },
        (error) => {
          toast.error(<p>Error uploading file</p>);
        },
        async() => {
         try{
            const downloadURL= await getDownloadURL(uploadTask.snapshot.ref)
                const proDocRef = collection(db, "profileImages");
                const q = query(proDocRef, where("proUserId", "==", userInfo.uid));
                const proDocSnapshot = await getDocs(q);
                if (!proDocSnapshot.empty) {
                  const proDocId = proDocSnapshot.docs[0].id;
                  await setDoc(doc(db, "profileImages", proDocId), {
                    proImageUrl: downloadURL,
                    proUserId: userInfo.uid,
                  });
                  toast.success(<p>profile picture successfully updated</p>);
                } else {
                    await addDoc(collection(db, "profileImages"), {
                    proImageUrl: downloadURL,
                    proUserId: userInfo.uid,
                  });
                  toast.success(<p>profile picture successfully added</p>);
                }
    
                setOpenPic(false);
                setSelectedFile(null);
                setUploadProgress(0);
              
         }catch (error){

         }
          
        }
      );
    }
  };
  return (
    <>
      <Modal
        open={openPic}
        title="Add profile picture"
        onOk={() => setOpenPic(false)}
        onCancel={() => setOpenPic(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={selectedFile ? false : true}
            onClick={() => handleUpload()}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >
        <p style={{ textAlign: "center" }}>
          {selectedFile && selectedFile.name}
        </p>
        <div className="iUplaod">
          <label htmlFor="image-upload" className="iUplaod_child">
            Add an image
          </label>
          <input
            hidden
            id="image-upload"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        {uploadProgress === 0 ? (
          <></>
        ) : (
          <div className="circle_pro">
            <Space>
              <Progress type="circle" percent={uploadProgress} />
            </Space>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ProPicModal;
