import React, { useEffect } from 'react';
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../FirebaseAuthentication'
import { useNavigate } from 'react-router-dom';

function CreatePost({isAuth}) {
    const [title, setTitle] = useState(""); 
    const [posText, setPostText] = useState("");

    const postsCollectionRef = collection(db, "Posts");
    let navigate = useNavigate(); 

    const createPost = async () => {
        await addDoc(postsCollectionRef, { title, posText, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid } });
        navigate("/");
    }
    
    useEffect(() => {
        if (!isAuth) {
          navigate("/login");
        }
      }, [isAuth, navigate]);
      

    return (
        <div className='createPost'>
            <div className='cpContainer'>
                <h1>Create Your Post</h1>
                <div className='inputtext'>
                    <label>Title : </label>
                    <input type='text' placeholder='Title' onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className='inputtext'>
                    <label>Post : </label>
                    <textarea placeholder='Write here' onChange={(e) => { setPostText(e.target.value) }} />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    );
}

export default CreatePost;
