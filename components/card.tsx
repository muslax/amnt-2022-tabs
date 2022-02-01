export default function Card({ label, data }: { label:string, data:any}) {

  const keys = Object.keys(data);
  return (
    <table className="border border-gray-400 text-sm my-2">
      <tbody>
        <tr className="whitespace-nowrap">
          <td className="font-medium bg-yellow-200 p-2">{label}</td>
          {keys.map((key) => (
            <td key={key} className="p-0 border-l border-gray-400">
              <span className="inline-block bg-yellow-100 p-2">{key}</span>
              <span className="inline-block bg-yellow-300 font-bold p-2">{data[key]}</span>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}