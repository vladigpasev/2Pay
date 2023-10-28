import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/branding/2pay-logo-green-short.png'

export const Footer = () => (
  <footer className='footer p-10 bg-base-200 text-base-content'>
    <aside>
      <Link href="/"><Image src={logo} alt='' className='w-3/5'></Image></Link>
      <p>
        2Pay Inc.
        <br />
        Effective Payments since 2023
      </p>
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
      <Link href='/' className='link link-hover'>
        Others
      </Link>
    </nav>
    <nav>
      <header className='footer-title'>2Pay</header>
      <Link href='/' className='link link-hover'>
        About us
      </Link>
      <Link href='/' className='link link-hover'>
        Contact
      </Link>
      <Link href='/' className='link link-hover'>
        Careers
      </Link>
      <Link href='/' className='link link-hover'>
        Press kit
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
