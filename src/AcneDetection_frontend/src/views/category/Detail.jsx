import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AcneCategory from './Acne_Category.jsx';
// import AcneCategory from './components/AcneCategory';
import DetailAcne from './Acne_Detail.jsx';

function Detail() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AcneCategory} />
        <Route path="/acne/:id" component={DetailAcne} />
      </Switch>
    </Router>
  );
}

export default Detail;

// import React, { useState } from 'react';
// import { Modal } from 'react-bootstrap'; // Bootstrap Modal
// import { DataAcne } from "../../component/Data/Data_Acne";

// const Detail = ({ id }) => {
//   const [show, setShow] = useState(false); // State untuk modal
//   const [selectedAcne, setSelectedAcne] = useState(null); // State untuk data acne yang dipilih

//   const handleClose = () => setShow(false);
//   const handleShow = (acne) => {
//     setSelectedAcne(acne);
//     setShow(true);
//   };

//   return (
//     <>
//       {DataAcne.map((acne) => (
//         <div key={acne.id} className="col-md-3 bg-sky-100 p-2 m-2 samo gap-4"
//           style={{ textAlign: 'left' }}
//           onClick={() => handleShow(acne)}>
//           <img src={acne.image} alt="unsplash.com" className='w-100 mb-3 rounded'/>
//           <h1 className='font-bold text-xl p-1 text-sky-800 font-sans'>{acne.name}</h1>
//           <h2 className='font-medium text-xl p-1 text-sky-800 font-sans'>Selengkapnya...</h2>
//         </div>
//       ))}

//       <Modal
//         show={show}
//         onHide={handleClose}
//         centered
//         size="lg"
//         aria-labelledby="example-modal-sizes-title-lg">
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-lg">
//             {selectedAcne && selectedAcne.name}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <img src={selectedAcne && selectedAcne.image} alt="unsplash.com" className='w-100 mb-3 rounded'/>
//           <p className='font-medium text-base p-2 text-sky-800 font-sans'>Tentang:</p>
//           <p className='text-sm p-2 font-sans'>{selectedAcne && selectedAcne.about}</p>
//           <p className='font-medium text-base p-2 text-sky-800 font-sans'>Penyebab:</p>
//           <p className='text-sm p-2 font-sans'>{selectedAcne && selectedAcne.reason}</p>
//           <p className='font-medium text-base p-2 text-sky-800 font-sans'>Cara Mengatasi:</p>
//           <p className='text-sm p-2 font-sans'>{selectedAcne && selectedAcne.overcome}</p>
//           <p className='font-medium text-base p-2 text-sky-800 font-sans'>Info:</p>
//           <p className='text-sm p-2 font-sans'>{selectedAcne && selectedAcne.info}</p>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Detail;


// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
// import { DataAcne } from "../../component/Data/Data_Acne";

// function Detail () {
//     return (
//         <div className="container">
//             <div className="row flex w-screen h-auto">
//                 {DataAcne.map((data) => {
//                     return (
//                         <div key={data.id}
//                             className="col-md-3 bg-sky-100 p-2 m-2 gap-4"
//                             style={{ textAlign: 'left' }}
//                             onClick={() => alert('${data.id}')}>
//                                 <img src={data.image} alt="unsplash.com" className='w-100 mb-3 rounded'/>
//                                 <h1 className='font-bold text-xl p-1 text-sky-800 font-sans'>{data.name}</h1>
//                                 <h2 className='font-medium text-xl p-1 text-sky-800 font-sans'>Selengkapnya...</h2>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div> 
//     )
  
// };

// export default Detail;