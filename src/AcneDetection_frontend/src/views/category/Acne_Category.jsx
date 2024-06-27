import React from 'react';
import { DataAcne } from "../../component/Data/Data_Acne";
import "./Acne_Category.css";

const AcneCategory = () => {

    return (

        <div className="itemContain">
            <div className="cardContain">
                {DataAcne.map((data) => {
                    return (
                        <div key={data.id} className="mainContain">
                            <div
                                className="content"
                                style={{ textAlign: 'left' }}
                                onClick={() => alert(`${data.id}`)}
                            >
                                <img src={data.image} alt="image" />
                                <h1>{data.name}</h1>
                                <h2>Selengkapnya...</h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export default AcneCategory;

// const GridItem = () => {
//   return (
//     <div className="grid-item">
//       Item
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div className="grid-container">
//       <GridItem />
//       <GridItem />
//       <GridItem />
//       <GridItem />
//       <GridItem />
//       <GridItem />
//     </div>
//   );
// };

// export default App;

//////

// import React from 'react';
// import { Col, Row } from 'antd';
// import { DataAcne } from "../../component/Data/Data_Acne";

// const AcneCategory = () => {

//     return (
//         <div>
//             <Row className='bg-sky-500 grid grid-cols-3 gap-1'>
//                 {DataAcne.map((data) => {
//                     return (
//                         <Col key={data.id} >
//                             <img src={data.image} alt="unsplash.com" className='w-100 mb-5 rounded' />
//                             <h1>{data.name}</h1>
//                             <h2>Selengkapnya...</h2>
//                         </Col>
//                     );
//                 })}
//             </Row>
//         </div>
//     )
// }

// export default AcneCategory;