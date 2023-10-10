import Content from '../component/Content.tsx';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {/* The content of your Home page */}
      <div>
        <Content />
      </div>
    </div>
  );
}

export default Home;
