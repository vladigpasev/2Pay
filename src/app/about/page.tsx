import Image from "next/image"
import payment from '../../../public/images/pngs/payment-phone.png'
import banking from '../../../public/images/svg/Hybrid-Events-for-Financial-Services-Banking.svg'
import crypto from '../../../public/images/pngs/crypto.png'
import teamMember from '../../../public/images/pngs/team-member.png'

export default function About() {
    return (
        <>
            <section className="title pb-32">
                <p className="text-6xl py-8 text-center text-primary pt-12 pb-16">Who are we?</p>
                <section className="items flex flex-col min-[900px]:flex-row gap-20 items-center justify-center md:mx-28">
                    <section className="flex flex-col items-center justify-center">
                        <Image src={payment} alt='' className="w-64 min-[900px]:w-3/5"></Image>
                        <p className="text-2xl">Direct Payments</p>
                        <p className="text-lg text-center px-8">We are a team that develops system for direct payment. For an era, where all your payments happen from one place.</p>
                    </section>
                    <section className="flex flex-col items-center justify-center">
                        <Image src={banking} alt='' className="w-64 min-[900px]:w-2/3"></Image>
                        <p className="text-2xl">Free transactions</p>
                        <p className="text-lg text-center px-8">We stand for transactions, which happen in matter of seconds. We make e-commerce fast, easy and effective.</p>
                    </section>
                    <section className="flex flex-col items-center justify-center">
                        <Image src={crypto} alt='' className="w-64 min-[900px]:w-2/5"></Image>
                        <p className="text-2xl">Secure Banking</p>
                        <p className="text-lg text-center px-8">Security is our middle name. Our payment system makes every single transfer of money safe from violators.</p>
                    </section>
                </section>
            </section>
            <section className="team pb-12">
                <p className="text-6xl text-primary text-center pb-16">Our team</p>
                <section className="team-members flex flex-col min-[1280px]:flex-row gap-40 items-center justify-center md:mx-28">
                    <section className="flex flex-col items-center justify-center">
                        <Image src={teamMember} alt="" className="w-64"></Image>
                        <p className="text-3xl">Vladimir Pasev</p>
                        <p className="text-lg">Front-End Developer</p>
                    </section>
                    <section className="flex flex-col items-center justify-center">
                        <Image src={teamMember} alt="" className="w-64"></Image>
                        <p className="text-3xl">Vladimir Pasev</p>
                        <p className="text-lg">Front-End Developer</p>
                    </section>
                    <section className="flex flex-col items-center justify-center">
                        <Image src={teamMember} alt="" className="w-64"></Image>
                        <p className="text-3xl">Vladimir Pasev</p>
                        <p className="text-lg">Front-End Developer</p>
                    </section>
                    <section className="flex flex-col items-center justify-center">
                        <Image src={teamMember} alt="" className="w-64"></Image>
                        <p className="text-3xl">Vladimir Pasev</p>
                        <p className="text-lg">Front-End Developer</p>
                    </section>
                </section>
            </section>
        </>
    )
}