import './App.css';
import User from './Users/User';
import Users from './Users/Users';

function App() {
  return (
    <>
      <nav className="navbar bg-dark navbar-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">MEAN CRUD</span>
        </div>
      </nav>

      <div className='container mt-3'>
      <Users />
      </div>
    </>
  );
}

export default App;
