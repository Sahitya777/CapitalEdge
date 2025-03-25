import React from 'react'

const Sidebar = () => {
  const sideBarOptions=[
    "PHA",
    "Fund Analysis",
    "Holdings",
    "Transactions"
  ]
  return (
    <div className='h-full fixed left-0 w-[200px] top-20 mt-[2px] pl-5 pr-5 pt-10 bg-[#1B1A1A]'>
      <div className='flex flex-col gap-4'>
        {sideBarOptions.map((sideBarOption:string,id:number)=>(
          <div key={id} className={sideBarOption==="PHA"?"bg-[#3D3D3D] p-3 pl-4 rounded-md cursor-pointer text-[#F6F6F6]": 'p-3 pl-4 cursor-pointer text-[#F6F6F6] hover:bg-[#3D3D3D] rounded-md'}>
            {sideBarOption}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar