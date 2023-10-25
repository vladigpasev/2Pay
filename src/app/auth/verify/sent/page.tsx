export default async function EmailSent() {
  return (
    <main className="w-full h-screen flex justify-center">
      <div className="my-auto p-10 rounded-xl border border-base-300 bg-base-200">
        <h1 className="text-4xl font-bold">Check your E-Mail!</h1>
        <p>
          We have sent an E-Mail with a verification link on your mail (TOUR
          MAIL)
        </p>
      </div>
    </main>
  );
}
