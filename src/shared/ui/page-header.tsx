export function PageHeader({ title, img }: { title: string; img: string }) {
  return (
    <div className='flex items-center gap-5 mb-8! max-sm:mb-3!'>
      <div>
        <img src={img} alt={title} className='w-20 h-20' />
      </div>
      <h2 className='text-white text-[28px] font-bold'>{title}</h2>
    </div>
  );
}
