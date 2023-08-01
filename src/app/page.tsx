import {cookies} from 'next/headers';
import Link from 'next/link';

export default function Home(){
    const cookieStore=cookies();
    const token=cookieStore.get('token');

    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
          <ul>
            {!token&&
            <li>
                <Link href='/login'>Login</Link>
            </li>
            }
            {!token&&
            <li>
                <Link href='/signup'>Signup</Link>
            </li>
            }
            {token&&
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            }
          </ul>
        </div>
    )
}