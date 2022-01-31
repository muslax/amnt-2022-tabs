import Head from 'next/head'
import Link from 'next/link'

const pages = [
  { href: "/perdesa", title: "Daftar responden" },
  { href: "/anggota", title: "Daftar anggota keluarga" },
  { href: "/aset", title: "Daftar aset" },
  { href: "/ekonomi", title: "Ekonomi keluarga" },
]

export default function Home() {
  return (
    <div className='p-5'>
      <Head>
        <title>Tabulasi AMNT 2022</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <p className="text-gray-400 mb-2">
          AMNT 2022&nbsp;
        </p>

        <h1 className="text-lg font-bold mb-6">Daftar Tabulasi</h1>

        {pages.map((p, i) => (
          <li key={p.href}>
            <Link href={p.href}>
              <a className='text-sky-500 hover:underline hover:text-sky-600'>{p.title}</a>
            </Link>
          </li>
        ))}
      </div>
    </div>
  )
}
