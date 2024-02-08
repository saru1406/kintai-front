import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  async function handleLogin() {
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    try {
      await axios.get(`${apiUrl}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      // ログインリクエスト
      const response = await axios.post(
        `${apiUrl}/api/login`,
        {
          email: formValues.email,
          password: formValues.password,
        },
        { withCredentials: true }
      );

      // ログイン成功
      console.log("Login successful:", response.data);
      sessionStorage.setItem("authToken", response.data.token);
    } catch (error) {
      // エラーハンドリング
      if (error.response) {
        // サーバーからのエラーレスポンス
        console.error("Login error:", error.response.data);
      } else if (error.request) {
        // リクエストが送信されたがレスポンスがない
        console.error("No response:", error.request);
      } else {
        // リクエスト設定時の問題
        console.error("Error:", error.message);
      }
    }
  }

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font h-screen">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-white">
              Slow-carb next level shoindxgoitch ethical authentic, poko
              scenester
            </h1>
            <p className="leading-relaxed mt-4">
              Poke slow-carb mixtape knausgaard, typewriter street art gentrify
              hammock starladder roathse. Craies vegan tousled etsy austin.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-white text-lg font-medium title-font mb-5">
              ログイン
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-400"
              >
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={handleLogin}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              ログイン
            </button>
            <p className="text-xs mt-3">
              Literally you probably t heard of them jean shorts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
