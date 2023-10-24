import Content from '../component/Content.tsx';
import Header from '../component/Navbar';

function Home() {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        {/* The content of your Home page */}
        <div>
          <Content />
        </div>
      </div>
    </>
  );
}

export default Home;
