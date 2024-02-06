import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../FirebaseAuthentication';

function Home({ isAuth }) {
  const [postList, setPostlist] = useState([]);
  const postsCollectionRef = collection(db, 'Posts');

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };
    getPost();
  }, [postsCollectionRef]);

  const deletepost = async (postId) => {
    try {
      const postDocRef = doc(db, 'Posts', postId);
      await deleteDoc(postDocRef);

      // Refresh the postList after deleting
      const data = await getDocs(postsCollectionRef);
      setPostlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <div className='homePage'>
      {postList.map((post) => (
        <div className='post' key={post.id}>
          <div className='Post header'>
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="delete">
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button onClick={() => deletepost(post.id)}>&#128465;</button>
              )}
            </div>
          </div>
          <div className="postTextContainer">{post.posText}</div>
          <div className="btn">
            {isAuth && post.author.id === auth.currentUser.uid && (
              <Link to={`/edit/${post.id}`}>
                <button>Edit Blog</button>
              </Link>
            )}
          </div>
          <h3>@{post.author.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
