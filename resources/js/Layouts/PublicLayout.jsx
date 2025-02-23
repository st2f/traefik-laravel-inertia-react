
import { Link, usePage } from '@inertiajs/react';
import { Helmet,HelmetProvider } from 'react-helmet-async';

export default function Public({ title,children }) {

  const props = usePage().props;
  const pageTitle = `${ title } - ${ props.appName }`;

  //console.log(props);

  return (
  <>
    <HelmetProvider>
    <Helmet>
      <title>{ pageTitle }</title>
    </Helmet>
    </HelmetProvider>
    <div className="bg-gray-100">
    
    {route().current() == 'home' ?
    <div className="sm:container sm:mx-auto px-3 bg-gray-100 py-10">
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

    <div className="mx-auto bg-white overflow-hidden md:max-w-3xl px-3">
    <article >{ children }</article>
    </div>
      
    <div className="bg-gray-100">
    <div className="md:container md:mx-auto px-3 bg-gray-100 py-5">
      <footer>
        
        {route().current() == 'home' ?
        '' 
        : 
        <Link href={route('home')}>@</Link>
        }
      </footer>
    </div>
    </div> 
  </>
  )
}