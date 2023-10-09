export default function Home() {
  return (
    <>
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            height={377}
            width={512}
            alt="stock photo"
            src="/images/stock/istockphoto-1221101939-612x612.jpg"
            className="max-w-lg w-full rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold text-neutral-focus">
              DEX - експресни доставки
            </h1>
            <p className="py-6 text-neutral">
              <strong>DEX</strong> предлага най-бързите градски доставки.
              Изпълнението на доставката започва до <strong>2 минути</strong>{" "}
              след заявяването и, а колата ни е на адрес на изпращача в рамките
              на <strong>5 мин.</strong> Това е възможно, защото{" "}
              <strong>DEX</strong> се диверява на таксита за изпълението на
              пратката, а само в Пловдив колите ни са над <strong>5000</strong>
            </p>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="btn btn-primary">Да започваме</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/" className="btn btn-primary">
                Да започваме
              </Link>
            </SignedIn>
          </div>
        </div>
      </main>
    </>
  );
}
