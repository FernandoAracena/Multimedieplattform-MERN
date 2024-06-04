import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineFileText, AiOutlineVideoCamera, AiOutlineAudio, AiOutlinePicture } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import MediaContentModal from './MediaContentModal';

const MediaContentSingleCard = ({ mediaContent }) => {
  const [showModal, setShowModal] = useState(false);
  const getIconForType = (type) => {
    switch(type) {
      case 'article':
        return< AiOutlineFileText className='bg-sky-300 text-6xl'/>;
      case 'video':
        return< AiOutlineVideoCamera className='bg-sky-300 text-6xl'/>;
      case 'audio':
        return< AiOutlineAudio className='bg-sky-300 text-6xl'/>;
      case 'image':
        return< AiOutlinePicture className='bg-sky-300 text-6xl'/>;
      default:
        return null;
      }
  };

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <div className='flex justify-center items-center mb-4'>
      {getIconForType(mediaContent.type)}
      </div>

        <h2 className='text-xl font-bold m-2'>{mediaContent.title}</h2>
        <p className='text-gray-600 mb-1'><BiUserCircle className='inline-block mr-1 text-red-300'/>{mediaContent.type}</p>
        <p className='text-gray-600 mb-1'><BiUserCircle className='inline-block mr-1 text-red-300'/>{mediaContent.views}</p>
        <p className='text-gray-600 mb-1'><BiUserCircle className='inline-block mr-1 text-red-300'/>{mediaContent.likes}</p>
        <p className='text-gray-600 mb-1'><BiUserCircle className='inline-block mr-1 text-red-300'/>{mediaContent.comments}</p>
      <div className='flex justify-between items-center gap-x-2'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/mediaContents/details/${mediaContent._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/mediaContents/edit/${mediaContent._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/mediaContents/delete/${mediaContent._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <MediaContentModal mediaContent={mediaContent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default MediaContentSingleCard;