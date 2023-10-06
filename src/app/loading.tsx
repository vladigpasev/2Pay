import Image from "next/image";

export default function PageLoading() {
  return (
    <div className="absolute w-[98vw] h-full text-center bg-dark-transparenty backdrop-filter backdrop-blur-md backdrop-brightness-125 flex justify-around items-center z-10">
      <span className="relative flex w-fit h-fit">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <Image
          height={500}
          width={512}
          className="w-full max-w-[100px] relative inline-flex animate-bounce m-5"
          src="/images/branding/icon.png"
          alt="DoNuts"
        />
      </span>
    </div>
  );
}
