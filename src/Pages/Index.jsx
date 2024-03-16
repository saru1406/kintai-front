import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const authToken = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

    // 年と月に分解
    const year = selectedDate.substring(0, 4);
    const month = selectedDate.substring(4, 6);

    try {
      const response = await axios.get(`${apiUrl}/api/works`, {
        params: { year: year, month: month },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setData(response.data.work_data);
      console.log(response);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handelNavigateShow = (e, year, date) => {
    const params = date.replace(/月|日/g, "");
    navigate(`/${year+params}`)
  }

  const handleNavigateIndex = () => {
    navigate('/index')
  }

  const handleNavigateAttendance = () => navigate('/attendance')

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font font-body min-h-screen">
        <div className="container mx-auto">
        <div className="flex text-white">
          <button className="mr-4" onClick={handleNavigateAttendance}>勤怠</button>
          <button className="mr-4" onClick={handleNavigateIndex}>勤怠一覧</button>
        </div>
          <div className="px-5 py-24">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              勤怠一覧
            </h1>
            <div>
              <label htmlFor="date">対象月</label>
              <select
                name="date"
                id="date"
                onChange={handleDateChange}
                value={date}
                className="text-center bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="202401">2024年 1月</option>
                <option value="202402">2024年 2月</option>
                <option value="202403">2024年 3月</option>
              </select>
            </div>
          </div>
          <div className="lg:w-5/6 w-full mx-auto overflow-auto">
            <div className="text-white text-right m-5">CSV出力</div>
            {/* <div className="text-white text-2xl">
              {data[0]? data[0].year : ''}
            </div> */}
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl text-center">
                    日付
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center">
                    勤怠開始
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center">
                    勤怠終了
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center">
                    休憩開始
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center">
                    休憩終了
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center">
                    小計
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center">
                    合計
                  </th>
                  <th className="px-2 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr className="text-white" key={index}>
                    <td className="px-4 py-3 text-center border-b-2 border-gray-800">{item.date}</td>
                    <td className="px-4 py-3 text-center border-b-2 border-gray-800">{item.works[0] ? item.works[0].start :'-'}</td>
                    <td className="px-4 py-3 text-center border-b-2 border-gray-800">{item.works[0] ? item.works[0].end :'-'}</td>
                    <td className="px-4 py-3 text-center border-b-2 border-gray-800">{item.works[0] ? item.works[0].break_times[0] ? item.works[0].break_times[0].break_start : '-' : '-'}</td>
                    <td className="px-4 py-3 text-center border-b-2 border-gray-800">{item.works[0] ? item.works[0].break_times[0] ? item.works[0].break_times[0].break_end : '-' : '-'}</td>
                    <td className="px-4 py-3 text-center border-b-2 border-gray-800">{item.total === '00:00' ? '-':  item.total }</td>
                    <td className="border-b-2 border-gray-800"></td>
                    <td className="px-4 py-3 text-center border-b-2 border-gray-800"><span className="cursor-pointer text-blue-500" onClick={(e) => handelNavigateShow(e, item.year, item.date)}>{item.works.length >= 2 ? '他' + item.works.length + '件' : ''}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
