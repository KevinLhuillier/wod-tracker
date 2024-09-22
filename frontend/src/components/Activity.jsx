const Activity = () => {
  return (
    <div className="container mx-auto min-h-screen rounded-2xl bg-white">
      <header className="grid grid-cols-3 items-center border-b px-12 py-6">
        <img src="./assets/react.svg" className="w-10" />
        <h1 className=" text-center font-bold text-black text-xl">
          Wod Tracker
        </h1>
        <ul className="flex items-center justify-end gap-x-6">
          <li>
            <i className="fa-solid fa-trophy fa-lg text-yellow-500"></i>
          </li>
          <li>
            <img
              className="w-8 rounded-full"
              src="https://randomuser.me/api/portraits/men/10.jpg"
            />
          </li>
        </ul>
      </header>
      <div className="flex items-center justify-between border-b px-12 py-8 font-bold">
        <ul className="flex font-bold">
          <li className="border-r pr-3 text-slate-950">Dashboard</li>
          <a className="px-3 text-sky-500 hover:text-sky-500" href="#">
            Activity
          </a>
          <a className="px-3 hover:text-sky-500" href="#">
            Skills
          </a>
          <a className="px-3 hover:text-sky-500" href="#">
            PR
          </a>
          <a className="px-3 hover:text-sky-500" href="#">
            Wods
          </a>
        </ul>
        <div className="flex gap-2">
          <button className="rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-sky-600 active:bg-sky-700">
            + New Goal
          </button>
          <button className="rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-sky-600 active:bg-sky-700">
            + New Wod
          </button>
        </div>
      </div>
      <div className="mb-12 grid grid-cols-3 divide-x border-b">
        <div className="p-12 text-slate-400">
          <div className="mb-4 flex justify-between text-sm font-bold">
            <p>Skill to work</p>
            <p>Last Practice: 2024/03/16</p>
          </div>
          <p className="text-4xl text-slate-950">Handstand Walk</p>
        </div>
        <div className="p-12 text-slate-400">
          <div className="mb-2 flex justify-between text-sm font-bold">
            <p>RX Index</p>
            <p className="rounded-lg bg-green-500 px-2 py-1 text-white">
              INTER
            </p>
          </div>
          <p className="text-4xl text-slate-950">54%</p>
        </div>
        <div className="p-12 text-slate-400">
          <div className="mb-2 flex justify-between text-sm font-bold">
            <p>Goal of the month (45%)</p>
            <div className="text-right">
              <p>Start: 2024/07/01</p>
              <p className="text-orange-400">End: 2024/07/31</p>
            </div>
          </div>
          <p className="text-4xl text-slate-950">450/1000 Burpees</p>
        </div>
      </div>
      <div className="border-b border-slate-100 px-12 py-8 font-bold">
        Recent activity
      </div>
      <p className="border-b bg-gray-50 px-12 py-2 font-bold">Last Wods</p>
      <ul className="px-12">
        <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
          <i className="fa-solid fa-stopwatch-20 pt-1 text-center"></i>
          <div>
            <div className="mb-2 flex gap-x-4">
              <p className="font-bold">Wod</p>
              <div className="rounded border border-green-200 bg-green-50 px-1 text-sm font-bold text-green-600">
                Easy
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold">2024-05-06</p>
          </div>
          <div className="justify-self-end text-right">
            <p className="mb-2 font-bold text-sky-500">View Wod</p>
          </div>
        </li>
        <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
          <i className="fa-solid fa-dumbbell pt-1 text-center"></i>
          <div>
            <div className="mb-2 flex gap-x-4">
              <p className="font-bold">Haltero</p>
              <div className="rounded border border-gray-200 bg-gray-50 px-1 text-sm font-bold text-gray-600">
                Neutral
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold">2024-05-06</p>
          </div>
          <div className="justify-self-end text-right">
            <p className="mb-2 font-bold text-sky-500">View Wod</p>
          </div>
        </li>
        <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
          <i className="fa-solid fa-heart-pulse pt-1 text-center"></i>
          <div>
            <div className="mb-2 flex gap-x-4">
              <p className="font-bold">Conditionning</p>
              <div className="rounded border border-red-200 bg-red-50 px-1 text-sm font-bold text-red-600">
                Hard
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold">2024-04-28</p>
          </div>
          <div className="justify-self-end text-right">
            <p className="mb-2 font-bold text-sky-500">View Wod</p>
          </div>
        </li>
      </ul>
      <p className="border-b bg-gray-50 px-12 py-2 font-bold">Last Goals</p>
      <ul className="px-12">
        <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
          <i className="fa-solid fa-bullseye pt-1 text-center"></i>
          <div>
            <div className="mb-2 flex gap-x-4">
              <p className="font-bold">100m Handstand Walk</p>
              <div className="rounded border border-green-200 bg-green-50 px-1 text-sm font-bold text-green-600">
                Success
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold">2024-05-06</p>
          </div>
        </li>
        <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
          <i className="fa-solid fa-bullseye pt-1 text-center"></i>
          <div>
            <div className="mb-2 flex gap-x-4">
              <p className="font-bold">60kg Snatch</p>
              <div className="rounded border border-red-200 bg-red-50 px-1 text-sm font-bold text-red-600">
                Failed
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold">2024-05-06</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Activity;

//     <div className="container mx-auto min-h-screen rounded-2xl bg-white">
//       <header className="grid grid-cols-3 items-center border-b px-12 py-8">
//     <img src="./assets/logo.png" className="w-10" />
//     <h1 className=" text-center font-bold text-black text-xl">Wod Tracker</h1>
//     <ul className="flex items-center justify-end gap-x-6">
//       <li>
//         <i className="fa-solid fa-trophy fa-lg text-yellow-500"></i>
//       </li>
//       <li>
//         <img
//           className="w-8 rounded-full"
//           src="https://randomuser.me/api/portraits/men/10.jpg"
//         />
//       </li>
//     </ul>
//   </header>
//   <div
//     className="flex items-center justify-between border-b px-12 py-8 font-bold"
//   >
//     <ul className="flex font-bold">
//       <li className="border-r pr-3 text-slate-950">Dashboard</li>
//       <a className="px-3 text-sky-500 hover:text-sky-500" href="#">Activity</a>
//       <a className="px-3 hover:text-sky-500" href="#">Skills</a>
//       <a className="px-3 hover:text-sky-500" href="#">PR</a>
//       <a className="px-3 hover:text-sky-500" href="#">Wods</a>
//     </ul>
//     <div className="flex gap-2">
//       <button
//         className="rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-sky-600 active:bg-sky-700"
//       >
//         + New Goal
//       </button>
//       <button
//         className="rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-sky-600 active:bg-sky-700"
//       >
//         + New Wod
//       </button>
//     </div>
//   </div>
//   <div className="mb-12 grid grid-cols-3 divide-x border-b">
//     <div className="p-12 text-slate-400">
//       <div className="mb-4 flex justify-between text-sm font-bold">
//         <p>Skill to work</p>
//         <p>Last Practice: 2024/03/16</p>
//       </div>
//       <p className="text-4xl text-slate-950">Handstand Walk</p>
//     </div>
//     <div className="p-12 text-slate-400">
//       <div className="mb-2 flex justify-between text-sm font-bold">
//         <p>RX Index</p>
//         <p className="rounded-lg bg-green-500 px-2 py-1 text-white">INTER</p>
//       </div>
//       <p className="text-4xl text-slate-950">54%</p>
//     </div>
//     <div className="p-12 text-slate-400">
//       <div className="mb-2 flex justify-between text-sm font-bold">
//         <p>Goal of the month (45%)</p>
//         <div className="text-right">
//           <p>Start: 2024/07/01</p>
//           <p className="text-orange-400">End: 2024/07/31</p>
//         </div>
//       </div>
//       <p className="text-4xl text-slate-950">450/1000 Burpees</p>
//     </div>
//   </div>
//   <div className="border-b border-slate-100 px-12 py-8 font-bold">
//     Recent activity
//   </div>
//   <p className="border-b bg-gray-50 px-12 py-2 font-bold">Last Wods</p>
//   <ul className="px-12">
//     <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
//       <i className="fa-solid fa-stopwatch-20 pt-1 text-center"></i>
//       <div>
//         <div className="mb-2 flex gap-x-4">
//           <p className="font-bold">Wod</p>
//           <div
//             className="rounded border border-green-200 bg-green-50 px-1 text-sm font-bold text-green-600"
//           >
//             Easy
//           </div>
//         </div>
//       </div>
//       <div>
//         <p className="mb-2 font-bold">2024-05-06</p>
//       </div>
//       <div className="justify-self-end text-right">
//         <p className="mb-2 font-bold text-sky-500">View Wod</p>
//       </div>
//     </li>
//     <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
//       <i className="fa-solid fa-dumbbell pt-1 text-center"></i>
//       <div>
//         <div className="mb-2 flex gap-x-4">
//           <p className="font-bold">Haltero</p>
//           <div
//             className="rounded border border-gray-200 bg-gray-50 px-1 text-sm font-bold text-gray-600"
//           >
//             Neutral
//           </div>
//         </div>
//       </div>
//       <div>
//         <p className="mb-2 font-bold">2024-05-06</p>
//       </div>
//       <div className="justify-self-end text-right">
//         <p className="mb-2 font-bold text-sky-500">View Wod</p>
//       </div>
//     </li>
//     <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
//       <i className="fa-solid fa-heart-pulse pt-1 text-center"></i>
//       <div>
//         <div className="mb-2 flex gap-x-4">
//           <p className="font-bold">Conditionning</p>
//           <div
//             className="rounded border border-red-200 bg-red-50 px-1 text-sm font-bold text-red-600"
//           >
//             Hard
//           </div>
//         </div>
//       </div>
//       <div>
//         <p className="mb-2 font-bold">2024-04-28</p>
//       </div>
//       <div className="justify-self-end text-right">
//         <p className="mb-2 font-bold text-sky-500">View Wod</p>
//       </div>
//     </li>
//   </ul>
//   <p className="border-b bg-gray-50 px-12 py-2 font-bold">Last Goals</p>
//   <ul className="px-12">
//     <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
//       <i className="fa-solid fa-bullseye pt-1 text-center"></i>
//       <div>
//         <div className="mb-2 flex gap-x-4">
//           <p className="font-bold">100m Handstand Walk</p>
//           <div
//             className="rounded border border-green-200 bg-green-50 px-1 text-sm font-bold text-green-600"
//           >
//             Success
//           </div>
//         </div>
//       </div>
//       <div>
//         <p className="mb-2 font-bold">2024-05-06</p>
//       </div>
//     </li>
//     <li className="grid grid-cols-[50px_repeat(3,_1fr)] py-4">
//       <i className="fa-solid fa-bullseye pt-1 text-center"></i>
//       <div>
//         <div className="mb-2 flex gap-x-4">
//           <p className="font-bold">60kg Snatch</p>
//           <div
//             className="rounded border border-red-200 bg-red-50 px-1 text-sm font-bold text-red-600"
//           >
//             Failed
//           </div>
//         </div>
//       </div>
//       <div>
//         <p className="mb-2 font-bold">2024-05-06</p>
//       </div>
//     </li>
// </div>
//   </body>
// </html>
