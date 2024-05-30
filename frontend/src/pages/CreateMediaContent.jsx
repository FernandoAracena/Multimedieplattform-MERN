import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useAuth} from '../context/AuthContext';

const CreateMediaContent = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [tags, setTags] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [views, setViews] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    console.log('Logged user:', user);
  }, [user]);

  const handleSaveMediaContent = () => { 
    const data = {
      title,
      type,
      description,
      contentUrl,
      tags,
      publishDate,
      views,
      likes,
      comments,
      userId: user._id,
    };
    console.log('Data being sent:', data);
    setLoading(true);
    axios
    .post(`http://localhost:5555/mediaContents`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Media Content successfully created');
      navigate('/home');
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error', {variant: 'error'});
      console.log(error);
      console.log(data);
    });
   }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Media Content</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Type</label>
          <input
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Content Url</label>
          <input
            type='text'
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Tags</label>
          <input
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Date</label>
          <input
            type='date'
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Views</label>
          <input
            type='number'
            value={views}
            onChange={(e) => setViews(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Likes</label>
          <input
            type='number'
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Comments</label>
          <input
            type='number'
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveMediaContent}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateMediaContent
