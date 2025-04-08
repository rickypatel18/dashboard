import Image from "next/image";
import { signIn, auth, signOut } from "../../../../auth"

export default async function SignIn() {
  const session = await auth();
  console.log(session);

  const user = session?.user;

  return user ? (
    <div className="flex flex-col  justify-center ">
      <div className="flex gap-2 items-center">
        <h1>welcome {user?.name}</h1>
        <Image
          src={user?.image as string}
          alt="profile"
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
          priority
        />
      </div>

      <div className="flex gap-3">
        <h1>you are authenticated</h1>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button>Signout</button>
        </form>
      </div>
    </div>
  ) : (
    <>
    <p>this is demo authentication using OAuth js</p>
      <h1 className="text-xl">you are not authenticated , click below</h1> 
      <br />
      <form
        action={async () => {
          "use server";
          await signIn("google");
          // await signIn("google", { redirectTo: "/secret" });
        }}
      >
        <button>signin with google</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
    </>
  );
}
