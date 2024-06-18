import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root'); // Ceci est important pour l'accessibilité, vous devriez le définir sur l'élément racine de votre application

const VideoFrame = styled.div`
  cursor: pointer;
  width: 560px; /* ajustez selon vos besoins */
  height: 315px; /* ajustez selon vos besoins */
  position: relative;
  overflow: hidden;
  background-color: black;
  border: 2px solid #ccc;

  iframe {
    width: 100%;
    height: 100%;
  }
`;

const YouTubeModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <VideoFrame onClick={openModal}>
        <iframe
          src="https://www.youtube.com/embed/4SSb22-uoA8"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </VideoFrame>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="YouTube Video"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
          },
        }}
      >
        <button onClick={closeModal}>Fermer</button>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src="https://www.youtube.com/embed/4SSb22-uoA8"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default YouTubeModal;
