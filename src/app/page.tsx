import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <span>Click </span>
      <Link href='/documents/1234'>here</Link>
      <span> to go to document id</span>
    </div>
  );
}
