import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export type Datum = {
  _id: string,
  nama: string,
  desa: string,
  penyakit: string[],
  stunting: string,
  infoStunting: string,
  wabah: string[],
  tempatBerobat: string,
  aksesFaskes: string,
  biaya: string,
  kisbpjs: string[],
  kualitasLayanan: string,
  sumberAirMinum: string,
  merebusAirMinum: string,
  konsumsiPerHari: string,
  sumberAirBersih: string,
  masalahAir: string,
  penyelesaianMasalahAir: string,
  saranaBAB: string,
  saranaLimbahCair: string,
  pengolahanSampah: string,
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
        <title>Kesehatan Masyarakat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Data Kesmas Desa ${desa}`
        : 'Data Kesmas seluruh desa'
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
                <td className="p-2 border-l">penyakit</td>
                <td className="p-2 border-l">stunting</td>
                <td className="p-2 border-l">infoStunting</td>
                <td className="p-2 border-l">wabah</td>
                <td className="p-2 border-l">tempatBerobat</td>
                <td className="p-2 border-l">aksesFaskes</td>
                <td className="p-2 border-l">biaya</td>
                <td className="p-2 border-l">kisbpjs</td>
                <td className="p-2 border-l">kualitasLayanan</td>
                <td className="p-2 border-l">sumberAirMinum</td>
                <td className="p-2 border-l">merebusAirMinum</td>
                <td className="p-2 border-l">konsumsiPerHari</td>
                <td className="p-2 border-l">sumberAirBersih</td>
                <td className="p-2 border-l">masalahAir</td>
                <td className="p-2 border-l">penyelesaianMasalahAir</td>
                <td className="p-2 border-l">saranaBAB</td>
                <td className="p-2 border-l">saranaLimbahCair</td>
                <td className="p-2 border-l">pengolahanSampah</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:Datum, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.desa}</td>
                <td className="p-2 border-l">{parseArray(res.penyakit)}</td>
                <td className="p-2 border-l">{res.stunting}</td>
                <td className="p-2 border-l">{res.infoStunting}</td>
                <td className="p-2 border-l">{parseArray(res.wabah)}</td>
                <td className="p-2 border-l">{res.tempatBerobat}</td>
                <td className="p-2 border-l">{res.aksesFaskes}</td>
                <td className="p-2 border-l">{res.biaya}</td>
                <td className="p-2 border-l">{parseArray(res.kisbpjs)}</td>
                <td className="p-2 border-l">{res.kualitasLayanan}</td>
                <td className="p-2 border-l">{res.sumberAirMinum}</td>
                <td className="p-2 border-l">{res.merebusAirMinum}</td>
                <td className="p-2 border-l">{res.konsumsiPerHari}</td>
                <td className="p-2 border-l">{res.sumberAirBersih}</td>
                <td className="p-2 border-l">{res.masalahAir}</td>
                <td className="p-2 border-l">{res.penyelesaianMasalahAir}</td>
                <td className="p-2 border-l">{res.saranaBAB}</td>
                <td className="p-2 border-l">{res.saranaLimbahCair}</td>
                <td className="p-2 border-l">{res.pengolahanSampah}</td>
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
  const dfItems = await db.collection('kesmas').aggregate([
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
      penyakit: 1,
      stunting: 1,
      infoStunting: 1,
      wabah: 1,
      tempatBerobat: 1,
      aksesFaskes: 1,
      biaya: 1,
      kisbpjs: 1,
      kualitasLayanan: 1,
      sumberAirMinum: 1,
      merebusAirMinum: 1,
      konsumsiPerHari: 1,
      sumberAirBersih: 1,
      masalahAir: 1,
      penyelesaianMasalahAir: 1,
      saranaBAB: 1,
      saranaLimbahCair: 1,
      pengolahanSampah: 1,
      "nama": "$responden.nama",
      "desa": "$responden.desa",
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