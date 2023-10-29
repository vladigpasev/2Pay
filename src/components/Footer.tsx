import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/branding/2pay-logo-green-short.png';
import mail from '../../public/images/svg/email.svg';
import phone from '../../public/images/svg/call_phone_icon.svg'

export const Footer = () => (
  <footer className='footer p-10 bg-base-200 text-base-content'>
    <aside>
      <Link href="/"><Image src={logo} alt='' className='w-3/5'></Image></Link>
      <p>
        2Pay Inc.
        <br />
        Effective Payments since 2023
      </p>
      <div className="mail flex gap-1 justify-center items-center">
        <Image src={mail} alt='' className='w-3 canInvert'></Image>
        <Link href="mailto:2pay@gmail.com">2pay@gmail.com</Link>
      </div>
      <div className="phone flex gap-1 justify-center items-center">
        <Image src={phone} alt='' className='w-3 canInvert'></Image>
        <Link href="tel:0877222555">+359 877 222 555</Link>
      </div>
    </aside>
    <nav>
      <header className='footer-title'>Services</header>
      <Link href='/' className='link link-hover'>
        For Businesses
      </Link>
      <Link href='/' className='link link-hover'>
        For Clients
      </Link>
      <Link href='/' className='link link-hover'>
        Crypto2Pay
      </Link>
    </nav>
    <nav>
      <header className='footer-title'>2Pay</header>
      <Link href='/about' className='link link-hover'>
        About us
      </Link>
      <Link href='/contact' className='link link-hover'>
        Contact
      </Link>
      <Link href='/careers' className='link link-hover'>
        Careers
      </Link>
    </nav>
    <nav>
      <header className='footer-title'>Legal</header>
      <Link href='/' className='link link-hover'>
        Terms of use
      </Link>
      <Link href='/' className='link link-hover'>
        Privacy policy
      </Link>
      <Link href='/' className='link link-hover'>
        Cookie policy
      </Link>
    </nav>
  </footer>
);
