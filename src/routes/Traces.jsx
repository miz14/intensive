import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios, { URL_UPLOAD, URL_TRACES } from "../api/axios";
import post_res3 from '../examples/3/results.json';
import imgupload from '../imgs/Upload.png'
import sled from '../imgs/sled.svg';
import redact from '../imgs/redact.svg';
import deleteimg from '../imgs/delete.svg';
import { nanoid } from "@reduxjs/toolkit";


const Traces = () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const Token = useSelector(state => state.auth.data.accessToken);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        setSearchParams({token : Token})
    }, [Token])

    const [error, setError] = useState(null);

    const [res, setRes] = useState(<></>);
    const [sledName, setSledName] = useState('');
    const [file, setFile] = useState(null);

    const [uploadErr, setUploadErr] = useState(null);
    const handleFileSelect = async () => {
        if (file) {
            handleSubmit();
        }
    };

    useEffect(() => {
        setError(null);
        rsult_block();
    }, []);
    
    const userToken = useSelector(select => select.auth.data.accessToken)
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('accessToken', userToken);
        formData.append('sledName', sledName);
        formData.append('file', file.target.files[0]);
        formData.append('filename', file.name);
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
    const rsult_block = async () => { 
        const place= document.querySelector(".traces_left_slider");
        try {
            //const result = await axios.get(URL_TRACES +"/get/"+ Token);
            //const result = JSON.parse('[{"id": 12,"sledName" : "nazv", "fileName" : "fileName"}]')
            const result = [{"sledName" : "выполнение командных заданий", "fileName" : "задания.txt", "zyv": [15, 60, 30]}];
            for (var el in result) {
                result[el]["id"] = nanoid(10);
            }
            
            async function deleteSled(a) {
                try {
                    const ind = result.map((o) => o.id).indexOf(a);
                    const file = JSON.stringify({token : Token, sledName: result[ind].sledName, fileName: result[ind].fileName});
                    const resp = await axios.post(URL_TRACES + "/delete/", file, {headers: {'Content-Type': 'multipart/json'}})
                    
                    delete result[ind];
    
                    setupBlocks();  
                } catch(err) {
                    console.log("err");
                }
                
                
            }
            const setupBlocks = () => {
                setRes(result.map((e) => {
                    return( 
                    <>
                    <li key={e.id}>
                        <div className="traces_sled_helper">
                            <div className="traces_sled_text">
                                <div><img src={sled} alt="sled.svg"/> {e.sledName}</div>
                                <a href={URL_TRACES + "/" + Token +"/"+ e.sledName + "/" + e.fileName } download={e.fileName}>{e.fileName}</a> 
                            </div>
                            <div className="traces_sled_buttons">
                                <button disabled>
                                    <img src={redact}/>
                                </button>
                                <button onClick={() => deleteSled(e.id)}>
                                    <img src={deleteimg}/>
                                </button>
                            </div>
                            
                        </div>
                        <div className="traces_sled_helper1">
                            <div className="demonstration_res_know traces_sled_zyv">Знать: {e.zyv[0]}%</div>
                            <div className="demonstration_res_can traces_sled_zyv">Уметь: {e.zyv[0]}%</div>
                            <div className="demonstration_res_master traces_sled_zyv">Владеть: {e.zyv[2]}%</div>
                        </div>
                    </li>
                    </>)
                }))
            } 
        setupBlocks();  
            
            
        } catch (err) {
            if (!err?.response) {
                setError('No Server Response');
            } else if (err?.response?.status === 400) {
                setError('User already exists');
            } else {
                setError("Registration failed");
            }
        }    
    }
    return(
        <>
        <main>
        <div className="uk-container uk-container-large">
            <div className='main_column traces'>
                <h2>Мои следы</h2>
                <h3>Видны только вам</h3>
                <div className="traces_block">
                    <div className="traces_left">
                        <ul className="traces_left_slider">
                            {res}
                            {/* {rsult_block} */}
                        </ul>
                    </div>
                    <div className="traces_right">
                        <div className="upload_line">
                            <div className="upload_block uk-padding">
                                <h2 className="upload_h">Добавление нового следа</h2>
                                <img src={imgupload} className="imgupload" alt="imgupload" />
                                <input type="text" className="upload_name" onChange={(e) => setSledName(e)} placeholder="Введите название мероприятия" required/>
                                <input type="file" id="file-uploader" onChange={(e) => setFile(e)} required/>
                                <button onClick={handleFileSelect} className="uk-button uk-button-default confirm-button">Отправить</button>
                            </div> 
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
        </main>
        
        </>
    )
}

export default Traces;