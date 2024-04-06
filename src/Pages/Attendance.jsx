import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [remarks, setRemarks] = useState("");
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [data, setData] = useState(null);
  const weekday = ["日", "月", "火", "水", "木", "金", "土"];
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchBreakStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/work/break-status`, {
          withCredentials: true,
        });
        console.log(response.data);
        setIsOnBreak(response.data.break_status);
        setData(response.data);
      } catch (error) {
        console.log(error.data.message);
      }
    };

    fetchBreakStatus();
  }, [apiUrl]);

  const handleChange = (e) => {
    const { value } = e.target;
    setRemarks(value);
  };

  const displayDate = `${currentDateTime.getFullYear()}年${currentDateTime.getMonth() + 1}月${currentDateTime.getDate()}日[${weekday[currentDateTime.getDay()]}]`;
  const displayTime = `${currentDateTime.getHours().toString().padStart(2, "0")}:${currentDateTime.getMinutes().toString().padStart(2, "0")}:${currentDateTime.getSeconds().toString().padStart(2, "0")}`;

  const jpDateString = currentDateTime.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  const handleWorkStart = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/work/start`,
        { remarks: remarks, start_date: jpDateString },
        {
          withCredentials: true,
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleWorkEnd = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/work/end`,
        { remarks: remarks, end_date: jpDateString },
        {
          withCredentials: true,
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleBreakStart = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/work/break-start`,
        { remarks: remarks, break_start: jpDateString },
        {
          withCredentials: true,
        }
      );
      setIsOnBreak(true);
      setData(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleBreakEnd = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/work/break-end`,
        { remarks: remarks, break_end: jpDateString },
        {
          withCredentials: true,
        }
      );
      setIsOnBreak(false);
      setData(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleNavigateIndex = () => {
    navigate('/index')
  };
  
  const handleNavigateAttendance = () => navigate('/attendance')

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden h-screen ">
      {data && <div className="bg-emerald-300 mt-auto text-center text-black">{data.message}</div>}
        <div className="container mx-auto">
          <div className="flex text-white">
            <button className="mr-4" onClick={handleNavigateAttendance}>勤怠</button>
            <button className="mr-4" onClick={handleNavigateIndex}>勤怠一覧</button>
          </div>
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
              >
                {remarks}
              </textarea>
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
              {!isOnBreak && (
                <button
                  onClick={handleBreakStart}
                  className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-10 mx-10"
                >
                  休憩開始
                </button>
              )}
              {isOnBreak && (
                <button
                  onClick={handleBreakEnd}
                  className="text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-600 rounded text-lg mt-10 mx-10"
                >
                  休憩終了
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Attendance;
