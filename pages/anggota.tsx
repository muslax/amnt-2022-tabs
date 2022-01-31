import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export default function Index({ dfDesa, dfAnggota }) {
  const [desa, setDesa] = useState('');

  function daftar() {
    if (!desa) return dfAnggota;

    return dfAnggota.filter(item => item.desa == desa);
  }

  return (
    <div className="p-5">
      <Head>
        <title>Daftar Anggota Keluarga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Daftar anggota keluarga Desa ${desa}`
        : 'Daftar anggota keluarga seluruh desa'
      }</h1>

      <select className="py-1" onChange={(e) => setDesa(e.target.value)}>
        <option value="">- Semua</option>
        {dfDesa.map(d => (
          <option key={d._id} value={d.nama}>{d.nama}</option>
        ))}
      </select>
      <span className="ml-2">{daftar().length}</span>

      <div className="border border-gray-400 overflow-auto my-5 mb-36">
        {! daftar().length && <p className="p-2">Tidak ada data</p>}
        {daftar().length > 0 && (
          <table className="w-full text-[12px] whitespace-nowrap">
            <tbody>
              <tr className="bg-gray-100 border-b font-semibold">
                <td className="p-2">#</td>
                <td className="p-2 border-l">nama</td>
                <td className="p-2 border-l">gender</td>
                <td className="p-2 border-l">umur</td>
                <td className="p-2 border-l">hubungan</td>
                <td className="p-2 border-l">pendidikan</td>
                <td className="p-2 border-l">melekHuruf</td>
                <td className="p-2 border-l">pekerjaanUtama</td>
                <td className="p-2 border-l">pekerjaanLain</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res, i) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.gender}</td>
                <td className="p-2 border-l">{res.umur}</td>
                <td className="p-2 border-l">{res.hubungan}</td>
                <td className="p-2 border-l">{res.pendidikan}</td>
                <td className="p-2 border-l">{res.melekHuruf}</td>
                <td className="p-2 border-l">{res.pekerjaanUtama}</td>
                <td className="p-2 border-l">{res.pekerjaanLain}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

export async function getStaticProps() {
  const { db } = await connect();
  const dfDesa = await db.collection('desa').find({}).sort('nama').toArray();
  // const dfResponden = await db.collection('anggota').find({}).toArray();
  const dfAnggota = await db.collection('anggota').aggregate([
    { $match: {}},
    { $lookup : {
      from: "responden",
      localField: "_idr",
      foreignField: "_id",
      as: "keluarga"
    }},
    { $unwind: "$keluarga"},
    { $project: {
      _id: 1,
      _idr: 1,
      nama: 1,
      hubungan: 1,
      gender: 1,
      marital: 1,
      umur: 1,
      melekHuruf: 1,
      pendidikan: 1,
      pekerjaanUtama: 1,
      pekerjaanLain: 1,
      "desa": "$keluarga.desa",
      "keluarga.desa": 1,
    }}
  ]).toArray();

  return {
    props: {
      dfDesa,
      dfAnggota,
    },
    revalidate: 10,
  }
}