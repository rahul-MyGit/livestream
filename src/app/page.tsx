import Link from "next/link";


export default  function Page() {
  return (
    <div className="flex h-screen">
      <div className=" flex flex-col m-auto text-white">
      <p className="text-white pl-1">Go to Home Page</p>
        <Link href={'/home'}>Click here</Link>
      </div>
    </div>
  );
}
