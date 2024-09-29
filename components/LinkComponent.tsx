import Link from 'next/link';

interface LinkProps {
  href: string;
  page: string;
  className?: string;
}

const LinkComponent: React.FC<LinkProps> = ({ href, page, className }) => {
  return (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
};

export default LinkComponent;
