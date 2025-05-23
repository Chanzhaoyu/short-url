import type { FC } from "hono/jsx";
import Layout from "./Layout.js";

const Home: FC = () => {
  return (
    <Layout title="Short Url API">
      <main className="home">
        <div className="img">
          <img src="/favicon.png" alt="logo" />
        </div>
        <div className="title">
          <h1 className="title-text">Short Url</h1>
          <span className="title-tip">服务已正常运行</span>
        </div>
        <div class="control">
          <a
            href="https://github.com/Chanzhaoyu/short-url?tab=readme-ov-file#%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3"
            target="_blank"
          >
            <svg
              className="btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.71 6.71a.996.996 0 0 0-1.41 0L1.71 11.3a.996.996 0 0 0 0 1.41L6.3 17.3a.996.996 0 1 0 1.41-1.41L3.83 12l3.88-3.88c.38-.39.38-1.03 0-1.41m8.58 0a.996.996 0 0 0 0 1.41L20.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L17.7 6.7c-.38-.38-1.02-.38-1.41.01M8 13c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m4 0c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1m4-2c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1"
              />
            </svg>
            <span className="btn-text">接口文档</span>
          </a>
          <a href="https://github.com/Chanzhaoyu/short-url" target="_blank">
            <svg
              className="btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1m17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 9h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m-4 4h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1m4-8h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1"
              />
            </svg>
            <span className="btn-text">项目地址</span>
          </a>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
