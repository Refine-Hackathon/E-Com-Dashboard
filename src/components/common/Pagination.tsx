

export default function Pagination({current,pageSize , pageCount ,setPageSize ,setCurrent}) {
  return (
    <>
        <div className="page" 
                        style=
                        {{
                            display:'flex',
                            width:'200px',
                            height:'50px',
                            alignItems:'center',
                            justifyContent :'space-around'
                        }}>
            <button onClick={() => {setCurrent((prev) => prev - 1)}}
                    disabled = {!(current > 1)}
            >
                    {"<"}
            </button>
            <h4> page: {current} of  {pageCount} </h4>
            <button onClick={() => {setCurrent((prev) => prev + 1)}}
                    disabled = {(current  === pageCount)}
            >
                    {">"}
            </button>
        <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
        >
            {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                    {size}
                </option>
            ))}
        </select>
        </div>
    </>
  )
}
