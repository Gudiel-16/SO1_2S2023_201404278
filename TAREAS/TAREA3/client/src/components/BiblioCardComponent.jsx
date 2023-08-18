
function BiblioCardComponent({biblio}) {
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 text-center">
        <p className="font-bold">
          <span className="text-sx text-amber-500">TITLE:</span> {biblio.Title}
        </p>
        <p className="font-bold">
          <span className="text-sx text-amber-500">ARTIST:</span> {biblio.Artist}
        </p>
        <p className="font-bold">
          <span className="text-sx text-amber-500">YEAR:</span> {biblio.Year}
        </p>
        <p className="font-bold">
        <span className="text-sx text-amber-500">GENRE:</span> {biblio.Genre}
        </p>
    </div>
  )
}

export default BiblioCardComponent