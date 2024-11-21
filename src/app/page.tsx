import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Page() {


  return (
    <div className="flex h-screen">
      <div className=" flex flex-col m-auto">
      Home Page
      <Link href={'/home'}>
        <Button>Click here</Button>
      </Link>
      </div>
    </div>
  );
}
