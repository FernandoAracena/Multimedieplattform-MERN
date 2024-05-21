import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowMediaContent = () => {
  const[mediaContent, setMediaContent] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(() =>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/mediaContents/${id}`)
    .then((response) => {
      setMediaContent(response.data.mediaContent);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Media Content</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{mediaContent._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{mediaContent.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Type</span>
            <span>{mediaContent.type}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description</span>
            <span>{mediaContent.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Content Url</span>
            <span>{mediaContent.contentUrl}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Tags</span>
            <span>{mediaContent.tags}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Date</span>
            <span>{mediaContent.publishDate}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Views</span>
            <span>{mediaContent.views}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Likes</span>
            <span>{mediaContent.likes}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Comments</span>
            <span>{mediaContent.comments}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(mediaContent.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(mediaContent.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowMediaContent
