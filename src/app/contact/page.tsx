import Image from "next/image"
import location from "../../../public/images/svg/location-sign.svg"
import contactImage from '../../../public/images/pngs/contact-us.png'
import mail from '../../../public/images/svg/email.svg';
import phone from '../../../public/images/svg/call_phone_icon.svg'
import Link from "next/link";

export default function Contact() {
    return (
        <>
            <section className="location flex flex-col md:flex-row px-2 justify-center gap-10 py-10 bg-gradient-to-r from-[#00a54c] to-[#01853e] text-neutral">
                <section className="left flex flex-col mx-5 min-[420px]:mx-20 justify-around">
                    <section className="map-text max-w-[400px] max-[768px]:mb-6">
                        <p className="text-5xl">Find us here</p>
                        <p className="text-base">Our office is a nice place in the heart of the oldest city in Europe - Plovdiv. It is a great space for work and great time for our developers.</p>
                    </section>
                    <section className="map-loc flex gap-5 items-center">
                        <Image src={location} alt="" className="w-8 canInvert fill-neutral"></Image>
                        <section className="loc-text flex flex-col">
                            <p>Plovdiv, Bulgaria</p>
                            <p>Kapitan Raicho Nikolov Street</p>
                            <p>Trade Center Grand</p>
                        </section>
                    </section>
                </section>
                <section className="google-map-code">
                    <iframe className="w-full aspect-auto" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2958.3885268924137!2d24.7535749!3d42.141972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd1aeb048f79d%3A0xf658d5a8f315a0!2z0KLQpiDQk9GA0LDQvdC0!5e0!3m2!1sbg!2sbg!4v1698512992254!5m2!1sbg!2sbg" width="600" height="450" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ "borderRadius": 30, "borderColor": "#ffffff", "borderWidth": 5 }}></iframe>
                </section>
            </section>
            <section className="web flex flex-col md:flex-row px-2 justify-center md:items-center gap-10 py-10">
                <Image src={contactImage} alt="" className="w-64 md:w-1/5"></Image>
                <section className="contact-text">
                    <section className="contact-title mx-5">
                        <p className="text-5xl mb-2">Contact support</p>
                        <p>Report troubleshooting with the application. Also a way to contact us.</p>
                    </section>
                    <section className="contacts flex flex-col items-center justify-center mt-12 gap-2">
                        <div className="mail flex gap-1 text-xl">
                            <Image src={mail} alt='' className='w-5 canInvert'></Image>
                            <Link href="mailto:2pay@gmail.com">2pay@gmail.com</Link>
                        </div>
                        <div className="phone flex gap-1 text-xl">
                            <Image src={phone} alt='' className='w-5 canInvert'></Image>
                            <Link href="tel:0877222555">+359 877 222 555</Link>
                        </div>
                    </section>
                </section>
            </section>

        </>
    )
}