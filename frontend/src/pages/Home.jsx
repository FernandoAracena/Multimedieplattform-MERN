import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {Link, useNavigate} from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import MediaContentsTable from '../components/Home/MediaContentsTable';
import MediaContentsCard from '../components/Home/MediaContentsCard';
import Search from "../components/Search";
import Type from "../components/Type";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import {useAuth} from "../context/AuthContext";

const Home = () => {
	const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState([]);
  const [sort, setSort] = useState({sort:"views", order:"desc"});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [obj, setObj] = useState({mediaContents:[]});
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate('/users/register');
    }
  }, [user, navigate]);

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/mediaContents?page=${page}&sort=${sort.sort},${
      sort.order
    }&type=${filterType.toString()}&search=${search}`)
    .then((response) => {
      setObj(response.data);
      setLoading(false);
    })
    .catch((error) =>{
      console.log(error);
      setLoading(false);
    });
  }, [page, sort, filterType, search]);
  
  return (
    <div className='p-4'>
      <nav>
        {user ? (
          <>
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/users/register">Login</Link>
        )}
      </nav>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Media Content List</h1>
        <Link to='/mediaContents/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
        <div className="filter_container">
        <Search setSearch={(search) => setSearch(search)} />
        <Type
              filterType={filterType}
							types={obj.types ? obj.types : []}
							setFilterType={(type) => setFilterType(type)}
						/>
        <Sort sort={sort} setSort={(sort) => setSort(sort)} />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <MediaContentsTable mediaContents={obj.mediaContents} />
      ) : (
        <MediaContentsCard mediaContents={obj.mediaContents} />
      )}
      <Pagination
							page={page}
							limit={obj.limit ? obj.limit : 0}
							total={obj.total ? obj.total : 0}
							setPage={(page) => setPage(page)}
						/>
    </div>
  );
}

export default Home