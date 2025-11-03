import Sidebar from './components/Sidebar';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        <div className="content-header">
          <h1>Hoş Geldiniz!</h1>
          <p>Dashboard içeriğiniz buraya gelecek.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Projeler</h3>
            <p className="card-number">15</p>
          </div>
          <div className="dashboard-card">
            <h3>Görevler</h3>
            <p className="card-number">8</p>
          </div>
          <div className="dashboard-card">
            <h3>Kullanıcılar</h3>
            <p className="card-number">24</p>
          </div>
        </div>
      </main>
    </div>
  );
}
