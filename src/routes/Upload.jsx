import axios, {URL_UPLOAD} from '../api/axios';
import { useSelector } from "react-redux";
import { useState } from "react";

import imgupload from '../imgs/Upload.png'
const UploadPage = () => {

    const [uploadErr, setUploadErr] = useState(null);
    const handleFileSelect = e => {
        const fileInput = e.target;
        const file = fileInput.files[0];
        console.log(file);
        if (file) {
            handleSubmit(file);
        }
    };
    const userToken = useSelector(select => select.auth.data.accessToken)
    const handleSubmit = async file => {
        const formData = new FormData();
        formData.append('accessToken', userToken);
        formData.append('file', file);
        formData.append('filename', file.name)
        console.log(formData.get("filename"))

        try {
            const response = await axios.post(URL_UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("File upload access");    
        } catch (err) {
            if (!err?.response) {
                setUploadErr('No Server Response');
            } else {
                setUploadErr("Upload Failed");
            }
            console.log("File upload failed");
        }
    };
    
    return(
        <main className="main_upload">
            <div className="upload_line uk-position-center">
                <div className="upload_block uk-position-center uk-padding">
                    <h2 className="upload_h">Выберите файл<br/> или <br/> перетащите с компьютера</h2>
                    <img src={imgupload} className="imgupload" alt="imgupload" />
                    <input type="file" id="file-uploader" onChange={(e) => handleFileSelect(e)}/>
                </div> 
            </div>
            {uploadErr ? (<h3>{uploadErr}</h3>) :null}	
        </main>
        
        	

    );
};

export {UploadPage}