export function TimeModeItem({
  mode,
  timer,
  img,
}: {
  mode: string;
  timer: string;
  img: string;
}) {
  return (
    <div className='border border-[#494949] rounded-[8px] bg-[rgba(57,57,57,0.7)] p-5! max-w-[306px] w-full flex flex-col items-center text-white max-md:max-w-full'>
      <div>
        <img src={img} alt={mode} className='w-[84px] h-[84px]' />
      </div>
      <p className='text-[24px] font-medium mb-2!'>{mode}</p>
      <p className='text-base font-bold mb-5!'>{timer} секунд</p>
      <button className='w-full py-3! text-white text-base font-medium rounded border border-[#F5D91F] cursor-pointer hover:bg-[#F5D91F] transition-colors duration-200'>
        Играть
      </button>
    </div>
  );
}
