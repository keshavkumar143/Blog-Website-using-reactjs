import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseAuthentication';

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', posText: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'Posts', postId));
        if (postDoc.exists()) {
          setPost({ ...postDoc.data(), id: postDoc.id });
        } else {
          console.error('Post not found.');
        }
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSaveEdit = async () => {
    try {
      const postDocRef = doc(db, 'Posts', postId);
      await updateDoc(postDocRef, {
        title: post.title,
        posText: post.posText,
      });

      // Redirect to home after editing
      navigate('/');
    } catch (error) {
      console.error('Error editing post:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  return (
    <div className='editPage'>
      <h1>Edit Post</h1>
      <label>Title:</label>
      <input type='text' name='title' value={post.title} onChange={handleChange} />
      <label>Text:</label>
      <textarea name='posText' value={post.posText} onChange={handleChange}></textarea>
      <button onClick={handleSaveEdit}>Save</button>
    </div>
  );
}

export default EditPost;
