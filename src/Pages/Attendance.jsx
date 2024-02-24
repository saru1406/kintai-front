import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [remarks, setRemarks] = useState('')
  const weekday = ["日", "月", "火", "水", "木", "金", "土"];
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setRemarks(value);
  };

  const displayDate = `${currentDateTime.getFullYear()}年${currentDateTime.getMonth() + 1}月${currentDateTime.getDate()}日[${weekday[currentDateTime.getDay()]}]`;
  const displayTime = `${currentDateTime.getHours().toString().padStart(2, "0")}:${currentDateTime.getMinutes().toString().padStart(2, "0")}:${currentDateTime.getSeconds().toString().padStart(2, "0")}`;

  const jpDateString = currentDateTime.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  const authToken = sessionStorage.getItem("authToken");

  const handleWorkStart = async () => {
    try {
      await axios.post(`${apiUrl}/api/work/start`, { remarks: remarks, start_date: jpDateString }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleWorkEnd = async () => {
    try {
      await axios.post(`${apiUrl}/api/work/end`, { remarks: remarks, end_date: jpDateString }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  const handleWorkBreak = async () => {
    try {
      await axios.post(`${apiUrl}/api/work/break-start`, { remarks: remarks, break_start: jpDateString }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      });
    } catch (error) {
      console.error(error.response.data.message)
    }
  }

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden h-screen">
        <div className="container mx-auto">
          <div className="mt-60" />
          <div className="mx-auto text-white p-10 w-3/5 border rounded">
            <div className="text-4xl text-center">
              {displayDate} <span>{displayTime}</span>
            </div>
            <div className="mt-10">
              <label htmlFor="remarks" className="text-left">
                備考
              </label>
              <textarea
                name="remarks"
                id="remarks"
                rows="3"
                value={remarks}
                onChange={handleChange}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >{remarks}</textarea>
            </div>
            <div className="text-center">
              <button
                onClick={handleWorkStart}
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 mx-10"
              >
                出勤
              </button>
              <button
                onClick={handleWorkEnd}
                className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mt-10 mx-10"
              >
                退勤
              </button>
              <button
                onClick={handleWorkBreak}
                className="text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-600 rounded text-lg mt-10 mx-10"
              >
                休憩開始
              </button>
            </div>
          </div>
        </div>
        {/* <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-800">
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-white">
                  CATEGORY
                </span>
                <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-white title-font mb-2">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p className="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
                <a className="text-indigo-400 inline-flex items-center mt-4">
                  Learn More
                </a>
              </div>
            </div>
            <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-white">
                  CATEGORY
                </span>
                <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-white title-font mb-2">
                  Meditation bushwick direct trade taxidermy shaman
                </h2>
                <p className="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
                <a className="text-indigo-400 inline-flex items-center mt-4">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Attendance;
