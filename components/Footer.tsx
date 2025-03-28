import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link href="/privacy">Privacy</Link>
              </li>
              <li className="list-inline-item">-</li>
              <li className="list-inline-item">
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
