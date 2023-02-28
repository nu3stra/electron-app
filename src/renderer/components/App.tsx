import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

function Main() {
  return <Dashboard />;
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
