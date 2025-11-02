import { Link, usePage } from '@inertiajs/react';
import { Helmet,HelmetProvider } from 'react-helmet-async';

export default function Public({ title,children }) {

  const props = usePage().props;
  const pageTitle = `${ title } - ${ props.appName }`;

  return (
  <>
    <HelmetProvider>
    <Helmet>
      <title>{ pageTitle }</title>
    </Helmet>
    </HelmetProvider>
    <div className="bg-gray-100">

    {route().current() == 'home' ?
    <div className="sm:container sm:mx-auto px-3 bg-gray-100 py-5">
      <header>
      <h1>Type.in</h1>
      </header>
    </div>
    :
    <div className="sm:container sm:mx-auto px-3 bg-gray-100 py-4">
      <header>
      <Link href={route('home')}>Home</Link>
      </header>
    </div>
    }

    </div>

    <div className="mx-auto bg-white overflow-hidden md:max-w-3xl px-3 pb-3">
      <article >{ children }</article>
    </div>

    <div className="bg-gray-100">
    <div className="md:container md:mx-auto px-3 bg-gray-100 py-5 pb">
      <footer>
        <div className="grid grid-cols-2 place-content-stretch gap-4 ...">
          <div>
          {route().current() !== 'home' &&
            <Link href={route('home')}>@</Link>
          }
          </div>
          <div className="text-right pr-1">
          {props.auth.user &&
            <Link href={route('dashboard')}>Admin</Link>
          }
          </div>
        </div>
      </footer>
    </div>
    </div>
  </>
  )
}
