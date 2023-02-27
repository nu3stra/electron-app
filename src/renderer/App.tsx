import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import OsCard from '../components/OsCard';
import '../styles/App.css';
import HostCard from '../components/HostCard';
import MemoryCard from '../components/MemoryCard';

function Main() {
  return (
    <>
      <div>
        <MemoryCard />
      </div>
      <div>
        <OsCard />
      </div>
      <div>
        <HostCard />
      </div>
    </>
    // <div>
    //   <div className="Hello">
    //     <img width="200" alt="icon" src={icon} />
    //   </div>
    //   <h1>electron-react-boilerplate</h1>
    //   <div className="Hello">
    //     <a
    //       href="https://electron-react-boilerplate.js.org/"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <button type="button">
    //         <span role="img" aria-label="books">
    //           📚
    //         </span>
    //         Read our docs
    //       </button>
    //     </a>
    //     <a
    //       href="https://github.com/sponsors/electron-react-boilerplate"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <button type="button">
    //         <span role="img" aria-label="folded hands">
    //           🙏
    //         </span>
    //         Donate
    //       </button>
    //     </a>
    //   </div>
    // </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
