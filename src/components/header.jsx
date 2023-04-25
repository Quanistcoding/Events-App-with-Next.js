import Link from 'next/link';

export default function Header(){
  return (
    <header>
      <div>
        <div className="topNav">
          
          <nav>
            <ul>
              <li>
                <Link href="/">
                   Home
                </Link>
              </li>
              <li>
                <Link href="/">
                   Events
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                    About us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="title"> Sed ut perspiciatis unde omnis</p>
      </div>
    </header>
  );
};
