import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export type Datum = {
  _id: string,
  nama: string,
  desa: string,
  // isNelayan: string,
  polaMencari: string,
  frekuensi: string,
  lokasi: string[],
  hasil: string,
  perbedaan: string,
  infoPerbedaan: string,
  dampakTailing: string,
  kualitasHasil: string,
  infoKualitas: string,
  jikaTailingMengganggu: string,
  minatUbahPencaharian: string,
  infoMinatUbahPencaharian: string,
  minatPelatihan: string,
  infoMinatPelatihan: string,
  minatMenjadiNelayanLaut: string,
  infoMinatMenjadiNelayanLaut: string,
  yangDilakukanAMNT: string,
  harapanUntukAMNT: string,
  harapanUntukPemerintah: string,
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
        <title>Responden Nelayan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Responden nelayan Desa ${desa}`
        : 'Responden nelayan seluruh desa'
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
                <td className="p-2 border-l">polaMencari</td>
                <td className="p-2 border-l">frekuensi</td>
                <td className="p-2 border-l">lokasi</td>
                <td className="p-2 border-l">hasil</td>
                <td className="p-2 border-l">perbedaan</td>
                <td className="p-2 border-l">infoPerbedaan</td>
                <td className="p-2 border-l">dampakTailing</td>
                <td className="p-2 border-l">kualitasHasil</td>
                <td className="p-2 border-l">infoKualitas</td>
                <td className="p-2 border-l">jikaTailingMengganggu</td>
                <td className="p-2 border-l">minatUbahPencaharian</td>
                <td className="p-2 border-l">infoMinatUbahPencaharian</td>
                <td className="p-2 border-l">minatPelatihan</td>
                <td className="p-2 border-l">infoMinatPelatihan</td>
                <td className="p-2 border-l">minatMenjadiNelayanLaut</td>
                <td className="p-2 border-l">infoMinatMenjadiNelayanLaut</td>
                <td className="p-2 border-l">yangDilakukanAMNT</td>
                <td className="p-2 border-l">harapanUntukAMNT</td>
                <td className="p-2 border-l">harapanUntukPemerintah</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:Datum, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.desa}</td>
                <td className="p-2 border-l">{res.polaMencari}</td>
                <td className="p-2 border-l">{res.frekuensi}</td>
                <td className="p-2 border-l">{parseArray(res.lokasi)}</td>
                <td className="p-2 border-l">{res.hasil}</td>
                <td className="p-2 border-l">{res.perbedaan}</td>
                <td className="p-2 border-l">{res.infoPerbedaan}</td>
                <td className="p-2 border-l">{res.dampakTailing}</td>
                <td className="p-2 border-l">{res.kualitasHasil}</td>
                <td className="p-2 border-l">{res.infoKualitas}</td>
                <td className="p-2 border-l">{res.jikaTailingMengganggu}</td>
                <td className="p-2 border-l">{res.minatUbahPencaharian}</td>
                <td className="p-2 border-l">{res.infoMinatUbahPencaharian}</td>
                <td className="p-2 border-l">{res.minatPelatihan}</td>
                <td className="p-2 border-l">{res.infoMinatPelatihan}</td>
                <td className="p-2 border-l">{res.minatMenjadiNelayanLaut}</td>
                <td className="p-2 border-l">{res.infoMinatMenjadiNelayanLaut}</td>
                <td className="p-2 border-l">{res.yangDilakukanAMNT}</td>
                <td className="p-2 border-l">{res.harapanUntukAMNT}</td>
                <td className="p-2 border-l">{res.harapanUntukPemerintah}</td>
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
  const dfItems = await db.collection('nelayan').aggregate([
    { $match: { isNelayan: true}},
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
      polaMencari: 1,
      frekuensi: 1,
      lokasi: 1,
      hasil: 1,
      perbedaan: 1,
      infoPerbedaan: 1,
      dampakTailing: 1,
      kualitasHasil: 1,
      infoKualitas: 1,
      jikaTailingMengganggu: 1,
      minatUbahPencaharian: 1,
      infoMinatUbahPencaharian: 1,
      minatPelatihan: 1,
      infoMinatPelatihan: 1,
      minatMenjadiNelayanLaut: 1,
      infoMinatMenjadiNelayanLaut: 1,
      yangDilakukanAMNT: 1,
      harapanUntukAMNT: 1,
      harapanUntukPemerintah: 1,
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