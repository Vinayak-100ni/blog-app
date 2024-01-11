import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components';

const Home = () => {
 const [posts, setPosts] = useState([]);

 useEffect(() => {
  appwriteService.getPosts().then((post) => {
   if (post) {
    setPosts(post.documents);
   }
  })
 }, [])
 return posts.length > 0 ? (
  <div className='w-full py-8'>
   <Container>
    <div className='flex flex-wrap'>
     {
      posts.map((post) => (
       <div key={post.$id} className='p-2 w-1/4'>
        <PostCard {...post} />
       </div>
      ))
     }
    </div>
   </Container>
  </div>
 ) : (<Container><div>Please Login... </div></Container>)
}

export default Home
