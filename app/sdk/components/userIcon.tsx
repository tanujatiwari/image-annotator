export default function UserIcon({ name }: { name: string }) {
  return (
    <div className='bg-[#1E7631] rounded-full w-4 h-4 flex items-center justify-center  text-white p-3'>
      {name.charAt(0)}
    </div>
  );
}
