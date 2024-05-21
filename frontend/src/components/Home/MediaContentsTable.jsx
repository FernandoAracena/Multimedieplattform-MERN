import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const MediaContentsTable = ({ mediaContents }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md bg-sky-800 text-white'>Title</th>
          <th className='border border-slate-600 rounded-md max-md:hidden bg-sky-800 text-white'>
            Type
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden bg-sky-800 text-white'>
            Tags
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden bg-sky-800 text-white'>
            Views
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden bg-sky-800 text-white'>
            Likes
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden bg-sky-800 text-white'>
            Comments
          </th>
          <th className='border border-slate-600 rounded-md bg-sky-800 text-white'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {mediaContents.map((mediaContent) => (
          <tr key={mediaContent._id} className='h-8'>
            <td className='text-center'>
              {mediaContent.title}
            </td>
            <td className='text-center max-md:hidden'>
              {mediaContent.type}
            </td>
            <td className='text-center max-md:hidden'>
              {mediaContent.tags}
            </td>
            <td className='text-center max-md:hidden'>
              {mediaContent.views}
            </td>
            <td className='text-center max-md:hidden'>
              {mediaContent.likes}
            </td>
            <td className='text-center max-md:hidden'>
              {mediaContent.comments}
            </td>
            <td className='text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/mediaContents/details/${mediaContent._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/mediaContents/edit/${mediaContent._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/mediaContents/delete/${mediaContent._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MediaContentsTable;