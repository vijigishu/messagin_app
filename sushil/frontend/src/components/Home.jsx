import React from 'react';

const Home = () => {
  return (
    <div className="mt-2 ml-2 flex h-[95vh] w-[98%] bg-gray-100 border-2 border-black">
      <div className="w-1/4 bg-[#2f3e46] flex flex-col justify-between p-2">
        <div className="bg-[#3d5a80] p-5 rounded-lg text-white text-center mb-2 flex flex-col items-center">
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-full border-none mr-2 w-[150px]"
            />
            <button className="bg-[#5959c0] border-none text-white px-4 py-2 rounded-full cursor-pointer">
              Search
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto bg-[#354f52] rounded-lg p-2 mb-2">
          {/* List of friends */}
        </div>
        <div className="bg-[#3d5a80] p-4 rounded-lg text-white text-center">
          <div className="flex items-center gap-2">
            <img
            //   src={assets.logo}
              alt="User"
              className="rounded-full w-[50px] h-[50px]"
            />
            <span className="text-xl text-white">My Name</span>
          </div>
        </div>
      </div>
      <div className="w-3/4 flex flex-col bg-gray-100">
        <div className="bg-[#98c1d9] py-5 border-b border-gray-300 font-bold text-center relative text-xl">
          <div className="absolute top-1 right-2">
            <select
              id="language"
              name="language"
              className="border-none text-black"
            >
              <option value="none">Choose Language</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
          {/* Display selected friend's name */}
        </div>
        <div className="flex-grow p-5 overflow-y-auto bg-white border-b border-gray-300">
          {/* Chat messages */}
        </div>
        <div className="flex items-center bg-gray-300 p-2">
          <input
            type="text"
            placeholder="Write your message..."
            className="flex-grow px-4 py-2 border-none rounded-full mr-2"
          />
          <button className="bg-[#3d5a80] text-white rounded-full w-[40px] h-[40px] cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
