import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Card from "../components/card";
import { connect } from "../utils/mongo"
import { extract } from "../utils/utils";

export default function Index(
  { dfDesa, dfItem, aggregate }:
  { dfDesa:any, dfItem: any, aggregate:any}
) {
  const [desa, setDesa] = useState('');

  function daftar() {
    if (!desa) return dfItem;

    return dfItem.filter((item: any) => item.desa == desa);
  }

  return (
    <div className="p-5">
      <Head>
        <title>Data Tanaman</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Data tanaman Desa ${desa}`
        : 'Data tanaman seluruh desa'
      }</h1>

      <div className="overflow-x-auto mb-6">
        {/* <Card label="Jenis kelamin" data={aggregate.gender} />
        <Card label="Hubungan" data={aggregate.hubungan} />
        <Card label="Pendidikan" data={aggregate.pendidikan} />
        <Card label="Pekerjaan utama" data={aggregate.pekerjaanUtama} />
        <Card label="Pekerjaan lain" data={aggregate.pekerjaanLain} /> */}
      </div>

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
                <td className="p-2 border-l">desa</td>
                <td className="p-2 border-l">responden</td>
                <td className="p-2 border-l">jenis</td>
                <td className="p-2 border-l">luas</td>
                <td className="p-2 border-l">dikonsumsi</td>
                <td className="p-2 border-l">dijual</td>
                <td className="p-2 border-l">nilai</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:any, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.desa}</td>
                <td className="p-2 border-l">{res.responden}</td>
                <td className="p-2 border-l">{res.jenis}</td>
                <td className="p-2 border-l">{res.luas}</td>
                <td className="p-2 border-l">{res.dikonsumsi}</td>
                <td className="p-2 border-l">{res.dijual}</td>
                <td className="p-2 border-l">{res.nilai}</td>
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
  const dfItem = await db.collection('tanaman').aggregate([
    { $match: {}},
    { $lookup : {
      from: "responden",
      localField: "_idr",
      foreignField: "_id",
      as: "responden"
    }},
    { $unwind: "$responden"},
    { $project: {
      _id: 1,
      _idr: 1,
      jenis: 1,
      luas: 1,
      dikonsumsi: 1,
      dijual: 1,
      nilai: 1,
      "responden": "$responden.nama",
      "desa": "$responden.desa",
    }}
  ]).toArray();

  // const gender = extract(dfItem, 'gender');
  // const hubungan = extract(dfItem, 'hubungan');
  // const pendidikan = extract(dfItem, 'pendidikan');
  // const melekHuruf = extract(dfItem, 'melekHuruf');
  // const pekerjaanUtama = extract(dfItem, 'pekerjaanUtama');
  // const pekerjaanLain = extract(dfItem, 'pekerjaanLain');

  return {
    props: {
      dfDesa,
      dfItem,
      // aggregate: {
      //   gender, hubungan, pendidikan, melekHuruf, pekerjaanUtama, pekerjaanLain,
      // }
    },
    revalidate: 10,
  }
}