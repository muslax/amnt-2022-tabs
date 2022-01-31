import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export default function Index({ dfDesa, dfResponden }: { dfDesa:any, dfResponden: any}) {
  const [desa, setDesa] = useState('');

  function daftar() {
    if (!desa) return dfResponden;

    return dfResponden.filter(item => item.desa == desa);
  }

  return (
    <div className="p-5">
      <Head>
        <title>Daftar Responden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Daftar responden Desa ${desa}`
        : 'Daftar responden seluruh desa'
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
                <td className="p-2 border-l">anggota</td>
                <td className="p-2 border-l">gender</td>
                <td className="p-2 border-l">umur</td>
                <td className="p-2 border-l">statusKeluarga</td>
                <td className="p-2 border-l">pendidikan</td>
                <td className="p-2 border-l">pekerjaanUtama</td>
                <td className="p-2 border-l">suku</td>
                <td className="p-2 border-l">agama</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res, i) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.anggota}</td>
                <td className="p-2 border-l">{res.gender}</td>
                <td className="p-2 border-l">{res.umur}</td>
                <td className="p-2 border-l">{res.statusKeluarga}</td>
                <td className="p-2 border-l">{res.pendidikan}</td>
                <td className="p-2 border-l">{res.pekerjaanUtama}</td>
                <td className="p-2 border-l">{res.suku}</td>
                <td className="p-2 border-l">{res.agama}</td>
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
  // const dfResponden = await db.collection('responden').find({}).toArray();
  const dfResponden = await db.collection('responden').aggregate([
    { $match: {}},
    { $lookup : {
      from: "anggota",
      localField: "_id",
      foreignField: "_idr",
      as: "keluarga"
    }},
    // { $unwind: "$keluarga"},
    { $project: {
      _id: 1,
      _user: 1,
      created: 1,
      entry: 1,
      enumerator: 1,
      tanggal: 1,
      desa: 1,
      gender: 1,
      nama: 1,
      tanggalLahir: 1,
      umur: 1,
      statusKeluarga: 1,
      statusMarital: 1,
      pendidikan: 1,
      jumlahKlgSerumah: 1,
      jumlahOrangSerumah: 1,
      agama: 1,
      suku: 1,
      bahasa: 1,
      lamaTinggal: 1,
      asal: 1,
      pekerjaanUtama: 1,
      pekerjaanLain: 1,
      anggota: {$size: "$keluarga"}
    }},
  ]).toArray();
  return {
    props: {
      dfDesa,
      dfResponden,
    },
    revalidate: 10,
  }
}