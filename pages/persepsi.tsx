import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export type Datum = {
  _id: string,
  nama: string,
  desa: string,
  tahuRencana: string,
  sumberTahu: string,
  manfaatEkonomi: string[],
  pekerjaanKasar: string,
  infoPekerjaanKasar: string,
  pilihanPekerjaan: string,
  infoPilihanPekerjaan: string,
  dampakLingkungan: string,
  infoDampakLingkungan: string,
  dampakKesehatan: string,
  infoDampakKesehatan: string,
  dampakLayananPublik: string,
  infoDampakLayananPublik: string,
  dampakAdat: string,
  infoDampakAdat: string,
  dampakSignifikan: string,
  gotongroyong: string,
  infoGotongroyong: string,
  dukungan: string,
  infoDukungan: string,
  aktivitas: string,
  infoAktivitas: string,
}

export default function Index({ dfDesa, dfItems }: { dfDesa:any, dfItems: any}) {
  const [desa, setDesa] = useState('');

  function daftar() {
    if (!desa) return dfItems;

    return dfItems.filter((item: any) => item.desa == desa);
  }

  function parseArray(arr: string[]) {
    let array = [];
    for (let x in arr) {
      if (! arr[x].startsWith("-")) array.push(arr[x]);
    }
    return array.join(" / ");
  }

  return (
    <div className="p-5">
      <Head>
        <title>Persepsi Masyarakat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Data Persepsi Desa ${desa}`
        : 'Data Persepsi seluruh desa'
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
                <td className="p-2 border-l">nama</td>
                <td className="p-2 border-l">desa</td>
                <td className="p-2 border-l">tahuRencana</td>
                <td className="p-2 border-l">sumberTahu</td>
                <td className="p-2 border-l">manfaatEkonomi</td>
                <td className="p-2 border-l">pekerjaanKasar</td>
                <td className="p-2 border-l">infoPekerjaanKasar</td>
                <td className="p-2 border-l">pilihanPekerjaan</td>
                <td className="p-2 border-l">infoPilihanPekerjaan</td>
                <td className="p-2 border-l">dampakLingkungan</td>
                <td className="p-2 border-l">infoDampakLingkungan</td>
                <td className="p-2 border-l">dampakKesehatan</td>
                <td className="p-2 border-l">infoDampakKesehatan</td>
                <td className="p-2 border-l">dampakLayananPublik</td>
                <td className="p-2 border-l">infoDampakLayananPublik</td>
                <td className="p-2 border-l">dampakAdat</td>
                <td className="p-2 border-l">infoDampakAdat</td>
                <td className="p-2 border-l">dampakSignifikan</td>
                <td className="p-2 border-l">gotongroyong</td>
                <td className="p-2 border-l">infoGotongroyong</td>
                <td className="p-2 border-l">dukungan</td>
                <td className="p-2 border-l">infoDukungan</td>
                <td className="p-2 border-l">aktivitas</td>
                <td className="p-2 border-l">infoAktivitas</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:Datum, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.desa}</td>
                <td className="p-2 border-l">{res.tahuRencana}</td>
                <td className="p-2 border-l">{res.sumberTahu}</td>
                <td className="p-2 border-l">{parseArray(res.manfaatEkonomi)}</td>
                <td className="p-2 border-l">{res.pekerjaanKasar}</td>
                <td className="p-2 border-l">{res.infoPekerjaanKasar}</td>
                <td className="p-2 border-l">{res.pilihanPekerjaan}</td>
                <td className="p-2 border-l">{res.infoPilihanPekerjaan}</td>
                <td className="p-2 border-l">{res.dampakLingkungan}</td>
                <td className="p-2 border-l">{res.infoDampakLingkungan}</td>
                <td className="p-2 border-l">{res.dampakKesehatan}</td>
                <td className="p-2 border-l">{res.infoDampakKesehatan}</td>
                <td className="p-2 border-l">{res.dampakLayananPublik}</td>
                <td className="p-2 border-l">{res.infoDampakLayananPublik}</td>
                <td className="p-2 border-l">{res.dampakAdat}</td>
                <td className="p-2 border-l">{res.infoDampakAdat}</td>
                <td className="p-2 border-l">{res.dampakSignifikan}</td>
                <td className="p-2 border-l">{res.gotongroyong}</td>
                <td className="p-2 border-l">{res.infoGotongroyong}</td>
                <td className="p-2 border-l">{res.dukungan}</td>
                <td className="p-2 border-l">{res.infoDukungan}</td>
                <td className="p-2 border-l">{res.aktivitas}</td>
                <td className="p-2 border-l">{res.infoAktivitas}</td>
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
  const dfItems = await db.collection('konflik').aggregate([
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
      "nama": "$responden.nama",
      "desa": "$responden.desa",
      tahuRencana: 1,
      sumberTahu: 1,
      manfaatEkonomi: 1,
      pekerjaanKasar: 1,
      infoPekerjaanKasar: 1,
      pilihanPekerjaan: 1,
      infoPilihanPekerjaan: 1,
      dampakLingkungan: 1,
      infoDampakLingkungan: 1,
      dampakKesehatan: 1,
      infoDampakKesehatan: 1,
      dampakLayananPublik: 1,
      infoDampakLayananPublik: 1,
      dampakAdat: 1,
      infoDampakAdat: 1,
      dampakSignifikan: 1,
      gotongroyong: 1,
      infoGotongroyong: 1,
      dukungan: 1,
      infoDukungan: 1,
      aktivitas: 1,
      infoAktivitas: 1,
    }}
  ]).toArray();

  return {
    props: {
      dfDesa,
      dfItems,
    },
    revalidate: 10,
  }
  }