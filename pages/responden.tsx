import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Card from "../components/card";
import { connect } from "../utils/mongo"
import { extract } from "../utils/utils";

export default function Index(
  { dfDesa, dfResponden, aggregate }:
  { dfDesa:any, dfResponden: any, aggregate:any}
) {
  const [desa, setDesa] = useState('');
  // const [pendidikan, setPendidikan] = useState({});

  function daftar() {
    if (!desa) return dfResponden;

    return dfResponden.filter((item:any) => item.desa == desa);
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

      <div className="overflow-x-auto mb-6">
        <Card label="Jenis kelamin" data={aggregate.gender} />
        <Card label="Status keluarga" data={aggregate.statusKeluarga} />
        <Card label="Pendidikan" data={aggregate.pendidikan} />
        <Card label="Pekerjaan utama" data={aggregate.pekerjaanUtama} />
        <Card label="Pekerjaan lain" data={aggregate.pekerjaanLain} />
        <Card label="Suku" data={aggregate.suku} />
        <Card label="Agama" data={aggregate.agama} />
      </div>

      {/* <pre className="text-xs">{JSON.stringify(aggregate, null, 2)}</pre> */}
      {/* <pre className="text-xs">Status keluarga {JSON.stringify(aggregate.statusKeluarga, null, 2)}</pre> */}

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
                <td className="p-2 border-l">nama</td>
                <td className="p-2 border-l">anggota</td>
                <td className="p-2 border-l">bahasa</td>
                <td className="p-2 border-l">lamaTinggal</td>
                <td className="p-2 border-l">asal</td>
                <td className="p-2 border-l">gender</td>
                <td className="p-2 border-l">umur</td>
                <td className="p-2 border-l">statusKeluarga</td>
                <td className="p-2 border-l">pendidikan</td>
                <td className="p-2 border-l">pekerjaanUtama</td>
                <td className="p-2 border-l">pekerjaanLain</td>
                <td className="p-2 border-l">suku</td>
                <td className="p-2 border-l">agama</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:any, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.desa}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.anggota}</td>
                <td className="p-2 border-l">{res.bahasa}</td>
                <td className="p-2 border-l">{res.lamaTinggal}</td>
                <td className="p-2 border-l">{res.asal}</td>
                <td className="p-2 border-l">{res.gender}</td>
                <td className="p-2 border-l">{res.umur}</td>
                <td className="p-2 border-l">{res.statusKeluarga}</td>
                <td className="p-2 border-l">{res.pendidikan}</td>
                <td className="p-2 border-l">{res.pekerjaanUtama}</td>
                <td className="p-2 border-l">{res.pekerjaanLain}</td>
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

  const pekerjaanUtama = extract(dfResponden, 'pekerjaanUtama');
  const pekerjaanLain = extract(dfResponden, 'pekerjaanLain');
  const pendidikan = extract(dfResponden, 'pendidikan');
  const statusKeluarga = extract(dfResponden, 'statusKeluarga');
  const gender = extract(dfResponden, 'gender');
  const suku = extract(dfResponden, 'suku');
  const agama = extract(dfResponden, 'agama');

  return {
    props: {
      dfDesa,
      dfResponden,
      aggregate: {
        gender,
        statusKeluarga,
        pendidikan,
        pekerjaanUtama,
        pekerjaanLain,
        suku,
        agama,
      }
    },
    revalidate: 10,
  }
}