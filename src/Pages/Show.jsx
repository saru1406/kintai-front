import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Show = () => {
  let { id } = useParams();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const authToken = sessionStorage.getItem("authToken");
  const [data, setData] = useState({ works: [] });

  const year = id.substring(0, 4);
  const month = id.substring(4, 6);
  const day = id.substring(6, 8);

  useEffect(() => {
    const fetchShow = async () => {
      const response = await axios.get(`${apiUrl}/api/work`, {
        params: { year: year, month: month, day: day },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data.work_date);
      console.log(response.data);
    };
    fetchShow();
  },  [apiUrl, authToken]);

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              {data.date}詳細
            </h1>
          </div>
          <div className="lg:w-5/6 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr className="text-center">
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                    件数
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    開始時間
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    終了時間
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    備考
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    小計
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    合計
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.works.map((work, index) => (
                  <tr className="text-center" key={index}>
                    <td className="px-4 py-3 border-b-2 border-gray-800">{index +1}</td>
                    <td className="px-4 py-3 border-b-2 border-gray-800">{work.start}</td>
                    <td className="px-4 py-3 border-b-2 border-gray-800">{work.end}</td>
                    <td className="px-4 py-3 text-lg text-white border-b-2 border-gray-800">{work.remarks[0] ? work.remarks[0].body : ''}</td>
                    <td className="px-4 py-3 border-b-2 border-gray-800">{work.subtotal}</td>
                    <td className="px-4 py-3 border-b-2 border-gray-800"></td>
                  </tr>
                ))}
                <tr>
                  <td className="border-t border-white"></td>
                  <td className="border-t">
                  </td>
                  <td className="border-t">
                  </td>
                  <td className="border-t">
                  </td>
                  <td className="border-t"></td>
                  <td className="px-4 py-3 text-center border-t">{data.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Show;
