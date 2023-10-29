import Image from "next/image";
import devTeam from '../../../public/images/pngs/dev-team.jpg';
import professionals from '../../../public/images/pngs/professionals.jpg'
import frontEndPic from '../../../public/images/pngs/front-end.jpg'
import backEndPic from '../../../public/images/pngs/back-end.jpg'
import financeExpertPic from '../../../public/images/pngs/finance-expert.jpg'
import blockchainExpertPic from '../../../public/images/pngs/blockchain.jpg'

export default function Careers() {
    return (
        <>
            <section className="careers-head flex flex-col md:flex-row my-10 mx-5 md:mx-20 gap-16 justify-around items-center mb-28">
                <section className="txt">
                    <p className="text-6xl my-16">
                        Craft the way we pay
                    </p>
                    <p className="text-xl mb-9 max-w-[600px]">You enjoy our payment system? Not only that, but you know how to make it better? Then don&apos;t wait and be part of our team! Be one of the people, behind the most modern payment system so far!</p>
                    <section className="btn btn-primary m-auto">Join our team!</section>
                </section>
                <Image src={devTeam} alt="" className="rounded-2xl md:w-1/2 md:h-1/2"></Image>
            </section>
            <section className="professionals flex flex-col md:flex-row my-10 mx-5 md:mx-20 gap-16 justify-around items-center max-[768px]:flex-col-reverse">
                <Image src={professionals} alt="" className="rounded-2xl md:w-1/2 md:h-1/2"></Image>
                <section>
                    <p className="text-6xl my-16">
                        Be guided by experts
                    </p>
                    <p className="text-xl mb-9 max-w-[600px]">You feel like you know nothing? We have all been there. At 2Pay, you will be guided not just by some senior. Your guide will be just like your mentor - a supportive educator, very experienced colleague, and also - a great friend.</p>
                </section>
            </section>
            <section className="best-positions flex flex-col items-center justify-center">
                <p className="text-6xl my-16 text-center mx-5">
                    Our best job positions
                </p>
                <section className="job-positions my-12 mx-8 lg:mx-32 flex flex-col md:flex-row items-center justify-center ">
                    <div className="p-1 flex items-center justify-center">
                        <div className="relative hover-blur">
                            <Image className="rounded-lg" src={frontEndPic} alt="Your Image" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-2xl font-semibold hover-text text-center">Front-End Developer</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 flex items-center justify-center">
                        <div className="relative hover-blur">
                            <Image className="rounded-lg" src={backEndPic} alt="Your Image" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-2xl font-semibold hover-text text-center">Back-End Developer</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 flex items-center justify-center">
                        <div className="relative hover-blur">
                            <Image className="rounded-lg" src={financeExpertPic} alt="Your Image" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-2xl font-semibold hover-text text-center">Finance Specialist</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 flex items-center justify-center">
                        <div className="relative hover-blur">
                            <Image className="rounded-lg" src={blockchainExpertPic} alt="Your Image" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-2xl font-semibold hover-text text-center">Blockchain Expert</span>
                            </div>
                        </div>
                    </div>

                </section>
                <section className="btn btn-primary mb-16 text-xl">Join our team!</section>
            </section>
        </>
    )
}