import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

const EditMediaContent = () => {
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
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/mediaContents/${id}`)
    .then((response) => {
      setTitle(response.data.mediaContent.title)
      setType(response.data.mediaContent.type)
      setDescription(response.data.mediaContent.description)
      setContentUrl(response.data.mediaContent.contentUrl)
      setTags(response.data.mediaContent.tags)
      setPublishDate(response.data.mediaContent.publishDate.split('T')[0])
      setViews(response.data.mediaContent.views)
      setLikes(response.data.mediaContent.likes)
      setComments(response.data.mediaContent.comments)
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert('An error occurred. Please check the error');
      console.log(error);
    });
  }, [])

  const handleEditMediaContent = () => {
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
    };
    setLoading(true);
    axios
    .put(`http://localhost:5555/mediaContents/${id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Media Content successfully edited');
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error', {variant: 'error'});
      console.log(error);
    });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Media Content</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditMediaContent}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditMediaContent
