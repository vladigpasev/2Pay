import Image from "next/image"
import payment from '../../../public/images/pngs/payment-phone.png'
import banking from '../../../public/images/svg/Hybrid-Events-for-Financial-Services-Banking.svg'
import crypto from '../../../public/images/pngs/crypto.png'
import teamMember from '../../../public/images/pngs/team-member.png'
import aboutTitle from '../../../public/images/pngs/about-payments.png'

export default function About() {

    return (
        <>
            <section className="about-top bg-gradient-to-r from-[#00a54c] to-[#01853e] flex items-center px-10 justify-around gap-6">
                <Image src={aboutTitle} alt="" className="max-[768px]:hidden w-1/6"></Image>
                <section className="text-neutral max-[768px]:text-center">
                    <p className="text-7xl">About us.</p>
                    <p className="text-xl">Here you can get to know more about who are we and what is our mission.</p>
                </section>
            </section>
            <section className="location">
            </section>
            <section className="title pb-32">
                <p className="text-5xl py-8 text-center text-primary pt-12 pb-16">Who are we?</p>
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
            <section className="highlight-text bg-neutral text-base min-[425px]:text-2xl md:text-3xl leading-7 mb-32 py-7 text-center px-20">
                2Pay is one of the highest rising payment platforms right now! We deliver to our customers the most effective payment and e-commerce services in the region. But to make this possible, there is a team of dedicated developers, that stands behind 2Pay.
            </section>
            <section className="team pb-12">
                <p className="text-5xl text-primary text-center pb-16">Our team</p>
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