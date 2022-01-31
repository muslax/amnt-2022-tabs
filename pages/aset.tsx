import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export default function Index({ dfDesa, dfAset }: { dfDesa:any, dfAset: any}) {
  const [desa, setDesa] = useState('');

  function daftar() {
    if (!desa) return dfAset;

    return dfAset.filter((item: any) => item.desa == desa);
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
        {dfDesa.map((d:any) => (
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
                <td className="p-2 border-l">jenis</td>
                <td className="p-2 border-l">luas</td>
                <td className="p-2 border-l">ruang</td>
                <td className="p-2 border-l">statusRumah</td>
                <td className="p-2 border-l">buktiStatus</td>
                <td className="p-2 border-l">luasTanah</td>
                <td className="p-2 border-l">luasBangunan</td>
                <td className="p-2 border-l">luasProduktif</td>
                <td className="p-2 border-l">luasNonProduktif</td>
                <td className="p-2 border-l">luasLainnya</td>
                <td className="p-2 border-l">mobil</td>
                <td className="p-2 border-l">motor</td>
                <td className="p-2 border-l">perahuMesin</td>
                <td className="p-2 border-l">perahuNonMesin</td>
                <td className="p-2 border-l">traktor</td>
                <td className="p-2 border-l">sumberListrik</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:any, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.jenis}</td>
                <td className="p-2 border-l">{res.luas}</td>
                <td className="p-2 border-l">{res.ruang}</td>
                <td className="p-2 border-l">{res.statusRumah}</td>
                <td className="p-2 border-l">{res.buktiStatus}</td>
                <td className="p-2 border-l">{res.luasTanah}</td>
                <td className="p-2 border-l">{res.luasBangunan}</td>
                <td className="p-2 border-l">{res.luasProduktif}</td>
                <td className="p-2 border-l">{res.luasNonProduktif}</td>
                <td className="p-2 border-l">{res.luasLainnya}</td>
                <td className="p-2 border-l">{res.mobil}</td>
                <td className="p-2 border-l">{res.motor}</td>
                <td className="p-2 border-l">{res.perahuMesin}</td>
                <td className="p-2 border-l">{res.perahuNonMesin}</td>
                <td className="p-2 border-l">{res.traktor}</td>
                <td className="p-2 border-l">{res.sumberListrik}</td>
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
  const dfAset = await db.collection('aset').aggregate([
    { $match: {}},
    { $lookup : {
      from: "responden",
      localField: "_id",
      foreignField: "_id",
      as: "responden"
    }},
    { $unwind: "$responden"},
    { $project: {
      _id: 1,
      jenis: 1,
      luas: 1,
      ruang: 1,
      statusRumah: 1,
      buktiStatus: 1,
      luasTanah: 1,
      luasBangunan: 1,
      luasProduktif: 1,
      luasNonProduktif: 1,
      luasLainnya: 1,
      mobil: 1,
      motor: 1,
      perahuMesin: 1,
      perahuNonMesin: 1,
      traktor: 1,
      sumberListrik: 1,
      "nama": "$responden.nama",
    }}
  ]).toArray();

  return {
    props: {
      dfDesa,
      dfAset,
    },
    revalidate: 10,
  }
}