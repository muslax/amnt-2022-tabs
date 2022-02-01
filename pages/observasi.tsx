import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export type Datum = {
  _id: string,
  nama: string,
  desa: string,
  genangan: string,
  jentik: string,
  vektor: string,
  kebersihan: string,
  kelompokSampah: string[],
  plafon: string,
  dinding: string,
  lantai: string,
  jendelaKamar: string,
  jendelaKeluarga: string,
  ventilasi: string,
  pencahayaan: string,
  konsumsiSayur: string,
  olahraga: string,
  kebersihanDiri: string[],
  perokok: string,
  tempatMerokok: string,
  konsumsiMiras: string,
  dampakMiras: string[],
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
        <title>Observasi Lingkungan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Data Observasi Desa ${desa}`
        : 'Data Observasi seluruh desa'
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
                <td className="p-2 border-l">genangan</td>
                <td className="p-2 border-l">jentik</td>
                <td className="p-2 border-l">vektor</td>
                <td className="p-2 border-l">kebersihan</td>
                <td className="p-2 border-l">kelompokSampah</td>
                <td className="p-2 border-l">plafon</td>
                <td className="p-2 border-l">dinding</td>
                <td className="p-2 border-l">lantai</td>
                <td className="p-2 border-l">jendelaKamar</td>
                <td className="p-2 border-l">jendelaKeluarga</td>
                <td className="p-2 border-l">ventilasi</td>
                <td className="p-2 border-l">pencahayaan</td>
                <td className="p-2 border-l">konsumsiSayur</td>
                <td className="p-2 border-l">olahraga</td>
                <td className="p-2 border-l">kebersihanDiri</td>
                <td className="p-2 border-l">perokok</td>
                <td className="p-2 border-l">tempatMerokok</td>
                <td className="p-2 border-l">konsumsiMiras</td>
                <td className="p-2 border-l">dampakMiras</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:Datum, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.desa}</td>
                <td className="p-2 border-l">{res.genangan}</td>
                <td className="p-2 border-l">{res.jentik}</td>
                <td className="p-2 border-l">{res.vektor}</td>
                <td className="p-2 border-l">{res.kebersihan}</td>
                <td className="p-2 border-l">{parseArray(res.kelompokSampah)}</td>
                <td className="p-2 border-l">{res.plafon}</td>
                <td className="p-2 border-l">{res.dinding}</td>
                <td className="p-2 border-l">{res.lantai}</td>
                <td className="p-2 border-l">{res.jendelaKamar}</td>
                <td className="p-2 border-l">{res.jendelaKeluarga}</td>
                <td className="p-2 border-l">{res.ventilasi}</td>
                <td className="p-2 border-l">{res.pencahayaan}</td>
                <td className="p-2 border-l">{res.konsumsiSayur}</td>
                <td className="p-2 border-l">{res.olahraga}</td>
                <td className="p-2 border-l">{parseArray(res.kebersihanDiri)}</td>
                <td className="p-2 border-l">{res.perokok}</td>
                <td className="p-2 border-l">{res.tempatMerokok}</td>
                <td className="p-2 border-l">{res.konsumsiMiras}</td>
                <td className="p-2 border-l">{parseArray(res.dampakMiras)}</td>
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
  const dfItems = await db.collection('observasi').aggregate([
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
      genangan: 1,
      jentik: 1,
      vektor: 1,
      kebersihan: 1,
      kelompokSampah: 1,
      plafon: 1,
      dinding: 1,
      lantai: 1,
      jendelaKamar: 1,
      jendelaKeluarga: 1,
      ventilasi: 1,
      pencahayaan: 1,
      konsumsiSayur: 1,
      olahraga: 1,
      kebersihanDiri: 1,
      perokok: 1,
      tempatMerokok: 1,
      konsumsiMiras: 1,
      dampakMiras: 1,
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