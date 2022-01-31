import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "../utils/mongo"

export type Datum = {
  _id: string,
  nama: string,
  desa: string,
  minatKerjaDiAMNT: string,
  pernahMelamarAMNT: string,
  minatPelatihan: string,
  jenisPelatihan: string,
  pendapatanPerBulan: string,
  sumberPendapatan: string[],
  belanjaPerBulan: number,
  belanjaKonsumsi: number,
  belanjaKesehatan: number,
  belanjaPendidikan: number,
  belanjaKomunikasi: number,
  belanjaTransportasi: number,
  belanjaSewaRumah: number,
  belanjaListrik: number,
  belanjaCicilan: number,
  belanjaLainnya: number,
  tabungan: string,
  jumlahTabungan: number,
  tempatTabungan: string,
  kecukupanPendapatan: string,
  caraPemenuhanKebutuhan: string,
}

export default function Index({ dfDesa, dfItems }: { dfDesa:any, dfItems: any}) {
  const [desa, setDesa] = useState('');

  function daftar() {
    if (!desa) return dfItems;

    return dfItems.filter((item: any) => item.desa == desa);
  }

  return (
    <div className="p-5">
      <Head>
        <title>Ekonomi Keluarga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-2">
        <Link href="/">
          <a className="text-sky-500">Home</a>
        </Link>&nbsp;
      </p>

      <h1 className="text-lg font-bold mb-6">{ desa
        ? `Ekonomi keluarga Desa ${desa}`
        : 'Ekonomi keluarga seluruh desa'
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
                <td className="p-2 border-l">minatKerjaDiAMNT</td>
                <td className="p-2 border-l">pernahMelamarAMNT</td>
                <td className="p-2 border-l">minatPelatihan</td>
                <td className="p-2 border-l">jenisPelatihan</td>
                <td className="p-2 border-l">pendapatanPerBulan</td>
                <td className="p-2 border-l">sumberPendapatan</td>
                <td className="p-2 border-l">belanjaPerBulan</td>
                <td className="p-2 border-l">belanjaKonsumsi</td>
                <td className="p-2 border-l">belanjaKesehatan</td>
                <td className="p-2 border-l">belanjaPendidikan</td>
                <td className="p-2 border-l">belanjaKomunikasi</td>
                <td className="p-2 border-l">belanjaTransportasi</td>
                <td className="p-2 border-l">belanjaSewaRumah</td>
                <td className="p-2 border-l">belanjaListrik</td>
                <td className="p-2 border-l">belanjaCicilan</td>
                <td className="p-2 border-l">belanjaLainnya</td>
                <td className="p-2 border-l">tabungan</td>
                <td className="p-2 border-l">jumlahTabungan</td>
                <td className="p-2 border-l">tempatTabungan</td>
                <td className="p-2 border-l">kecukupanPendapatan</td>
                <td className="p-2 border-l">caraPemenuhanKebutuhan</td>
              </tr>
            </tbody>
            <tbody>
            {daftar().map((res:Datum, i:number) => (
              <tr key={res._id} className="border-b last:border-none">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 border-l">{res.nama}</td>
                <td className="p-2 border-l">{res.desa}</td>
                <td className="p-2 border-l">{res.minatKerjaDiAMNT}</td>
                <td className="p-2 border-l">{res.pernahMelamarAMNT}</td>
                <td className="p-2 border-l">{res.minatPelatihan}</td>
                <td className="p-2 border-l">{res.jenisPelatihan}</td>
                <td className="p-2 border-l">{res.pendapatanPerBulan}</td>
                <td className="p-2 border-l">{res.sumberPendapatan.join(" / ")}</td>
                <td className="p-2 border-l">{res.belanjaPerBulan}</td>
                <td className="p-2 border-l">{res.belanjaKonsumsi}</td>
                <td className="p-2 border-l">{res.belanjaKesehatan}</td>
                <td className="p-2 border-l">{res.belanjaPendidikan}</td>
                <td className="p-2 border-l">{res.belanjaKomunikasi}</td>
                <td className="p-2 border-l">{res.belanjaTransportasi}</td>
                <td className="p-2 border-l">{res.belanjaSewaRumah}</td>
                <td className="p-2 border-l">{res.belanjaListrik}</td>
                <td className="p-2 border-l">{res.belanjaCicilan}</td>
                <td className="p-2 border-l">{res.belanjaLainnya}</td>
                <td className="p-2 border-l">{res.tabungan}</td>
                <td className="p-2 border-l">{res.jumlahTabungan}</td>
                <td className="p-2 border-l">{res.tempatTabungan}</td>
                <td className="p-2 border-l">{res.kecukupanPendapatan}</td>
                <td className="p-2 border-l">{res.caraPemenuhanKebutuhan}</td>
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
  const dfItems = await db.collection('ekonomi').aggregate([
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
      minatKerjaDiAMNT: 1,
      pernahMelamarAMNT: 1,
      minatPelatihan: 1,
      jenisPelatihan: 1,
      pendapatanPerBulan: 1,
      sumberPendapatan: 1,
      belanjaPerBulan: 1,
      belanjaKonsumsi: 1,
      belanjaKesehatan: 1,
      belanjaPendidikan: 1,
      belanjaKomunikasi: 1,
      belanjaTransportasi: 1,
      belanjaSewaRumah: 1,
      belanjaListrik: 1,
      belanjaCicilan: 1,
      belanjaLainnya: 1,
      tabungan: 1,
      jumlahTabungan: 1,
      tempatTabungan: 1,
      kecukupanPendapatan: 1,
      caraPemenuhanKebutuhan: 1,
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