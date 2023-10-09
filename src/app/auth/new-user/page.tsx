import Link from "next/link";

export default function NewUsers() {
  return (
    <div className="flex justify-center h-[calc(100vh-90px)]">
      <div className="flex mt-auto mb-auto flex-col">
        <p className="text-3xl text-secondary">
          Congrats for <strong className="text-primary">joining us</strong>!
        </p>
        <Link href="/" className="text-center text-lg group">
          Lets go and{" "}
          <strong className="text-accent group-hover:text-warning transition-all">
            explore
          </strong>{" "}
          together!
        </Link>
      </div>
    </div>
  );
}
