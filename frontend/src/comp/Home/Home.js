import img from '../../assets/img/bond2.jpeg';

function Home() {
  return (
    <div className="dc gap-0 flex-col h-[calc(100vh-64px)] overflow-y-hidden">
      <img className='max-w-sm' src={img} alt="" />
      <h1 className='mt-4 text-3xl font-medium'>Micro Bond Exchange</h1>
      <p className='text-lg text-[#333]'>Tokenize your Bonds</p>
    </div>
  )
}

export default Home