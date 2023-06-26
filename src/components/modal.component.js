import React, { useState } from 'react';
import Modal from 'react-modal';

const ModalExample = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({id:"1",name:"ohm",email:"ohm2393@gmail.com"});
  const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width:'80%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '1px 2px #888888',
        },
  };


  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button style={{position: 'absolute',
    bottom:0,
    left:0,}} onClick={handleButtonClick}>Show Modal</button>

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Modal"
      >
      <h2>Order Items</h2>
          <table className='table'>
               <thead>
                   <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                   </tr>
               </thead>
               <tbody>
                     <tr>
                       <td>{selectedRow.id}</td>
                       <td>{selectedRow.name}</td>
                       <td>{selectedRow.email}</td>
                     </tr>
               </tbody>
            </table>
      </Modal>
    </div>
  );
};

export default ModalExample;
